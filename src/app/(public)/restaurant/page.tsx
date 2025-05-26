'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useStore } from 'zustand';

import CardItem from '@/components/card-item';
import HeroSection from '@/components/hero-section';
import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { useRestaurantStore } from '@/stores/restaurant-store';

export default function RestaurantsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const size = parseInt(searchParams.get('size') || '8');

  const { restaurants, reset, fetchRestaurants } = useStore(
    useRestaurantStore,
    (state) => state,
  );

  const handleNextPage = useCallback(() => {
    const nextPage = page + 1;
    router.push(`/restaurant?page=${nextPage}&size=${size}`);
  }, [page, router, size]);

  const handlePreviousPage = useCallback(() => {
    const previousPage = page - 1;
    router.push(`/restaurant?page=${previousPage}&size=${size}`);
  }, [page, router, size]);

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
          <CardItem key={restaurant.element_id} item={restaurant} />
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
          <span className='text-center text-sm font-medium'>{`Page ${page} of ${restaurants.paging.pageCount}`}</span>
          <Button
            variant='outline'
            onClick={handleNextPage}
            disabled={page >= restaurants.paging.pageCount}
          >
            <span>Next</span>
            <ArrowRight />
          </Button>
        </div>
      </div>
      <HeroSection
        image='/restaurant-2.jpeg'
        title='Backed by travelers'
        description="See what people loved (or didn't love) with real reviews on almost everything."
      />
    </>
  );
}
