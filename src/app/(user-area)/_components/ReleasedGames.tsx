import { getGamesByReleaseDate } from "@/actions/games/getGamesByReleaseDate"
import { dateFormatWithoutYear } from "@/helpers/dateFormat"
import { getFullCover } from "@/helpers/getFullCover"
import { IGameReleases } from "@/interfaces/IGame"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface GamesListProps {
  type: 'released' | 'upcoming'
}

export function GamesList({ type }: GamesListProps) {
  const [gamesList, setGamesList] = useState<IGameReleases[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getGamesForList = async () => {
      const responseReleasedGames = await getGamesByReleaseDate(type === 'released' ? true : false);
      setGamesList(responseReleasedGames);
      setIsLoading(false);
    }
    getGamesForList();
  }, [setGamesList])

  return (
    <div className="w-fit flex flex-col justify-center items-start">
      <h3 className="text-lg font-semibold">
        {type === 'released' ? 'Lançados recentemente' : 'Lançando em breve'}
      </h3>
      <ul className="w-full flex justify-center items-start flex-col gap-2 mt-4">
        {
          isLoading
            ? <div className="w-full h-20 flex justify-center items-center">
              <Loader2 className="animate-spin" />
            </div>
            : gamesList!.map(item => (
              <li className="w-full h-fit" key={item.id}>
                <div className="w-full h-fit flex justify-start items-center">
                  <Image
                    className="border rounded-sm"
                    src={getFullCover(`https:${item.cover.url}`)}
                    alt={`capa do jogo ${item.name}`}
                    width={50}
                    height={100}
                  />
                  <div className="flex flex-col ml-2">
                    <span className="w-[200px] truncate font-medium">{item.name}</span>
                    <span className="text-sm text-gray-600">{dateFormatWithoutYear(item.first_release_date)}</span>
                  </div>
                </div>
              </li>
            ))
        }
      </ul>
    </div>
  )
}
