import { create } from 'zustand';

import { HotelService } from '@/services/hotel';
import { IAttraction } from '@/types/IAttraction';
import { IHotel } from '@/types/IHotel';
import { IPagingMeta } from '@/types/IPaging';

type State = {
  hotel: {
    item: IHotel | null;
    error: string;
    isLoading: boolean;
  };
  hotels: {
    items: IAttraction[];
    error: string;
    isLoading: boolean;
    paging: IPagingMeta;
  };
};

type Action = {
  reset: () => void;
  fetchHotel: (id: string) => Promise<void>;
  fetchHotels: (page: number, size: number) => Promise<void>;
  fetchSearchHotels: (name: string) => Promise<void>;
};

const initialState: State = {
  hotel: {
    item: null,
    error: '',
    isLoading: true,
  },
  hotels: {
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

export const useHotelStore = create<State & Action>()((set) => ({
  ...initialState,
  reset() {
    set(() => ({ ...initialState }));
  },

  async fetchHotel(id) {
    set((state) => ({
      hotel: { ...state.hotel, isLoading: true },
    }));
    try {
      const data = await HotelService.details(id);
      set((state) => ({
        hotel: { ...state.hotel, item: data },
      }));
    } catch {
      set((state) => ({
        hotel: {
          ...state.hotel,
          error: 'Failed to fetch hotel',
        },
      }));
    } finally {
      set((state) => ({
        hotel: { ...state.hotel, isLoading: false },
      }));
    }
  },

  async fetchHotels(page, size) {
    set((state) => ({
      hotels: { ...state.hotels, isLoading: true },
    }));
    try {
      const data = await HotelService.list(page, size);
      set((state) => ({
        hotels: { ...state.hotels, items: data.data, paging: data.paging },
      }));
    } catch {
      set((state) => ({
        hotels: {
          ...state.hotels,
          error: 'Failed to fetch hotels',
        },
      }));
    } finally {
      set((state) => ({
        hotels: { ...state.hotels, isLoading: false },
      }));
    }
  },

  async fetchSearchHotels(name) {
    set((state) => ({
      hotels: { ...state.hotels, isLoading: true },
    }));
    try {
      const data = await HotelService.search(name);
      set((state) => ({
        hotels: { ...state.hotels, items: data.data, paging: data.paging },
      }));
    } catch {
      set((state) => ({
        hotels: {
          ...state.hotels,
          error: 'Failed to search hotels',
        },
      }));
    } finally {
      set((state) => ({
        hotels: { ...state.hotels, isLoading: false },
      }));
    }
  },
}));
