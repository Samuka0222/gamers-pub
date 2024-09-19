'use client'

import { getRandomReviews } from "@/actions/reviews/getRandomReviews";
import { IReviewRequest } from "@/interfaces/IReview";
import { useGlobalStore } from "@/store/globalStore";
import { Loader2 } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { ReviewCard } from "@/components/ReviewCard";
import Image from "next/image";
import { GamesList } from "./_components/ReleasedGames";

export default function HomePage() {
  const { user } = useGlobalStore();

  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [reviews, setReviews] = useState<IReviewRequest[]>([]);
  const [isLoading, SetIsLoading] = useState(false);

  useEffect(() => {
    const getRandomReviewsforUser = async () => {
      SetIsLoading(true);
      const response = await getRandomReviews();
      setReviews(response.Items);
      SetIsLoading(false);
    }

    getRandomReviewsforUser();
  }, [])

  useEffect(() => {
    if (user !== undefined) {
      setUserName(user.username);
    }
  }, [user])

  return (
    <section className="w-full xl:w-[70%] h-full flex flex-col justify-center items-center px-5 py-6">
      <div className="w-full h-fit flex justify-center items-center">
        <h2 className="w-fit text-3xl font-bold text-slate-600">
          {userName !== undefined ? 'Bem-vindo de volta ao' : 'Bem-vindo ao'}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ml-2">
            Gamers&apos; Pub!
          </span>
        </h2>
      </div>
      <div className="w-full flex flex-col justify-center items-center mt-10">
        <h3 className="text-xl font-semibold">Ultimas reviews</h3>
        {
          isLoading
            ? <div className="w-full h-full flex justify-center items-center">
              <Loader2 className="animate-spin" />
            </div>
            : <div className="w-full h-fit flex justify-center items-center mt-6">
              <ul className="w-full h-full flex gap-4 justify-center items-center overflow-x-auto">
                {
                  reviews.map(item => (
                    <li key={item.created_at} className="w-[800px] ">
                      <ReviewCard review={item.review} />
                    </li>
                  ))
                }
              </ul>
            </div>
        }
      </div>

      <div className="w-full flex flex-col justify-center items-center mt-10">
        <h3 className="text-xl font-semibold text-center">Games jogados recentemente por nossos membros</h3>
        {
          isLoading
            ? <div className="w-full h-full flex justify-center items-center">
              <Loader2 className="animate-spin" />
            </div>
            : <div className="w-fit h-fit flex justify-center items-center mt-6">
              <ul className="w-fit h-full flex flex-row-reverse gap-4 justify-center items-center overflow-x-auto">
                {
                  reviews.map(item => (
                    <li key={item.created_at} className="w-auto relative">
                      <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center text-base text-center font-medium text-transparent hover:bg-black/50 hover:text-white transition-colors">
                        {item.review.gameName}
                      </div>
                      <Image
                        src={item.review.gameCoverUrl}
                        alt={`capa do jogo ${item.review.gameName}`}
                        width={150}
                        height={230}
                      />
                    </li>
                  ))
                }
              </ul>
            </div>
        }
      </div>
      <Suspense fallback={
        <div className="w-full h-20 flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      }>
        <div className="w-full h-full flex justify-center gap-20 items-start mt-10">
          <GamesList type="released" />
          <GamesList type="upcoming" />
        </div>
      </Suspense>
    </section>
  )
}
