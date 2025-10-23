"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/Calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"
import { Button } from "@/components/ui/Button"
import { useState } from "react"

interface DatePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  placeholder?: string
}

export function DatePicker({ date, setDate, placeholder = "날짜를 선택해주세요." }: DatePickerProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
        >
          <CalendarIcon />
          {date ? format(date, "yyyy-MM-dd") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" defaultMonth={date} selected={date} captionLayout="dropdown" onSelect={(date) => {
          setDate(date)
          setOpen(false)
        }} />
      </PopoverContent>
    </Popover>
  )
}