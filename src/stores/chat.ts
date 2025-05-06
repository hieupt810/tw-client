import { create } from 'zustand';

import { ChatService } from '@/services/chat';
import { IChat } from '@/types/IChat';
import { IChatMessage } from '@/types/IChatMessage';

type State = {
  error: string;
  isLoadingMessage: boolean;
  isLoadingResponse: boolean;
  isLoadingChatHistory: boolean;
  chatHistory: IChat[];
  messageHistory: IChatMessage[];
};

type Action = {
  reset: () => void;
  newChat: () => void;
  newMessage: (text: string, id: string) => Promise<void>;
  getChatHistory: () => Promise<void>;
  getMessageHistory: (id: string) => Promise<void>;
};

export const useChatStore = create<State & Action>()((set, get) => ({
  error: '',
  isLoadingMessage: false,
  isLoadingResponse: false,
  isLoadingChatHistory: true,
  chatHistory: [],
  messageHistory: [],

  reset: () =>
    set((state) => ({
      ...state,
      error: '',
      isLoadingMessage: false,
      isLoadingResponse: false,
      isLoadingChatHistory: false,
      messageHistory: [],
    })),

  newChat: () => set((state) => ({ ...state, messageHistory: [] })),

  newMessage: async (text, id) => {
    try {
      set((state) => ({
        ...state,
        isLoadingResponse: true,
        messageHistory: [{ text, is_user: true }, ...state.messageHistory],
      }));

      // Send message to the server
      const resp = await ChatService.postMessage(text, id);
      set((state) => ({
        ...state,
        messageHistory: [resp, ...state.messageHistory],
      }));
      get().getChatHistory();
    } catch {
      set((state) => ({ ...state, error: 'Something went wrong' }));
    } finally {
      set((state) => ({ ...state, isLoadingResponse: false }));
    }
  },

  getChatHistory: async () => {
    set((state) => ({ ...state, isLoadingChatHistory: true }));
    try {
      const response = await ChatService.getChatList();
      set((state) => ({ ...state, chatHistory: response }));
    } catch {
      set((state) => ({ ...state, error: 'Something went wrong' }));
    } finally {
      set((state) => ({ ...state, isLoadingChatHistory: false }));
    }
  },

  getMessageHistory: async (id) => {
    set((state) => ({ ...state, isLoadingMessage: true }));
    try {
      const response = await ChatService.getChatMessages(id);
      set((state) => ({ ...state, messageHistory: response }));
    } catch {
      set((state) => ({ ...state, error: 'Something went wrong' }));
    } finally {
      set((state) => ({ ...state, isLoadingMessage: false }));
    }
  },
}));
