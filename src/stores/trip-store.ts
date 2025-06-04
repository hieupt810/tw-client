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
  createTrip: (name: string) => Promise<void>;
  fetchTrips: () => Promise<void>;
  addPlaceToTrip: (tripId: string, placeId: string) => Promise<void>;
  updateTrip: (
    tripId: string,
    payload: Partial<Pick<ITrip, 'name' | 'status'>>,
  ) => Promise<void>;
  deleteTrip: (tripId: string) => Promise<void>;
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

  async createTrip(name: string) {
    set((state) => ({
      trips: {
        ...state.trips,
        isLoading: true,
      },
    }));
    try {
      const data = await TripService.createTrip(name);
      set((state) => ({
        trips: {
          ...state.trips,
          item: [data, ...state.trips.item],
        },
      }));
    } catch {
      set((state) => ({
        trips: {
          ...state.trips,
          error: 'Failed to create trip',
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

  async addPlaceToTrip(tripId, placeId) {
    set((state) => ({
      trips: {
        ...state.trips,
        isLoading: true,
      },
    }));
    try {
      await TripService.addPlaceToTrip(tripId, placeId);
    } catch {
      set((state) => ({
        trips: {
          ...state.trips,
          error: 'Failed to add place to trip',
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
  async updateTrip(tripId, payload) {
    set((state) => ({
      trips: {
        ...state.trips,
        isLoading: true,
      },
    }));
    try {
      const data = await TripService.updateTrip(tripId, payload);
      set((state) => ({
        trips: {
          ...state.trips,
          item: state.trips.item.map((trip) =>
            trip.id === data.id ? data : trip,
          ),
        },
      }));
    } catch {
      set((state) => ({
        trips: {
          ...state.trips,
          error: 'Failed to update trip',
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
  async deleteTrip(tripId) {
    set((state) => ({
      trips: {
        ...state.trips,
        isLoading: true,
      },
    }));
    try {
      await TripService.deleteTrip(tripId);
      set((state) => ({
        trips: {
          ...state.trips,
          item: state.trips.item.filter((trip) => trip.id !== tripId),
        },
      }));
    } catch {
      set((state) => ({
        trips: {
          ...state.trips,
          error: 'Failed to delete trip',
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
