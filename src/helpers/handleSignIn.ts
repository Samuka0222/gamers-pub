import { Auth } from './auth';
import { getUserInformation } from '@/actions/user/getUserInformation';

export async function handleSignIn() {
  const auth = new Auth();
  const tokens = auth.getUserTokens();
  if (!tokens) {
    return undefined;
  } else {
    const isTokenValid = auth.validateTokens();
    if (isTokenValid) {
      const userInfo = await getUserInformation(tokens.AccessToken);
      return userInfo;
    } else {
      try {
        await auth.validateWithRefreshToken();
        const newTokens = JSON.parse(localStorage.getItem('tokens')!);
        const userInfo = await getUserInformation(newTokens.AccessToken);
        return userInfo;
      } catch (error) {
        localStorage.removeItem('tokens');
        return undefined;
      }
    }
  }
}
