'use client';

import { HTTPError } from 'ky';
import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import DraggableList from '@/components/draggable-list';
import Loading from '@/components/loading';
import SectionTitle from '@/components/section-title';
import { TripService } from '@/services/trip';
import { IAttraction } from '@/types/IAttraction';
import { IError } from '@/types/IError';

const MarkerMap = dynamic(() => import('@/components/marker-map'), {
  ssr: false,
});

export default function TripPage() {
  const router = useRouter();
  const { slug } = useParams();
  const [items, setItems] = useState<IAttraction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const fetchTripItems = useCallback(
    async function (slug: string) {
      try {
        const data = await TripService.getTripById(slug);
        setItems(data.places);
      } catch (error) {
        if (error instanceof HTTPError) {
          const data = await error.response.json<IError>();
          toast.error(data.error);
        } else toast.error('Something went wrong');
        router.push('/');
      }
    },
    [router],
  );

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
          items.map((item) => item.elementId),
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
    fetchTripItems(slug);
  }, [fetchTripItems, router, slug]);

  if (isLoading) return <Loading />;

  return (
    <div className='grid grid-cols-5 gap-4 py-10'>
      <DraggableList
        items={items}
        setItems={setItems}
        isLoading={isLoading || isSaving}
        onOptimize={handleOptimizeTrip}
        onSave={handleSaveOrder}
        className='col-span-2'
      />
      <div className='col-span-3 flex max-h-[50rem] flex-col'>
        <SectionTitle text='Map' />
        <MarkerMap zoom={11} items={items} />
      </div>
    </div>
  );
}
