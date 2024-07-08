import { ButtonsMenu } from "./_components/ButtonsMenu";
import { RecommendationBotForm } from "./_components/RecommendationBotForm";

export default function Home() {
  return (
    <section className="w-full h-full flex flex-col items-center overflow-hidden">
      <div className="w-full h-full flex flex-col items-center mt-11">
        <h2 className="text-center text-lg md:text-xl font-semibold">Precisa de alguma dica para escolher seu próximo jogo?</h2>
        <div className="w-full h-full px-4 md:px-8 lg:px-0 lg:w-[60%] flex flex-col">
          <ButtonsMenu />
          <RecommendationBotForm />
        </div>
      </div>
    </section>
  )
}
