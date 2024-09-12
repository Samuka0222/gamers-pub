import axios from 'axios';

type IOutput = {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
};

export async function getUserInformation(token: string) {
  return await axios.get<IOutput>(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/users`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}
