import { create } from 'zustand';

import { PlaceService } from '@/services/place';
import { IHotel } from '@/types/IHotel';
import { IRestaurant } from '@/types/IRestaurant';

type State = {
  items: Array<IRestaurant | IHotel>;
  error: string;
  isLoading: boolean;
};

type Action = {
  searchPlaces: (
    name: string,
    type?: 'restaurant' | 'hotel' | 'thingtodo',
    limit?: number,
  ) => Promise<void>;
};

const initialState: State = {
  items: [],
  error: '',
  isLoading: true,
};

export const usePlaceStore = create<State & Action>((set) => ({
  ...initialState,

  async searchPlaces(
    name: string,
    type?: 'restaurant' | 'hotel' | 'thingtodo',
    limit?: number,
  ) {
    set((state) => ({
      ...state,
      isLoading: true,
      error: '',
      items: [],
    }));
    try {
      const data = await PlaceService.searchPlaces(name, type, limit);
      set((state) => ({
        ...state,
        items: data || [],
      }));
    } catch {
      set((state) => ({
        ...state,
        error: 'Failed to fetch places',
      }));
    } finally {
      set((state) => ({
        ...state,
        isLoading: false,
      }));
    }
  },
}));
