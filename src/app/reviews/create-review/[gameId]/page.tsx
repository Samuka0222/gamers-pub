import { GameDetails } from "./_components/GameDetails";
import { Loader2Icon } from "lucide-react";
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
    <section className="w-full h-full py-6 px-5 flex flex-col items-center">
      <div className="w-full lg:max-w-[70%]">
        <h2 className="w-full text-2xl font-semibold text-center">Criar Avaliação</h2>
        <div className="w-full">
          <Suspense fallback={
            <div className="w-full">
              <Loader2Icon className="animate-spin" />
            </div>
          }>
            <GameDetails
              name={game.name}
              releaseDate={new Date(game.first_release_date)}
              coverUrl={`https:${game.cover.url!}`}
              platforms={game.platforms}
            />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
