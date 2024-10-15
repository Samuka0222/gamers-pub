import { getUserProfilePictureAction } from '@/actions/upload/getUserProfilePicture';
import { queryClient } from '@/lib/queryClient';
import { PROFILE_PICTURE_QUERY_KEY } from '@/lib/queryClientKey';
import { useGlobalStore } from '@/store/globalStore';
import { useQuery } from '@tanstack/react-query';

export function useGetProfilePicture() {
  const { user } = useGlobalStore();

  const { data, isLoading, error } = useQuery(
    {
      enabled: user !== undefined,
      queryKey: PROFILE_PICTURE_QUERY_KEY,
      queryFn: async () => {
        console.log('QueryFn() executou');
        const response = await getUserProfilePictureAction();
        if (response.status === 200) return response.signedUrl;
      },
      staleTime: 3600000,
      gcTime: 300000,
    },
    queryClient,
  );

  return {
    profilePictureUrl: data,
    isLoading,
    error,
  };
}
