'use client';

import { Dialog, DialogTitle } from '@radix-ui/react-dialog';
import { ListPlus, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useStore } from 'zustand';

import { TripService } from '@/services/trip';
import { useAuthStore } from '@/stores/auth';
import { ITrip } from '@/types/ITrip';

import { Button } from './ui/button';
import { DialogContent, DialogHeader, DialogTrigger } from './ui/dialog';
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

  const [trips, setTrips] = useState<ITrip[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddToTrip = useCallback(
    async function (tripId: string) {
      setLoading(true);
      try {
        await TripService.addPlaceToTrip(tripId, elementId);
        toast.success('Added to trip!');
        setDialogOpen(false);
      } catch {
        toast.error('Failed to add to trip');
      } finally {
        setLoading(false);
      }
    },
    [elementId],
  );

  const fetchTrips = useCallback(async () => {
    setLoading(true);
    try {
      const response = await TripService.getTrip();
      setTrips(response);
    } catch {
      toast.error('Failed to fetch trips');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Dialog
            open={dialogOpen}
            onOpenChange={(open) => {
              if (!me) {
                toast.error(
                  'You need to be signed in to add a place to a trip',
                );
                router.push('/sign-in');
                return;
              }
              setDialogOpen(open);
              if (open) fetchTrips();
            }}
          >
            <DialogTrigger asChild>
              <Button variant='outline' size={iconOnly ? 'icon' : 'sm'}>
                <ListPlus />
                {!iconOnly && <span>Add this place to a trip</span>}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add this place to a trip</DialogTitle>
              </DialogHeader>

              <div className='max-h-[15rem] space-y-2 overflow-y-auto'>
                {loading === true ? (
                  <div className='flex items-center justify-center p-10'>
                    <Loader2 className='stroke-primary animate-spin' />
                  </div>
                ) : trips.length === 0 ? (
                  <div className='text-muted-foreground text-sm'>
                    No trips found.
                  </div>
                ) : (
                  trips.map((trip) => (
                    <Button
                      key={trip.id}
                      variant='secondary'
                      className='w-full justify-start'
                      disabled={loading}
                      onClick={() => handleAddToTrip(trip.id)}
                    >
                      {trip.name}
                    </Button>
                  ))
                )}
              </div>
            </DialogContent>
          </Dialog>
        </TooltipTrigger>
        <TooltipContent>
          <span>Add to trip</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
