import { HTTPError } from 'ky';
import { create } from 'zustand';

import { IError } from '@/types/IError';

type State = {
  error: string;
  restaurant: null;
  isLoadingRestaurant: boolean;
};

type Action = {
  resetAction: () => void;
  getRestaurantAction: (id: string) => Promise<void>;
};

export const useRestaurantStore = create<State & Action>((set) => ({
  error: '',
  restaurant: null,
  isLoadingRestaurant: true,

  resetAction() {
    set((state) => ({
      ...state,
      error: '',
      restaurant: null,
      isLoadingRestaurant: true,
    }));
  },

  async getRestaurantAction(id) {
    console.log('getRestaurant', id);
    try {
      set((state) => ({ ...state, isLoadingRestaurant: true }));

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      if (err instanceof HTTPError) {
        const resp = await err.response.json<IError>();
        set((state) => ({ ...state, error: resp.error }));
        return;
      }
      set((state) => ({ ...state, error: 'Something went wrong' }));
    } finally {
      set((state) => ({ ...state, isLoadingRestaurant: false }));
    }
  },
}));
