"use client"

import { cn } from "@/lib/utils"
import { addDays, format, isSameDay, isWeekend } from "date-fns"
import { ru } from "date-fns/locale"
import { useState, useCallback, useMemo } from "react"
import BookingForm from "../../forms/booking-form"
import { client } from "@/lib/client"
import { useQuery } from "@tanstack/react-query"

// fix: saturday and friday, first date, if time is over then its disabled

interface InlineCalendarProps {
  onSelectDate: (date: Date) => void
}

export function InlineCalendar({ onSelectDate }: InlineCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const today = new Date()
    // Ensure we call onSelectDate with initial date
    setTimeout(() => onSelectDate(today), 0)
    return today
  })
  const dates = Array.from({ length: 30 }, (_, i) => addDays(new Date(), i))

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    onSelectDate(date)
  }

  return (
    <div className="inline-flex items-center gap-x-[4px] px-5">
      {dates.map((date) => (
        <button
          onClick={() => handleDateClick(date)}
          className={cn(
            "flex size-[44px] w-[44px] items-start rounded-[7px] border border-transparent text-[#909090]",
            isSameDay(date, selectedDate)
              ? "!border-[#F8470F] !bg-[#F8470F] text-white"
              : "",
            isWeekend(date) && "border-[#909090]"
          )}
          key={date.toISOString()}
        >
          <div className="mx-auto flex flex-col items-center justify-center">
            <span className="text-[14px] font-semibold leading-[19.6px]">
              {format(date, "d")}
            </span>
            <span className="text-[14px] leading-[19.6px]">
              {format(date, "E", { locale: ru })}
            </span>
          </div>
        </button>
      ))}
    </div>
  )
}

interface TimeSlot {
  id: string
  time: string
  price: number
}

interface Quest {
  id: string
  name: string
  timeSlots: TimeSlot[]
}

interface InlineQuestsProps {
  quests: Quest[]
  selectedDate: Date
}

export function InlineQuests({ quests, selectedDate }: InlineQuestsProps) {
  // Create a map of all time slots to check availability in batch
  const normalizedDate = useMemo(() => {
    const date = new Date(selectedDate)
    date.setHours(0, 0, 0, 0)
    return date
  }, [selectedDate])

  const allTimeSlots = useMemo(() => {
    const slots: Array<{ date: string; slot: string; time: string }> = []
    const formattedDate = format(normalizedDate, "yyyy-MM-dd")

    quests.forEach((quest) => {
      quest.timeSlots.forEach((timeSlot) => {
        slots.push({
          date: formattedDate,
          slot: `${timeSlot.time}-${timeSlot.price}`,
          time: format(new Date(`2000-01-01T${timeSlot.time}`), "HH:mm"),
        })
      })
    })
    return slots
  }, [quests, normalizedDate])

  // Update query to use normalized date
  const { data: availabilityData, isLoading } = useQuery({
    queryKey: ["slots-availability", format(normalizedDate, "yyyy-MM-dd")],
    // Enable the query explicitly
    enabled: Boolean(normalizedDate),
    queryFn: async () => {
      const results = await Promise.all(
        allTimeSlots.map(async (slot) => {
          try {
            const response = await client.booking.checkAvailability.$get(slot)
            // Add await response.json() to properly parse the response
            const data = await response.json()
            const key = `${slot.date}-${slot.slot}`
            return {
              [key]: {
                success: data.success,
                isAvailable: data.isAvailable,
                existingBooking: data.existingBooking,
              },
            }
          } catch (error) {
            const key = `${slot.date}-${slot.slot}`
            console.error("Error checking slot:", slot, error)
            return {
              [key]: {
                success: false,
                isAvailable: false,
                existingBooking: null,
              },
            }
          }
        })
      )

      return results
    },
  })

  const isSlotAvailable = useCallback(
    (date: string, slotId: string) => {
      if (!availabilityData) return false

      const slotAvailability = availabilityData.find((result) => {
        const key = `${date}-${slotId}`
        return Object.hasOwn(result, key)
      })

      if (!slotAvailability) return false

      const key = `${date}-${slotId}`
      return slotAvailability[key]?.isAvailable ?? false
    },
    [availabilityData]
  )

  return (
    <div className="flex flex-col gap-y-[30px]">
      {quests.map((quest) => {
        const slotsByPrice = quest.timeSlots.reduce((acc, slot) => {
          if (!acc[slot.price]) {
            acc[slot.price] = []
          }
          acc[slot.price].push(slot)
          return acc
        }, {} as Record<number, TimeSlot[]>)

        return (
          <div className="flex" key={quest.id}>
            <div className="w-[150px] shrink-0">
              <div className="flex h-[80px] w-[130px] flex-col items-center justify-center rounded-[14px] border border-white/50 bg-black pt-1">
                <span className="text-center text-[14px] font-semibold leading-[17px]">
                  {quest.name}
                </span>
                <div className="h-[17px]" />
              </div>
            </div>

            {/* Table container */}
            <div className="inline-block w-[calc(100%-150px)] overflow-auto align-top">
              <table className="w-full border-separate border-spacing-x-10">
                <tbody>
                  <tr className="">
                    {Object.entries(slotsByPrice).map(([price, slots]) => (
                      <td
                        key={price}
                        className="h-[80px] rounded-[14px] border border-white/50 bg-black p-[5px]"
                        style={{ width: `${slots.length * 80}px` }}
                      >
                        <div className="flex h-full flex-col items-center justify-center gap-y-2 pt-[5px]">
                          <div className="flex w-full items-center justify-around">
                            {slots.map((timeSlot) => {
                              const formattedDate = format(
                                selectedDate,
                                "yyyy-MM-dd"
                              )
                              // Create slot ID in the same format as the availability check
                              const slotId = `${timeSlot.time}-${timeSlot.price}`

                              const available = isSlotAvailable(
                                formattedDate,
                                slotId
                              )

                              return (
                                <BookingForm
                                  key={timeSlot.id}
                                  questName={quest.name}
                                  time={timeSlot.time}
                                  questId={quest.id}
                                  slot={slotId}
                                  price={timeSlot.price}
                                  date={formattedDate}
                                  disabled={!available}
                                >
                                  <button
                                    className={cn(
                                      "inline-flex max-h-[36px] w-[70px] items-center justify-center rounded-[14px] border border-white/50 text-center text-[13px] font-semibold leading-[34px] text-white transition-colors",
                                      available
                                        ? "bg-[#121212] hover:bg-[#1a1a1a]"
                                        : "bg-[#3d3d3d] cursor-not-allowed opacity-50"
                                    )}
                                    disabled={!available || isLoading}
                                  >
                                    {isLoading ? "Loading..." : timeSlot.time}
                                  </button>
                                </BookingForm>
                              )
                            })}
                          </div>
                          <span className="text-xs font-semibold leading-[26px] text-brand-main">
                            {price} ₽
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )
      })}
    </div>
  )
}
