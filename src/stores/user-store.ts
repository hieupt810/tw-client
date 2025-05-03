import { HTTPError } from 'ky';
import { create } from 'zustand';

import { UserService } from '@/services/user';
import { IError } from '@/types/IError';
import { IProfile } from '@/types/IProfile';

type IUserStore = {
  error: IError['error'] | null;
  isLoading: boolean;
  profile: IProfile | undefined;
  getProfile: () => Promise<void>;
};

export const useUserStore = create<IUserStore>()((set) => ({
  error: null,
  isLoading: false,
  profile: undefined,

  // Actions
  async getProfile() {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const response = await UserService.getProfile();
      set((state) => ({ ...state, profile: response }));
    } catch (error) {
      if (error instanceof HTTPError) {
        const response = await error.response.json<IError>();
        set((state) => ({ ...state, error: response.error }));
      }
    } finally {
      set((state) => ({ ...state, isLoading: false }));
    }
  },
}));
