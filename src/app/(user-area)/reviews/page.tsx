'use client'

import { Gamepad, PlusCircleIcon, ScrollText } from "lucide-react";
import { ProfileHeader } from "./_components/ProfileHeader";
import { SearchGameForm } from "./_components/SearchGameForm";
import { searchByGameName } from "@/actions/searchByGameName";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/Dialog";
import { Button } from "@/components/Button";
import { ReviewCard } from "./_components/ReviewCard";
import { getReviewsByUser } from "@/actions/reviews/getReviewsByUser";
import { useEffect, useState } from "react";
import { IReviewRequest } from "@/interfaces/IReview";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useUserStore } from "@/store/userStore";

export default function ReviewsPage() {
  // TODO: optimize this request and store on ReviewStore
  const { user } = useUserStore();
  const [reviews, setReviews] = useState<IReviewRequest[]>([]);
  const completedReviews = reviews.filter(item => item.review.status === 'completed');
  const playingGames = reviews.filter(item => item.review.status === 'playing');

  useEffect(() => {
    if (user !== undefined) {
      const getReviews = async () => {
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
      getReviews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <ul className="w-full h-full flex flex-col gap-4">
            {
              reviews.length === 0 ? (
                <p className="text-gray-600 text-base text-center">Nenhuma avaliação encontrada.</p>
              )
                : reviews.map(reviewItem => <ReviewCard key={reviewItem.sk} review={reviewItem.review} />)
            }
          </ul>
          <div className="w-full my-5">
            <p className="text-gray-600 text-base text-center">Nada mais para ver aqui...</p>
          </div>
        </div>
      </div>
    </section>
  )
}
