'use client';

import axios from 'axios';

type IOutput = {
  data: {
    author: string;
    created_at: string;
    end_date: string;
    game_cover_url: string;
    game_id: number;
    game_name: string;
    id: string;
    mastered: boolean;
    platform: string;
    rating: number;
    review_text: string;
    spoilers: boolean;
    start_date: string;
    status: string;
    time_played: string;
  }[];
};

export async function getRandomReviews() {
  const response = await axios.get<IOutput>(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/reviews/random`,
  );

  const result = response.data.data.map((item) => ({
    id: item.id,
    author: item.author,
    gameCoverUrl: item.game_cover_url,
    gameId: item.game_id,
    gameName: item.game_name,
    reviewText: item.review_text,
    spoilers: item.spoilers,
    status: item.status,
    startDate: new Date(item.start_date),
    rating: item.rating,
    endDate: new Date(item.end_date),
    mastered: item.mastered,
    platform: item.platform,
    timePlayed: item.time_played,
  }));

  return result;
}
