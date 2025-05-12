import { HTTPError } from 'ky';
import { create } from 'zustand';

import { HotelService } from '@/services/hotel';
import { IError } from '@/types/IError';
import { IHotel } from '@/types/IHotel';

type State = {
  error: string;
  hotel: IHotel | null;
  hotels: IHotel[];
  isLoadingHotel: boolean;
};

type Action = {
  resetAction: () => void;
  getHotelAction: (id: string) => Promise<void>;
  getHotelsAction: () => Promise<void>;
};

export const useHotelStore = create<State & Action>((set) => ({
  error: '',
  hotel: null,
  hotels: [],
  isLoadingHotel: true,

  resetAction() {
    set((state) => ({
      ...state,
      error: '',
      hotel: null,
      isLoadingHotel: true,
    }));
  },

  async getHotelAction(id) {
    try {
      set((state) => ({ ...state, isLoadingHotel: true }));
      const resp = await HotelService.getById(id);
      set((state) => ({ ...state, hotel: resp }));
    } catch (err) {
      console.log(err);
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

  async getHotelsAction() {
    try {
      set((state) => ({ ...state, isLoadingHotel: true }));

      await new Promise((resolve) => setTimeout(resolve, 1000));
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
