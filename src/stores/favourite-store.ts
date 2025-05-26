import { create } from 'zustand';

import { FavouriteService } from '@/services/favourite';
import { IAttraction } from '@/types/IAttraction';

type State = {
  error: string;
  isLoading: boolean;
  favourites: IAttraction[];
};

type Action = {
  reset: () => void;
  list: () => Promise<void>;
  add: (id: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
};

const initialState: State = {
  error: '',
  isLoading: true,
  favourites: [],
};

export const useFavouriteStore = create<State & Action>((set) => ({
  ...initialState,

  reset() {
    set(initialState);
  },

  async list() {
    set(initialState);
    try {
      const data = await FavouriteService.list();
      set({ favourites: data, isLoading: false });
    } catch {
      set({ error: 'Failed to fetch favourites', isLoading: false });
    }
  },

  async add(id: string) {
    set({ error: '', isLoading: true });
    try {
      await FavouriteService.add(id);
    } catch {
      set({ error: 'Failed to add favourite', isLoading: false });
    }
  },

  async remove(id: string) {
    set({ isLoading: true });
    try {
      await FavouriteService.remove(id);
    } catch {
      set({ error: 'Failed to remove favourite', isLoading: false });
    }
  },
}));
