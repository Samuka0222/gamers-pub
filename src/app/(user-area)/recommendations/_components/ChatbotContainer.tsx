'use client'

import { useEffect, useState } from "react";
import { RecommendationBotForm } from "./RecommendationBotForm";
import { IChatMessage } from "@/interfaces/IChat";
import { Loader2 } from "lucide-react";
import { useChatHistoryByUser } from "@/hooks/useGetChatHistoryByUser";
import type { Content } from "@google/generative-ai";

export function ChatbotContainer({ chatHistoryId }: { chatHistoryId: string }) {
  const { chatbotHistory, isLoading } = useChatHistoryByUser();
  const [chat, setChat] = useState<IChatMessage[]>([]);

  useEffect(() => {
    if (chatbotHistory !== undefined && chatHistoryId !== '') {
      const filteredChat = chatbotHistory.find(item => item.id === chatHistoryId)

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
  }, [chatbotHistory])

  return (
    <>
      {
        isLoading
          ? <div className="w-full min-h-full flex flex-1 justify-center items-center">
            <Loader2 />
          </div>
          : <RecommendationBotForm chat={chat} setChat={setChat} id={chatHistoryId} />
      }
    </>
  )
}
