import { getUserChatBotHistory } from '@/actions/chatbot/getUserChatbotHistory';
import { queryClient } from '@/lib/queryClient';
import { CH_QUERY_KEY } from '@/lib/queryClientKey';
import { useGlobalStore } from '@/store/globalStore';
import { useQuery } from '@tanstack/react-query';

export function useChatHistoryByUser() {
  const { user } = useGlobalStore();

  const { data, isLoading, error } = useQuery(
    {
      enabled: user !== undefined,
      queryKey: CH_QUERY_KEY,
      queryFn: async () => {
        console.log('QueryFn() executou');
        const response = await getUserChatBotHistory();
        return response;
      },
      staleTime: Infinity,
      gcTime: 120000,
    },
    queryClient,
  );

  return {
    chatbotHistory: data,
    isLoading,
    error,
  };
}
