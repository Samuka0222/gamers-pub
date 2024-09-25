'use client';

import { Auth } from '@/helpers/auth';
import { IReview } from '@/interfaces/IReview';
import axios from 'axios';

export async function updateReview(review: IReview) {
  const auth = new Auth();
  const tokens = auth.getUserTokens();

  return await axios.put(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/reviews/${review.id}`,
    {
      ...review,
    },
    {
      headers: {
        Authorization: `Bearer ${tokens!.AccessToken}`,
      },
    },
  );
}
