import { getReviewsByUserAction } from '@/actions/reviews/getReviewsByUser';
import { queryClient } from '@/lib/queryClient';
import { REVIEWS_QUERY_KEY } from '@/lib/queryClientKey';
import { useGlobalStore } from '@/store/globalStore';
import { useQuery } from '@tanstack/react-query';

export function useGetReviewsByUser() {
  const { user } = useGlobalStore();

  const { data, isLoading, error } = useQuery(
    {
      enabled: user !== undefined,
      queryKey: REVIEWS_QUERY_KEY,
      queryFn: async () => {
        console.log('QueryFn() executou');
        const response = await getReviewsByUserAction();
        return response;
      },
      staleTime: Infinity,
      gcTime: 300000,
    },
    queryClient,
  );

  return {
    reviews: data,
    isLoading,
    error,
  };
}
