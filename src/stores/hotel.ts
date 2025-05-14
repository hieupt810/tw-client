import { HTTPError } from 'ky';
import { create } from 'zustand';

import { HotelService } from '@/services/hotel';
import { IAttraction } from '@/types/IAttraction';
import { IError } from '@/types/IError';
import { IHotel } from '@/types/IHotel';

type State = {
  error: string;
  hotel: IHotel | null;
  hotels: IAttraction[];
  totalPages: number;
  totalHotels: number;
  isLoading: boolean;
};

type Action = {
  resetAction: () => void;
  listHotelAction: (page?: number, size?: number) => Promise<void>;
  detailHotelAction: (id: string) => Promise<void>;
};

export const useHotelStore = create<State & Action>((set) => ({
  error: '',
  hotel: null,
  hotels: [],
  totalPages: 1,
  totalHotels: 1,
  isLoading: true,

  resetAction() {
    set((state) => ({
      ...state,
      error: '',
      hotel: null,
      hotels: [],
      totalPages: 1,
      totalHotels: 1,
      isLoading: true,
    }));
  },

  async listHotelAction(page = 1, size = 10) {
    set((state) => ({ ...state, isLoading: true }));
    try {
      const data = await HotelService.list(page, size);
      set((state) => ({
        ...state,
        hotels: data.data,
        totalPages: data.paging.pageCount,
        totalHotels: data.paging.totalCount,
      }));
    } catch (error) {
      if (error instanceof HTTPError) {
        const data = await error.response.json<IError>();
        set((state) => ({ ...state, error: data.error }));
      } else set((state) => ({ ...state, error: 'Something went wrong' }));
    } finally {
      set((state) => ({ ...state, isLoading: false }));
    }
  },

  async detailHotelAction(id) {
    set((state) => ({ ...state, isLoading: true }));
    try {
      const data = await HotelService.details(id);
      set((state) => ({ ...state, hotel: data }));
    } catch (error) {
      if (error instanceof HTTPError) {
        const data = await error.response.json<IError>();
        set((state) => ({ ...state, error: data.error }));
      } else set((state) => ({ ...state, error: 'Something went wrong' }));
    } finally {
      set((state) => ({ ...state, isLoading: false }));
    }
  },
}));
