'use client';

import { HTTPError } from 'ky';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import HeroSection from '@/components/hero-section';
import HorizontalPlace from '@/components/horizontal-place';
import Loading from '@/components/loading';
import SectionTitle from '@/components/section-title';
import { HotelService } from '@/services/hotel';
import { IAttraction } from '@/types/IAttraction';
import { IError } from '@/types/IError';

const HERO_TITLE = 'Explore the best hotels in Vietnam';
const HERO_DESCRIPTION =
  'Discover the perfect place to stay for your next unforgettable trip, whether you are traveling for leisure or business.';

export default function HotelsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const size = parseInt(searchParams.get('size') || '5');

  const [totalPages, setTotalPages] = useState<number>(1);
  const [hotels, setHotels] = useState<IAttraction[]>([]);

  const fetchHotels = useCallback(
    async function (page: number, size: number) {
      try {
        const data = await HotelService.list(page, size);
        setHotels(data.data);
        setTotalPages(data.paging.pageCount);
      } catch (error) {
        if (error instanceof HTTPError) {
          const data = await error.response.json<IError>();
          toast.error(data.error);
        } else toast.error('Something went wrong');
        router.push('/hotel');
      }
    },
    [router],
  );

  useEffect(() => {
    fetchHotels(page, size);
  }, [fetchHotels, page, size]);

  if (hotels.length === 0) {
    return <Loading />;
  }

  return (
    <>
      <HeroSection title={HERO_TITLE} description={HERO_DESCRIPTION} />
      <div className='grid grid-cols-4 gap-4 pt-10'>
        {/* Filter */}
        <div className='col-span-1 hidden flex-col pl-6 md:flex'>
          <SectionTitle text='Filter' />
        </div>

        {/* List */}
        <HorizontalPlace
          places={hotels}
          totalPages={totalPages}
          className='col-span-4 flex flex-col pr-6 md:col-span-3'
        />
      </div>
    </>
  );
}
