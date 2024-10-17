'use client'

import { Loader2, SendHorizonal } from "lucide-react";

import { useEffect, useOptimistic, useState } from "react";

import { ChatHistoryList } from "./ChatHistoryList";
import { Input } from "@/components/Input";
import { SubmitButton } from "@/components/SubmitButton";
import { getRandomPhrase } from "@/lib/phrases";
import { sendBotMessage } from "@/actions/chatbot/sendBotMessage";
import { IChatMessage } from "@/interfaces/IChat";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChatbotMenu } from "./ChatbotMenu";
import { useGetChatHistoryByUser } from "@/hooks/useGetChatHistoryByUser";
import { Content } from "@google/generative-ai";
import { queryClient } from "@/lib/queryClient";
import { CH_QUERY_KEY } from "@/lib/queryClientKey";

interface RecommendationBotFormProps {
  id: string;
}

export function RecommendationBotForm({ id: conversationId }: RecommendationBotFormProps) {
  const { chatbotHistory, isLoading, error } = useGetChatHistoryByUser();
  const [chat, setChat] = useState<IChatMessage[]>([]);

  const [userPrompt, setUserPrompt] = useState('');

  useEffect(() => {
    if (chatbotHistory !== undefined && conversationId !== '') {
      const filteredChat = chatbotHistory.find(item => item.id === conversationId)

      const formattedChat = filteredChat?.chatbot_history.map(
        (item: Content) => ({
          message: {
            text: item.parts[0].text!,
            isPending: false,
            owner: item.role,
          },
        }),
      );

      setChat(formattedChat!)
    }
  }, []);

  const [optimisticChat, addOptimisticChat] = useOptimistic(
    chat,
    (prevMessages, newMessages: IChatMessage) => {
      return prevMessages.concat(newMessages)
    }
  );

  const router = useRouter();

  const submitAction = async () => {
    try {
      if (conversationId !== '') {
        addOptimisticChat({
          message: {
            text: userPrompt,
            isPending: false,
            owner: 'user'
          }
        });

        addOptimisticChat({
          message: {
            text: '',
            isPending: true,
            owner: 'model'
          }
        });
      }
      const response = await sendBotMessage({ userPrompt, chatHistoryId: conversationId });

      if (conversationId === '') {
        await queryClient.invalidateQueries({ queryKey: CH_QUERY_KEY });
        router.push(`/recommendations/${response.id}`)
      }

      addOptimisticChat({
        message: {
          text: response.text,
          isPending: false,
          owner: 'model'
        }
      });


      setChat(prevState => prevState.concat({
        message: {
          text: userPrompt,
          isPending: false,
          owner: 'user'
        }
      }));

      setChat(prevState => prevState.concat({
        message: {
          text: response.text,
          owner: 'model',
          isPending: false
        }
      }));
      setUserPrompt('');
    } catch (error) {
      toast.error('ERROR: ' + error)
    }
  }

  return (
    <>
      {
        isLoading
          ? <div className="w-full min-h-full flex flex-1 justify-center items-center">
            <Loader2 />
          </div>
          : <form
            action={submitAction}
            className={cn(
              conversationId === '' ? "h-fit" : "min-h-full flex-1",
              "w-full md:w-[90%] xl:w-[75%] flex flex-col justify-between items-center"
            )}
          >
            <ChatbotMenu chatId={conversationId} />
            {
              conversationId !== '' && (
                <div className="w-full flex flex-col rounded-lg h-[500px] md:h-[420px] lg:h-[470px] xl:min-h-[600px] xl:max-h-[700px] overflow-y-auto mt-8">
                  <ChatHistoryList chatHistory={optimisticChat} />
                </div>
              )
            }
            <div className="w-full flex justify-between items-center mt-4 h-16 border border-gray-300 text-base rounded-lg shadow-sm p-3">
              <Input
                className="flex-1 h-full border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                type="text"
                placeholder={getRandomPhrase()}
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                required
              />
              <div className="flex gap-2 justify-center items-center">
                <SubmitButton>
                  <SendHorizonal />
                </SubmitButton>
              </div>
            </div>
          </form>
      }
    </>

  )
}
