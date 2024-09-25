'use client';

import { Auth } from '@/helpers/auth';
import { IReviewRequest } from '@/interfaces/IReview';
import axios from 'axios';

type IOutput = {
  Items: IReviewRequest[];
  LastEvaluatedItem: IReviewRequest;
};

export async function getReviewsByUser() {
  const auth = new Auth();
  const tokens = auth.getUserTokens();

  const response = await axios.get<IOutput>(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/reviews`,
    {
      headers: {
        Authorization: `Bearer ${tokens!.AccessToken}`,
      },
    },
  );

  return response.data;
}
