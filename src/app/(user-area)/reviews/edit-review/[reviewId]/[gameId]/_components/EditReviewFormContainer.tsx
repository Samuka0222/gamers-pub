'use client'

/* eslint-disable react-hooks/exhaustive-deps */
import { IGameDetails } from "@/interfaces/IGame";
import { ReviewForm } from "@/app/(user-area)/reviews/_components/ReviewForm";
import { useGetReviewsByUser } from "@/hooks/useGetReviewsByUser";

interface EditReviewFormContainerProps {
  game: IGameDetails;
  reviewId: string
}

export function EditReviewFormContainer({ game, reviewId }: EditReviewFormContainerProps) {
  const { reviews } = useGetReviewsByUser();
  const filteredReview = reviews?.find(item => item.review.id === reviewId)

  return <ReviewForm game={game} review={filteredReview?.review} />
}
