import { makeRefreshTokenValidation } from '@/actions/auth/makeRefreshTokenValidation';

type ITokens = {
  AccessToken: string;
  ExpiresIn: string;
  RefreshToken: string;
};

export class Auth {
  getUserTokens: () => ITokens | undefined;
  validateTokens: () => boolean;
  validateWithRefreshToken: () => Promise<'sucess' | 'error' | undefined>;
  removeTokens: () => void;

  constructor() {
    this.getUserTokens = () => {
      const tokens = JSON.parse(localStorage.getItem('tokens')!);
      if (!tokens) {
        return undefined;
      } else {
        return tokens as ITokens;
      }
    };

    this.validateTokens = () => {
      const tokens = this.getUserTokens();
      if (!tokens) {
        return false;
      } else {
        const expiresIn = new Date(tokens.ExpiresIn);
        const now = new Date();
        return expiresIn > now;
      }
    };

    this.validateWithRefreshToken = async () => {
      const tokens = this.getUserTokens();
      if (!tokens) {
        return 'error';
      } else {
        try {
          const response = await makeRefreshTokenValidation();
          if (!response) {
            return 'error';
          } else {
            return 'sucess';
          }
        } catch (error) {
          return 'error';
        }
      }
    };

    this.removeTokens = () => {
      localStorage.removeItem('tokens');
    };
  }
}
