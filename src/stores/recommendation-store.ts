import { create } from 'zustand';

import { RecommendationsService } from '@/services/recommendation';
import { IAttraction } from '@/types/IAttraction';
import { IPagingMeta } from '@/types/IPaging';

type State = {
  recommendations: {
    items: IAttraction[];
    error: string;
    isLoading: boolean;
    paging: IPagingMeta;
  };
};

type Action = {
  reset: () => void;
  fetchRecommendations: (page: number, size: number) => Promise<void>;
};

const initialState: State = {
  recommendations: {
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

export const useRecommendationStore = create<State & Action>()((set) => ({
  ...initialState,
  reset() {
    set(() => ({ ...initialState }));
  },

  async fetchRecommendations(page, size) {
    set((state) => ({
      recommendations: { ...state.recommendations, isLoading: true },
    }));
    try {
      const data = await RecommendationsService.list(page, size);
      set((state) => ({
        recommendations: {
          ...state.recommendations,
          items: data.data,
          paging: data.paging,
        },
      }));
    } catch {
      set((state) => ({
        recommendations: {
          ...state.recommendations,
          error: 'Failed to fetch hotels',
        },
      }));
    } finally {
      set((state) => ({
        recommendations: { ...state.recommendations, isLoading: false },
      }));
    }
  },
}));
