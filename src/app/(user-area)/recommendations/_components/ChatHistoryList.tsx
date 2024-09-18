import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { MarkdownText } from "@/components/MarkdownText";
import { IChatMessage } from "@/interfaces/IChat";
import { User2Icon, Bot } from "lucide-react";

interface ChatHistoryListProps {
  chatHistory: IChatMessage[];
}

export function ChatHistoryList({ chatHistory }: ChatHistoryListProps) {

  return (
    <div className="w-full flex flex-col flex-1 rounded-lg overflow-y-auto scroll">
      {
        chatHistory.length > 0 && (
          <ul className="w-full h-fit py-5 pr-3 text-base flex flex-col gap-4">
            {chatHistory.map((chatMessage, index) => (
              <li
                key={index}
                className='w-full flex text-justify justify-start items-start gap-4'
              >
                {
                  chatMessage.message.owner === 'user'
                    ? <div className="w-full flex gap-2">
                      <span>
                        <Avatar>
                          <AvatarImage />
                          <AvatarFallback>
                            <User2Icon />
                          </AvatarFallback>
                        </Avatar>
                      </span>
                      <span className="mt-[7px]">{chatMessage.message.text}</span>
                    </div>
                    : <div className="w-full flex gap-2">
                      <span>
                        <Avatar>
                          <AvatarFallback className="bg-slate-900 text-primary">
                            <Bot />
                          </AvatarFallback>
                        </Avatar>
                      </span>
                      <MarkdownText
                        markdown={chatMessage.message.text}
                        isPending={chatMessage.message.isPending}
                      />
                    </div>
                }
              </li>
            ))}
          </ul>
        )}
    </div>
  )
}
