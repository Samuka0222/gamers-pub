import { RecommendationBotForm } from "./_components/RecommendationBotForm";

export default async function RecommendationsPage() {
  return (
    <div className="min-w-full md:min-w-[80%] lg:min-w-[70%] min-h-full flex flex-col flex-1 justify-center items-center">
      <h2 className="font-semibold text-2xl text-center w-[80%] md:w-full">Precisa de alguma dica para escolher seu próximo jogo?</h2>
      <h3 className="font-medium text-base text-center w-[80%] md:w-full mt-2 mb-4 text-gray-500">Converse com o nosso bot para descobrir jogos que você possa gostar!</h3>
      <RecommendationBotForm id='' />
    </div>
  )
}
