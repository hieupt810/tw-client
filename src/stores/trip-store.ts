import { create } from 'zustand';

import { TripService } from '@/services/trip';
import { IAttraction } from '@/types/IAttraction';
import { ITrip } from '@/types/ITrip';

type State = {
  trips: {
    item: ITrip[];
    error: string;
    isLoading: boolean;
  };
  placesInTrip: {
    item: IAttraction[];
    error: string;
    isLoading: boolean;
  };
};

type Action = {
  reset: () => void;
  createTrip: (name: string) => Promise<void>;
  fetchTrips: () => Promise<void>;
  fetchPlacesInTrip: (tripId: string) => Promise<void>;
  setPlacesInTrip: (places: IAttraction[]) => void;
  addPlaceToTrip: (tripId: string, placeId: string) => Promise<void>;
  removePlaceFromTrip: (
    tripId: string,
    placeId: string,
  ) => Promise<{ message: string }>;
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
  placesInTrip: {
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
      const newPlace = await TripService.addPlaceToTrip(tripId, placeId);
      set((state) => ({
        ...state,
        placesInTrip: {
          ...state.placesInTrip,
          item: [...state.placesInTrip.item, newPlace],
        },
      }));
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
  removePlaceFromTrip: async (tripId, placeId) => {
    set((state) => ({
      trips: {
        ...state.trips,
        isLoading: true,
      },
    }));
    try {
      set((state) => ({
        trips: {
          ...state.trips,
          isLoading: true,
        },
        placesInTrip: {
          ...state.placesInTrip,
          item: state.placesInTrip.item.filter(
            (place) => place.element_id !== placeId,
          ),
        },
      }));
      return await TripService.removePlaceFromTrip(tripId, placeId);
    } catch (error) {
      set((state) => ({
        trips: {
          ...state.trips,
          error: 'Failed to remove place from trip',
        },
      }));
      throw error;
    } finally {
      set((state) => ({
        trips: {
          ...state.trips,
          isLoading: false,
        },
      }));
    }
  },
  async fetchPlacesInTrip(tripId) {
    set((state) => ({
      ...state,
      placesInTrip: {
        ...state.placesInTrip,
        isLoading: true,
      },
    }));

    try {
      const data = await TripService.getTripById(tripId);
      set((state) => ({
        ...state,
        placesInTrip: {
          ...state.placesInTrip,
          item: data.places || [],
        },
      }));
    } catch {
      set((state) => ({
        ...state,
        placesInTrip: {
          ...state.placesInTrip,
          error: 'Failed to fetch places in trip',
        },
      }));
    } finally {
      set((state) => ({
        ...state,
        placesInTrip: {
          ...state.placesInTrip,
          isLoading: false,
        },
      }));
    }
  },
  setPlacesInTrip: (places) =>
    set((state) => ({
      placesInTrip: {
        ...state.placesInTrip,
        item: places,
      },
    })),
}));
