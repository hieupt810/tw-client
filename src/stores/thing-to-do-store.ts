import { create } from 'zustand';

import { ThingToDoService } from '@/services/thing-to-do';
import { IAttraction } from '@/types/IAttraction';
import { IThingToDo } from '@/types/IThingToDo';

type State = {
  thingToDo: {
    item: IThingToDo | null;
    error: string;
    isLoading: boolean;
  };
  thingsToDo: {
    items: IAttraction[];
    error: string;
    isLoading: boolean;
  };
};

type Action = {
  reset: () => void;
  fetchThingToDo: (id: string) => Promise<void>;
  fetchThingsToDo: (page: number, size: number) => Promise<void>;
};

const initialState: State = {
  thingToDo: {
    item: null,
    error: '',
    isLoading: true,
  },
  thingsToDo: {
    items: [],
    error: '',
    isLoading: true,
  },
};

export const useThingToDoStore = create<State & Action>()((set) => ({
  ...initialState,
  reset() {
    set(() => ({ ...initialState }));
  },

  async fetchThingToDo(id) {
    set((state) => ({
      thingToDo: { ...state.thingToDo, isLoading: true },
    }));
    try {
      const data = await ThingToDoService.details(id);
      set((state) => ({
        thingToDo: { ...state.thingToDo, item: data },
      }));
    } catch {
      set((state) => ({
        thingToDo: {
          ...state.thingToDo,
          error: 'Failed to fetch thing to do',
        },
      }));
    } finally {
      set((state) => ({
        thingToDo: { ...state.thingToDo, isLoading: false },
      }));
    }
  },

  async fetchThingsToDo(page = 1, size = 10) {
    set((state) => ({
      thingsToDo: { ...state.thingsToDo, isLoading: true },
    }));
    try {
      const data = await ThingToDoService.list(page, size);
      set((state) => ({
        thingsToDo: { ...state.thingsToDo, items: data.data },
      }));
    } catch {
      set((state) => ({
        thingsToDo: {
          ...state.thingsToDo,
          error: 'Failed to fetch things to do',
        },
      }));
    } finally {
      set((state) => ({
        thingsToDo: { ...state.thingsToDo, isLoading: false },
      }));
    }
  },
}));
