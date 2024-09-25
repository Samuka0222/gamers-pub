import { ReviewForm } from "../../_components/ReviewForm";
import { getGameById } from "@/actions/games/getGameById";

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
    <section className="w-full min-h-full flex-1 pt-6 lg:py-6 md:px-5 flex flex-col justify-center items-center box-border">
      <div className="w-full min-h-full lg:w-[90%] 2xl:w-[70%]">
        <h2 className="w-full text-2xl font-semibold text-center">Criar Avaliação</h2>
        <div className="w-full h-fit px-5 py-6 lg:px-12 shadow-sm mt-6 mx-0 md:border md:rounded-lg">
          <ReviewForm game={game} />
        </div>
      </div>
    </section >
  )
}
