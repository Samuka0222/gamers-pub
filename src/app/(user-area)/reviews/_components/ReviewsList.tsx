import { getReviewsByUser } from "@/actions/reviews/getReviewsByUser";
import { IReviewRequest } from "@/interfaces/IReview";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ReviewCard, ReviewCardSkeleton } from "@/components/ReviewCard";
import { useGlobalStore } from "@/store/globalStore";

interface ReviewsListProps {
  reviews: IReviewRequest[],
  setReviews: React.Dispatch<React.SetStateAction<IReviewRequest[]>>
}

export function ReviewsList({ reviews, setReviews }: ReviewsListProps) {
  const { user } = useGlobalStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await getReviewsByUser();
        if (response) {
          setReviews(response);
          setIsLoading(false);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.message);
        }
      }
    }
    if (user !== undefined) {
      getReviews();
    }
  }, [user]);

  return (
    <>
      {
        isLoading
          ? <div className="min-w-full h-full flex flex-col justify-center items-center gap-4">
            <ReviewCardSkeleton />
            <ReviewCardSkeleton />
          </div>
          : reviews.length === 0
            ? <div className="min-w-full h-full flex flex-col justify-center items-center gap-4">
              <h4 className="text-gray-500 text-lg">Nada para ver aqui...</h4>
              <p>¯\_(ツ)_/¯</p>
            </div>
            : < ul className="w-full h-full flex flex-col justify-center items-center gap-4 md:gap-8 lg:gap-10">
              {
                reviews.map(reviewItem => <li key={reviewItem.review.id} className="w-full lg:w-[800px] h-fit">
                  <ReviewCard review={reviewItem.review} />
                </li>)
              }
            </ul >
      }
    </>
  )
}
