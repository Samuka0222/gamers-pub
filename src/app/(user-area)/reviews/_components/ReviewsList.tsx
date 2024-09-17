import { getReviewsByUser } from "@/actions/reviews/getReviewsByUser";
import { IReviewRequest } from "@/interfaces/IReview";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { toast } from "sonner";
import { ReviewCard } from "./ReviewCard";
import { useUserStore } from "@/store/userStore";

interface ReviewsListProps {
  reviews: IReviewRequest[],
  setReviews: React.Dispatch<React.SetStateAction<IReviewRequest[]>>
}

export function ReviewsList({ reviews, setReviews }: ReviewsListProps) {
  const { user } = useUserStore()
  console.log(user)

  useEffect(() => {
    const getReviews = async () => {
      console.log('disparou o fetch')
      try {
        const response = await getReviewsByUser();
        if (response) {
          setReviews(response.Items);
          console.log(response);
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
    <ul className="w-full h-full flex flex-col gap-4">
      {
        reviews.length === 0
          ? <p className="w-full text-center text-lg font-medium">Nenhuma review feita ainda.</p>
          : reviews.map(reviewItem => <li key={reviewItem.review.id} className="w-full h-full">
            <ReviewCard review={reviewItem.review} />
          </li>)
      }
    </ul>
  )
}
