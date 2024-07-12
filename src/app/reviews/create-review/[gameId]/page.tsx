import { GameDetails } from "./_components/GameDetails";
import { Loader2Icon } from "lucide-react";
import { ReviewForm } from "@/components/ReviewForm";
import { Suspense } from "react";
import { getGameById } from "@/actions/getGameById";
import { UserProfile } from "./_components/UserProfile";


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
    // TODO: Responsiveness
    <section className="w-full h-full py-6 px-5 flex flex-col items-center">
      <div className="w-full h-full lg:max-w-[70%]">
        <h2 className="w-full text-2xl font-semibold text-center">Criar Avaliação</h2>
        <div className="w-full h-full bg-slate-900 p-3 lg:py-6 lg:px-12 shadow-sm mt-6 border rounded-lg">
          <div className="w-full flex justify-between">
            <Suspense fallback={
              <div className="w-full h-full flex justify-center items-center">
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
            <div className="hidden lg:block lg:w-[30%]">
              <UserProfile />
            </div>
          </div>
          <ReviewForm game={game} />
        </div>
      </div>
    </section >
  )
}
