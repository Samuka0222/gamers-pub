import { IReview } from '@/interfaces/IReview';
import { create } from 'zustand';

interface IReviewStore {
  reviews: IReview[];
  addReview: (review: IReview) => void;
  editReview: (review: IReview) => void;
}

export const useReviewsStore = create<IReviewStore>()((set) => ({
  reviews: [],
  addReview: (review) =>
    set((state) => ({
      reviews: state.reviews.concat({
        id: review.id,
        gameId: review.gameId,
        gameName: review.gameName,
        gameCoverUrl: review.gameCoverUrl,
        status: review.status,
        platform: review.platform,
        reviewText: review.reviewText,
        spoilers: review.spoilers,
        rating: review.rating,
        startDate: review.startDate,
        endDate: review.endDate,
        hoursPlayed: review.hoursPlayed,
        minutesPlayed: review.minutesPlayed,
        mastered: review.mastered,
        replay: review.replay,
      }),
    })),
  editReview: (review) =>
    set((state) => ({
      reviews: state.reviews.map((updatedReview) =>
        updatedReview.id !== review.id ? review : updatedReview,
      ),
    })),
}));
