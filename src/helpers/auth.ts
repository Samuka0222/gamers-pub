import { makeRefreshTokenValidation } from '@/actions/auth/makeRefreshTokenValidation';
import { IUserResponse } from '@/interfaces/IUser';

type ITokens = {
  AccessToken: string;
  ExpiresIn: string;
  RefreshToken: string;
};

export class Auth {
  getUserTokens: () => ITokens | undefined;
  validateTokens: () => boolean;
  validateWithRefreshToken: () => Promise<'sucess' | 'error' | undefined>;

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
        return expiresIn < new Date();
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
  }
}
