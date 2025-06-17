import { create } from 'zustand';

import { ThingToDoService } from '@/services/thing-to-do';
import { IAttraction } from '@/types/IAttraction';
import { IPagingMeta } from '@/types/IPaging';
import { IThingToDo, IThingToDoFilter } from '@/types/IThingToDo';

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
    subcategories?: string[];
    subtypes?: string[];
  };
};

type Action = {
  reset: () => void;
  fetchThingToDo: (id: string) => Promise<void>;
  fetchThingsToDo: (
    page: number,
    size: number,
    filters: IThingToDoFilter,
  ) => Promise<void>;
  fetchSubcategories: () => Promise<void>;
  fetchSubtypes: () => Promise<void>;
};

const THINGTODO_SUBCATEGORIES_KEY = 'thingtodoSubcategories';
const THINGTODO_SUBTYPES_KEY = 'thingtodoSubtypes';

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
    subcategories:
      typeof sessionStorage !== 'undefined'
        ? JSON.parse(
            sessionStorage.getItem(THINGTODO_SUBCATEGORIES_KEY) || '[]',
          )
        : [],
    subtypes:
      typeof sessionStorage !== 'undefined'
        ? JSON.parse(sessionStorage.getItem(THINGTODO_SUBTYPES_KEY) || '[]')
        : [],
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

  async fetchThingsToDo(page = 1, size = 10, filters: IThingToDoFilter) {
    set((state) => ({
      ...state,
      thingsToDo: { ...state.thingsToDo, isLoading: true },
    }));
    try {
      const filterParams: Record<string, string> = {};
      if (filters.search) filterParams.search = filters.search;
      if (filters.subcategories && filters.subcategories.length > 0) {
        filterParams.subcategories = filters.subcategories.join(',');
      }
      if (filters.subtypes && filters.subtypes.length > 0) {
        filterParams.subtypes = filters.subtypes.join(',');
      }
      if (filters.rating) filterParams.rating = filters.rating.toString();

      const data = await ThingToDoService.list(page, size, filterParams);
      set((state) => ({
        ...state,
        thingsToDo: {
          ...state.thingsToDo,
          items: data.data,
          paging: data.paging,
        },
      }));
    } catch {
      set((state) => ({
        ...state,
        thingsToDo: {
          ...state.thingsToDo,
          error: 'Failed to fetch attractions',
        },
      }));
    } finally {
      set((state) => ({
        ...state,
        thingsToDo: { ...state.thingsToDo, isLoading: false },
      }));
    }
  },
  async fetchSubcategories() {
    try {
      const data = await ThingToDoService.subcategories();
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(
          THINGTODO_SUBCATEGORIES_KEY,
          JSON.stringify(data.subcategories || []),
        );
      }
      set((state) => ({
        ...state,
        thingsToDo: {
          ...state.thingsToDo,
          subcategories: data.subcategories || [],
        },
      }));
    } catch {
      set((state) => ({
        ...state,
        thingsToDo: {
          ...state.thingsToDo,
          error: 'Failed to fetch subcategories',
        },
      }));
    }
  },
  async fetchSubtypes() {
    try {
      const data = await ThingToDoService.subtypes();
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(
          THINGTODO_SUBTYPES_KEY,
          JSON.stringify(data.subtypes || []),
        );
      }
      set((state) => ({
        ...state,
        thingsToDo: {
          ...state.thingsToDo,
          subtypes: data.subtypes || [],
        },
      }));
    } catch {
      set((state) => ({
        ...state,
        thingsToDo: {
          ...state.thingsToDo,
          error: 'Failed to fetch subtypes',
        },
      }));
    }
  },
}));
