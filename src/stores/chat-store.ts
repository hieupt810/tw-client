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
  newMessage: (
    text: IChatMessage['text'],
    conversation_id: string,
  ) => Promise<void>;
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

  async newMessage(text, conversation_id) {
    set((state) => ({ ...state, isLoading: true }));
    try {
      // Put the message to the top of the messages
      set((state) => ({
        ...state,
        messages: [{ text, is_user: true }, ...state.messages],
      }));

      // Send message to the server
      const response = await api
        .post(ChatRoutes.DEFAULT, {
          json: { text, conversation_id },
          timeout: 20000,
        })
        .json<IChatMessage>();

      // Add response to the top of the messages
      set((state) => ({
        ...state,
        messages: [response, ...state.messages],
      }));
    } catch {
    } finally {
      set((state) => ({ ...state, isLoading: false }));
    }
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

  async getChatMessages(id) {
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
