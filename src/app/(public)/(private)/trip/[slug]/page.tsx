'use client';

import { HTTPError } from 'ky';
import { Info } from 'lucide-react';
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

  useEffect(() => {
    if (!slug || typeof slug !== 'string') {
      router.push('/');
      return;
    }
    fetchTripItems(slug);
  }, [fetchTripItems, router, slug]);

  if (!items.length) return <Loading />;

  return (
    <div className='flex flex-col gap-4 px-10'>
      <div className='flex flex-row items-center gap-1'>
        <Info size={16} className='stroke-blue-600' />
        <span className='text-sm text-blue-600'>
          Map will be updated when you press the &quot;Save changes&quot; or
          &quot;Optimize Route&quot; button.
        </span>
      </div>
      <div className='grid grid-cols-5 gap-4'>
        <DraggableList
          baseItems={items}
          isLoading={isLoading}
          onOptimize={handleOptimizeTrip}
          className='col-span-2'
        />
        <div className='col-span-3 flex max-h-[50rem] flex-col'>
          <SectionTitle text='Map' />
          <MarkerMap items={items} />
        </div>
      </div>
    </div>
  );
}
