"use client"

import {
  InlineCalendar,
  InlineQuests,
} from "@/components/sections/calendar/sections"
import { MaxWidthWrapper } from "@/components/width-wrapper"
import { getQuestsForDate, QuestWithSlots } from "@/lib/quests"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { useEffect, useState } from "react"

export default function QuestsPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [timelines, setTimelines] = useState<QuestWithSlots[]>([])

  useEffect(() => {
    const fetchTimelines = async () => {
      const fetchedTimelines = await getQuestsForDate(
        format(selectedDate, "yyyy-MM-dd")
      )
      setTimelines(fetchedTimelines)
    }
    fetchTimelines()
  }, [selectedDate])

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  return (
    <div className="flex flex-col py-[140px]">
      <MaxWidthWrapper className="max-w-[1480px]">
        <div className="mb-2.5 flex flex-col gap-y-2.5 border-b border-white/30 pb-3">
          <div className="inline-flex items-center justify-between pb-10 text-[#909090]">
            <span className="text-2xl font-medium leading-[48px]">
              Расписание - {format(selectedDate, "d MMMM", { locale: ru })}
            </span>
            <span className="text-[16px] leading-[24px]">
              Стоимость игры указана за команду
            </span>
          </div>
          <InlineCalendar onSelectDate={handleDateSelect} />
        </div>
        <div className="flex flex-col gap-y-[7px]">
          <span className="text-2xl font-medium leading-[48px] text-[#909090]">
            Квесты
          </span>
          <InlineQuests
            quests={timelines}
            selectedDate={format(selectedDate, "yyyy-MM-dd")}
          />
        </div>
      </MaxWidthWrapper>
    </div>
  )
}
