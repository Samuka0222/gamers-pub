'use client';

import { IReview } from '@/interfaces/IReview';
import axios from 'axios';

export async function updateReview(review: IReview) {
  console.log('disparou');
  // TODO: Create Auth class and implements functions to get tokens
  const tokens = JSON.parse(localStorage.getItem('tokens')!);

  return await axios.put(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/reviews/${review.id}`,
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
