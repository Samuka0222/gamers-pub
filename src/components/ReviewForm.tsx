'use client'

import { Checkbox } from "./Checkbox";
import { DatePicker } from "./DatePicker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select";
import { Slider } from "./Slider";
import { Textarea } from "./Textarea";
import { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { RotateCcwIcon, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReviewsStore } from "@/store/reviewsStore";
import { IReview } from "@/interfaces/IReview";
import { SubmitButton } from "./SubmitButton";
import { useRouter } from "next/navigation";
import { IGameDetails } from "@/interfaces/IGame";
import { getFullCover } from "@/helpers/getFullCover";

interface ReviewFormProps {
  game: IGameDetails
}

export function ReviewForm({ game }: ReviewFormProps) {
  const [status, setStatus] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [spoilers, setSpoilers] = useState(false);
  const [platform, setPlatform] = useState('');
  const [rating, setRating] = useState(50);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [hoursPlayed, setHoursPlayed] = useState(0);
  const [minutesPlayed, setMinutesPlayed] = useState(0);
  const [mastered, setMastered] = useState(false);
  const [replay, setReplay] = useState(false);

  const { reviews, addReview, editReview } = useReviewsStore();
  const router = useRouter();

  const submitAction = () => {
    const newReview: IReview = {
      id: reviews.length + 1,
      gameId: game.id,
      gameName: game.name,
      gameCoverUrl: `https:${getFullCover(game.cover.url)}`,
      status,
      reviewText,
      spoilers,
      platform,
      rating: status === 'completed' ? rating : undefined,
      startDate,
      endDate,
      hoursPlayed,
      minutesPlayed,
      mastered,
      replay,
    };
    addReview(newReview);
    router.push('/reviews')
  }

  return (
    <form className="w-full h-full mt-5 flex flex-col items-center overflow-y-auto" action={submitAction}>
      <div className="w-full flex gap-4">
        <div>
          <h3 className="text-gray-200 text-lg font-semibold mb-2">Status: </h3>
          <div className="w-full flex flex-col gap-2">
            <Button
              className={cn(
                status === 'playing'
                  ? 'bg-primary text-white hover:bg-primary text-base'
                  : 'bg-slate-800 hover:bg-slate-800 hover:text-primary text-base w-[130px]'
              )}
              type="button"
              onClick={() => setStatus('playing')}
            >
              Jogando
            </Button>
            <Button
              className={cn(
                status === 'completed'
                  ? 'bg-primary text-white hover:bg-primary text-base'
                  : 'bg-slate-800 hover:bg-slate-800 hover:text-primary text-base w-[130px]'
              )}
              type="button"
              onClick={() => setStatus('completed')}
            >
              Finalizado
            </Button>
            <Button
              className={cn(
                status === 'wantToPlay'
                  ? 'bg-primary text-white hover:bg-primary text-base'
                  : 'bg-slate-800 hover:bg-slate-800 hover:text-primary text-base w-[130px]'
              )}
              type="button"
              onClick={() => setStatus('wantToPlay')}
            >
              Quero Jogar
            </Button>
            <Button
              className={cn(
                status === 'shelved'
                  ? 'bg-primary text-white hover:bg-primary text-base'
                  : 'bg-slate-800 hover:bg-slate-800 hover:text-primary text-base w-[130px]'
              )}
              type="button"
              onClick={() => setStatus('shelved')}
            >
              Engavetado
            </Button>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full flex justify-between mb-2">
            <label htmlFor="review-text" className="text-gray-200 text-lg font-semibold">Sua avaliação: </label>
            <div className="flex gap-2 items-center">
              <Checkbox onCheckedChange={() => setSpoilers(!spoilers)} />
              <span className="font-semibold text-white">Contém Spoilers!</span>
            </div>
          </div>
          <Textarea
            name="review-text"
            className="w-full resize-none min-h-[185px] overflow-y-auto focus-visible:outline-none focus-visible:ring-offset-0"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full flex gap-4 mt-5 items-center justify-between">
        <div className="w-[40%]">
          <h3 className="text-gray-200 text-lg font-semibold mb-2">Nota: {
            status === 'completed' ? rating : '?'
          }</h3>
          <Slider
            // TODO: Add Disabled Style for the slider
            defaultValue={[rating]}
            value={[rating]}
            max={100}
            step={1}
            disabled={status !== 'completed'}
            onValueChange={(value) => setRating(value[0])}
          />
        </div>
        <div className="w-[40%]">
          <h3 className="text-gray-200 text-lg font-semibold mb-2">Plataforma: </h3>
          <Select onValueChange={(value) => setPlatform(value)}>
            <SelectTrigger className="w-full">
              <SelectValue className="placeholder:text-gray-500 font-medium" placeholder="Selecione a plataforma que você jogou" />
            </SelectTrigger>
            <SelectContent>
              {game.platforms.map((platform) => {
                return (
                  <SelectItem key={platform.id} value={platform.name}>
                    {platform.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="w-full flex gap-4 mt-5 justify-between">
        <div>
          {/* TODO: Block future days */}
          <h3 className="text-gray-200 text-lg font-semibold mb-2">Data de inicio: </h3>
          <DatePicker date={startDate} setDate={setStartDate} />
        </div>
        <div>
          <h3 className="text-gray-200 text-lg font-semibold mb-2">Data de Finalização: </h3>
          <DatePicker date={endDate} setDate={setEndDate} minDate={startDate} />
        </div>
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-gray-200 text-lg font-semibold mb-2">Horas jogadas: </h3>
          <div className="flex gap-2">
            <Input
              className="w-12 placeholder:text-center text-center"
              type="number"
              placeholder="H"
              onChange={(e) => setHoursPlayed(Number(e.target.value))}
            />
            <Input
              className="w-12 placeholder:text-center text-center"
              type="number"
              placeholder="M"
              onChange={(e) => setMinutesPlayed(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="h-full flex flex-col">
          <h3 className="text-gray-200 text-lg font-semibold mb-4">Platinado? </h3>
          <div className="flex gap-2 justify-center items-center">
            <Checkbox onCheckedChange={() => setMastered(!mastered)} />
            <span className="font-semibold text-white">
              <Trophy size={28} />
            </span>
          </div>
        </div>
        <div className="h-full flex flex-col">
          <h3 className="text-gray-200 text-lg font-semibold mb-4">Jogou novamente? </h3>
          <div className="flex gap-2 justify-center items-center">
            <Checkbox onCheckedChange={() => setReplay(!replay)} />
            <span className="font-semibold text-white">
              <RotateCcwIcon size={28} />
            </span>
          </div>
        </div>
      </div>
      <SubmitButton className="w-[170px] bg-secondary hover:bg-secondary border-none text-white font-semibold mt-5 text-lg">
        Criar Review
      </SubmitButton>
    </form>
  )
}
