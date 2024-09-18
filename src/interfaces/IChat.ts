import { Content } from '@google/generative-ai';

export interface IChatMessage {
  message: {
    text: string;
    isPending: boolean;
    owner: string;
  };
}

export interface IChat {
  id: string;
  chatHistory: IChatMessage[];
}

export interface IUserChatbotHistory {
  id: string;
  created_at: string;
  chatbot_history: Content[];
}
