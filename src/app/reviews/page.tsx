import { Gamepad, PlusCircleIcon, ScrollText } from "lucide-react";
import { ProfileHeader } from "./_components/ProfileHeader";
import { SearchGameForm } from "./_components/SearchGameForm";
import { searchByGameName } from "@/actions/searchByGameName";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/Dialog";
import { Button } from "@/components/Button";

export default function ReviewsPage() {
  return (
    <section className="w-full h-full px-6 py-5 flex flex-col items-center">
      <div className="w-full lg:w-[70%]">
        <ProfileHeader />
        <div className="w-full flex justify-between mt-5">
          <h1 className="text-2xl font-semibold">Reviews</h1>
          <ul className="flex gap-4 items-center font-medium">
            <li>
              <span className="flex">
                <ScrollText className="mr-1" />
                4 Reviews
              </span>
            </li>
            <li>
              <span className="flex">
                <Gamepad className="mr-1" />
                1 Playing
              </span>
            </li>
            <li>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant='default' className="bg-slate-900 text-white hover:bg-slate-600 hover:text-secondary text-sm font-medium">
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
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
