import { Skeleton } from "@/components/Skeleton"
import { useGetReleases } from "@/hooks/useGetReleases"
import { GamesList } from "./GamesList"
import { ErrorWarning } from "@/components/ErrorWarning";

interface GamesListProps {
  type: 'released' | 'upcoming'
}

export function GamesListContainer({ type }: GamesListProps) {
  const { releasesList, isLoading, error } = useGetReleases();

  return (
    <div className="w-full md:w-fit flex flex-col justify-center items-start">
      {error && (<ErrorWarning errorCause={error.message} />)}
      {
        isLoading
          ? <GameListSkeleton />
          : type === 'released'
            ? <GamesList games={releasesList?.releasedGames!} />
            : <GamesList games={releasesList?.futureReleases!} />
      }
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
