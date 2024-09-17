'use client'

import { useEffect, useState } from "react";
import { RecommendationBotForm } from "./RecommendationBotForm";
import { IChatMessage } from "@/interfaces/IChat";
import { getChatHistoryById } from "@/actions/chatbot/getChatHistoryById";
import { Loader2 } from "lucide-react";

export function ChatbotContainer({ chatHistoryId }: { chatHistoryId: string }) {
  const [chat, setChat] = useState<IChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getChatHistory = async () => {
      const response = await getChatHistoryById(chatHistoryId);
      setChat(response.chatHistory)
    };

    if (chatHistoryId !== '') {
      getChatHistory();
    }

    setIsLoading(false);
  }, []);

  return (
    <>
      {
        isLoading
          ? <div className="w-full h-full flex justify-center items-center">
            <Loader2 />
          </div>
          : <RecommendationBotForm chat={chat} setChat={setChat} id={chatHistoryId} />
      }
    </>
  )
}
