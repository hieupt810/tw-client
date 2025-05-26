'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useStore } from 'zustand';

import CardItem from '@/components/card-item';
import HeroSection from '@/components/hero-section';
import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { useHotelStore } from '@/stores/hotel-store';

const HERO_TITLE = 'Stay at top hotels';
const HERO_DESCRIPTION =
  'Discover the perfect place to stay for your next unforgettable trip, whether you are traveling for leisure or business.';

export default function HotelsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const size = parseInt(searchParams.get('size') || '8');

  const { hotels, reset, fetchHotels } = useStore(
    useHotelStore,
    (state) => state,
  );

  const handleNextPage = useCallback(() => {
    const nextPage = page + 1;
    router.push(`/hotel?page=${nextPage}&size=${size}`);
  }, [page, router, size]);

  const handlePreviousPage = useCallback(() => {
    const previousPage = page - 1;
    router.push(`/hotel?page=${previousPage}&size=${size}`);
  }, [page, router, size]);

  useEffect(() => {
    fetchHotels(page, size);
    return () => {
      reset();
    };
  }, [fetchHotels, page, size, reset]);

  if (hotels.items.length === 0) return <Loading />;
  return (
    <>
      <HeroSection
        title={HERO_TITLE}
        image='/hotel-1.jpeg'
        description={HERO_DESCRIPTION}
      />
      <div className='my-10 grid grid-cols-2 gap-6 md:grid-cols-4'>
        {hotels.items.map((hotel) => (
          <CardItem key={hotel.element_id} item={hotel} />
        ))}
      </div>
      <div className='flex items-center justify-center pb-10'>
        <div className='grid grid-cols-3 items-center gap-4'>
          <Button
            variant='outline'
            onClick={handlePreviousPage}
            disabled={page <= 1}
          >
            <ArrowLeft />
            <span>Previous</span>
          </Button>
          <span className='text-center text-sm font-medium'>{`Page ${page} of ${hotels.paging.pageCount}`}</span>
          <Button
            variant='outline'
            onClick={handleNextPage}
            disabled={page >= hotels.paging.pageCount}
          >
            <span>Next</span>
            <ArrowRight />
          </Button>
        </div>
      </div>
      <HeroSection
        image='/hotel-2.jpeg'
        title='Backed by travelers'
        description="See what people loved (or didn't love) with real reviews on almost everything."
      />
    </>
  );
}
