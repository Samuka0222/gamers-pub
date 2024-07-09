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
}

export const useUserStore = create<IUserStore>()((set) => ({
  user: {
    username: 'SuperGamer123',
    title: '🥇 Top Gamer',
  },
  editUser: (user: IUser) =>
    set(() => ({
      user: {
        username: user.username,
        title: user.title,
      },
    })),
}));
