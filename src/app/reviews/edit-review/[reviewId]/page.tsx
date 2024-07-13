import { getGameById } from "@/actions/getGameById";
import { ReviewForm } from "@/components/ReviewForm";
import { useReviewsStore } from "@/store/reviewsStore";
import { GameDetails } from "@/components/GameDetails";
import { Suspense } from "react";
import { Loader2Icon } from "lucide-react";
import { UserProfile } from "../../create-review/[gameId]/_components/UserProfile";

interface EditReviewPageProps {
  params: {
    reviewId?: number;
  }
}

export default async function EditReviewPage({ params }: EditReviewPageProps) {
  if (!params) {
    // TODO: Create Error Page
    return null;
  }

  const editingReview = useReviewsStore.getState().reviews.filter(review => review.id === params.reviewId);
  const gameInReview = await getGameById(editingReview[0].gameId);

  if (!gameInReview) {
    // TODO: Create Error Page
    return null;
  }

  return (
    <section className="w-full h-fit py-6 px-5 flex flex-col items-center">
      <div className="w-full h-fit lg:max-w-[70%]">
        <h2 className="w-full text-2xl font-semibold text-center">Editar Avaliação</h2>
        <div className="w-full h-fit bg-slate-900 p-3 lg:py-6 lg:px-12 shadow-sm mt-6 border rounded-lg">
          <div className="w-full flex justify-between">
            <Suspense fallback={
              <div className="w-full h-full flex justify-center items-center">
                <Loader2Icon className="animate-spin" />
              </div>
            }>
              <GameDetails
                name={gameInReview.name}
                releaseDate={gameInReview.first_release_date}
                coverUrl={`https:${gameInReview.cover.url!}`}
                platforms={gameInReview.platforms}
              />
            </Suspense>
            <div className="hidden lg:block lg:w-[30%]">
              <UserProfile />
            </div>
          </div>
          <ReviewForm game={gameInReview} review={editingReview[0]} />
        </div>
      </div>
    </section >
  )
}
