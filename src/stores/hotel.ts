import { HTTPError } from 'ky';
import { create } from 'zustand';

import { IError } from '@/types/IError';
import { IHotel } from '@/types/IHotel';

import { HOTEL_MOCK_DATA } from './mock/hotel-mock-data';

type State = {
  error: string;
  hotel: IHotel | null;
  isLoadingHotel: boolean;
};

type Action = {
  resetAction: () => void;
  getHotelAction: (id: string) => Promise<void>;
};

export const useHotelStore = create<State & Action>((set) => ({
  error: '',
  hotel: null,
  isLoadingHotel: true,

  resetAction: () =>
    set((state) => ({
      ...state,
      error: '',
      hotel: null,
      isLoadingHotel: false,
    })),

  getHotelAction: async (id) => {
    console.log('getHotel', id);
    try {
      set((state) => ({
        ...state,
        isLoadingHotel: true,
      }));

      await new Promise((resolve) => setTimeout(resolve, 1000));
      set((state) => ({ ...state, hotel: HOTEL_MOCK_DATA }));
    } catch (err) {
      if (err instanceof HTTPError) {
        const resp = await err.response.json<IError>();
        set((state) => ({ ...state, error: resp.error }));
        return;
      }
      set((state) => ({ ...state, error: 'Something went wrong' }));
    } finally {
      set((state) => ({ ...state, isLoadingHotel: false }));
    }
  },
}));
