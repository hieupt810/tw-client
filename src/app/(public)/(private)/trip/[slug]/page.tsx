'use client';

import { HTTPError } from 'ky';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import DraggableList from '@/components/draggable-list';
import Loading from '@/components/loading';
import SectionTitle from '@/components/section-title';
import { HotelService } from '@/services/hotel';
import { IAttraction } from '@/types/IAttraction';
import { IError } from '@/types/IError';

const MarkerMap = dynamic(() => import('@/components/marker-map'), {
  ssr: false,
});

export default function TripPage() {
  const router = useRouter();
  const [items, setItems] = useState<IAttraction[]>([]);

  const fetchHotels = useCallback(
    async function (page: number = 1, size: number = 10) {
      try {
        const data = await HotelService.list(page, size);
        setItems(data.data);
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
    fetchHotels();
  }, [fetchHotels]);

  if (!items.length) return <Loading />;

  return (
    <>
      <DraggableList baseItems={items} className='p-10 pt-0' />
      <div className='border-grid flex flex-col border-t px-10 pt-10'>
        <SectionTitle text='Map' />
        <MarkerMap items={items} />
      </div>
    </>
  );
}
