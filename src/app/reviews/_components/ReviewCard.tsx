import { Card, CardContent, CardHeader, } from "@/components/Card";
import { IReview } from "@/interfaces/IReview";
import { Quote, RotateCcwIcon, Trophy } from "lucide-react";
import Image from "next/image";

interface ReviewCardProps {
  review: IReview
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="w-full h-full flex gap-4 p-4">
      <CardHeader className="p-0 relative">
        <div className="absolute -right-5 -top-2 bg-primary w-12 h-12 rounded-full flex justify-center items-center">
          <p className="text-2xl font-bold text-white">
            {
              review.rating
                ? review.rating
                : '?'
            }
          </p>
        </div>
        <Image src={review.gameCoverUrl} alt={`capa do jogo ${review.gameName}`} width={120} height={200} />
      </CardHeader>
      <CardContent className="w-full h-full flex flex-col py-0 justify-between">
        <div className="w-full h-[120px]">
          <h3 className="text-xl font-semibold mb-2">{review.gameName}</h3>
          <div className="w-full flex gap-1">
            {
              review.reviewText !== ''
                ? <>
                  <span className="h-full justify-start rotate-180">
                    <Quote className="text-primary" />
                  </span>
                  <p className="min-w-fit max-w-full text-base overflow-y-auto">{review.reviewText}</p>
                  <span className="h-full flex justify-end">
                    <Quote className="text-primary" />
                  </span>
                </>
                : <p className="text-base text-gray-500">(Não informado)</p>
            }
          </div>
        </div>
        <div className="w-full flex items-end gap-4">
          <p className="text-base flex gap-1">
            <span className="text-gray-600 font-semibold">
              Status:
            </span>
            <span className="font-bold">
              {review.status}
            </span>
          </p>
          <p className="text-base flex gap-1">
            <span className="text-gray-600 font-semibold">
              Jogado no:
            </span>
            <span className="font-bold">
              {review.platform}
            </span>
          </p>
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
      </CardContent>
    </Card>
  )
}
