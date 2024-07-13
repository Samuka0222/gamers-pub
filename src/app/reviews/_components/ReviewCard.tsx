import { Card, CardContent, CardHeader, } from "@/components/Card";
import { IReview } from "@/interfaces/IReview";
import { Quote, RotateCcwIcon, Trophy } from "lucide-react";
import Image from "next/image";

interface ReviewCardProps {
  review: IReview
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="w-full h-full flex gap-4 px-0 md:px-4 py-4">
      <CardHeader className="p-0 relative pl-2 md:pl-0">
        <div className="absolute -right-5 -top-2 bg-primary w-8 h-8 md:w-12 md:h-12 rounded-full flex justify-center items-center">
          <p className="text-lg md:text-2xl font-bold text-white">
            {
              review.rating
                ? review.rating
                : '?'
            }
          </p>
        </div>
        <Image src={review.gameCoverUrl} alt={`capa do jogo ${review.gameName}`} width={120} height={200} />
      </CardHeader>
      <CardContent className="w-full h-full flex flex-col py-0 px-2 md:px-6 justify-between">
        <div className="w-full h-[120px]">
          <h3 className="md:text-xl font-semibold mb-2">{review.gameName}</h3>
          <div className="w-full flex gap-1">
            {
              review.reviewText !== ''
                ? <>
                  <span className="hidden md:block h-full justify-start rotate-180">
                    <Quote className="text-primary" />
                  </span>
                  <p className="min-w-fit max-w-full text-base overflow-y-auto">{review.reviewText}</p>
                  <span className="hidden h-full md:flex justify-end">
                    <Quote className="text-primary" />
                  </span>
                </>
                : <p className="text-base text-gray-500">(Não informado)</p>
            }
          </div>
        </div>
        <div className="w-full flex items-end gap-4">
          <p className="text-base flex gap-1">
            <span className="hidden md:block text-gray-600 font-semibold">
              Status:
            </span>
            <span className="font-bold capitalize">
              {review.status}
            </span>
          </p>
          <p className="text-base flex gap-1">
            <span className="hidden md:block text-gray-600 font-semibold">
              Jogado no:
            </span>
            <span className="font-bold">
              {
                review.platform === 'PC (Microsoft Windows)'
                  ? 'PC'
                  : review.platform
              }
            </span>
          </p>
          <div className="w-fit flex gap-3">
            {
              review.mastered && (
                <Trophy className="text-yellow-500" />
              )
            }
            {
              review.replay && (
                <RotateCcwIcon className="text-secondary" />
              )
            }
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
