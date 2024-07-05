'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

type IInput = {
  userPrompt: string;
};

export async function sendBotMessage({ userPrompt }: IInput) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const parts = [
    'Você é um bot do Gamers Pub que recomenda jogos baseado nas características que o usuário enviar, você deve somente recomendar 5 jogos, falar um breve resumo de cada jogo que você recomendar, você não deve responder outras perguntas que não seja pedindo recomendação de jogos, você tem a liberdade de responder em qualquer idioma que usuário perguntar',
  ];

  const prompt = parts.concat(userPrompt);
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}
