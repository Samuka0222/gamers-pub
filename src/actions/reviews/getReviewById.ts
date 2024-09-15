'use client';

import { IReview, IReviewRequest } from '@/interfaces/IReview';
import axios from 'axios';

type IOutput = {
  review: {
    created_at: string;
    review: IReview;
  };
};

export async function getReviewById(reviewId: string) {
  console.log('disparou');
  const tokens = JSON.parse(localStorage.getItem('tokens')!);

  const response = await axios.get<IOutput>(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/reviews/${reviewId}`,
    {
      headers: {
        Authorization: `Bearer ${tokens.AccessToken}`,
      },
    },
  );

  return response.data;
}
