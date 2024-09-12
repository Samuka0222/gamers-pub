'use client';

import { IReviewRequest } from '@/interfaces/IReview';
import axios from 'axios';

type IOutput = {
  Items: IReviewRequest[];
  LastEvaluatedItem: IReviewRequest;
};

export async function getReviewsByUser() {
  const tokens = JSON.parse(localStorage.getItem('tokens')!);

  const response = await axios.get<IOutput>(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/reviews`,
    {
      headers: {
        Authorization: `Bearer ${tokens.AccessToken}`,
      },
    },
  );

  return response.data;
}
