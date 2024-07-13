'use client'

import { Button } from "@/components/Button";
import { IGameSearchResult } from "@/interfaces/IGame";
import { Input } from "@/components/Input";
import { Loader2Icon, Search } from "lucide-react";
import { SubmitButton } from "@/components/SubmitButton";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface SearchGameFormProps {
  searchGameByName: (gameName: string) => Promise<IGameSearchResult[] | undefined>
}

export function SearchGameForm({ searchGameByName }: SearchGameFormProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchGameName, setSearchGameName] = useState('');
  const [searchResults, setSearchResults] = useState<IGameSearchResult[]>([]);
  const [game, setGame] = useState('');

  const router = useRouter();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchGameName.trim() !== '') {
        setIsSearching(true);
        searchGameByName(searchGameName).then((results) => {
          if (results) {
            setSearchResults(results);
            setIsSearching(false);
          } else {
            toast.error('Erro ao pesquisar');
            setIsSearching(false);
            setSearchResults([]);
          }
        });
      } else {
        setIsSearching(false);
        setSearchResults([]);
      }
    }, 2000)

    return () => clearTimeout(delayDebounceFn);
  }, [searchGameName, searchGameByName]);

  const setGameAction = (game: IGameSearchResult) => {
    setIsSearching(false);
    setGame(game.name);
    router.push(`reviews/create-review/${game.id}`)
  }

  return (
    <div className="relative flex flex-col gap-3">
      <div className="w-full flex justify-between border rounded-lg py-2 px-2">
        <div className="text-white h-full w-8 flex justify-center items-center">
          {
            isSearching
              ? <Loader2Icon className="animate-spin" />
              : <Search />
          }
        </div>
        <Input
          type="text"
          className="font-medium bg-transparent text-white placeholder:text-gray-70000 border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 ml-1"
          onChange={(e) => {
            setSearchGameName(e.target.value)
            setIsSearching(true);
            setSearchResults([]);
          }}
          placeholder="Digite o nome do jogo..."
          value={searchGameName}
        />
      </div>
      {
        searchResults.length > 0 && (
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
    </div>
  )
}
