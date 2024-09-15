'use client';

import axios from 'axios';

export async function deleteReview(reviewId: string) {
  console.log('disparou');
  // TODO: Create Auth class and implements functions to get tokens
  const tokens = JSON.parse(localStorage.getItem('tokens')!);

  return await axios.delete(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/reviews/${reviewId}`,
    {
      headers: {
        Authorization: `Bearer ${tokens.AccessToken}`,
      },
    },
  );
}
