'use client';

import { HTTPError } from 'ky';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import HeroSection from '@/components/hero-section';
import PlaceCarousel from '@/components/place-carousel';
import RecentlyViewedItems from '@/components/recently-viewed-items';
import Search from '@/components/search';
import { HotelService } from '@/services/hotel';
import { IAttraction } from '@/types/IAttraction';
import { IError } from '@/types/IError';

const HERO_TITLE = 'Explore Your Journey Awaits';
const HERO_DESCRIPTION =
  'Tailored to your preferences and designed to make every step of your adventure seamless and memorable.';

export default function HomePage() {
  const [items, setItems] = useState<IAttraction[]>([]);

  const fetchItems = useCallback(async function (
    page: number = 1,
    size: number = 10,
  ) {
    try {
      const data = await HotelService.list(page, size);
      setItems(data.data);
    } catch (error) {
      if (error instanceof HTTPError) {
        const data = await error.response.json<IError>();
        toast.error(data.error);
      } else toast.error('Something went wrong');
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <>
      <Search />
      <HeroSection
        title={HERO_TITLE}
        image='/home.jpg'
        description={HERO_DESCRIPTION}
      />
      <div className='flex flex-col gap-10 p-10'>
        <PlaceCarousel
          title='Top destinations for your next vacation'
          description='Discover the most popular places with the highest rankings'
          items={items}
        />
        <PlaceCarousel
          title="Stay at the Vietnam's top hotels"
          description="2025 Travelers's Choice Awards"
          items={items}
        />
      </div>
      <HeroSection title='Vietnam Travel' image='/home-2.jpeg' ratio={16 / 7} />
      <RecentlyViewedItems className='p-10 pb-0' />
    </>
  );
}
