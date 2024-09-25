'use client'

import { getUserChatBotHistory } from "@/actions/chatbot/getUserChatbotHistory"
import { Button } from "@/components/Button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/DropdownMenu"
import { IUserChatbotHistory } from "@/interfaces/IChat"
import { format } from "date-fns"
import { Clock, Loader2, PlusCircle } from "lucide-react"
import Link from "next/link"
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
      } catch {
        toast.error('Não foi possível obter o histórico do usuário')
      }
    }
    getUserChatbotHistoryList();
    setIsLoading(false);
  }, []);

  const updateUserChatbotHistoryList = async () => {
    setIsLoading(true)
    try {
      const response = await getUserChatBotHistory();
      setUserChatbotHistory(response);
    } catch {
      toast.error('Não foi possível obter o histórico do usuário')
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <nav className="w-auto flex justify-between lg:flex-col gap-4 mt-7 lg:lg:mt-5">
      <Button
        variant='outline'
        size='sm'
        className="text-gray-500"
        onClick={() => updateUserChatbotHistoryList}
        asChild
      >
        <Link href='/recommendations'>
          <>
            Novo Chat
            <PlusCircle className="ml-2" />
          </>
        </Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='outline'
            size='sm'
            className="text-gray-500"
          >
            <>
              Histórico
              <Clock className="ml-2" />
            </>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent >
          {
            !isLoading
              ? userChatbotHistory.length > 0
                ? userChatbotHistory.map((item) => (
                  <DropdownMenuItem key={item.created_at} className="cursor-pointer" asChild>
                    <Link href={`/recommendations/${item.id}`}>
                      {format(new Date(item.created_at), 'dd/MM/yyyy')}
                    </Link>
                  </DropdownMenuItem>
                ))
                : <DropdownMenuItem className="cursor-pointer">
                  Nenhum resultado...
                </DropdownMenuItem>
              : <div className="w-full h-full flex justify-center items-center">
                <Loader2 className="animate-spin" />
              </div>
          }
        </DropdownMenuContent>
      </DropdownMenu>
    </nav >
  )
}
