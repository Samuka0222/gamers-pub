'use client';

import axios from 'axios';
import { Auth } from '@/helpers/auth';

export async function createReview(review: Record<string, any>) {
  console.log('disparou');
  // TODO: Create Auth class and implements functions to get tokens

  return await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/reviews`,
    {
      ...review,
    },
    {
      headers: {
        Authorization: `Bearer ${new Auth().getUserTokens()?.tokens}`,
      },
    },
  );
}
