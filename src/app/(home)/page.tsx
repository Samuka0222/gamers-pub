import { ButtonsMenu } from "./_components/ButtonsMenu";
import { HeaderMenu } from "@/components/HeaderMenu";
import { RecommendationBotForm } from "./_components/RecommendationBotForm";

export default function Home() {
  return (
    <section className="w-full h-full flex flex-col items-center">
      <HeaderMenu />
      <div className="w-full h-full flex flex-col items-center mt-11">
        <h2 className="text-center text-xl font-semibold">Precisa de alguma dica para seu próximo jogo?</h2>
        <div className="w-[60%] flex flex-col">
          <ButtonsMenu />
          <RecommendationBotForm />
        </div>
      </div>
    </section>
  )
}
