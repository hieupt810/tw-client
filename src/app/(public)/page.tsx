'use client';

import { HTTPError } from 'ky';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import HeroSection from '@/components/hero-section';
import PlaceCarousel from '@/components/place-carousel';
import RecentlyViewedItems from '@/components/recently-viewed-items';
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
      <HeroSection title={HERO_TITLE} description={HERO_DESCRIPTION} />
      <PlaceCarousel
        title='Explore top destinations'
        description='Discover the best places to visit '
        items={items}
        className='p-10'
      />
      <Image
        priority
        width={4500}
        height={1503}
        src='/home-banner.jpg'
        alt='Welcome to Vietnam'
      />
      <RecentlyViewedItems className='p-10 pb-0' />
    </>
  );
}
