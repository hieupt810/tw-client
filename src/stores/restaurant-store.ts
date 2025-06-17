import { create } from 'zustand';

import { RestaurantService } from '@/services/restaurant';
import { IAttraction } from '@/types/IAttraction';
import { IPagingMeta } from '@/types/IPaging';
import { IRestaurant, IRestaurantFilter } from '@/types/IRestaurant';

type State = {
  restaurant: {
    item: IRestaurant | null;
    error: string;
    isLoading: boolean;
  };
  restaurants: {
    items: IAttraction[];
    error: string;
    isLoading: boolean;
    paging: IPagingMeta;
    dishes?: string[];
    cuisines?: string[];
    mealTypes?: string[];
    features?: string[];
    dietaryRestrictions?: string[];
  };
};

type Action = {
  reset: () => void;
  fetchRestaurant: (id: string) => Promise<void>;
  fetchRestaurants: (
    page: number,
    size: number,
    filters?: IRestaurantFilter,
  ) => Promise<void>;
  fetchCuisines: () => Promise<void>;
  fetchMealTypes: () => Promise<void>;
  fetchFeatures: () => Promise<void>;
  fetchDietaryRestrictions: () => Promise<void>;
  fetchDishes: () => Promise<void>;
};

const RESTAURANT_CUISINES_KEY = 'restaurantCuisines';
const RESTAURANT_MEAL_TYPES_KEY = 'restaurantMealTypes';
const RESTAURANT_FEATURES_KEY = 'restaurantFeatures';
const RESTAURANT_DIETARY_RESTRICTIONS_KEY = 'restaurantDietaryRestrictions';
const RESTAURANT_DISHES_KEY = 'restaurantDishes';

const initialState: State = {
  restaurant: {
    item: null,
    error: '',
    isLoading: true,
  },
  restaurants: {
    items: [],
    error: '',
    isLoading: true,
    paging: {
      offset: 0,
      page: 1,
      pageCount: 0,
      size: 10,
      totalCount: 0,
    },
    dishes:
      typeof sessionStorage !== 'undefined'
        ? JSON.parse(sessionStorage.getItem(RESTAURANT_DISHES_KEY) || '[]')
        : [],
    cuisines:
      typeof sessionStorage !== 'undefined'
        ? JSON.parse(sessionStorage.getItem(RESTAURANT_CUISINES_KEY) || '[]')
        : [],
    mealTypes:
      typeof sessionStorage !== 'undefined'
        ? JSON.parse(sessionStorage.getItem(RESTAURANT_MEAL_TYPES_KEY) || '[]')
        : [],
    features:
      typeof sessionStorage !== 'undefined'
        ? JSON.parse(sessionStorage.getItem(RESTAURANT_FEATURES_KEY) || '[]')
        : [],
    dietaryRestrictions:
      typeof sessionStorage !== 'undefined'
        ? JSON.parse(
            sessionStorage.getItem(RESTAURANT_DIETARY_RESTRICTIONS_KEY) || '[]',
          )
        : [],
  },
};

export const useRestaurantStore = create<State & Action>()((set) => ({
  ...initialState,
  reset() {
    set(() => ({ ...initialState }));
  },

  async fetchRestaurant(id) {
    set((state) => ({
      restaurant: { ...state.restaurant, isLoading: true },
    }));
    try {
      const data = await RestaurantService.details(id);
      set((state) => ({
        restaurant: { ...state.restaurant, item: data },
      }));
    } catch {
      set((state) => ({
        restaurant: {
          ...state.restaurant,
          error: 'Failed to fetch restaurant',
        },
      }));
    } finally {
      set((state) => ({
        restaurant: { ...state.restaurant, isLoading: false },
      }));
    }
  },

  async fetchRestaurants(page, size, filters) {
    set((state) => ({
      restaurants: { ...state.restaurants, isLoading: true },
    }));
    try {
      const validFilters: Record<string, string> = {};
      if (filters?.search) validFilters.search = filters.search;
      if (filters?.rating) validFilters.rating = filters.rating;
      if (filters?.cuisines?.length)
        validFilters.cuisines = filters.cuisines.join(',');
      if (filters?.mealTypes?.length)
        validFilters.meal_types = filters.mealTypes.join(',');
      if (filters?.dietaryRestrictions?.length)
        validFilters.dietary_restrictions =
          filters.dietaryRestrictions.join(',');
      if (filters?.features?.length)
        validFilters.features = filters.features.join(',');
      if (filters?.dishes?.length)
        validFilters.dishes = filters.dishes.join(',');

      const data = await RestaurantService.list(page, size, validFilters);
      set((state) => ({
        restaurants: {
          ...state.restaurants,
          items: data.data,
          paging: data.paging,
        },
      }));
    } catch {
      set((state) => ({
        restaurants: {
          ...state.restaurants,
          error: 'Failed to fetch restaurants',
        },
      }));
    } finally {
      set((state) => ({
        restaurants: { ...state.restaurants, isLoading: false },
      }));
    }
  },
  async fetchCuisines() {
    try {
      const data = await RestaurantService.cuisines();
      const cuisines = data.cuisines || [];

      if (typeof sessionStorage !== 'undefined')
        sessionStorage.setItem(
          RESTAURANT_CUISINES_KEY,
          JSON.stringify(cuisines),
        );

      set((state) => ({
        ...state,
        restaurants: { ...state.restaurants, cuisines: cuisines },
      }));
    } catch {
      set((state) => ({
        ...state,
        restaurants: {
          ...state.restaurants,
          error: 'Failed to fetch cuisines',
        },
      }));
    }
  },
  async fetchMealTypes() {
    try {
      const data = await RestaurantService.mealTypes();
      const mealTypes = data.meal_types || [];

      if (typeof sessionStorage !== 'undefined')
        sessionStorage.setItem(
          RESTAURANT_MEAL_TYPES_KEY,
          JSON.stringify(mealTypes),
        );

      set((state) => ({
        ...state,
        restaurants: { ...state.restaurants, mealTypes: mealTypes },
      }));
    } catch {
      set((state) => ({
        ...state,
        restaurants: {
          ...state.restaurants,
          error: 'Failed to fetch meal types',
        },
      }));
    }
  },
  async fetchFeatures() {
    try {
      const data = await RestaurantService.features();
      const features = data.features || [];

      if (typeof sessionStorage !== 'undefined')
        sessionStorage.setItem(
          RESTAURANT_FEATURES_KEY,
          JSON.stringify(features),
        );

      set((state) => ({
        ...state,
        restaurants: { ...state.restaurants, features: features },
      }));
    } catch {
      set((state) => ({
        ...state,
        restaurants: {
          ...state.restaurants,
          error: 'Failed to fetch features',
        },
      }));
    }
  },
  async fetchDietaryRestrictions() {
    try {
      const data = await RestaurantService.dietaryRestrictions();
      const dietaryRestrictions = data.dietary_restrictions || [];

      if (typeof sessionStorage !== 'undefined')
        sessionStorage.setItem(
          RESTAURANT_DIETARY_RESTRICTIONS_KEY,
          JSON.stringify(dietaryRestrictions),
        );

      set((state) => ({
        ...state,
        restaurants: {
          ...state.restaurants,
          dietaryRestrictions: dietaryRestrictions,
        },
      }));
    } catch {
      set((state) => ({
        ...state,
        restaurants: {
          ...state.restaurants,
          error: 'Failed to fetch dietary restrictions',
        },
      }));
    }
  },
  async fetchDishes() {
    try {
      const data = await RestaurantService.dishes();
      const dishes = data.dishes || [];

      if (typeof sessionStorage !== 'undefined')
        sessionStorage.setItem(RESTAURANT_DISHES_KEY, JSON.stringify(dishes));

      set((state) => ({
        ...state,
        restaurants: { ...state.restaurants, dishes: dishes },
      }));
    } catch {
      set((state) => ({
        ...state,
        restaurants: {
          ...state.restaurants,
          error: 'Failed to fetch dishes',
        },
      }));
    }
  },
}));
