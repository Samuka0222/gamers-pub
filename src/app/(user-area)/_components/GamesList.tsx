import { dateFormatWithoutYear } from "@/helpers/dateFormat";
import { IGameReleases } from "@/interfaces/IGame";
import { ImageOffIcon } from "lucide-react";
import Image from "next/image";
import { getFullCover } from "@/helpers/getFullCover"

interface GamesListProps {
  games: IGameReleases[];
}

export function GamesList({ games }: GamesListProps) {
  const getGameCover = (coverUrl: string) => {
    const fullCover = getFullCover(`https:${coverUrl}`)
    if (!fullCover) {
      return coverUrl;
    } else {
      return fullCover
    }
  }

  return (
    <ul className="w-full flex justify-center items-start flex-col gap-2 mt-4">
      {
        games.map(item => (
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
  )
}
