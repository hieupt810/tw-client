import { ReadonlyURLSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { IPagingMeta } from '@/types/IPaging';
import { IRestaurantFilter } from '@/types/IRestaurant';

export const useRestaurantParams = (searchParams: ReadonlyURLSearchParams) => {
  return useMemo(() => {
    const params: IRestaurantFilter & Pick<IPagingMeta, 'page' | 'size'> = {
      page: 1,
      size: 8,
      search: null,
      rating: null,
      cuisines: [],
      mealTypes: [],
      dietaryRestrictions: [],
      features: [],
      dishes: [],
    };

    const raw = {
      page: searchParams.get('page'),
      size: searchParams.get('size'),
      search: searchParams.get('search'),
      rating: searchParams.get('rating'),
      cuisines: searchParams.get('cuisines'),
      mealTypes: searchParams.get('meal_types'),
      dietaryRestrictions: searchParams.get('dietary_restrictions'),
      features: searchParams.get('features'),
      dishes: searchParams.get('dishes'),
    };

    params.page = parseInt(raw.page || '1');
    params.size = parseInt(raw.size || '8');
    params.search = raw.search;
    params.rating = raw.rating;
    params.cuisines = raw.cuisines ? raw.cuisines.split(',') : [];
    params.mealTypes = raw.mealTypes ? raw.mealTypes.split(',') : [];
    params.dietaryRestrictions = raw.dietaryRestrictions
      ? raw.dietaryRestrictions.split(',')
      : [];
    params.features = raw.features ? raw.features.split(',') : [];
    params.dishes = raw.dishes ? raw.dishes.split(',') : [];

    return { params, raw };
  }, [searchParams]);
};
