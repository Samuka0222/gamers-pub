'use client'

import { Checkbox } from "../../../components/Checkbox";
import { DatePicker } from "../../../components/DatePicker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/Select";
import { Slider } from "../../../components/Slider";
import { Textarea } from "../../../components/Textarea";
import { useEffect, useState } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { RotateCcwIcon, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReviewsStore } from "@/store/reviewsStore";
import { IReview } from "@/interfaces/IReview";
import { SubmitButton } from "../../../components/SubmitButton";
import { useRouter } from "next/navigation";
import { IGameDetails } from "@/interfaces/IGame";
import { getFullCover } from "@/helpers/getFullCover";
import { TextEditor } from "../../../components/TextEditor";

interface ReviewFormProps {
  game: IGameDetails;
  review?: IReview;
}

export function ReviewForm({ game, review }: ReviewFormProps) {
  const [status, setStatus] = useState(review ? review.status : '');
  const [reviewText, setReviewText] = useState(review ? review.reviewText : '');
  const [spoilers, setSpoilers] = useState(review ? review.spoilers : false);
  const [platform, setPlatform] = useState(review ? review.platform : '');
  const [rating, setRating] = useState(review ? review.rating : 50);
  const [startDate, setStartDate] = useState<Date | undefined>(review ? review.startDate : undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(review ? review.endDate : undefined);
  const [hoursPlayed, setHoursPlayed] = useState(review ? review.hoursPlayed : undefined);
  const [minutesPlayed, setMinutesPlayed] = useState(review ? review.minutesPlayed : undefined);
  const [mastered, setMastered] = useState(review ? review.mastered : false);
  const [replay, setReplay] = useState(review ? review.replay : false);

  const { reviews, addReview, editReview } = useReviewsStore();
  const router = useRouter();

  const discardAction = () => {
    router.push('/reviews')
  }

  const addNewLineAction = () => {
    setReviewText(prevState => prevState.concat('\n'));
  }

  useEffect(() => {
    console.log(reviewText);
  }, [reviewText])

  const submitAction = () => {
    const newReview: IReview = {
      id: review ? review.id : reviews.length + 1,
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
    if (review) {
      editReview(newReview);
    } else {
      addReview(newReview);
    }
    router.push('/reviews')
  }

  return (
    <form className="w-full h-fit mt-5 flex flex-col items-center" action={submitAction}>
      <div className="w-full flex flex-col md:justify-between md:flex-row gap-4">
        <div className="w-full md:w-fit overflow-x-auto md:overflow-hidden pb-2 md:pb-0">
          <h3 className="text-gray-200 text-lg font-semibold mb-2">Status: </h3>
          <div className="w-full flex md:flex-col gap-2">
            <Button
              className={cn(
                status === 'completed'
                  ? 'bg-primary text-white hover:bg-primary text-base lg:w-[120px] xl:w-[160px]'
                  : 'bg-slate-800 hover:bg-slate-800 hover:text-primary text-base lg:w-[120px] xl:w-[160px]'
              )}
              type="button"
              onClick={() => setStatus('completed')}
            >
              Finalizado
            </Button>
            <Button
              className={cn(
                status === 'playing'
                  ? 'bg-primary text-white hover:bg-primary text-base lg:w-[120px] xl:w-[160px]'
                  : 'bg-slate-800 hover:bg-slate-800 hover:text-primary text-base lg:w-[120px] xl:w-[160px]'
              )}
              type="button"
              onClick={() => setStatus('playing')}
            >
              Jogando
            </Button>
            <Button
              className={cn(
                status === 'wantToPlay'
                  ? 'bg-primary text-white hover:bg-primary text-base lg:w-[120px] xl:w-[160px]'
                  : 'bg-slate-800 hover:bg-slate-800 hover:text-primary text-base lg:w-[120px] xl:w-[160px]'
              )}
              type="button"
              onClick={() => setStatus('wantToPlay')}
            >
              Quero Jogar
            </Button>
            <Button
              className={cn(
                status === 'shelved'
                  ? 'bg-primary text-white hover:bg-primary text-base lg:w-[120px] xl:w-[160px]'
                  : 'bg-slate-800 hover:bg-slate-800 hover:text-primary text-base lg:w-[120px] xl:w-[160px]'
              )}
              type="button"
              onClick={() => setStatus('shelved')}
            >
              Engavetado
            </Button>
          </div>
        </div>
        <div className="w-full md:w-[85%]">
          <div className="w-full flex justify-between mt-4 md:mt-0 mb-2">
            <label htmlFor="review-text" className="text-gray-200 text-lg font-semibold">Sua avaliação: </label>
            <div className="flex gap-2 items-center">
              <Checkbox onCheckedChange={() => setSpoilers(!spoilers)} />
              <span className="font-semibold text-white">Contém Spoilers!</span>
            </div>
          </div>
          <TextEditor
            reviewText={reviewText}
            setReviewText={setReviewText}
            addNewLineAction={addNewLineAction}
          />
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4 mt-5 items-center justify-between">
        <div className="w-full lg:w-[40%]">
          <h3 className="text-gray-200 text-lg font-semibold mb-2">Nota: {rating}</h3>
          <Slider
            defaultValue={[rating!]}
            value={[rating!]}
            max={100}
            step={1}
            onValueChange={(value) => setRating(value[0])}
          />
        </div>
        <div className="w-full lg:w-[40%]">
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

      <div className="w-full flex flex-col xl:flex-row gap-4 mt-5 justify-center items-center">

        <div className="w-full flex flex-col md:flex-row md:justify-center gap-4">
          <div className="text-center md:text-start">
            <h3 className="text-gray-200 text-lg font-semibold mb-2">Data de inicio: </h3>
            <DatePicker
              date={startDate}
              setDate={setStartDate}
              placeholder="Defina a data de inicio"
            />
          </div>
          <div className="text-center md:text-start">
            <h3 className="text-gray-200 text-lg font-semibold mb-2">Data de Finalização: </h3>
            <DatePicker
              date={endDate}
              setDate={setEndDate}
              minDate={startDate}
              placeholder="Defina a data de Término"
            />
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-center items-center md:items-start gap-4 xl:gap-8 mt-2">
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-gray-200 text-lg font-semibold mb-2">Horas jogadas: </h3>
            <div className="flex gap-2">
              <Input
                className="w-12 p-0 placeholder:text-center text-center"
                type="number"
                placeholder="HH"
                onChange={(e) => setHoursPlayed(Number(e.target.value))}
              />
              <Input
                className="w-12 p-0 placeholder:text-center text-center"
                type="number"
                placeholder="MM"
                onChange={(e) => setMinutesPlayed(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="h-full flex flex-col">
            <h3 className="text-gray-200 text-lg font-semibold mb-2 md:mb-3">Platinado? </h3>
            <div className="flex gap-2 justify-center items-center">
              <Checkbox onCheckedChange={() => setMastered(!mastered)} />
              <span className="font-semibold text-white">
                <Trophy size={28} />
              </span>
            </div>
          </div>
          <div className="h-full flex flex-col">
            <h3 className="text-gray-200 text-lg font-semibold mb-2 md:mb-3">Jogou novamente? </h3>
            <div className="flex gap-2 justify-center items-center">
              <Checkbox checked={replay} onCheckedChange={() => setReplay(!replay)} />
              <span className="font-semibold text-white">
                <RotateCcwIcon size={28} />
              </span>
            </div>
          </div>
        </div>

      </div>
      <div className="w-full flex flex-col md:flex-row justify-center items-center mt-8 gap-5">
        <Button
          type="button"
          variant='ghost'
          className="w-[200px] text-white font-semibold text-lg"
          onClick={discardAction}
        >
          Descartar
        </Button>
        <SubmitButton className="w-[200px] bg-secondary hover:bg-secondary border-none text-white font-semibold text-lg">
          {
            review ? 'Atualizar Review' : 'Criar Review'
          }
        </SubmitButton>
      </div>
    </form>
  )
}
