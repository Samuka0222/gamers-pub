'use client';

import { Auth } from '@/helpers/auth';
import axios from 'axios';

export async function deleteChatHistory(chatHistoryId: string) {
  const auth = new Auth();
  const tokens = auth.getUserTokens();

  return await axios.delete(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/chatbot/${chatHistoryId}`,
    {
      headers: {
        Authorization: `Bearer ${tokens!.AccessToken}`,
      },
    },
  );
}
