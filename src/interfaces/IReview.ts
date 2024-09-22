export interface IReview {
  id: string;
  gameId: number;
  gameName: string;
  gameCoverUrl: string;
  status: string;
  reviewText: string;
  spoilers: boolean;
  platform?: string;
  rating?: number;
  startDate?: Date;
  endDate?: Date;
  timePlayed?: string;
  mastered?: boolean;
  author: string;
}

export interface IReviewRequest {
  created_at: string;
  review: IReview;
}
