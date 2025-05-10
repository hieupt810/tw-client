import { HTTPError } from 'ky';
import { create } from 'zustand';

import { IError } from '@/types/IError';

type State = {
  error: string;
  thingToDo: null;
  isLoadingThingToDo: boolean;
};

type Action = {
  resetAction: () => void;
  getThingToDoAction: (id: string) => Promise<void>;
};

export const useThingToDoStore = create<State & Action>((set) => ({
  error: '',
  thingToDo: null,
  isLoadingThingToDo: true,

  resetAction() {
    set((state) => ({
      ...state,
      error: '',
      thingToDo: null,
      isLoadingThingToDo: true,
    }));
  },

  async getThingToDoAction(id) {
    console.log('getThingToDo', id);
    try {
      set((state) => ({ ...state, isLoadingThingToDo: true }));

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      if (err instanceof HTTPError) {
        const resp = await err.response.json<IError>();
        set((state) => ({ ...state, error: resp.error }));
        return;
      }
      set((state) => ({ ...state, error: 'Something went wrong' }));
    } finally {
      set((state) => ({ ...state, isLoadingThingToDo: false }));
    }
  },
}));
