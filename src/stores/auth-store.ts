import { create } from 'zustand';

import { AuthService } from '@/services/auth';
import { IMe } from '@/types/IMe';

type State = {
  me: IMe | null;
  isLoading: boolean;
};

type Action = {
  meAction: () => Promise<void>;
};

const initialState: State = {
  me: null,
  isLoading: true,
};

export const useAuthStore = create<State & Action>()((set) => ({
  ...initialState,

  async meAction() {
    set((state) => ({ ...state, isLoading: true }));
    try {
      const data = await AuthService.me();
      set((state) => ({ ...state, me: data }));
    } catch {
      set((state) => ({ ...state, me: null }));
    } finally {
      set((state) => ({ ...state, isLoading: false }));
    }
  },
}));
