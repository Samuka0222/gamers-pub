import { Auth } from '@/helpers/auth';
import axios from 'axios';

interface IOutput {
  status: number;
  signedUrl: string | undefined;
}

export async function getUserProfilePicture(): Promise<IOutput> {
  const auth = new Auth();
  const tokens = auth.getUserTokens();

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/get-file`,
    {
      headers: {
        Authorization: `Bearer ${tokens?.AccessToken}`,
      },
    },
  );

  console.log('status: ' + response.status);
  console.log('URL: ' + response.data);
  console.log(response.data);

  return {
    status: response.status,
    signedUrl: response.data,
  };
}
