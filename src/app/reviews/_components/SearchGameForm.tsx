'use client'

import { Button } from "@/components/Button";
import { IGameSearchResult } from "@/interfaces/IGameSearchResult";
import { Input } from "@/components/Input";
import { SubmitButton } from "@/components/SubmitButton";
import { useState } from "react";

interface SearchGameFormProps {
  searchGameByName: (gameName: string) => Promise<IGameSearchResult[]>
}

export function SearchGameForm({ searchGameByName }: SearchGameFormProps) {
  const [gameName, setGameName] = useState('');
  const [searchResults, setSearchResults] = useState<IGameSearchResult[]>([]);

  const submitAction = async () => {
    const response = await searchGameByName(gameName);
    setSearchResults(response);
  }

  return (
    <form className="w-full flex flex-col gap-3" action={submitAction}>
      <div className="w-full flex justify-between border border-secondary pl-4 rounded-lg">
        <Input
          type="text"
          className="bg-transparent text-white font-medium placeholder:text-gray-500 border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
          onChange={(e) => setGameName(e.target.value)}
          placeholder="Nome do jogo"
          value={gameName}
        />
        <SubmitButton size="normal">
          Procurar
        </SubmitButton>
      </div>
      <div className="h-[270px] w-full border border-secondary bg-slate-900/50 rounded-lg overflow-y-auto">
        <ul className="w-[100%] flex flex-col overflow-y-auto">
          {
            searchResults.map((result, index) => (
              <li key={index} className="w-full px-4 py-2 text-sm text-white font-medium border flex items-start">
                <Button
                  variant='link'
                  className="w-[95%] truncate p-0 text-white hover:text-primary justify-start whitespace-nowrap"
                  onClick={() => setGameName(result.name)}
                  type="button"
                >
                  {result.name}
                </Button>
              </li>
            ))
          }
        </ul>
      </div>
    </form>
  )
}

{/* <Image src={`https:${result.cover.url}`} width={100} height={100} alt={`Capa do ${result.name}`} /> */ }
