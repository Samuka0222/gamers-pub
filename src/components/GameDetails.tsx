import { Badge } from "@/components/Badge";
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
  platforms
}: GameDetailsProps) {
  return (
    <div className="w-full lg:w-[60%] flex flex-col lg:flex-row justify-center items-center">
      <div className="w-fit shadow-sm shadow-gray-300 mr-4">
        <Image src={getFullCover(coverUrl)} width={150} height={100} alt={`Capa do ${name}`} />
      </div>
      <ul className="w-full flex flex-col gap-3 text-white">
        <p className="w-full lg:w-fit text-center lg:text-start mt-3 lg:mt-0 text-xl font-semibold">{name}</p>
        <p className="hidden lg:block font-semibold text-gray-300">
          Lançado:
          <span className="ml-1">
            {dateFormat(releaseDate)}
          </span>
        </p>
      </ul>
    </div>
  )
}
