export interface IReview {
  id: number;
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
  hoursPlayed?: number;
  minutesPlayed?: number;
  mastered?: boolean;
  replay?: boolean;
}
