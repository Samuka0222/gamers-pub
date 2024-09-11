import { create } from 'zustand';

interface IUser {
  username: string;
  title: string;
}

interface IUserStore {
  user:
    | {
        username: string;
        title: string;
      }
    | undefined;
  isAuthenticated: boolean;
  signIn: () => void;
}

export const useUserStore = create<IUserStore>()((set) => ({
  user: undefined,
  isAuthenticated: false,
  signIn: () =>
    set(() => ({
      user: {
        username: 'Samukinha',
        title: 'El Gamer',
      },
    })),
}));
