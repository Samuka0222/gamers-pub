'use client'

import Image from "next/image";
import { GamesListContainer } from "./_components/GamesListContainer";
import { RandomReviewCard, ReviewCardSkeleton } from "@/components/ReviewCard";
import { Skeleton } from "@/components/Skeleton";
import { useGetRandomReviews } from "@/hooks/useGetRandomReviews";
import { ErrorWarning } from "@/components/ErrorWarning";

export default function HomePage() {
  const { randomReviews, isLoading: isRandomReviewsLoading, error } = useGetRandomReviews();

  return (
    <section className="w-full h-full flex flex-col justify-center items-center px-5 py-6 overflow-x-hidden">
      <div className="w-full h-fit flex justify-center items-center">
        <div>
          <Image src='/logo-gamers-pub.png' width={180} height={180} alt="logo do Gamers Pub" />
        </div>
        <div className="w-fit text-3xl font-bold text-slate-600">
          <h1 className="uppercase flex flex-col gap-2">
            <span>Bem-vindo</span>
            <span>ao</span>
            <span className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Gamers&apos; Pub</span>
          </h1>
        </div>
      </div>
      <div className="w-full xl:w-[70%] h-full flex flex-col justify-center items-center mt-10">
        <h3 className="text-xl font-semibold">Confira algumas das últimas reviews.</h3>
        {error && (<ErrorWarning errorCause={error.message} />)}
        {
          isRandomReviewsLoading
            ? <div className="w-full h-full flex justify-center items-center mt-6 gap-8">
              <div className="w-[600px]">
                <ReviewCardSkeleton />
              </div>
              <div className="w-[600px]">
                <ReviewCardSkeleton />
              </div>
            </div>
            : <div className="w-full h-fit flex justify-center items-center mt-6 pb-3 overflow-x-auto">
              <ul
                className="w-full h-full flex gap-8 justify-start items-center"
              >
                {
                  randomReviews?.map(item => (
                    <li key={item.id} className="min-w-full md:min-w-full lg:min-w-[600px] relative">
                      <RandomReviewCard review={item} />
                    </li>
                  ))
                }
              </ul>
            </div>
        }
      </div>

      <div className="w-full h-fit flex flex-col justify-center items-center mt-10">
        <h3 className="text-xl font-semibold text-center">Games jogados recentemente por nossos membros</h3>
        {error && (<ErrorWarning errorCause={error.message} />)}
        {
          isRandomReviewsLoading
            ? <div className="w-full h-full flex gap-4 justify-center items-center mt-6">
              <Skeleton className="w-[150px] h-[230px]" />
              <Skeleton className="w-[150px] h-[230px]" />
              <Skeleton className="w-[150px] h-[230px]" />
              <Skeleton className="w-[150px] h-[230px]" />
              <Skeleton className="w-[150px] h-[230px]" />
              <Skeleton className="w-[150px] h-[230px]" />
            </div>
            : randomReviews !== undefined
              ? <div className="w-full h-full flex justify-center items-center mt-6 pb-3 overflow-x-auto">
                <ul
                  className="w-fit h-full flex flex-row-reverse gap-4 justify-center items-center"
                >
                  {
                    randomReviews.map(item => (
                      <li key={item.id} className="w-[150px] relative">
                        <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center text-base text-center font-medium text-transparent hover:bg-black/50 hover:text-white transition-colors">
                          {item.gameName}
                        </div>
                        <Image
                          src={item.gameCoverUrl}
                          alt={`capa do jogo ${item.gameName}`}
                          width={150}
                          height={230}
                        />
                      </li>
                    ))
                  }
                </ul>
              </div>
              : <p>Nada para ver aqui!</p>
        }
      </div>
      <div className="w-full h-full flex flex-col md:flex-row justify-center gap-10 md:gap-20 items-start mt-10">
        <div className="w-fit h-full">
          <h3 className="w-full text-lg text-center md:text-start font-semibold">
            Lançados recentemente
          </h3>
          <GamesListContainer type="released" />
        </div>
        <div className="w-fit h-full">
          <h3 className="w-full text-lg text-center md:text-start font-semibold">
            Lançando em breve
          </h3>
          <GamesListContainer type="upcoming" />
        </div>
      </div>
    </section>
  )
}
