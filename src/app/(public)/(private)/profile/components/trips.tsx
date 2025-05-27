'use client';

import {
  Camera,
  CirclePlus,
  Hotel,
  Loader2,
  UtensilsCrossed,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useStore } from 'zustand';

import SectionTitle from '@/components/section-title';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatDate } from '@/lib/utils';
import { useTripStore } from '@/stores/trip-store';

export default function TripsComponent() {
  const { trips, reset, fetchTrips, createTrip } = useStore(
    useTripStore,
    (state) => state,
  );
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [tripName, setTripName] = useState<string>('');
  const [creating, setCreating] = useState<boolean>(false);

  useEffect(() => {
    fetchTrips();
    return () => {
      reset();
    };
  }, [fetchTrips, reset]);

  const handleCreateTrip = async () => {
    setDialogOpen(true);
  };

  const handleDialogCreate = async () => {
    if (!tripName.trim()) return;
    setCreating(true);
    await createTrip(tripName.trim());
    setCreating(false);
    setDialogOpen(false);
    setTripName('');
  };

  if (trips.isLoading) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <Loader2 className='stroke-primary animate-spin' size={36} />
      </div>
    );
  }

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
              onClick={() => setDialogOpen(false)}
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
      <SectionTitle text='Your Trips' />
      <div className='grid grid-cols-2 gap-5'>
        <button
          className='bg-primary text-background flex h-36 w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-md shadow-md transition-all duration-200 ease-in-out select-none hover:shadow-lg'
          onClick={handleCreateTrip}
        >
          <div>
            <CirclePlus size={28} color='white' />
          </div>
          <span className='text-lg font-medium'>Create New</span>
        </button>
        {trips.item.map((trip) => (
          <Link
            key={trip.id}
            href={`/trip/${trip.id}`}
            className='flex h-36 cursor-pointer flex-col justify-between overflow-hidden rounded-md bg-white p-5 shadow-md transition-all duration-200 ease-in-out select-none hover:shadow-lg'
          >
            <div className='flex flex-row items-center justify-between gap-5'>
              <span className='text-primary grow truncate text-lg font-bold capitalize'>
                {trip.name}
              </span>
              {trip.is_optimized && (
                <span className='border-primary text-primary rounded-md border px-1.5 text-xs font-medium'>
                  Optimized
                </span>
              )}
            </div>

            <div className='flex flex-row gap-14 text-sm'>
              <div className='flex flex-row items-center gap-2'>
                <div>
                  <Hotel size={16} />
                </div>
                <span>1</span>
              </div>
              <div className='flex flex-row items-center gap-2'>
                <div>
                  <UtensilsCrossed size={16} />
                </div>
                <span>1</span>
              </div>
              <div className='flex flex-row items-center gap-2'>
                <div>
                  <Camera size={16} />
                </div>
                <span>1</span>
              </div>
            </div>

            <span className='text-muted-foreground text-sm'>
              Last updated: {formatDate(trip.updated_at)}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
