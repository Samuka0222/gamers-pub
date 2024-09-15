import { Suspense } from "react";
import { EditReviewFormContainer } from "./_components/EditReviewFormContainer";
import { Loader2 } from "lucide-react";
import { getGameById } from "@/actions/games/getGameById";

interface EditReviewPageProps {
  params: {
    reviewId?: string;
    gameId?: number;
  }
}

export default async function EditReviewPage({ params }: EditReviewPageProps) {
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
        <h2 className="w-full text-2xl font-semibold text-center">Editar Avaliação</h2>
        <div className="w-full h-fit px-5 py-6 lg:px-12 shadow-sm mt-6 mx-0 md:border md:rounded-lg">
          <Suspense fallback={<div className="w-full h-full flex justify-center items-center"><Loader2 className="animate-spin" /></div>}>
            <EditReviewFormContainer game={game} reviewId={params.reviewId!} />
          </Suspense>
        </div>
      </div>
    </section >
  )
}
