'use client'

import { Button } from "@/components/Button";
import { IGameSearchResult } from "@/interfaces/IGameSearchResult";
import { Input } from "@/components/Input";
import { Search } from "lucide-react";
import { SubmitButton } from "@/components/SubmitButton";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchGameFormProps {
  searchGameByName: (gameName: string) => Promise<IGameSearchResult[] | undefined>
}

export function SearchGameForm({ searchGameByName }: SearchGameFormProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [game, setGame] = useState('');
  const [searchResults, setSearchResults] = useState<IGameSearchResult[]>([]);

  const router = useRouter();

  const submitAction = async () => {
    try {
      setIsSearching(true);
      const response = await searchGameByName(game);
      setSearchResults(response ?? []);
    } catch (error) {
      toast.error('Erro na busca, tente novamente');
      setIsSearching(false);
    }
  }

  const onChangeAction = (value: string) => {
    setGame(value);
    setIsSearching(false);
    setSearchResults([]);
  }

  const setGameAction = (game: IGameSearchResult) => {
    setIsSearching(false);
    setGame(game.name);
    router.push(`reviews/create-review/${game.id}`)
  }

  return (
    <form className="relative flex flex-col gap-3" action={submitAction}>
      <div className="w-full flex justify-between border rounded-lg py-2 px-2">
        <SubmitButton className="bg-transparent hover:bg-transparent border-none p-2 flex justify-center items-center text-white hover:text-primary font-semibold">
          <Search />
        </SubmitButton>
        <Input
          type="text"
          className="font-medium bg-transparent text-white placeholder:text-gray-70000 border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 ml-1"
          onChange={(e) => onChangeAction(e.target.value)}
          placeholder="Digite o nome do jogo..."
          value={game}
        />
      </div>
      {
        isSearching && (
          <ul className="absolute top-full w-full h-[300px] flex flex-col bg-slate-900/50 overflow-y-auto rounded-lg mt-2 shadow-sm">
            {
              searchResults.map((result, index) => (
                <li key={index} className="w-full px-4 py-2 text-sm text-white font-medium border-b border-gray-400 flex items-start">
                  <Button
                    variant='link'
                    className="w-[90%] text-ellipsis p-0 text-white hover:text-primary justify-start"
                    onClick={() => setGameAction(result)}
                    type="button"
                  >
                    {result.name}
                  </Button>
                </li>
              ))
            }
          </ul>
        )
      }
    </form>
  )
}
