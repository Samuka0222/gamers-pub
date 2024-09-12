export interface IReview {
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
}

export interface IReviewRequest {
  created_at: string;
  entity_type: string;
  pk: string;
  sk: string;
  review: IReview;
}
