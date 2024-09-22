'use client'

import { Card, CardContent, CardHeader, } from "@/components/Card";
import { MarkdownText } from "@/components/MarkdownText";
import { IReview } from "@/interfaces/IReview";
import { Trophy } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface ReviewCardProps {
  review: IReview
}

export function ReviewCard({ review }: ReviewCardProps) {
  const translateStatus = (status: string) => {
    switch (status) {
      case 'completed':
        return 'zerado';
      case 'playing':
        return 'jogando';
      case 'dropped':
        return 'dropado';
      case 'wantToPlay':
        return 'quero jogar'
    }
  }

  return (
    <motion.div
      initial={{ y: 200, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      <Card className="relative w-full h-fit flex gap-4 px-0 md:px-4 py-4">
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
          <div className="w-full min-h-[120px] max-h-fit flex-1">
            <h3 className="md:text-xl font-semibold mb-2">{review.gameName}</h3>
            <div className="w-full h-full flex gap-1">
              {
                review.reviewText !== ''
                  ? <div className="min-w-fit max-w-[90%] h-full text-base overflow-y-auto">
                    <MarkdownText markdown={review.reviewText} isPending={false} />
                  </div>
                  : <p className="text-base text-gray-500">(Não informado)</p>
              }
            </div>
          </div>
          <div className="w-full h-fit self-end flex items-center gap-1 mt-2">
            <p className="text-base font-bold capitalize">
              {translateStatus(review.status)}
            </p>
            <p className="text-base">no</p>
            <p className="text-base font-bold">
              {
                review.platform === 'PC (Microsoft Windows)'
                  ? 'PC'
                  : review.platform
              }
            </p>
            <div className="w-fit flex gap-3">
              {
                review.mastered && (
                  <Trophy className="text-yellow-500" />
                )
              }
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// function DisplayText({ text }: { text: string }) {
//   return <div dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br />') }} />
// }
