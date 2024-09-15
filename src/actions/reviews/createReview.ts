'use client';

import axios from 'axios';

export async function createReview(review: Record<string, any>) {
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
