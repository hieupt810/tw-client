import IResponse from './IResponse';

export type IChatMessage = {
  text: string;
  isUser: boolean;
};

export type IChatMessages = IResponse<{ data: IChatMessage[] }>;
