import { getGamesByReleaseDate } from '@/actions/games/getGamesByReleaseDate';
import { queryClient } from '@/lib/queryClient';
import { RELEASES_QUERY_KEY } from '@/lib/queryClientKey';
import { useQuery } from '@tanstack/react-query';

export function useGetReleases() {
  const { data, isLoading, error } = useQuery(
    {
      queryKey: RELEASES_QUERY_KEY,
      queryFn: async () => {
        const futureReleases = await getGamesByReleaseDate({ released: false });
        const releasedGames = await getGamesByReleaseDate({ released: true });
        return { futureReleases, releasedGames };
      },
      staleTime: 120000,
      gcTime: 120000,
    },
    queryClient,
  );

  return {
    releasesList: data,
    isLoading,
    error,
  };
}
