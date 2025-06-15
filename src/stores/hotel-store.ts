import { create } from 'zustand';

import { HotelService } from '@/services/hotel';
import { IAttraction } from '@/types/IAttraction';
import { IFilterStateHotel, IHotel } from '@/types/IHotel';
import { IPagingMeta } from '@/types/IPaging';

type State = {
  hotel: {
    item: IHotel | null;
    error: string;
    isLoading: boolean;
  };
  hotels: {
    items: IAttraction[];
    features: string[];
    error: string;
    isLoading: boolean;
    paging: IPagingMeta;
  };
};

type Action = {
  reset: () => void;
  fetchHotel: (id: string) => Promise<void>;
  fetchHotels: (
    page: number,
    size: number,
    search?: string,
    filters?: IFilterStateHotel,
  ) => Promise<void>;
  fetchSearchHotels: (name: string) => Promise<void>;
  fetchFeatureHotels: () => Promise<void>;
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
    features:
      typeof sessionStorage !== 'undefined'
        ? JSON.parse(sessionStorage.getItem('featureHotels') || '[]')
        : [],
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

  async fetchHotels(
    page: number,
    size: number,
    search: string = '',
    filters?: IFilterStateHotel,
  ) {
    set((state) => ({
      hotels: { ...state.hotels, isLoading: true },
    }));
    try {
      const hotelClass = filters?.starRating;
      const rating = filters?.minRating;
      const price = filters?.price;
      const features = filters?.amenities?.join(',') || '';

      const data = await HotelService.list(
        page,
        size,
        search,
        hotelClass,
        rating,
        price,
        features,
      );
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

  fetchFeatureHotels: async () => {
    try {
      const listFeature = await HotelService.feature();
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(
          'featureHotels',
          JSON.stringify(listFeature.features || []),
        );
      }
      set((state) => ({
        ...state,
        hotels: {
          ...state.hotels,
          features: listFeature.features || [],
        },
      }));
    } catch {
      set((state) => ({
        ...state,
        hotels: {
          ...state.hotels,
          error: 'Failed to fetch feature hotels',
        },
      }));
    }
  },
}));
