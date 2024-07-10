import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/dialog";
import { Button } from "@/components/Button";
import { PlusCircleIcon } from "lucide-react";
import { SearchGameForm } from "./SearchGameForm";
import { searchByGameName } from "@/actions/searchByGameName";

export function SearchGameDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-slate-900">
          <PlusCircleIcon className="mr-1" /> Review
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-transparent border-none shadow-none'>
        <DialogHeader>
          <DialogTitle className="text-bold text-white text-2xl text-center mb-2">Criar uma nova Avaliação</DialogTitle>
          <DialogDescription>
            <SearchGameForm searchGameByName={searchByGameName} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
