import { create } from 'zustand';

import { ReviewService } from '@/services/review';
import { IReview } from '@/types/IReview';

type State = {
  reviews: {
    items: IReview[];
    error: string;
    isLoading: boolean;
  };
};

type Action = {
  fetchReviews: (id: string) => Promise<void>;
};

const initialState: State = {
  reviews: {
    items: [],
    error: '',
    isLoading: false,
  },
};

export const useReviewStore = create<State & Action>()((set) => ({
  ...initialState,
  async fetchReviews(id) {
    set((state) => ({
      ...state,
      reviews: { ...state.reviews, items: [], error: '', isLoading: true },
    }));
    try {
      const data = await ReviewService.list(id);
      set((state) => ({
        reviews: {
          ...state.reviews,
          items: data,
        },
      }));
    } catch {
      set((state) => ({
        reviews: {
          ...state.reviews,
          error: 'Failed to fetch reviews',
        },
      }));
    } finally {
      set((state) => ({
        reviews: { ...state.reviews, isLoading: false },
      }));
    }
  },
}));
