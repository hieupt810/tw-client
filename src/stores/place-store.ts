import { create } from 'zustand';

import { PlaceService } from '@/services/place';
import { IRestaurant } from '@/types/IRestaurant';

type State = {
  items: {
    item: IRestaurant[] | null;
    error: string;
    isLoading: boolean;
  };
};

type Action = {
  reset: () => void;
  fetchSearch: (name: string, type: string) => Promise<void>;
};

const initialState: State = {
  items: {
    item: null,
    error: '',
    isLoading: false,
  },
};

export const usePlaceStore = create<State & Action>()((set) => ({
  ...initialState,
  reset() {
    set(() => ({ ...initialState }));
  },
  async fetchSearch(name, type) {
    set((state) => ({
      items: { ...state.items, isLoading: true },
    }));
    try {
      const temp = await PlaceService.search(name, type);
      console.log('Search results:', temp.data.length);
      set((state) => ({
        items: { ...state.items, item: temp?.data || [], isLoading: false },
      }));
    } catch {
      set((state) => ({
        items: { ...state.items, isLoading: false },
      }));
    }
  },
}));
