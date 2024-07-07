'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { Bot, ImagePlus, SendHorizonal, User2Icon } from "lucide-react";
import { useOptimistic, useState } from "react";
import { BotResponse } from "./BotResponse";
import { Button } from "@/components/Button";
import { GoogleGenerativeAIResponseError } from "@google/generative-ai";
import { IChatMessage } from "@/interfaces/IChat";
import { Input } from "@/components/Input";
import { SubmitButton } from "@/components/SubmitButton";
import { sendBotMessage } from "@/actions/sendBotMessage";
import { toast } from "sonner";
import { useChatStore } from "@/store/chatStore";

export function RecommendationBotForm() {
  const [userPrompt, setUserPrompt] = useState('');
  const [chat, setChat] = useState<IChatMessage[]>([]);

  const { addMessageToChat } = useChatStore();

  const [optimisticChat, addOptimisticChat] = useOptimistic(
    chat,
    (prevMessages, newMessages: IChatMessage) => {
      return prevMessages.concat(newMessages)
    }
  );

  // TODO: Implementar o UseActionState

  const submitAction = async () => {
    try {
      addOptimisticChat({
        message: {
          text: userPrompt,
          isPending: false,
          owner: 'user'
        }
      });

      setChat(prevState => prevState.concat({
        message: {
          text: userPrompt,
          isPending: false,
          owner: 'user'
        }
      }));

      addOptimisticChat({
        message: {
          text: userPrompt,
          isPending: true,
          owner: 'bot'
        }
      });

      addMessageToChat('user', userPrompt);

      const response = await sendBotMessage({ userPrompt });

      setChat(prevState => prevState.concat({
        message: {
          text: response,
          owner: 'bot',
          isPending: false
        }
      }));

      addMessageToChat('model', response)

      setUserPrompt('');
    } catch (error) {
      if (error instanceof GoogleGenerativeAIResponseError) {
        toast.error(error.message);
      };
    }
  }

  return (
    <form
      action={submitAction}
      className="w-full h-full flex flex-col items-center"
    >
      <div className="h-[600px] w-full border border-gray-300 shadow-sm rounded-lg overflow-y-auto">
        {optimisticChat.length > 0 && (
          <ul className="w-full py-5 px-10 text-base flex flex-col gap-4">
            {optimisticChat.map((chatMessage, index) => (
              <li
                key={index}
                className='w-full flex text-justify justify-start items-start gap-2'
              >
                {
                  chatMessage.message.owner === 'user'
                    ? <>
                      <span>
                        <Avatar>
                          <AvatarImage />
                          <AvatarFallback>
                            <User2Icon />
                          </AvatarFallback>
                        </Avatar>
                      </span>
                      <p className="mt-[6px]">{chatMessage.message.text}</p>
                    </>
                    : <>
                      <span>
                        <Avatar>
                          <AvatarFallback>
                            <Bot />
                          </AvatarFallback>
                        </Avatar>
                      </span>
                      <BotResponse
                        markdown={chatMessage.message.text}
                        isPending={chatMessage.message.isPending}
                      />
                    </>
                }
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="w-full flex justify-between items-center mt-4 h-16 border border-gray-300 text-base rounded-lg shadow-sm p-3">
        <Input
          className="flex-1 h-full border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 overflow-y-auto"
          type="text"
          placeholder="Digite sua pergunta aqui"
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          required
        />
        <div className="flex gap-2 justify-center items-center">
          <Button
            variant='outline'
            type="button"
            size='icon'
            className="rounded-full border-none h-10 w-10 p-0 flex justify-center items-center"
            disabled
          >
            <ImagePlus />
          </Button>
          <SubmitButton>
            <SendHorizonal />
          </SubmitButton>
        </div>
      </div>
    </form>
  )
}


// className={cn(
//   chatMessage.message.owner === 'user'
//     ? "w-fit py-2 px-4 bg-gray-200 rounded-xl self-end"
//     : "w-fit py-2 px-4 bg-gray-200 rounded-xl self-start"
// )}
