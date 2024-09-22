import { getGamesByReleaseDate } from "@/actions/games/getGamesByReleaseDate"
import { Skeleton } from "@/components/Skeleton"
import { dateFormatWithoutYear } from "@/helpers/dateFormat"
import { getFullCover } from "@/helpers/getFullCover"
import { IGameReleases } from "@/interfaces/IGame"
import { ImageOffIcon, Loader2 } from "lucide-react"
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

  const getGameCover = (coverUrl: string) => {
    const fullCover = getFullCover(`https:${coverUrl}`)
    if (!fullCover) {
      return coverUrl;
    } else {
      return fullCover
    }
  }

  return (
    <div className="w-full md:w-fit flex flex-col justify-center items-start">
      <ul className="w-full flex justify-center items-start flex-col gap-2 mt-4">
        {
          isLoading
            ? <GameListSkeleton />
            : gamesList!.map(item => (
              <li className="w-full h-fit" key={item.id}>
                <div className="w-full max-h-[75px] truncate h-fit flex justify-start items-center">
                  {
                    item.cover !== undefined
                      ? <Image
                        className="border rounded-sm"
                        src={getGameCover(item.cover.url)}
                        alt={`capa do jogo ${item.name}`}
                        width={50}
                        height={100}
                      />
                      : <ImageOffIcon />
                  }
                  <div className="flex flex-col ml-2">
                    <span className="w-[330px] md:w-[200px] truncate font-medium">{item.name}</span>
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

function GameListSkeleton() {
  return (
    <div className="w-full md:w-fit flex flex-col justify-center items-start">
      <ul className="w-full flex justify-center items-start flex-col gap-2 mt-4">
        <li className="w-full flex">
          <Skeleton className="w-[50px] h-[70px]" />
          <div className="w-fit flex flex-col gap-1">
            <Skeleton className="w-[150px] h-[16px] ml-2" />
            <Skeleton className="w-[110px] h-[10px] ml-2" />
          </div>
        </li>
        <li className="w-full flex">
          <Skeleton className="w-[50px] h-[70px]" />
          <div className="w-fit flex flex-col gap-1">
            <Skeleton className="w-[150px] h-[16px] ml-2" />
            <Skeleton className="w-[110px] h-[10px] ml-2" />
          </div>
        </li>
        <li className="w-full flex">
          <Skeleton className="w-[50px] h-[70px]" />
          <div className="w-fit flex flex-col gap-1">
            <Skeleton className="w-[150px] h-[16px] ml-2" />
            <Skeleton className="w-[110px] h-[10px] ml-2" />
          </div>
        </li>
        <li className="w-full flex">
          <Skeleton className="w-[50px] h-[70px]" />
          <div className="w-fit flex flex-col gap-1">
            <Skeleton className="w-[150px] h-[16px] ml-2" />
            <Skeleton className="w-[110px] h-[10px] ml-2" />
          </div>
        </li>
        <li className="w-full flex">
          <Skeleton className="w-[50px] h-[70px]" />
          <div className="w-fit flex flex-col gap-1">
            <Skeleton className="w-[150px] h-[16px] ml-2" />
            <Skeleton className="w-[110px] h-[10px] ml-2" />
          </div>
        </li>
        <li className="w-full flex">
          <Skeleton className="w-[50px] h-[70px]" />
          <div className="w-fit flex flex-col gap-1">
            <Skeleton className="w-[150px] h-[16px] ml-2" />
            <Skeleton className="w-[110px] h-[10px] ml-2" />
          </div>
        </li>
        <li className="w-full flex">
          <Skeleton className="w-[50px] h-[70px]" />
          <div className="w-fit flex flex-col gap-1">
            <Skeleton className="w-[150px] h-[16px] ml-2" />
            <Skeleton className="w-[110px] h-[10px] ml-2" />
          </div>
        </li>
      </ul>
    </div>
  )
}
