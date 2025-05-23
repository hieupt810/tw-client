'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useStore } from 'zustand';

import CardItem from '@/components/card-item';
import HeroSection from '@/components/hero-section';
import Loading from '@/components/loading';
import { useHotelStore } from '@/stores/hotel-store';

const HERO_TITLE = 'Stay at top hotels';
const HERO_DESCRIPTION =
  'Discover the perfect place to stay for your next unforgettable trip, whether you are traveling for leisure or business.';

export default function HotelsPage() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const size = parseInt(searchParams.get('size') || '10');

  const { hotels, reset, fetchHotels } = useStore(
    useHotelStore,
    (state) => state,
  );

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
      <div className='my-10 grid grid-cols-5 gap-6'>
        {hotels.items.map((hotel) => (
          <CardItem key={hotel.elementId} item={hotel} />
        ))}
      </div>
      <HeroSection
        image='/hotel-2.jpeg'
        title='Backed by travelers'
        description="See what people loved (or didn't love) with real reviews on almost everything."
      />
    </>
  );
}
