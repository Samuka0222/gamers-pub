import { GameDetails } from "@/components/GameDetails";
import { ReviewForm } from "../../_components/ReviewForm";
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
    <section className="w-full h-fit pt-6 lg:py-6 md:px-5 flex flex-col items-center box-border">
      <div className="w-full h-fit lg:w-[90%] 2xl:w-[70%]">
        <h2 className="w-full text-2xl font-semibold text-center">Criar Avaliação</h2>
        <div className="w-full h-fit bg-slate-900 px-5 py-6 lg:px-12 shadow-sm mt-6 mx-0 md:border md:rounded-lg">
          <div className="w-full flex justify-between">
            <GameDetails
              name={game.name}
              releaseDate={game.first_release_date}
              coverUrl={`https:${game.cover.url!}`}
              platforms={game.platforms}
            />
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
