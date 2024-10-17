import { IUser, IUserResponse } from '@/interfaces/IUser';
import { create } from 'zustand';

interface IGlobalStore {
  user: IUser | undefined;
  setUser: (userInfo: IUser) => void;
  setUserProfilePicture: (imageUrl: string) => void;
}

export const useGlobalStore = create<IGlobalStore>()((set) => ({
  user: undefined,
  setUser: (userInfo) => set(() => ({ user: userInfo })),
  setUserProfilePicture: (imageUrl) =>
    set((state) => ({ user: { ...state.user!, profilePicture: imageUrl } })),
}));
