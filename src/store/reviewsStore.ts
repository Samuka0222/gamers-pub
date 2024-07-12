import { IReview } from '@/interfaces/IReview';
import { create } from 'zustand';

interface IReviewStore {
  reviews: IReview[];
  addReview: (review: IReview) => void;
  editReview: (review: IReview) => void;
}

export const useReviewsStore = create<IReviewStore>()((set) => ({
  reviews: [
    {
      id: 4,
      gameId: 248568,
      gameName: 'The Sims 3',
      gameCoverUrl:
        'https:////images.igdb.com/igdb/image/upload/t_cover_big/co8dgc.jpg',
      status: 'playing',
      reviewText: '',
      spoilers: false,
      rating: 99,
      platform: 'PC (Microsoft Windows)',
      startDate: new Date('2023-12-01'),
      endDate: new Date('2024-01-31'),
      hoursPlayed: 60,
      minutesPlayed: 45,
      mastered: false,
      replay: false,
    },
    {
      id: 1,
      gameId: 7348,
      gameName: 'Halo: The Master Chief Collection',
      gameCoverUrl:
        'https:////images.igdb.com/igdb/image/upload/t_cover_big/co1t95.jpg',
      status: 'completed',
      reviewText: 'Game PEAK',
      spoilers: false,
      rating: 89,
      platform: 'Xbox 360',
      startDate: new Date('2022-01-01'),
      endDate: new Date('2022-01-31'),
      hoursPlayed: 20,
      minutesPlayed: 45,
      mastered: true,
      replay: true,
    },
    {
      id: 2,
      gameId: 3966,
      gameName: 'Killer7',
      gameCoverUrl:
        'https:////images.igdb.com/igdb/image/upload/t_cover_big/co1owa.jpg',
      status: 'completed',
      reviewText: 'Não entendi nada, mas gostei.',
      spoilers: false,
      rating: 85,
      platform: 'PC (Microsoft Windows)',
      startDate: new Date('2024-03-28'),
      endDate: new Date('2024-04-04'),
      hoursPlayed: 7,
      minutesPlayed: 20,
      mastered: false,
      replay: false,
    },
    {
      id: 3,
      gameId: 43,
      gameName: 'Deus Ex: Human Revolution',
      gameCoverUrl:
        'https:////images.igdb.com/igdb/image/upload/t_cover_big/co1rd2.jpg',
      status: 'completed',
      reviewText: 'Quero ser que nem o Adam Jensen quando crescer',
      spoilers: true,
      rating: 92,
      platform: 'PC (Microsoft Windows)',
      startDate: new Date('2024-04-11'),
      endDate: new Date('2024-05-06'),
      hoursPlayed: 7,
      minutesPlayed: 20,
      mastered: false,
      replay: false,
    },
  ],
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
