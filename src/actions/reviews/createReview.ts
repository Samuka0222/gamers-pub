'use client';

import axios from 'axios';
import { Auth } from '@/helpers/auth';

export async function createReview(review: Record<string, any>) {
  const auth = new Auth();
  const tokens = auth.getUserTokens();

  return await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/reviews`,
    {
      ...review,
    },
    {
      headers: {
        Authorization: `Bearer ${tokens?.AccessToken}`,
      },
    },
  );
}
