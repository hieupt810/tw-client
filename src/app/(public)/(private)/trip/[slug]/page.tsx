'use client';

import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import DraggableList from '@/components/draggable-list';
import Loading from '@/components/loading';
import SectionTitle from '@/components/section-title';
import { TripService } from '@/services/trip';
import { useTripStore } from '@/stores/trip-store';
import { IAttraction } from '@/types/IAttraction';

const MarkerMap = dynamic(() => import('@/components/marker-map'), {
  ssr: false,
});

export default function TripPage() {
  const router = useRouter();
  const { slug } = useParams();

  const { fetchPlacesInTrip } = useTripStore((state) => state);

  const [items, setItems] = useState<IAttraction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleOptimizeTrip = useCallback(
    async function () {
      if (!slug || typeof slug !== 'string') return;

      try {
        setIsLoading(true);
        const resp = await TripService.optimizeTrip(slug);
        setItems(resp.places);
        toast.success('Route optimized successfully');
      } catch {
        toast.error('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    },
    [slug],
  );

  const handleSaveOrder = useCallback(
    async function () {
      if (!slug || typeof slug !== 'string') return;
      try {
        setIsSaving(true);
        await TripService.reorder(
          slug,
          items.map((item) => item.element_id),
        );
        toast.success('Order saved successfully');
      } catch {
        toast.error('Failed to save order');
      } finally {
        setIsSaving(false);
      }
    },
    [slug, items],
  );

  useEffect(() => {
    if (!slug || typeof slug !== 'string') {
      router.push('/');
      return;
    }
    fetchPlacesInTrip(slug);
  }, [fetchPlacesInTrip, router, slug]);

  if (isLoading) return <Loading />;

  return (
    <div className='grid grid-cols-5 gap-1.5 py-10'>
      <DraggableList
        elementId={slug as string}
        isLoading={isLoading || isSaving}
        onOptimize={handleOptimizeTrip}
        onSave={handleSaveOrder}
        className='col-span-2'
      />
      <div className='col-span-3 flex flex-col'>
        <SectionTitle text='Map' />
        <MarkerMap zoom={11} items={items} />
      </div>
    </div>
  );
}
