'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useStore } from 'zustand';

import CardItem from '@/components/card-item';
import { RestaurantFilter } from '@/components/filters/restaurant-filter';
import HeroSection from '@/components/hero-section';
import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { useRestaurantParams } from '@/hooks/use-restaurant-params';
import { useRestaurantStore } from '@/stores/restaurant-store';
import { IPagingMeta } from '@/types/IPaging';
import { IRestaurantFilter } from '@/types/IRestaurant';

const getFilterUrl = (
  page: number,
  size: number,
  filters: IRestaurantFilter,
) => {
  let url = `/restaurant?page=${page}&size=${size}`;
  if (filters.search) url += `&search=${encodeURIComponent(filters.search)}`;
  if (filters.rating) url += `&rating=${encodeURIComponent(filters.rating)}`;
  if (filters.cuisines.length)
    url += `&cuisines=${encodeURIComponent(filters.cuisines.join(','))}`;
  if (filters.mealTypes.length)
    url += `&meal_types=${encodeURIComponent(filters.mealTypes.join(','))}`;
  if (filters.dietaryRestrictions.length)
    url += `&dietary_restrictions=${encodeURIComponent(
      filters.dietaryRestrictions.join(','),
    )}`;
  if (filters.features.length)
    url += `&features=${encodeURIComponent(filters.features.join(','))}`;
  if (filters.dishes.length)
    url += `&dishes=${encodeURIComponent(filters.dishes.join(','))}`;

  return url;
};

export default function RestaurantsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    restaurants,
    reset,
    fetchRestaurants,
    fetchCuisines,
    fetchDietaryRestrictions,
    fetchDishes,
    fetchFeatures,
    fetchMealTypes,
  } = useStore(useRestaurantStore, (state) => state);

  const { params } = useRestaurantParams(searchParams);
  const { page, size, ...paramsWithoutPage } = params;

  useEffect(() => {
    fetchRestaurants(page, size, paramsWithoutPage);
    return () => {
      reset();
    };
  }, [fetchRestaurants, page, size, searchParams, reset]);

  useEffect(() => {
    fetchCuisines();
    fetchDietaryRestrictions();
    fetchDishes();
    fetchFeatures();
    fetchMealTypes();
  }, []);

  const handleUpdateFilters = useCallback(
    (newFilters: IRestaurantFilter & Pick<IPagingMeta, 'page' | 'size'>) => {
      router.push(getFilterUrl(newFilters.page, newFilters.size, newFilters));
    },
    [router],
  );

  const handleNextPage = useCallback(() => {
    const nextPage = params.page + 1;
    router.push(getFilterUrl(nextPage, size, params));
  }, [params.page, router, params.size]);

  const handlePreviousPage = useCallback(() => {
    const previousPage = params.page - 1;
    router.push(getFilterUrl(previousPage, size, params));
  }, [params.page, router, params.size]);

  if (restaurants.isLoading) return <Loading />;

  return (
    <>
      <HeroSection
        image='/restaurant-1.jpeg'
        title='Discover amazing dining options'
        description='Discover the best restaurants, cafes, and bars in your area. Indulge in a variety of cuisines and dining experiences tailored to your taste.'
      />
      <RestaurantFilter
        filters={paramsWithoutPage}
        onUpdateFilters={handleUpdateFilters}
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
            disabled={params.page <= 1}
          >
            <ArrowLeft />
            <span>Previous</span>
          </Button>
          <span className='text-center text-sm font-medium'>{`Page ${params.page} of ${restaurants.paging.pageCount}`}</span>
          <Button
            variant='outline'
            onClick={handleNextPage}
            disabled={params.page >= restaurants.paging.pageCount}
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
