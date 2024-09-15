import { getUserInformation } from '@/actions/user/getUserInformation';
import { create } from 'zustand';

interface IUserStore {
  user:
    | {
        username: string;
        firstName: string;
        lastName: string;
        title: string;
        email: string;
        isAuthenticated: boolean;
      }
    | undefined;
  signIn: (token: string) => Promise<void>;
}

export const useUserStore = create<IUserStore>()((set) => ({
  user: undefined,
  isAuthenticated: false,
  signIn: async (token) => {
    const userInfo = (await getUserInformation(token)).data;
    set(() => ({
      user: {
        username: userInfo.username,
        firstName: userInfo.first_name,
        lastName: userInfo.last_name,
        email: userInfo.email,
        title: 'El Gamer',
        isAuthenticated: true,
      },
    }));
  },
}));
