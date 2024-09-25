'use client'

/* eslint-disable react-hooks/exhaustive-deps */
import { getReviewById } from "@/actions/reviews/getReviewById";
import { IGameDetails } from "@/interfaces/IGame";
import { IReview } from "@/interfaces/IReview";
import { useEffect, useState, useTransition } from "react";
import { ReviewForm } from "@/app/(user-area)/reviews/_components/ReviewForm";
import { Loader2 } from "lucide-react";

interface EditReviewFormContainerProps {
  game: IGameDetails;
  reviewId: string
}

export function EditReviewFormContainer({ game, reviewId }: EditReviewFormContainerProps) {
  const [review, setReview] = useState<IReview | undefined>(undefined);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const getReviewData = async () => {
      setIsPending(true);
      try {
        const response = await getReviewById(reviewId);
        setReview(response.review.review)
      } catch (error) {
        alert('Error ' + error)
      } finally {
        setIsPending(false);
      }
    }
    getReviewData();
  }, [])

  return (
    <>
      {
        isPending
          ? <div className="w-full h-full flex justify-center items-center">
            <Loader2 className="animate-spin" />
          </div>
          : <ReviewForm game={game} review={review!} />
      }
    </>
  )
}
