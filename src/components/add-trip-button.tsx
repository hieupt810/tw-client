'use client';

import { ListPlus, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useStore } from 'zustand';

import { useAuthStore } from '@/stores/auth-store';
import { useTripStore } from '@/stores/trip-store';

import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface Props {
  elementId: string;
  iconOnly?: boolean;
}

export default function AddTripButton({ elementId, iconOnly = false }: Props) {
  const router = useRouter();
  const me = useStore(useAuthStore, (state) => state.me);
  const { trips, reset, fetchTrips, createTrip, addPlaceToTrip } = useStore(
    useTripStore,
    (state) => state,
  );

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false);
  const [tripName, setTripName] = useState<string>('');
  const [creating, setCreating] = useState<boolean>(false);

  const handleOpenDialog = useCallback(() => {
    if (!me) {
      router.push('/sign-in');
      toast.info('Please sign in to add items to a trip.');
      return;
    }
    fetchTrips();
    setDialogOpen(true);
  }, [me, router, fetchTrips]);

  const handleCreateTrip = useCallback(() => {
    setCreateDialogOpen(true);
  }, []);

  const handleDialogCreate = useCallback(async () => {
    if (!tripName.trim()) return;
    setCreating(true);
    await createTrip(tripName.trim());
    setCreating(false);
    setCreateDialogOpen(false);
    setTripName('');
  }, [tripName, createTrip]);

  const handleAddToTrip = useCallback(
    async (tripId: string) => {
      if (!elementId) return;
      try {
        await addPlaceToTrip(tripId, elementId);
        toast.success('Item added to trip successfully!');
        setDialogOpen(false);
      } catch (error: unknown) {
        toast.error(error as string);
      }
    },
    [elementId, addPlaceToTrip],
  );

  return (
    <>
      {/* Create Trip Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Trip</DialogTitle>
            <DialogDescription>
              Enter a name for your new trip. You can edit trip details later.
            </DialogDescription>
          </DialogHeader>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Trip Name
            </Label>
            <Input
              autoFocus
              id='name'
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
              className='col-span-3'
            />
          </div>
          <DialogFooter>
            <Button
              variant='outline'
              disabled={creating}
              onClick={() => setCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDialogCreate}
              disabled={creating || !tripName.trim()}
            >
              {creating ? 'Creating...' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Main Add to Trip Dialog */}
      <Dialog
        open={dialogOpen && !createDialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) reset();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add to trip</DialogTitle>
            <DialogDescription>
              Select a trip to add this item to.
            </DialogDescription>
          </DialogHeader>
          <div className='grid max-h-60 grid-cols-1 gap-2 overflow-y-auto'>
            <Button className='justify-start' onClick={handleCreateTrip}>
              <PlusIcon />
              <span>Create New</span>
            </Button>
            {trips.item.map((trip) => (
              <Button
                key={trip.id}
                variant='secondary'
                className='justify-start capitalize'
                onClick={() => handleAddToTrip(trip.id)}
              >
                {trip.name}
              </Button>
            ))}
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              onClick={handleOpenDialog}
              size={iconOnly ? 'icon' : 'default'}
            >
              <ListPlus />
              {!iconOnly && <span>Add to trip</span>}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to trip</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
