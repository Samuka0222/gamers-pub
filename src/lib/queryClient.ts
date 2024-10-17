import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 120000,
      refetchOnWindowFocus: false,
      gcTime: 300000,
    },
  },
});
