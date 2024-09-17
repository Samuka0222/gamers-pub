import { IUserResponse } from '@/interfaces/IUser';
import axios from 'axios';

export async function getUserInformation(token: string) {
  console.log('disparou');

  return await axios.get<IUserResponse>(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/users`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}
