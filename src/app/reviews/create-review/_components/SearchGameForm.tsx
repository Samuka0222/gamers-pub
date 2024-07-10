'use client'

import { Button } from "@/components/Button";
import { IGameSearchResult } from "@/interfaces/IGameSearchResult";
import { Input } from "@/components/Input";
import { Search } from "lucide-react";
import { SubmitButton } from "@/components/SubmitButton";
import { toast } from "sonner";
import { useState } from "react";

interface SearchGameFormProps {
  searchGameByName: (gameName: string) => Promise<IGameSearchResult[] | undefined>
}

export function SearchGameForm({ searchGameByName }: SearchGameFormProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [game, setGame] = useState('');
  const [searchResults, setSearchResults] = useState<IGameSearchResult[]>([]);

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

  const setGameAction = (gameName: string) => {
    setIsSearching(false);
    setGame(gameName);
  }

  return (
    <form className="relative flex flex-col gap-3" action={submitAction}>
      <div className="w-full flex justify-between border rounded-lg py-2 px-2">
        <SubmitButton size="icon">
          <Search />
        </SubmitButton>
        <Input
          type="text"
          className="font-medium placeholder:text-gray-500 border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 ml-1"
          onChange={(e) => setGame(e.target.value)}
          placeholder="Nome do jogo"
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
                    onClick={() => setGameAction(result.name)}
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

{/* <Image src={`https:${result.cover.url}`} width={100} height={100} alt={`Capa do ${result.name}`} /> */ }
