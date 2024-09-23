import { IUser, IUserResponse } from '@/interfaces/IUser';
import { create } from 'zustand';

interface IGlobalStore {
  user: IUser | undefined;
  setUser: (userInfo: IUserResponse) => void;
  setUserProfilePicture: (imageUrl: string) => void;
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
        profilePicture: undefined,
        title: userInfo.title,
        isAuthenticated: true,
      },
    })),
  setUserProfilePicture: (imageUrl) =>
    set((state) => ({ user: { ...state.user!, profilePicture: imageUrl } })),
}));
