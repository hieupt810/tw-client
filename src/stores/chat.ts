import { create } from 'zustand';

import { ChatService } from '@/services/chat';
import { IChat } from '@/types/IChat';
import { IChatMessage } from '@/types/IChatMessage';

type State = {
  error: string;
  chatHistory: IChat[];
  isLoadingMessage: boolean;
  isLoadingResponse: boolean;
  isLoadingChatHistory: boolean;
  messageHistory: IChatMessage[];
};

type Action = {
  resetAction: () => void;
  postChatAction: () => void;
  postMessageAction: (id: string, text: string) => Promise<void>;
  getChatHistoryAction: () => Promise<void>;
  getMessageHistoryAction: (id: string) => Promise<void>;
};

export const useChatStore = create<State & Action>()((set, get) => ({
  error: '',
  chatHistory: [],
  messageHistory: [],
  isLoadingMessage: false,
  isLoadingResponse: false,
  isLoadingChatHistory: true,

  resetAction() {
    set((state) => ({
      ...state,
      error: '',
      isLoadingMessage: false,
      isLoadingResponse: false,
      isLoadingChatHistory: false,
      messageHistory: [],
    }));
  },

  postChatAction() {
    set((state) => ({ ...state, messageHistory: [] }));
  },

  async postMessageAction(id, text) {
    try {
      set((state) => ({
        ...state,
        isLoadingResponse: true,
        messageHistory: [{ text, is_user: true }, ...state.messageHistory],
      }));

      // Send message to the server
      const resp = await ChatService.postMessage(id, text);
      set((state) => ({
        ...state,
        messageHistory: [resp, ...state.messageHistory],
      }));
      get().getChatHistoryAction();
    } catch {
      set((state) => ({ ...state, error: 'Something went wrong' }));
    } finally {
      set((state) => ({ ...state, isLoadingResponse: false }));
    }
  },

  async getChatHistoryAction() {
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

  async getMessageHistoryAction(id) {
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
