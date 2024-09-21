import { IUser, IUserResponse } from '@/interfaces/IUser';
import { create } from 'zustand';

interface IGlobalStore {
  user: IUser | undefined;
  setUser: (userInfo: IUserResponse) => void;
}

export const useGlobalStore = create<IGlobalStore>()((set) => ({
  user: undefined,
  setUser: (userInfo) =>
    set(() => ({
      user: {
        username: userInfo.username,
        firstName: userInfo.first_name,
        lastName: userInfo.last_name,
        email: userInfo.email,
        profilePicture: userInfo.profilePicture,
        title: userInfo.title,
        isAuthenticated: true,
      },
    })),
}));
