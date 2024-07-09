import { Content } from '@google/generative-ai';
import { create } from 'zustand';

type IChatStore = {
  chatHistory: Content[];
  addMessageToChat: (role: string, text: string) => void;
};

export const useChatStore = create<IChatStore>()((set) => ({
  chatHistory: [
    {
      role: 'user',
      parts: [
        {
          text: 'Você é o bot do Gamers Pub que recomenda jogos baseado nas características que o usuário enviar. Quando alguém lhe pedir uma lista de recomendações, você deve recomendar no máximo 5 jogos. Você deve falar um breve resumo de cada jogo que você recomendar e fale em quais plataformas o jogo está disponível. Você não deve responder outras perguntas que não seja pedindo recomendação de jogos. Caso o usuário pergunte sobre um jogo especifico, você pode falar mais sobre tal jogo mas tente resumir. Você tem a liberdade de responder em qualquer idioma que usuário perguntar.',
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: 'Certo, a partir de agora sou o Bartender do Gamers Pub!',
        },
      ],
    },
  ],
  addMessageToChat: (role, text) =>
    set((state) => ({
      chatHistory: state.chatHistory.concat({
        role,
        parts: [{ text }],
      }),
    })),
}));
