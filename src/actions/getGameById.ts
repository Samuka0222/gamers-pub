'use server';

import axios, { AxiosError } from 'axios';
import { IGameSearchResult } from '@/interfaces/IGame';

interface GetGameByIdOutput extends IGameSearchResult {
  platforms: {
    id: number;
    name: string;
  }[];
  first_release_date: number;
}

export async function getGameById(
  gameId: number,
): Promise<GetGameByIdOutput | undefined> {
  try {
    const apiqlQuery = `fields id, cover.url, name, platforms.name, first_release_date; where id = ${gameId};`;

    const response = await axios.post(
      'https://api.igdb.com/v4/games',
      apiqlQuery,
      {
        headers: {
          'Client-ID': process.env.TWITCH_CLIENT_ID,
          Authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
          'Content-Type': 'text/plain',
        },
      },
    );
    return response.data[0];
  } catch (err) {
    if (err instanceof AxiosError) {
      console.error('API request failed:', err.message);
    }
  }
}
