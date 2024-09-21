import { Auth } from '@/helpers/auth';
import axios from 'axios';

type IGetPresignedUrlOutput = {
  signedUrl: string;
};

export async function getPresignedUrl(fileName: string) {
  const auth = new Auth();
  const tokens = auth.getUserTokens();

  return await axios.post<IGetPresignedUrlOutput>(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/upload-file`,
    {
      fileName,
    },
    {
      headers: {
        Authorization: `Bearer ${tokens?.AccessToken}`,
      },
    },
  );
}
