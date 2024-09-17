import { Auth } from '@/helpers/auth';
import { IChatMessage } from '@/interfaces/IChat';
import axios from 'axios';

type IInput = {
  chatHistoryId?: string;
  userPrompt: string;
};

type IOutput = {
  id: string;
  updatedChatHistory: Record<string, string | Record<string, string>[]>;
  text: string;
};

export async function sendBotMessage({ chatHistoryId, userPrompt }: IInput) {
  const auth = new Auth();
  const tokens = auth.getUserTokens();

  const response = await axios.post<IOutput>(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/chatbot/${chatHistoryId ?? ''}`,
    {
      userPrompt,
    },
    {
      headers: {
        Authorization: `Bearer ${tokens?.AccessToken}`,
      },
    },
  );

  return response.data;
}
