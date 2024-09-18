'use client';

import { Auth } from '@/helpers/auth';
import { IUserChatbotHistory } from '@/interfaces/IChat';
import { Content } from '@google/generative-ai';
import axios from 'axios';

type IOutput = {
  Items: {
    sk: string;
    created_at: string;
    chatbot_history: Content[];
  }[];
};

export async function getUserChatBotHistory(): Promise<IUserChatbotHistory[]> {
  console.log('disparou');
  const auth = new Auth();
  const tokens = auth.getUserTokens();

  const response = await axios.get<IOutput>(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/chatbot`,
    {
      headers: {
        Authorization: `Bearer ${tokens?.AccessToken}`,
      },
    },
  );

  const formatedResponse = response.data.Items.map((item) => ({
    id: item.sk.slice(3),
    created_at: item.created_at,
    chatbot_history: item.chatbot_history,
  }));

  return formatedResponse;
}
