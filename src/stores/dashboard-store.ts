import { create } from 'zustand';

import { DashboardService } from '@/services/dashboard';
import { ISummary, IUserRegister, Place } from '@/types/IDashboard';

type State = {
  summary: {
    error: string;
    isLoading: boolean;
    item: ISummary | null;
  };
  userRegister: {
    error: string;
    isLoading: boolean;
    item: IUserRegister | null;
  };
  topPlaceRanking: {
    error: string;
    isLoading: boolean;
    item: Place[];
    pageCount: number;
    totalCount: number;
  };

  topPlaceIntoTrip: {
    error: string;
    isLoading: boolean;
    item: Place[];
    pageCount: number;
    totalCount: number;
  };
};

type Action = {
  reset: () => void;
  fetchSummary: () => void;
  fetchChartUserRegister: () => void;
  fetchTopPlaceRanking: (
    place_type: string,
    order: string,
    page: number,
    size: number,
  ) => void;
  fetchTopPlaceIntoTrip: (
    place_type: string,
    order: string,
    page: number,
    size: number,
  ) => void;
};

const initialState: State = {
  summary: {
    error: '',
    isLoading: true,
    item: null,
  },
  userRegister: {
    error: '',
    isLoading: true,
    item: null,
  },
  topPlaceIntoTrip: {
    error: '',
    isLoading: true,
    item: [],
    pageCount: 0,
    totalCount: 0,
  },
  topPlaceRanking: {
    error: '',
    isLoading: true,
    item: [],
    pageCount: 0,
    totalCount: 0,
  },
};

export const useDashboardStore = create<State & Action>((set) => ({
  ...initialState,

  reset() {
    set(initialState);
  },

  async fetchSummary() {
    // set(initialState);
    try {
      set((state) => ({
        summary: { ...state.summary, isLoading: true },
      }));
      const data = await DashboardService.summary();
      set((state) => ({
        summary: { ...state.summary, item: data, isLoading: false },
      }));
    } catch {
      set((state) => ({
        summary: {
          ...state.summary,
          error: 'Failed to fetch summary dashboard',
          isLoading: false,
        },
      }));
    }
  },

  async fetchChartUserRegister() {
    // set(initialState);
    try {
      set((state) => ({
        userRegister: { ...state.userRegister, isLoading: true },
      }));
      const data = await DashboardService.userRegister();
      set((state) => ({
        userRegister: { ...state.userRegister, item: data, isLoading: false },
      }));
    } catch {
      set((state) => ({
        userRegister: {
          ...state.userRegister,
          error: 'Failed to fetch user register dashboard',
          isLoading: false,
        },
      }));
    }
  },

  async fetchTopPlaceRanking(
    place_type: string,
    order: string,
    page: number,
    size: number,
  ) {
    // set(initialState);
    try {
      set((state) => ({
        topPlaceRanking: { ...state.topPlaceRanking, isLoading: true },
      }));
      const data = await DashboardService.topPlaceRanking(
        place_type,
        order,
        page,
        size,
      );
      set((state) => ({
        topPlaceRanking: {
          ...state.topPlaceRanking,
          item: data.data,
          isLoading: false,
          pageCount: data.paging.pageCount,
          totalCount: data.paging.totalCount,
        },
      }));
    } catch {
      set((state) => ({
        topPlaceRanking: {
          ...state.topPlaceRanking,
          error: 'Failed to fetch user register dashboard',
          isLoading: false,
        },
      }));
    }
  },

  async fetchTopPlaceIntoTrip(
    place_type: string,
    order: string,
    page: number,
    size: number,
  ) {
    // set(initialState);
    try {
      set((state) => ({
        topPlaceIntoTrip: { ...state.topPlaceIntoTrip, isLoading: true },
      }));
      const data = await DashboardService.topPlaceIntoTrip(
        place_type,
        order,
        page,
        size,
      );
      set((state) => ({
        topPlaceIntoTrip: {
          ...state.topPlaceIntoTrip,
          item: data.data,
          isLoading: false,
          pageCount: data.paging.pageCount,
          totalCount: data.paging.totalCount,
        },
      }));
    } catch {
      set((state) => ({
        topPlaceIntoTrip: {
          ...state.topPlaceIntoTrip,
          error: 'Failed to fetch user register dashboard',
          isLoading: false,
        },
      }));
    }
  },
}));
