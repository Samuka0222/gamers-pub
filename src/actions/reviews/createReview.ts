'use client';

import { IReview } from '@/interfaces/IReview';
import axios from 'axios';

export async function createReview(review: IReview) {
  console.log('disparou');
  // TODO: Create Auth class and implements functions to get tokens
  const tokens = JSON.parse(localStorage.getItem('tokens')!);

  return await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/reviews`,
    {
      ...review,
    },
    {
      headers: {
        Authorization: `Bearer ${tokens.AccessToken}`,
      },
    },
  );
}
