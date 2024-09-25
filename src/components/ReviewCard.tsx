'use client'

import { Card, CardContent, CardHeader, } from "@/components/Card";
import { MarkdownText } from "@/components/MarkdownText";
import { IReview } from "@/interfaces/IReview";
import { EditIcon, Trophy } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "./Button";
import Link from "next/link";
import { Skeleton } from "./Skeleton";

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
      <Card className="relative w-full h-fit flex gap-4 px-0 md:px-4 py-4 overflow-y-hidden">
        <Button
          variant='outline'
          className="absolute top-0 right-0 rounded-ss-none rounded-ee-none"
          asChild
        >
          <Link href={`/reviews/edit-review/${review.id}/${review.gameId}`}>
            <EditIcon />
          </Link>
        </Button>
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
            <h3 className="w-[95%] truncate md:text-xl font-semibold">{review.gameName}</h3>
            <div className="w-full h-full flex gap-1">
              {
                review.reviewText !== ''
                  ? <div className="min-w-fit max-w-[90%] min-h-fit max-h-[310px] text-base overflow-y-auto">
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

export function RandomReviewCard({ review }: ReviewCardProps) {
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
      initial={{ x: 200, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      <Card className="relative w-full h-[350px] flex gap-4 px-0 md:px-4 py-4 overflow-y-hidden">
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
            <h3 className="w-[95%] truncate md:text-xl font-semibold">{review.gameName}</h3>
            <h4 className="text-sm text-gray-500 font-semibold mb-2">Criado por {review.author}</h4>
            <div className="w-full h-full flex gap-1">
              {
                review.reviewText !== ''
                  ? <div className="min-w-fit max-w-[90%] h-[80%] text-base overflow-y-auto">
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

export function ReviewCardSkeleton() {
  return (
    <div className="w-full h-[250px] px-2 py-4 border border-gray-400/50 gap-4 rounded-lg flex justify-between items-center">
      <div className="w-[110px] h-full">
        <Skeleton className="w-full h-[120px]" />
      </div>
      <div className="w-full h-full flex flex-col justify-start items-start">
        <Skeleton className="w-[80%] h-7" />
        <Skeleton className="w-[60%] h-5 mt-2" />
        <div className="w-full h-full flex flex-col justify-center items-start">
          <Skeleton className="w-full h-5 mt-2" />
          <Skeleton className="w-full h-5 mt-2" />
          <Skeleton className="w-full h-5 mt-2" />
          <Skeleton className="w-full h-5 mt-2" />
          <Skeleton className="w-[40%] h-5 mt-2" />
        </div>
      </div>
    </div>
  )
}
