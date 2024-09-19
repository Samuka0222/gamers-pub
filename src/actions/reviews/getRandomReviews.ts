'use client';

import { IReviewRequest } from '@/interfaces/IReview';
import axios from 'axios';

type IOutput = {
  Items: IReviewRequest[];
};

export async function getRandomReviews() {
  console.log('disparou');

  const response = await axios.get<IOutput>(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/reviews/random`,
  );

  return response.data;
}
