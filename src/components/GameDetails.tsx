import { dateFormat } from "@/helpers/dateFormat";
import { getFullCover } from "@/helpers/getFullCover";
import Image from "next/image";

interface GameDetailsProps {
  name: string;
  coverUrl: string;
  releaseDate: number;
  platforms: {
    id: number;
    name: string;
  }[];
}

export function GameDetails({
  name,
  coverUrl,
  releaseDate,
}: GameDetailsProps) {
  return (
    <div className="w-full lg:w-fit flex flex-col lg:flex-row justify-start items-center">
      <div className="w-fit shadow-sm shadow-gray-300 mr-4">
        <Image src={getFullCover(coverUrl)} width={130} height={100} alt={`Capa do ${name}`} />
      </div>
      <div className="w-full lg:w-fit flex flex-col gap-3 text-black">
        <h3 className="w-full lg:w-fit text-center lg:text-start mt-3 lg:mt-0 text-xl font-semibold">{name}</h3>
        <p className="hidden lg:block font-semibold text-gray-500">
          Lançado:
          <span className="ml-1">
            {dateFormat(releaseDate)}
          </span>
        </p>
      </div>
    </div>
  )
}
