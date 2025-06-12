import { HTTPError } from 'ky';
import { create } from 'zustand';

import { TripService } from '@/services/trip';
import { IAttraction } from '@/types/IAttraction';
import { IError } from '@/types/IError';
import { ITrip } from '@/types/ITrip';
import { ITripDetails } from '@/types/ITripDetails';

type State = {
  trips: {
    item: ITrip[];
    error: string;
    isLoading: boolean;
  };

  placesInTrip: {
    item: IAttraction[];
    oldItem: IAttraction[];
    error: string;
    isLoading: boolean;
  } & Pick<ITripDetails, 'trip'>;
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
  optimizeTrip: (tripId: string) => Promise<void>;
  reorderPlaces: (tripId: string, places: string[]) => Promise<void>;
  compareChangePlacesInTrip: () => boolean;
};

const initialState: State = {
  trips: {
    item: [],
    error: '',
    isLoading: true,
  },
  placesInTrip: {
    item: [],
    trip: {
      created_at: '',
      id: '',
      isOptimized: false,
      name: '',
      total_places: 0,
      updated_at: '',
      user_id: '',
      status: false,
      statusText: '',
    },
    oldItem: [],
    error: '',
    isLoading: true,
  },
};

export const useTripStore = create<State & Action>((set, get) => ({
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
      set((state) => {
        const updatedTrip = [...state.placesInTrip.item, newPlace];
        return {
          ...state,
          trips: {
            ...state.trips,
            item: state.trips.item.map((trip) =>
              trip.id === tripId
                ? {
                    ...trip,
                    is_optimized: false,
                  }
                : trip,
            ),
            isLoading: false,
          },
          placesInTrip: {
            ...state.placesInTrip,
            trip: {
              ...state.placesInTrip.trip,
              total_places: updatedTrip.length,
              isOptimized: false,
            },
            item: updatedTrip,
            oldItem: updatedTrip,
          },
        };
      });
    } catch (error: unknown) {
      const err = (await (error as HTTPError).response.json()) as IError;
      const errorMessage = err?.error || 'Failed to add place to trip';
      set((state) => ({
        trips: {
          ...state.trips,
          error: errorMessage,
        },
      }));

      throw errorMessage;
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
            trip.id === data.id ? { ...trip, ...data } : trip,
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
      set((state) => {
        const updatedTrip = state.placesInTrip.item.filter(
          (place) => place.element_id !== placeId,
        );
        return {
          trips: {
            ...state.trips,
            item: state.trips.item.map((trip) =>
              trip.id === tripId
                ? {
                    ...trip,
                    is_optimized: false,
                  }
                : trip,
            ),
            isLoading: true,
          },
          placesInTrip: {
            ...state.placesInTrip,
            trip: {
              ...state.placesInTrip.trip,
              total_places: updatedTrip.length,
              isOptimized: false,
            },
            item: updatedTrip,
            oldItem: updatedTrip,
            isOptimized: false,
          },
        };
      });
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
      console.log(data.trip);
      set((state) => ({
        ...state,
        placesInTrip: {
          ...state.placesInTrip,
          item: data.places || [],
          oldItem: data.places || [],
          trip: data.trip || {},
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

  optimizeTrip: async (tripId) => {
    set((state) => ({
      ...state,
      placesInTrip: {
        ...state.placesInTrip,
        isLoading: true,
      },
    }));
    try {
      const data = await TripService.optimizeTrip(tripId);
      set((state) => ({
        ...state,
        trips: {
          ...state.trips,
          item: state.trips.item.map((trip) =>
            trip.id === tripId ? { ...trip, is_optimized: true } : trip,
          ),
        },
        placesInTrip: {
          ...state.placesInTrip,
          trip: {
            ...state.placesInTrip.trip,
            isOptimized: true,
          },
          item: data.places || [],
          oldItem: data.places || [],
        },
      }));
    } catch {
      set((state) => ({
        ...state,
        placesInTrip: {
          ...state.placesInTrip,
          error: 'Failed to optimize trip',
        },
      }));
      throw new Error('Failed to optimize trip');
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
  reorderPlaces: async (tripId, places) => {
    set((state) => ({
      ...state,
      placesInTrip: {
        ...state.placesInTrip,
        isLoading: true,
        trip: {
          ...state.placesInTrip.trip,
          isOptimized: false,
        },
      },
    }));
    try {
      const data = await TripService.reorder(tripId, places);
      set((state) => ({
        ...state,
        trips: {
          ...state.trips,
          item: state.trips.item.map((trip) =>
            trip.id === tripId ? { ...trip, is_optimized: false } : trip,
          ),
        },
        placesInTrip: {
          ...state.placesInTrip,
          item: data || [],
          oldItem: data || [],
          isOptimized: false,
        },
      }));
    } catch {
      set((state) => ({
        ...state,
        placesInTrip: {
          ...state.placesInTrip,
          error: 'Failed to reorder places',
        },
      }));
      throw new Error('Failed to reorder places');
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
  compareChangePlacesInTrip: () => {
    // compare change and order of places in trip
    const { placesInTrip } = get();
    for (let i = 0; i < placesInTrip.item.length; i++) {
      if (
        placesInTrip.item[i].element_id !== placesInTrip.oldItem[i].element_id
      ) {
        return true;
      }
    }
    return false;
  },
}));
