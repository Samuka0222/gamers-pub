'use client'

import { deleteChatHistory } from "@/actions/chatbot/deleteChatHistory"
import { getUserChatBotHistory } from "@/actions/chatbot/getUserChatbotHistory"
import { Button } from "@/components/Button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/DropdownMenu"
import { IUserChatbotHistory } from "@/interfaces/IChat"
import { format } from "date-fns"
import { Clock, Loader2, PlusCircle, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export function ChatbotMenu({ chatId }: { chatId: string }) {
  const [userChatbotHistory, setUserChatbotHistory] = useState<IUserChatbotHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

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
  }, [chatId]);

  const deleteChatHistoryAction = async (chatHistoryId: string) => {
    try {
      setIsDeleting(true);
      await deleteChatHistory(chatHistoryId);
      toast.success('Conversa deletada com sucesso!');
      setIsDeleting(false);
      router.push('/recommendations');
    } catch (error) {
      toast.error("Erro ao deletar o histórico :/")
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <nav className="w-full flex justify-between gap-4 mt-7 lg:lg:mt-5">
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
      {
        chatId !== '' && (
          <Button
            variant='destructive'
            type="button"
            size='sm'
            className="text-white"
            onClick={() => deleteChatHistoryAction(chatId)}
          >
            {
              isDeleting ? <>
                Deletando ...
                <Loader2 className="animate-spin ml-2" />
              </>
                : <>
                  Deletar conversa
                  <Trash2 className="ml-2" />
                </>
            }
          </Button>
        )
      }
    </nav >
  )
}
