import { create } from 'zustand';

import { ReviewService } from '@/services/review';
import { IPaging, defaultPaging } from '@/types/IPaging';
import { IReview, IReviewQuery } from '@/types/IReview';

type State = {
  reviews: {
    items: IPaging<IReview>;
    error: string;
    isLoading: boolean;
  };
  myReview: IReview | null;
};

type Action = {
  fetchMyReview: (placeId: string) => Promise<void>;
  fetchReviews: (placeId: string, query: IReviewQuery) => Promise<void>;
  createReview: (
    placeId: string,
    review: Pick<IReview, 'rating' | 'review'>,
  ) => Promise<void>;
  updateReview: (
    placeId: string,
    review: Pick<IReview, 'rating' | 'review'>,
  ) => Promise<void>;
  deleteReview: (placeId: string) => Promise<void>;
};

const initialState: State = {
  reviews: {
    items: {
      data: [],
      paging: defaultPaging,
    },
    error: '',
    isLoading: false,
  },
  myReview: null,
};

export const useReviewStore = create<State & Action>()((set) => ({
  ...initialState,
  async fetchMyReview(placeId) {
    set((state) => ({
      ...state,
      myReview: null,
    }));
    try {
      const review = await ReviewService.me(placeId);
      set((state) => ({
        ...state,
        myReview: review,
      }));
    } catch {
      set((state) => ({
        ...state,
        reviews: {
          ...state.reviews,
          isLoading: false,
        },
      }));
    }
  },
  async fetchReviews(placeId, query) {
    set((state) => ({
      ...state,
      reviews: {
        error: '',
        isLoading: true,
        items: {
          data: [],
          paging: defaultPaging,
        },
      },
    }));
    try {
      const { data, paging } = await ReviewService.list(placeId, query);

      set((state) => ({
        ...state,
        reviews: {
          ...state.reviews,
          items: {
            data: state.myReview
              ? data.filter((r) => r.id !== state.myReview?.id)
              : data,
            paging,
          },
        },
      }));
    } catch {
      set((state) => ({
        ...state,
        reviews: {
          ...state.reviews,
          error: 'Failed to fetch reviews',
        },
      }));
    } finally {
      set((state) => ({
        ...state,
        reviews: {
          ...state.reviews,
          isLoading: false,
        },
      }));
    }
  },

  async createReview(id, review) {
    set((state) => ({
      ...state,
      reviews: { ...state.reviews, isLoading: true, error: '' },
      myReview: null, // Reset myReview before creating a new one
    }));
    try {
      const newReview = await ReviewService.create(id, review);
      set((state) => ({
        ...state,

        myReview: newReview, // Update myReview with the newly created review
      }));
    } catch {
      set((state) => ({
        ...state,
        reviews: {
          ...state.reviews,
          error: 'Failed to create review',
          isLoading: false,
        },
      }));
    } finally {
      set((state) => ({
        ...state,
        reviews: {
          ...state.reviews,
          isLoading: false,
        },
      }));
    }
  },
  deleteReview: async (placeId) => {
    set((state) => ({
      ...state,
      reviews: { ...state.reviews, isLoading: true, error: '' },
    }));
    try {
      await ReviewService.delete(placeId);
      set((state) => ({
        reviews: {
          ...state.reviews,
          items: {
            ...state.reviews.items,
            data: state.reviews.items.data.filter(
              (r) => r.id !== state.myReview?.id,
            ),
          },
        },
        myReview: null, // Reset myReview after deletion
      }));
    } catch {
      set((state) => ({
        reviews: {
          ...state.reviews,
          isLoading: false,
          error: 'Failed to delete review',
        },
      }));
    } finally {
      set((state) => ({
        reviews: { ...state.reviews, isLoading: false },
      }));
    }
  },
  updateReview: async (placeId, review) => {
    set((state) => ({
      ...state,
      reviews: { ...state.reviews, isLoading: true, error: '' },
    }));
    try {
      const updatedReview = await ReviewService.update(placeId, review);
      set((state) => ({
        ...state,
        reviews: {
          ...state.reviews,
          items: {
            ...state.reviews.items,
          },
        },
        myReview: updatedReview, // Update myReview with the updated review
      }));
    } catch {
      set((state) => ({
        ...state,
        reviews: {
          ...state.reviews,
          error: 'Failed to create review',
        },
      }));
    } finally {
      set((state) => ({
        ...state,
        reviews: {
          ...state.reviews,
          isLoading: false,
        },
      }));
    }
  },
}));
