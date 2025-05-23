'use client';

import {
  Camera,
  CirclePlus,
  Hotel,
  Loader2,
  UtensilsCrossed,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useStore } from 'zustand';

import SectionTitle from '@/components/section-title';
import { formatDate } from '@/lib/utils';
import { useTripStore } from '@/stores/trip-store';

export default function TripsComponent() {
  const { trips, reset, fetchTrips } = useStore(useTripStore, (state) => state);

  useEffect(() => {
    fetchTrips();
    return () => {
      reset();
    };
  }, [fetchTrips, reset]);

  if (trips.isLoading) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <Loader2 className='stroke-primary animate-spin' size={36} />
      </div>
    );
  }

  return (
    <>
      <SectionTitle text='Your Trips' />
      <div className='grid grid-cols-2 gap-10'>
        <div className='bg-primary text-background flex h-full min-h-40 w-full cursor-pointer flex-col items-center justify-center gap-1 overflow-hidden rounded-md shadow-md transition-all duration-200 ease-in-out select-none hover:shadow-lg'>
          <div>
            <CirclePlus size={36} color='white' />
          </div>
          <span className='text-lg font-medium'>Create New</span>
        </div>
        {trips.item.map((trip) => (
          <Link
            key={trip.id}
            href={`/trip/${trip.id}`}
            className='flex min-h-40 cursor-pointer flex-col justify-between gap-6 overflow-hidden rounded-md bg-white p-5 shadow-md transition-all duration-200 ease-in-out select-none hover:shadow-lg'
          >
            <div className='flex flex-row items-center gap-5'>
              <span className='text-primary grow truncate text-xl font-bold capitalize'>
                {trip.name}
              </span>
            </div>

            <div className='grid grid-cols-3 gap-5 text-sm'>
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
              Last updated: {formatDate(trip.updatedAt)}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
