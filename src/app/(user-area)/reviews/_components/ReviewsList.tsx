'use client'

import { ReviewCard, ReviewCardSkeleton } from "@/components/ReviewCard";
import { useGetReviewsByUser } from "@/hooks/useGetReviewsByUser";

export function ReviewsList() {
  const { reviews, isLoading } = useGetReviewsByUser();
  return (
    <>
      {
        isLoading
          ? <div className="min-w-full h-full flex flex-col justify-center items-center gap-4">
            <ReviewCardSkeleton />
            <ReviewCardSkeleton />
          </div>
          : reviews?.length === 0
            ? <div className="min-w-full h-full flex flex-col justify-center items-center gap-4">
              <h4 className="text-gray-500 text-lg">Nada para ver aqui...</h4>
              <p>¯\_(ツ)_/¯</p>
            </div>
            : < ul className="w-full h-full flex flex-col justify-center items-center gap-4 md:gap-8 lg:gap-10">
              {
                reviews?.map(reviewItem => <li key={reviewItem.review.id} className="w-full h-fit">
                  <ReviewCard review={reviewItem.review} />
                </li>)
              }
            </ul >
      }
    </>
  )
}
