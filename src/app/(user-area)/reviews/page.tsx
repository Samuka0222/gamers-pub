'use client'

import { PlusCircleIcon } from "lucide-react";
import { ProfileHeader } from "./_components/ProfileHeader";
import { SearchGameForm } from "./_components/SearchGameForm";
import { searchByGameName } from "@/actions/games/searchByGameName";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/Dialog";
import { Button } from "@/components/Button";
import { useState } from "react";
import { IReviewRequest } from "@/interfaces/IReview";
import { ReviewsList } from "./_components/ReviewsList";

export default function ReviewsPage() {
  // TODO: optimize this request and store on ReviewStore
  const [reviews, setReviews] = useState<IReviewRequest[]>([]);

  return (
    <section className="w-full xl:w-[80%] min-h-[88.3vh] max-h-full flex flex-col justify-center items-center px-5 py-6">
      <div className="w-full h-full flex-1 lg:w-[60%]">
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
        <div className="w-full h-full flex flex-col justify-start items-center gap-4 mt-5 overflow-y-auto">
          <ReviewsList reviews={reviews} setReviews={setReviews} />
        </div>
      </div>
    </section>
  )
}
