import { Badge } from "@/components/Badge";
import Image from "next/image";

interface GameDetailsProps {
  name: string;
  coverUrl: string;
  releaseDate: Date;
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
    <div className="w-full flex gap-2 justify-center items-center mt-4 border p-3 bg-slate-900 rounded-lg">
      <div className="w-fit shadow-sm">
        <Image src={getCover(coverUrl)} width={150} height={100} alt={`Capa do ${name}`} />
      </div>
      <ul className="w-full flex flex-col gap-3 text-white">
        <p className="text-xl font-semibold">{name}</p>
        {/* TODO: Implement Date-FNS */}
        <p className="font-semibold text-gray-300">
          Lançado:
          <span className="ml-1">
            {String(releaseDate)}
          </span>
        </p>
        <div className="w-full text-white">
          <p className="font-semibold">Plataformas:</p>
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
