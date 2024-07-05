'use client'

import { Input } from "@/components/Input";
import { sendBotMessage } from "@/actions/sendBotMessage";

import { useState } from "react";

export function RecommendationBot() {
  const [inputText, setPromptText] = useState('');
  const [botResponse, setBotResponse] = useState<String | undefined>(undefined);
  const [prompts, setPrompts] = useState<String[]>([])

  const submitAction = async () => {
    setPrompts(prevState => prevState.concat(inputText));
    const response = await sendBotMessage({
      userPrompt: inputText
    });
    setBotResponse(response);
    setPromptText('');
  }

  return (
    <form
      action={submitAction}
      className="w-[60%] h-full mt-8 flex flex-col items-center"
    >
      <h2 className="text-center text-xl font-semibold">Precisa de alguma dica para seu próximo jogo?</h2>
      <div className="mt-5 h-[600px] w-full border border-gray-300 shadow-sm rounded-lg">
        {prompts.length > 0 && (
          <ul className="w-full p-3 text-base flex flex-col gap-2">
            {prompts.map((prompt, index) => (
              <li
                key={index}
                className="w-fit py-2 px-4 bg-gray-200 rounded-xl self-end"
              >
                {prompt}
              </li>
            ))}
            {
              botResponse && (
                <div className="w-full py-2 px-4 bg-gray-200 rounded-xl self-end">
                  {botResponse}
                </div>
              )
            }
          </ul>
        )}
      </div>
      <div className="w-full mt-4 h-16 border border-gray-300 text-base rounded-lg shadow-sm">
        <Input
          className="w-full h-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          type="text"
          placeholder="Digite sua pergunta aqui"
          value={inputText}
          onChange={(e) => setPromptText(e.target.value)}
        />
      </div>
    </form>
  )
}
