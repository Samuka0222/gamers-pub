import { GameDetails } from "./_components/GameDetails";
import { Loader2Icon } from "lucide-react";
import { ReviewForm } from "@/components/ReviewForm";
import { Suspense } from "react";
import { getGameById } from "@/actions/getGameById";


interface CreateReviewPageProps {
  params: {
    gameId?: number;
  }
}

export default async function CreateReviewPage({ params }: CreateReviewPageProps) {
  if (!params) {
    return null;
  }

  const game = await getGameById(params.gameId!);

  if (!game) {
    return null;
  }

  return (
    <section className="w-full py-6 px-5 flex flex-col items-center">
      <div className="w-full h-full lg:max-w-[70%]">
        <h2 className="w-full text-2xl font-semibold text-center">Criar Avaliação</h2>
        <div className="w-full h-full bg-slate-900 py-6 px-12 shadow-sm mt-4 border rounded-lg">
          <Suspense fallback={
            <div className="w-full">
              <Loader2Icon className="animate-spin" />
            </div>
          }>
            <GameDetails
              name={game.name}
              releaseDate={game.first_release_date}
              coverUrl={`https:${game.cover.url!}`}
              platforms={game.platforms}
            />
          </Suspense>
          <ReviewForm platforms={game.platforms} />
        </div>
      </div>
    </section >
  )
}
