'use client'

import { getUserChatBotHistory } from "@/actions/chatbot/getUserChatbotHistory"
import { Button } from "@/components/Button"
import { IUserChatbotHistory } from "@/interfaces/IChat"
import { format } from "date-fns"
import { Loader2, PlusCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export function ChatbotMenu() {
  const [userChatbotHistory, setUserChatbotHistory] = useState<IUserChatbotHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUserChatbotHistoryList = async () => {
      setIsLoading(true)
      try {
        const response = await getUserChatBotHistory();
        setUserChatbotHistory(response);
        console.log(response)
      } catch {
        toast.error('Não foi possível obter o histórico do usuário')
      }
    }
    getUserChatbotHistoryList();
    setIsLoading(false);
  }, [])

  const router = useRouter();


  return (
    <nav className="w-auto flex lg:flex-col gap-4 py-5">
      <Button
        variant='outline'
        size='sm'
        className="text-gray-500"
        asChild
      >
        <Link href='/recommendations'>
          <>
            Novo Chat
            <PlusCircle className="ml-2" />
          </>
        </Link>
      </Button>
      <div className="w-full h-fit lg:border-t">
        <h4 className="w-full text-center font-medium">Chats anteriores</h4>
        <ul className="w-full flex lg:flex-col gap-2 lg:mt-2">
          {
            isLoading
              ? <div className="w-full h-full flex justify-center items-center">
                <Loader2 className="animate-spin" />
              </div>
              : userChatbotHistory.map((item) => (
                <li key={item.created_at}>
                  <Button
                    variant='outline'
                    className="w-full"
                    size='sm'
                    onClick={() => router.push(`/recommendations/${item.id}`)}
                  >
                    {format(new Date(item.created_at), 'dd/MM/yyyy')}
                  </Button>
                </li>
              ))
          }
        </ul>
      </div>
    </nav>
  )
}
