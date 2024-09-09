import { create } from 'zustand';

interface IUser {
  username: string;
  title: string;
}

interface IUserStore {
  user: {
    username: string;
    title: string;
  };
  editUser: (user: IUser) => void;
  isAuthenticated: boolean;
}

export const useUserStore = create<IUserStore>()((set) => ({
  user: {
    username: 'SuperGamer123',
    title: '🥇 Top Gamer',
  },
  isAuthenticated: false,
  editUser: (user: IUser) =>
    set(() => ({
      user: {
        username: user.username,
        title: user.title,
      },
    })),
}));
