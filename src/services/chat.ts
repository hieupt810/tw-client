import { ChatRoutes } from '@/constants/routes';
import api from '@/lib/api';
import { IChat } from '@/types/IChat';
import { IChatMessage } from '@/types/IChatMessage';

export class ChatService {
  static async postMessage(text: string, conversation_id: string) {
    const response = await api
      .post(ChatRoutes.DEFAULT, {
        json: { text, conversation_id },
        timeout: 20000,
      })
      .json<IChatMessage>();
    return response;
  }

  static async getChatList() {
    const response = await api.get(ChatRoutes.DEFAULT).json<IChat[]>();
    return response;
  }

  static async getChatMessages(id: string) {
    const response = await api
      .get(ChatRoutes.MESSAGES, { searchParams: { id } })
      .json<IChatMessage[]>();
    return response;
  }
}
