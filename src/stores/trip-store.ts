import { create } from 'zustand';

import { TripService } from '@/services/trip';
import { ITrip } from '@/types/ITrip';

type State = {
  trips: {
    item: ITrip[];
    error: string;
    isLoading: boolean;
  };
};

type Action = {
  reset: () => void;
  fetchTrips: () => Promise<void>;
};

const initialState: State = {
  trips: {
    item: [],
    error: '',
    isLoading: true,
  },
};

export const useTripStore = create<State & Action>((set) => ({
  ...initialState,

  reset: () => set(initialState),

  async fetchTrips() {
    set(() => ({ trips: { ...initialState.trips } }));
    try {
      const data = await TripService.getTrip();
      set((state) => ({
        trips: {
          ...state.trips,
          item: data,
        },
      }));
    } catch {
      set((state) => ({
        trips: {
          ...state.trips,
          error: 'Failed to fetch trips',
        },
      }));
    } finally {
      set((state) => ({
        trips: {
          ...state.trips,
          isLoading: false,
        },
      }));
    }
  },
}));
