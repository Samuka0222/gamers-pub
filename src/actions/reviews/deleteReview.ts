'use client';

import { Auth } from '@/helpers/auth';
import axios from 'axios';

export async function deleteReview(reviewId: string) {
  const auth = new Auth();
  const tokens = auth.getUserTokens();

  return await axios.delete(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/reviews/${reviewId}`,
    {
      headers: {
        Authorization: `Bearer ${tokens!.AccessToken}`,
      },
    },
  );
}
