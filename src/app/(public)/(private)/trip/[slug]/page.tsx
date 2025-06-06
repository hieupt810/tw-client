'use client';

import { MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';

import DraggableList from '@/components/draggable-list';
import Loading from '@/components/loading';
import SectionTitle from '@/components/section-title';
import { cn } from '@/lib/utils';
import { useTripStore } from '@/stores/trip-store';
import { IAttraction } from '@/types/IAttraction';

const MarkerMap = dynamic(() => import('@/components/marker-map'), {
  ssr: false,
});

export default function TripPage() {
  const router = useRouter();
  const { slug } = useParams();

  const {
    placesInTrip,
    optimizeTrip,
    reorderPlaces,
    fetchPlacesInTrip,
    fetchTrips,
    trips,
  } = useTripStore((state) => state);

  const thisTrip = trips.item.find((trip) => trip.id === slug);

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleOptimizeTrip = useCallback(
    async function () {
      if (!slug || typeof slug !== 'string') return;

      try {
        await optimizeTrip(slug);
        toast.success('Trip optimized successfully!');
      } catch (error: unknown) {
        toast.error(
          (error as Error)?.message ||
            'Failed to optimize trip. Please try again.',
        );
      }
    },
    [slug],
  );

  const handleSaveOrder = useCallback(
    async function () {
      if (!slug || typeof slug !== 'string') return;
      await reorderPlaces(
        slug,
        placesInTrip.item.map((item: IAttraction) => item.element_id),
      );
      toast.success('Trip order saved successfully!');
    },
    [slug, placesInTrip],
  );

  useEffect(() => {
    if (!slug || typeof slug !== 'string') {
      router.push('/');
      return;
    }
    fetchPlacesInTrip(slug);
  }, [fetchPlacesInTrip, router, slug]);

  if (placesInTrip.isLoading) return <Loading />;

  return (
    <div className='flex flex-col'>
      <div>
        <div className='mt-4 grid grid-cols-5'>
          <div className='col-span-2'>
            {/* <p className='text-primary my-4 text-xl font-semibold italic'>
              About this trip
            </p> */}
            <h3 className='flex items-start gap-2 text-2xl font-bold'>
              {thisTrip?.name}

              {thisTrip?.is_optimized && (
                <span
                  className={cn(
                    'bg-primary-foreground text-primary inline-block rounded-md px-2 py-0.5 text-base font-semibold',
                  )}
                >
                  OPTIMIZED
                </span>
              )}
            </h3>
            Status:&nbsp;
            <span
              className={cn(
                'inline-block rounded-md px-2 py-0.5 text-sm font-normal',
                !thisTrip?.status
                  ? 'bg-green-50 text-green-500'
                  : 'bg-orange-100 text-orange-500',
              )}
            >
              {thisTrip?.status_text}
            </span>
          </div>
          <div className='col-span-3'>
            <p className='text-muted-foreground mt-2 text-sm italic'>
              Map notes:
            </p>
            <div className='grid grid-cols-3 gap-2'>
              <div className='flex items-center gap-2'>
                <MapPin className='size-10 fill-green-500 text-white' />
                <span>Started destination</span>
              </div>
              <div className='flex items-center gap-2'>
                <MapPin className='size-10 fill-red-600 text-white' />
                <span>Finished destination</span>
              </div>
              <div className='flex items-center gap-2'>
                <MapPin className='fill-primary size-10 text-white' />
                <span>Next destination</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-5 gap-1.5 py-5'>
        <DraggableList
          elementId={slug as string}
          isLoading={placesInTrip.isLoading}
          onOptimize={handleOptimizeTrip}
          onSave={handleSaveOrder}
          className='col-span-2'
        />
        <div className='col-span-3 flex flex-col'>
          <SectionTitle text='Map' />
          <MarkerMap zoom={11} items={placesInTrip.item} />
        </div>
      </div>
    </div>
  );
}
