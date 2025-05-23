'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useStore } from 'zustand';

import CardItem from '@/components/card-item';
import HeroSection from '@/components/hero-section';
import Loading from '@/components/loading';
import { useRestaurantStore } from '@/stores/restaurant-store';

export default function RestaurantsPage() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const size = parseInt(searchParams.get('size') || '12');

  const { restaurants, reset, fetchRestaurants } = useStore(
    useRestaurantStore,
    (state) => state,
  );

  useEffect(() => {
    fetchRestaurants(page, size);
    return () => {
      reset();
    };
  }, [fetchRestaurants, page, size, reset]);

  if (restaurants.items.length === 0) return <Loading />;

  return (
    <>
      <HeroSection
        image='/restaurant-1.jpeg'
        title='Discover amazing dining options'
        description='Discover the best restaurants, cafes, and bars in your area. Indulge in a variety of cuisines and dining experiences tailored to your taste.'
      />
      <div className='my-10 grid grid-cols-2 gap-6 md:grid-cols-4'>
        {restaurants.items.map((restaurant) => (
          <CardItem key={restaurant.elementId} item={restaurant} />
        ))}
      </div>
      <HeroSection
        image='/restaurant-2.jpeg'
        title='Backed by travelers'
        description="See what people loved (or didn't love) with real reviews on almost everything."
      />
    </>
  );
}
