'use client'

import { Checkbox } from "@/components/Checkbox";
import { DatePicker } from "@/components/DatePicker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select";
import { Slider } from "@/components/Slider";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Loader2, Trash2, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { IReview } from "@/interfaces/IReview";
import { SubmitButton } from "@/components/SubmitButton";
import { useRouter } from "next/navigation";
import { IGameDetails } from "@/interfaces/IGame";
import { getFullCover } from "@/helpers/getFullCover";
import { TextEditor } from "@/components/TextEditor";
import { createReview } from "@/actions/reviews/createReview";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { GameDetails } from "@/components/GameDetails";
import { updateReview } from "@/actions/reviews/updateReview";
import { deleteReview } from "@/actions/reviews/deleteReview";

interface ReviewFormProps {
  game: IGameDetails;
  review?: IReview;
}

export function ReviewForm({ game, review }: ReviewFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(review ? review.status : '');
  const [reviewText, setReviewText] = useState(review ? review.reviewText : '');
  const [spoilers, setSpoilers] = useState(review ? review.spoilers : false);
  const [platform, setPlatform] = useState(review ? review.platform : '');
  const [rating, setRating] = useState(review ? review.rating : 50);
  const [startDate, setStartDate] = useState<Date | undefined>(review ? review.startDate : undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(review ? review.endDate : undefined);
  const [hoursPlayed, setHoursPlayed] = useState(review ? Number(review.timePlayed?.split(':')[0]) : undefined);
  const [minutesPlayed, setMinutesPlayed] = useState(review ? Number(review.timePlayed?.split(':')[1]) : undefined);
  const [mastered, setMastered] = useState(review ? review.mastered : false);

  const router = useRouter();

  const discardAction = () => {
    router.push('/reviews')
  }

  const addNewLineAction = () => {
    setReviewText(prevState => prevState.concat('\n'));
  }

  const submitAction = async () => {
    setIsLoading(true);
    const newReview = {
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
      timePlayed: `${hoursPlayed}:${minutesPlayed}`,
      mastered,
    };
    try {
      if (review) {
        await updateReview({ id: review.id, ...newReview });
        toast.success('Review atualizada com sucesso!');
      } else {
        await createReview(newReview);
        toast.success('Review criada com sucesso');
      }
      router.push('/reviews');
      setIsLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      }
    }
  }

  const deleteReviewAction = async () => {
    try {
      if (!review) {
        toast.error('Erro: Review não encontrada');
      }
      await deleteReview(review!.id);
      toast.success('Review deletada com sucesso!');
      router.push('/reviews');
    } catch {
      toast.error('Não foi possível deletar a review :(')
    }
  }

  // TODO: Add Error handling so user can send Required information empty, EX: Status.
  return (
    <form className="w-full h-fit flex flex-col items-center" action={submitAction}>
      <div className="w-full flex flex-col lg:flex-row gap-4 justify-between items-center">
        <GameDetails
          name={game.name}
          releaseDate={game.first_release_date}
          coverUrl={`https:${game.cover.url!}`}
        />
        <div className="w-full h-fit flex mb-4 lg:mb-0 justify-center items-center gap-4">
          <div className="w-[500px] flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="w-full flex justify-center items-center gap-2">
              <Slider
                defaultValue={[rating!]}
                value={[rating!]}
                max={100}
                step={1}
                onValueChange={(value) => setRating(value[0])}
              />
              <span className="w-[100px] text-slate-800 text-xl font-semibold">{rating}</span>
            </div>
          </div>
          <div className="w-fit h-[100%] flex lg:flex-col justify-center items-center gap-2">
            <h3 className="text-slate-800 text-lg font-semibold lg:mb-3">Platinado? </h3>
            <div className="flex gap-2 justify-center items-center">
              <Checkbox onCheckedChange={() => setMastered(!mastered)} />
              <span className={cn(mastered ? "text-yellow-500" : "text-black", "font-semibold")}>
                <Trophy size={28} />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col md:justify-between gap-4 mt-3">
        <div className="w-full flex flex-col lg:flex-row gap-4 pb-2">
          <div className="w-full flex-col lg:flex-row overflow-x-auto py-2">
            <h3 className="text-slate-800 text-lg font-semibold mb-2">Status: </h3>
            <div className="w-full flex gap-2">
              <Button
                className={cn(
                  status === 'completed'
                    ? 'bg-primary text-white font-bold hover:bg-primary text-base lg:w-[120px] xl:w-[160px] h-10'
                    : 'bg-slate-800 hover:bg-slate-800 hover:text-primary text-base lg:w-[120px] xl:w-[160px] h-10'
                )}
                type="button"
                onClick={() => setStatus('completed')}
              >
                Zerado! 😎
              </Button>
              <Button
                className={cn(
                  status === 'playing'
                    ? 'bg-primary text-white font-bold hover:bg-primary text-base lg:w-[120px] xl:w-[160px] h-10'
                    : 'bg-slate-800 hover:bg-slate-800 hover:text-primary text-base lg:w-[120px] xl:w-[160px] h-10'
                )}
                type="button"
                onClick={() => setStatus('playing')}
              >
                Jogando 🎮
              </Button>
              <Button
                className={cn(
                  status === 'dropped'
                    ? 'bg-primary text-white font-bold hover:bg-primary text-base lg:w-[120px] xl:w-[160px] h-10'
                    : 'bg-slate-800 hover:bg-slate-800 hover:text-primary text-base lg:w-[120px] xl:w-[160px] h-10'
                )}
                type="button"
                onClick={() => setStatus('dropped')}
              >
                Dropado 🗑️
              </Button>
              <Button
                className={cn(
                  status === 'wantToPlay'
                    ? 'bg-primary text-white font-bold hover:bg-primary text-base lg:w-[120px] xl:w-[160px] h-10'
                    : 'bg-slate-800 hover:bg-slate-800 hover:text-primary text-base lg:w-[120px] xl:w-[160px] h-10'
                )}
                type="button"
                onClick={() => setStatus('wantToPlay')}
              >
                Quero jogar 🤩
              </Button>
            </div>
          </div>
          <div className="w-full">
            <h3 className="text-slate-800 text-lg font-semibold mb-2">Plataforma: </h3>
            <Select onValueChange={(value) => setPlatform(value)} required={review ? false : true}>
              {/* TODO: Ensure that if is editing a review, the platform is showing here*/}
              <SelectTrigger className="w-full h-[42px] focus:ring-0">
                <SelectValue defaultValue={review?.platform ?? undefined} className="placeholder:text-gray-500 font-medium" placeholder="Selecione a plataforma que você jogou" />
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
        <div className="w-full">
          <div className="w-full flex justify-between mt-4 md:mt-0 mb-2">
            <label htmlFor="review-text" className="text-slate-800 text-lg font-semibold">Sua avaliação: </label>
            <div className="flex gap-2 items-center">
              <Checkbox onCheckedChange={() => setSpoilers(!spoilers)} />
              <span className="font-semibold text-black">Contém Spoilers!</span>
            </div>
          </div>
          <TextEditor
            reviewText={reviewText}
            setReviewText={setReviewText}
            addNewLineAction={addNewLineAction}
          />
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4 mt-5 justify-center items-center">
        <div className="w-full flex flex-col md:flex-row md:justify-center gap-8">
          <div className="text-center md:text-start">
            <h3 className="text-slate-800 text-lg font-semibold mb-2">
              Data de inicio:
            </h3>
            <DatePicker
              date={startDate}
              setDate={setStartDate}
              placeholder="Defina a data de inicio"
            />
          </div>
          <div className="text-center md:text-start">
            <h3 className="text-slate-800 text-lg font-semibold mb-2">Data de Finalização: </h3>
            <DatePicker
              date={endDate}
              setDate={setEndDate}
              minDate={startDate}
              placeholder="Defina a data de Término"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-slate-800 text-lg font-semibold mb-2">Horas jogadas: </h3>
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
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row justify-center items-center mt-8 gap-5">
        {
          review && <Button type="button" variant='destructive' onClick={deleteReviewAction}>
            {
              isLoading
                ? <>
                  Deletando <Loader2 className="animate-spin" />
                </>
                : <>
                  Deletar Review <Trash2 className="ml-2" />
                </>
            }
          </Button>
        }
        <Button
          type="button"
          variant='outline'
          className="w-[200px] text-black font-semibold"
          onClick={discardAction}
        >
          Descartar
        </Button>
        <SubmitButton className="w-[200px] bg-secondary hover:bg-secondary border-none text-black font-semibold">
          {
            review
              ? isLoading
                ? <>
                  <Loader2 className="animate-spin mr-2" /> Atualizando...
                </>
                : 'Atualizar Review'
              : isLoading
                ? <>
                  <Loader2 className="animate-spin mr-2" /> Criando...
                </>
                : 'Criar Review'
          }
        </SubmitButton>
      </div>
    </form>
  )
}
