import { create } from 'zustand';

import { ThingToDoService } from '@/services/thing-to-do';
import { IAttraction } from '@/types/IAttraction';
import { IPagingMeta } from '@/types/IPaging';
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
    paging: IPagingMeta;
  };
};

type Action = {
  reset: () => void;
  fetchThingToDo: (id: string) => Promise<void>;
  fetchThingsToDo: (
    page: number,
    size: number,
    search?: string,
  ) => Promise<void>;
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
    paging: {
      offset: 0,
      page: 1,
      pageCount: 0,
      size: 10,
      totalCount: 0,
    },
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
          error: 'Failed to fetch attraction',
        },
      }));
    } finally {
      set((state) => ({
        thingToDo: { ...state.thingToDo, isLoading: false },
      }));
    }
  },

  async fetchThingsToDo(page = 1, size = 10, search: string = '') {
    set((state) => ({
      thingsToDo: { ...state.thingsToDo, isLoading: true },
    }));
    try {
      const data = await ThingToDoService.list(page, size, search);
      set((state) => ({
        thingsToDo: {
          ...state.thingsToDo,
          items: data.data,
          paging: data.paging,
        },
      }));
    } catch {
      set((state) => ({
        thingsToDo: {
          ...state.thingsToDo,
          error: 'Failed to fetch attractions',
        },
      }));
    } finally {
      set((state) => ({
        thingsToDo: { ...state.thingsToDo, isLoading: false },
      }));
    }
  },
}));
