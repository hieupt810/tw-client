import { create } from 'zustand';

import { ChatService } from '@/services/chat';
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
      const response = await ChatService.postMessage(text, conversation_id);

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
      const response = await ChatService.getChatList();
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
      const response = await ChatService.getChatMessages(id);
      set((state) => ({ ...state, messages: response }));
    } catch {
      set((state) => ({ ...state, error: 'Unexpected error occurred.' }));
    } finally {
      set((state) => ({ ...state, isLoading: false }));
    }
  },
}));
