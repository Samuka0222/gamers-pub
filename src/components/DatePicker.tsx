"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { ptBR } from 'date-fns/locale'

import { cn } from "@/lib/utils"
import { Button } from "@/components/Button"
import { Calendar } from "@/components/Calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/Popover"

interface DatePickerProps {
  date: Date | undefined
  placeholder: string
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  minDate?: Date | undefined
}

export function DatePicker({ date, setDate, minDate, placeholder }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "lg:w-[200px] xl:w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP", { locale: ptBR }) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={ptBR}
          initialFocus
          disabled={minDate ? { before: minDate } : undefined}
        />
      </PopoverContent>
    </Popover>
  )
}
