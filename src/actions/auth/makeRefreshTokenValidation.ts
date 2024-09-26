import { Auth } from '@/helpers/auth';
import { getExpirationTime } from '@/helpers/getExpirationTime';
import axios from 'axios';

export async function makeRefreshTokenValidation() {
  const auth = new Auth();
  const tokens = auth.getUserTokens();
  if (!tokens) {
    throw new Error('Tokens de autenticação não foram encontrados');
  }

  const refreshToken = tokens.RefreshToken;
  if (!refreshToken) {
    return false;
  }

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/refresh-token`,
    {
      refreshToken,
    },
  );

  if (response.status === 200) {
    const newTokens = {
      AccessToken: response.data.AccessToken,
      RefreshToken: refreshToken,
      ExpiresIn: getExpirationTime(response.data.ExpiresIn),
    };

    localStorage.setItem('tokens', JSON.stringify(newTokens));
    return true;
  } else {
    return false;
  }
}
