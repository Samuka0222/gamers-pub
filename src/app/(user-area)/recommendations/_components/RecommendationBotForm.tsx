'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { Bot, ImagePlus, SendHorizonal, User2Icon } from "lucide-react";
import {
  GoogleGenerativeAIError,
  GoogleGenerativeAIFetchError,
  GoogleGenerativeAIRequestInputError,
  GoogleGenerativeAIResponseError
} from "@google/generative-ai";

import { useOptimistic, useState } from "react";

import { MarkdownText } from "../../../../components/MarkdownText";
import { Button } from "@/components/Button";
import { IChatMessage } from "@/interfaces/IChat";
import { Input } from "@/components/Input";
import { SubmitButton } from "@/components/SubmitButton";
import { getRandomPhrase } from "@/lib/phrases";
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

      const response = await sendBotMessage({ userPrompt });

      setChat(prevState => prevState.concat({
        message: {
          text: response,
          owner: 'bot',
          isPending: false
        }
      }));
      addMessageToChat('user', userPrompt);
      addMessageToChat('model', response);
      setUserPrompt('');
    } catch (error) {
      if (error instanceof GoogleGenerativeAIError) {
        toast.error(error.message);
      };

      if (error instanceof GoogleGenerativeAIResponseError) {
        toast.error(error.message);
      };

      if (error instanceof GoogleGenerativeAIFetchError) {
        toast.error(error.message);
      };

      if (error instanceof GoogleGenerativeAIRequestInputError) {
        toast.error(error.message);
      };
    }
  }

  return (
    <form
      action={submitAction}
      className="w-full h-full"
    >
      <div className="w-full h-[550px] md:h-[330px] xl:h-[600px] rounded-lg overflow-auto">
        {optimisticChat.length > 0 && (
          <ul className="w-full py-5 pr-3 text-base flex flex-col gap-4">
            {optimisticChat.map((chatMessage, index) => (
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
