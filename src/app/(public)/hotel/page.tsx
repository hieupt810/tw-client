'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useStore } from 'zustand';

import CustomBreadcrumb from '@/components/custom-breadcrumb';
import HeroSection from '@/components/hero-section';
import HorizontalPlace from '@/components/horizontal-place';
import Loading from '@/components/loading';
import MaxWidthContainer from '@/components/max-width-container';
import { useHotelStore } from '@/stores/hotel';

const HERO_TITLE = 'Explore the best hotels in Vietnam';
const HERO_DESCRIPTION =
  'Discover the perfect place to stay for your next unforgettable trip, whether you are traveling for leisure or business.';

export default function HotelsPage() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const size = parseInt(searchParams.get('size') || '10', 10);

  const { hotels, isLoading, totalPages, resetAction, listHotelAction } =
    useStore(useHotelStore, (state) => state);

  useEffect(() => {
    listHotelAction(page, size);

    return () => {
      resetAction();
    };
  }, [resetAction, listHotelAction]);

  if (isLoading || hotels.length === 0) {
    return <Loading />;
  }

  return (
    <>
      <HeroSection title={HERO_TITLE} description={HERO_DESCRIPTION} />
      <CustomBreadcrumb links={[{ label: 'Hotels', href: '/hotel' }]} />
      <MaxWidthContainer className='grid grid-cols-4 gap-4'>
        <div className='col-span-1 hidden md:block'></div>
        <HorizontalPlace
          places={hotels}
          totalPages={totalPages}
          className='col-span-4 md:col-span-3'
        />
      </MaxWidthContainer>
    </>
  );
}
