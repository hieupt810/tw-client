import { ChatRoutes } from '@/constants/routes';
import api from '@/lib/api';
import { IChat } from '@/types/IChat';
import { IChatMessage } from '@/types/IChatMessage';

export class ChatService {
  static postMessage(id: string, text: string) {
    return api
      .post(ChatRoutes.DEFAULT, {
        json: { id, text },
        timeout: 20000,
      })
      .json<IChatMessage>();
  }

  static getChatList() {
    return api.get(ChatRoutes.DEFAULT).json<IChat[]>();
  }

  static getChatMessages(id: string) {
    return api
      .get(ChatRoutes.MESSAGES, { searchParams: { id } })
      .json<IChatMessage[]>();
  }
}
