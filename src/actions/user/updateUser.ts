import { Auth } from '@/helpers/auth';
import axios from 'axios';

type IInput = {
  updatedUser: {
    firstName: string;
    lastName: string;
    username: string;
    title: string | undefined;
  };
};

export async function updateUser({ updatedUser }: IInput) {
  const auth = new Auth();
  const tokens = auth.getUserTokens();

  return await axios.put(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/users`,
    {
      ...updatedUser,
    },
    {
      headers: {
        Authorization: `Bearer ${tokens?.AccessToken}`,
      },
    },
  );
}
