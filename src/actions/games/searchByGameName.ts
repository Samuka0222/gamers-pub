'use server';

import axios, { AxiosError } from 'axios';
import { IGameSearchResult } from '@/interfaces/IGame';

export async function searchByGameName(
  gameName: string,
): Promise<IGameSearchResult[] | undefined> {
  try {
    const apiqlQuery = `
    search "${gameName}";
    fields name, cover.url;
    `;

    const response = await axios.post(
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
