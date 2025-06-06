import { create } from 'zustand';

import { RestaurantService } from '@/services/restaurant';
import { IAttraction } from '@/types/IAttraction';
import { IPagingMeta } from '@/types/IPaging';
import { IRestaurant } from '@/types/IRestaurant';

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
  };
};

type Action = {
  reset: () => void;
  fetchRestaurant: (id: string) => Promise<void>;
  fetchRestaurants: (
    page: number,
    size: number,
    search?: string,
  ) => Promise<void>;
};

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

  async fetchRestaurants(page, size, search) {
    set((state) => ({
      restaurants: { ...state.restaurants, isLoading: true },
    }));
    try {
      const data = await RestaurantService.list(page, size, search || '');
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
}));
