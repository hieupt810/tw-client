'use client';

import { useEffect } from 'react';
import { useStore } from 'zustand';

import CustomBreadcrumb from '@/components/custom-breadcrumb';
import HeroSection from '@/components/hero-section';
import MaxWidthContainer from '@/components/max-width-container';
import PlaceCarousel from '@/components/place-carousel';
import { useHotelStore } from '@/stores/hotel';

const HERO_TITLE = 'Explore the best hotels in Vietnam';
const HERO_DESCRIPTION =
  'Discover the perfect place to stay for your next unforgettable trip, whether you are traveling for leisure or business.';

export default function HotelsPage() {
  const { hotels, getHotelsAction } = useStore(useHotelStore, (state) => state);

  useEffect(() => {
    getHotelsAction();
  }, [getHotelsAction]);

  return (
    <>
      <HeroSection title={HERO_TITLE} description={HERO_DESCRIPTION} />
      <CustomBreadcrumb links={[{ label: 'Hotels', href: '/hotels' }]} />
      <MaxWidthContainer className='flex flex-col gap-12 md:gap-14 lg:gap-16'>
        <PlaceCarousel
          items={hotels}
          title="Stay at the Vietnam's top hotels"
          description="2025's Travelers's Choice Awards"
        />
      </MaxWidthContainer>
    </>
  );
}
