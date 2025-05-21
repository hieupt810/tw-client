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

  const fetchTripItems = useCallback(
    async function (slug: string) {
      try {
        const data = await TripService.getTripById(slug);
        setItems(data);
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

  useEffect(() => {
    if (!slug || typeof slug !== 'string') {
      router.push('/');
      return;
    }
    fetchTripItems(slug);
  }, [fetchTripItems, router, slug]);

  if (!items.length) return <Loading />;

  return (
    <div className='grid grid-cols-5'>
      <DraggableList baseItems={items} className='col-span-2 pr-4 pl-10' />
      <div className='col-span-3 flex max-h-[50rem] flex-col'>
        <SectionTitle text='Map' />
        <MarkerMap items={items} />
      </div>
    </div>
  );
}
