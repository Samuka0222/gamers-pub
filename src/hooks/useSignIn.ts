import { handleSignIn } from '@/helpers/handleSignIn';
import { IUser } from '@/interfaces/IUser';
import { queryClient } from '@/lib/queryClient';
import { USER_QUERY_KEY } from '@/lib/queryClientKey';
import { useQuery } from '@tanstack/react-query';

export function useSignIn() {
  const { data, isLoading, error } = useQuery(
    {
      queryKey: USER_QUERY_KEY,
      queryFn: async () => {
        const response = await handleSignIn();
        if (response !== undefined) {
          const user: IUser = {
            username: response.username,
            email: response.email,
            title: response.title,
            firstName: response.first_name,
            lastName: response.last_name,
            isAuthenticated: true,
            profilePicture: undefined,
          };
          return user;
        }
      },
      staleTime: 1000 * 60 * 60,
      gcTime: 300000,
    },
    queryClient,
  );

  return {
    userInfo: data,
    isLoading,
    error,
  };
}
