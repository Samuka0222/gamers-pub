import { getRandomReviews } from '@/actions/reviews/getRandomReviews';
import { queryClient } from '@/lib/queryClient';
import { RANDOM_REVIEWS_QUERY_KEY } from '@/lib/queryClientKey';
import { useQuery } from '@tanstack/react-query';

export function useGetRandomReviews() {
  const { data, isLoading, error } = useQuery(
    {
      queryKey: RANDOM_REVIEWS_QUERY_KEY,
      queryFn: async () => {
        const response = await getRandomReviews();
        return response;
      },
      staleTime: 120000,
      gcTime: 120000,
    },
    queryClient,
  );

  return {
    randomReviews: data,
    isLoading,
    error,
  };
}
