'use client';

import { Auth } from '@/helpers/auth';
import { IChatMessage } from '@/interfaces/IChat';
import { Content } from '@google/generative-ai';
import axios from 'axios';

type IAxiosOutput = {
  chat_history: {
    created_at: string;
    chatbot_history: Content[];
  };
};

type IOutput = {
  created_at: string;
  chatHistory: IChatMessage[];
};

export async function getChatHistoryById(
  chathistoryId: string,
): Promise<IOutput> {
  const auth = new Auth();
  const tokens = auth.getUserTokens();

  const response = await axios.get<IAxiosOutput>(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/chatbot/${chathistoryId}`,
    {
      headers: {
        Authorization: `Bearer ${tokens?.AccessToken}`,
      },
    },
  );

  const formatedResponse = response.data.chat_history.chatbot_history.map(
    (item: Content) => ({
      message: {
        text: item.parts[0].text!,
        isPending: false,
        owner: item.role,
      },
    }),
  );

  return {
    created_at: response.data.chat_history.created_at,
    chatHistory: formatedResponse,
  };
}
