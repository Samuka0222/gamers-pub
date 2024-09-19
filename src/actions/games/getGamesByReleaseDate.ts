'use server';

import { IGameReleases } from '@/interfaces/IGame';
import axios, { AxiosError } from 'axios';

export async function getGamesByReleaseDate(releasedGames: boolean) {
  try {
    const nowInMilliseconds = Date.now();
    const epochTimeStamp = Math.floor(nowInMilliseconds / 1000);
    const apiqlQuery = releasedGames
      ? `fields name, cover.url, first_release_date, release_dates.human; where category = 0 & first_release_date <= ${epochTimeStamp}; sort first_release_date desc; limit 8;`
      : `fields name, cover.url, first_release_date, release_dates.human; where category = 0 & first_release_date >= ${epochTimeStamp}; sort first_release_date asc; limit 8;`;

    const response = await axios.post<IGameReleases[]>(
      `${process.env.IGDB_URL}/v4/games`,
      apiqlQuery,
      {
        headers: {
          'Client-ID': process.env.TWITCH_CLIENT_ID,
          Authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
          'Content-Type': 'text/plain',
          'x-api-key': process.env.API_KEY,
        },
      },
    );

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      console.error('API request failed:', err.message);
    }
  }
}
