import { create } from 'zustand';

import { ChatRoutes } from '@/constants/routes';
import api from '@/lib/api';
import { IChat } from '@/types/IChat';
import { IChatMessage } from '@/types/IChatMessage';

type IChatStore = {
  error: string;
  isLoading: boolean;
  chat: IChat[];
  messages: IChatMessage[];
  newChat: () => void;
  getChatList: () => Promise<void>;
  getChatMessages: (id: string) => Promise<void>;
};

export const useChatStore = create<IChatStore>()((set) => ({
  error: '',
  isLoading: false,
  chat: [],
  messages: [],

  // Actions
  newChat: () => {
    set((state) => ({ ...state, messages: [] }));
  },

  async getChatList() {
    set((state) => ({ ...state, isLoading: true }));
    try {
      const response = await api.get(ChatRoutes.DEFAULT).json<IChat[]>();
      set((state) => ({ ...state, chat: response }));
    } catch {
      set((state) => ({ ...state, error: 'Unexpected error occurred.' }));
    } finally {
      set((state) => ({ ...state, isLoading: false }));
    }
  },

  async getChatMessages(id: string) {
    set((state) => ({ ...state, isLoading: true }));
    try {
      const response = await api
        .get(ChatRoutes.MESSAGES, { searchParams: { id } })
        .json<IChatMessage[]>();
      set((state) => ({ ...state, messages: response }));
    } catch {
      set((state) => ({ ...state, error: 'Unexpected error occurred.' }));
    } finally {
      set((state) => ({ ...state, isLoading: false }));
    }
  },
}));
