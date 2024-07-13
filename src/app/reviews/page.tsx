'use client'

import { Gamepad, PlusCircleIcon, ScrollText } from "lucide-react";
import { ProfileHeader } from "./_components/ProfileHeader";
import { SearchGameForm } from "./_components/SearchGameForm";
import { searchByGameName } from "@/actions/searchByGameName";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/Dialog";
import { Button } from "@/components/Button";
import { useReviewsStore } from "@/store/reviewsStore";
import { ReviewCard } from "./_components/ReviewCard";

export default function ReviewsPage() {
  const { reviews } = useReviewsStore();
  const completedReviews = reviews.filter(review => review.status === "completed")
  const playingGames = reviews.filter(review => review.status === "playing")
  const ordernedReviews = reviews.sort((a, b) => b.id - a.id)

  return (
    <section className="w-full h-full px-2 lg:px-6 py-5 flex flex-col items-center">
      <div className="w-full lg:w-[60%]">
        <ProfileHeader />
        <div className="w-full flex justify-between items-center mt-5">
          <h1 className="text-2xl font-semibold">Reviews</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='default' className="bg-slate-900 text-white hover:bg-slate-900 hover:text-secondary text-sm font-medium">
                <PlusCircleIcon className="mr-2" /> Avaliação
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-transparent border-none shadow-none">
              <DialogHeader>
                <DialogTitle className="text-2xl text-center text-primary mb-2">Criar nova Avaliação</DialogTitle>
                <DialogDescription className="text-center text-white">
                  Pesquise e clique sobre o jogo que deseja criar uma avaliação
                </DialogDescription>
              </DialogHeader>
              <SearchGameForm searchGameByName={searchByGameName} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="mt-5 w-full flex flex-col justify-center items-center">
          <ul className="flex gap-4 justify-center items-center font-medium mb-5">
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
          <div className="w-full h-full flex flex-col gap-4">
            {
              ordernedReviews.map(review => <ReviewCard key={review.id} review={review} />)
            }
          </div>
          <div className="w-full my-5">
            <p className="text-gray-600 text-base text-center">Nada mais para ver aqui...</p>
          </div>
        </div>
      </div>
    </section>
  )
}
