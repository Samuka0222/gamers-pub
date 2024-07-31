import { Metadata } from "next";
import { ButtonsMenu } from "./_components/ButtonsMenu";
import { RecommendationBotForm } from "./_components/RecommendationBotForm";

export const metadata: Metadata = {
  title: 'Recomendações',
  description: "Com dúvidas de qual jogo jogar? Acesse nosso chatbot de recomendação de jogos e monte uma lista de games para você jogar!",
};

export default function Home() {
  return (
    <section className="w-full py-6 md:py-10 px-5 flex flex-col justify-center items-center">
      <h2 className="font-semibold text-xl text-center w-[80%] md:w-full">Precisa de alguma dica para escolher seu próximo jogo?</h2>
      <div className="w-full md:w-[80%] xl:w-[60%] h-full mt-2 md:mt-0">
        <ButtonsMenu />
        <RecommendationBotForm />
      </div>
    </section>
  )
}
