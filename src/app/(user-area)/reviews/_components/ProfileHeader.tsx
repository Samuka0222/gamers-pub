'use client'

import { Calendar, Gamepad, ScrollText, Trash2, User2Icon } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { IReviewRequest } from "@/interfaces/IReview";

interface ProfileHeaderProps {
  reviews: IReviewRequest[]
}

export function ProfileHeader({ reviews }: ProfileHeaderProps) {
  const { user } = useUserStore();
  const completedReviews = reviews.filter(item => item.review.status === 'completed');
  const playingGames = reviews.filter(item => item.review.status === 'playing');

  return (
    <div className="w-full h-[100px] flex justify-between items-center">
      <div className="w-full h-full items-center flex gap-2">
        <div className="h-full w-24 bg-gray-400 rounded-lg flex justify-center items-center">
          <User2Icon size={40} />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">{user?.username}</h2>
          <span className="text-base font-medium text-gray-600">{user?.title}</span>
        </div>
      </div>
      <ul className="w-[15%] flex flex-col gap-4 justify-center items-start font-medium">
        <li>
          <span className="flex">
            <ScrollText className="mr-1" />
            {completedReviews.length} Reviews
          </span>
        </li>
        <li>
          <span className="flex">
            <Gamepad className="mr-1" />
            {playingGames.length} Playing
          </span>
        </li>
      </ul>
    </div>
  )
}
