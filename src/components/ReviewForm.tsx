'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select";
import { Slider } from "./Slider";
import { Textarea } from "./Textarea";
import { useState } from "react";

interface ReviewFormProps {
  platforms: {
    id: number;
    name: string;
  }[];
}

export function ReviewForm({ platforms }: ReviewFormProps) {
  const [reviewText, setReviewText] = useState('')
  const [platform, setPlatform] = useState('')
  const [rating, setRating] = useState(50)

  return (
    <form className="w-full h-full mt-5">
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="review-text" className="text-gray-200 text-lg font-semibold">Sua avaliação: </label>
        <Textarea
          name="review-text"
          className="w-full min-h-[150px] overflow-y-auto focus-visible:outline-none focus-visible:ring-offset-0"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
      </div>
      <div className="w-full flex gap-4 mt-5 items-center justify-between">
        <div className="w-[40%]">
          <h3 className="text-gray-200 text-lg font-semibold mb-2">Nota: </h3>
          <Slider
            defaultValue={[rating]}
            value={[rating]}
            max={100}
            step={1}
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
              {platforms.map((platform) => {
                return (
                  <SelectItem key={platform.id} value={platform.name}>
                    {platform.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="w-[40]">
          {/* TODO: Add date options */}
        </div>
      </div>
    </form>
  )
}
