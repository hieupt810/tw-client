'use client';

import { HTTPError } from 'ky';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import HeroSection from '@/components/hero-section';
import PlaceCarousel from '@/components/place-carousel';
import RecentlyViewedItems from '@/components/recently-viewed-items';
import Search from '@/components/search';
import { HotelService } from '@/services/hotel';
import { RestaurantService } from '@/services/restaurant';
import { ThingToDoService } from '@/services/thing-to-do';
import { IAttraction } from '@/types/IAttraction';
import { IError } from '@/types/IError';

const HERO_TITLE = 'Explore Your Journey Awaits';
const HERO_DESCRIPTION =
  'Tailored to your preferences and designed to make every step of your adventure seamless and memorable.';

export default function HomePage() {
  const [hotels, setHotels] = useState<IAttraction[]>([]);
  const [restaurants, setRestaurants] = useState<IAttraction[]>([]);
  const [thingsToDo, setThingsToDo] = useState<IAttraction[]>([]);

  const fetchAll = useCallback(async function () {
    try {
      const [hotels, restaurants, thingsToDo] = await Promise.all([
        HotelService.list(1, 10),
        RestaurantService.list(1, 10),
        ThingToDoService.list(1, 10),
      ]);
      setHotels(hotels.data);
      setRestaurants(restaurants.data);
      setThingsToDo(thingsToDo.data);
    } catch (error) {
      if (error instanceof HTTPError) {
        const data = await error.response.json<IError>();
        toast.error(data.error);
      } else toast.error('Something went wrong');
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

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
          items={hotels}
        />
        <PlaceCarousel title="Stay at Vietnam's top hotels" items={hotels} />
        <PlaceCarousel
          title="Experience at Vietnam's top restaurants"
          items={restaurants}
        />
        <PlaceCarousel
          title='Enjoy the things people love to do'
          items={thingsToDo}
        />
      </div>
      <HeroSection title='Vietnam Travel' image='/home-2.jpeg' ratio={16 / 7} />
      <RecentlyViewedItems className='px-10' />
    </>
  );
}
