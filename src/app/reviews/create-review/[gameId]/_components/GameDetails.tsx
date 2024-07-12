import { Badge } from "@/components/Badge";
import { dateFormat } from "@/helpers/dateFormat";
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
  const getCover = (coverUrl: string) => {
    return coverUrl.replace('t_thumb', 't_cover_big')
  }

  return (
    <div className="w-full lg:w-[60%] flex flex-col lg:flex-row justify-center items-center">
      <div className="w-fit shadow-sm shadow-gray-300 mr-4">
        <Image src={getCover(coverUrl)} width={150} height={100} alt={`Capa do ${name}`} />
      </div>
      <ul className="w-full flex flex-col gap-3 text-white">
        <p className="w-full lg:w-fit text-center lg:text-start mt-3 lg:mt-0 text-xl font-semibold">{name}</p>
        <p className="hidden lg:block font-semibold text-gray-300">
          Lançado:
          <span className="ml-1">
            {dateFormat(releaseDate)}
          </span>
        </p>
        <div className="hidden lg:block w-full text-white">
          <p className="font-semibold mb-1">Plataformas:</p>
          <ul className="w-full flex gap-1">
            {
              platforms.map(platform => (
                <Badge
                  key={platform.id}
                  className="bg-slate-900 text-primary hover:bg-slate-900 border-secondary"
                >
                  {platform.name}
                </Badge>
              ))
            }
          </ul>
        </div>
      </ul>
    </div>
  )
}
