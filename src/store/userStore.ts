import { IUser, IUserResponse } from '@/interfaces/IUser';
import { create } from 'zustand';

interface IUserStore {
  user: IUser | undefined;
  setUser: (userInfo: IUserResponse) => void;
}

export const useUserStore = create<IUserStore>()((set) => ({
  user: undefined,
  setUser: (userInfo) =>
    set(() => ({
      user: {
        username: userInfo.username,
        firstName: userInfo.first_name,
        lastName: userInfo.last_name,
        email: userInfo.email,
        title: 'El Gamer',
        isAuthenticated: true,
      },
    })),
}));
