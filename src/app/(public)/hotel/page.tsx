'use client';

import { HTTPError } from 'ky';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import HeroSection from '@/components/hero-section';
import HorizontalPlace from '@/components/horizontal-place';
import Loading from '@/components/loading';
import RecentlyViewedItems from '@/components/recently-viewed-items';
import SectionTitle from '@/components/section-title';
import { HotelService } from '@/services/hotel';
import { IAttraction } from '@/types/IAttraction';
import { IError } from '@/types/IError';

const HERO_TITLE = "Stay at the Vietnam's top hotels";
const HERO_DESCRIPTION =
  'Discover the perfect place to stay for your next unforgettable trip, whether you are traveling for leisure or business.';

export default function HotelsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const size = parseInt(searchParams.get('size') || '5');

  const [items, setItems] = useState<IAttraction[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchItems = useCallback(
    async function (page: number = 1, size: number = 10) {
      try {
        const data = await HotelService.list(page, size);
        setItems(data.data);
        setTotalPages(data.paging.pageCount);
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
    fetchItems(page, size);
  }, [fetchItems, page, size]);

  if (items.length === 0) return <Loading />;

  return (
    <>
      <HeroSection
        title={HERO_TITLE}
        image='/hotel-1.jpeg'
        description={HERO_DESCRIPTION}
        className='-mt-10'
      />
      <div className='grid grid-cols-4 pt-10'>
        {/* Filter */}
        <div className='col-span-1 hidden flex-col pl-10 md:flex'>
          <SectionTitle text='Filter' />
        </div>

        {/* List */}
        <HorizontalPlace
          places={items}
          totalPages={totalPages}
          className='col-span-4 flex flex-col px-10 md:col-span-3'
        />
      </div>
      <RecentlyViewedItems className='border-grid border-t px-10 pt-10' />
    </>
  );
}
