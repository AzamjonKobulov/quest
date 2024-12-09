"use client"

import { submitForm } from "@/actions/create-booking"
import { client } from "@/lib/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { format } from "date-fns"
import React, { ReactNode, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { Form } from "../ui/form"
import { Input } from "../ui/input"
import { PhoneInput } from "../ui/phone-input"
import { Textarea } from "../ui/textarea"

const formSchema = z.object({
  name: z.string().min(10, "ФИО должно содержать не менее 10 символов"),
  phone: z
    .string()
    .min(12, "Номер телефона должен содержать не менее 11 цифр")
    .refine(
      (value) => {
        const digitsOnly = value.replace(/\D/g, "")
        return digitsOnly.length === 11 && digitsOnly.startsWith("7")
      },
      { message: "Некорректный номер телефона" }
    ),
  promocode: z.string().optional(),
  comment: z.string().optional(),
})

const BookingForm = React.memo(function BookingForm({
  children,
  questName,
  questId,
  slot,
  price,
  time,
  date,
  disabled,
}: {
  children: ReactNode
  questName: string
  questId: string
  slot: string
  time: string
  price: number
  date: string
  disabled?: boolean
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: '' // Remove this line
  })

  const [isPending, startTransition] = useTransition()

  const mutation = useMutation({
    mutationFn: async ({
      questName,
      date,
      time,
      slot,
      price,
    }: {
      questName: string
      date: string
      time: string
      slot: string
      price: number
    }) => {
      const priceString =
        price !== null && price !== undefined ? String(price) : "0" // Default to "0" if price is null/undefined
      return await client.booking.create.$post({
        questName,
        date,
        time,
        slot,
        price: priceString,
      })
    },
    onSuccess: async () => {
      console.log("Booking successful")
      // Optionally, reset the form or perform other actions here
    },
  })

  function formatPhoneNumber(phoneNumber: string) {
    return phoneNumber.replace(/[^\d]/g, "")
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    startTransition(async () => {
      mutation.mutate({ questName, date, time, slot, price })
      try {
        const result = await submitForm({
          name: data.name,
          phone: formatPhoneNumber(data.phone),
          price,
          date,
          time,
          quest: questName,
          promocode: data.promocode,
          comment: data.comment,
        })
        if (result.success) {
          form.reset()
          alert("Thank you")
        } else {
          alert(result.message)
        }
      } catch (error) {
        alert(`Error: ${error}`)
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <span className="pb-10 font-inter text-[36px] font-semibold leading-[44px] text-black">
          {questName}
        </span>
        <div className="grid w-full grid-flow-row grid-cols-2 justify-between gap-y-5 pb-10">
          <span className="inline-flex items-center gap-x-[5px] font-inter text-black">
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.5 23.625C19.0919 23.625 23.625 19.0919 23.625 13.5C23.625 7.90812 19.0919 3.375 13.5 3.375C7.90812 3.375 3.375 7.90812 3.375 13.5C3.375 19.0919 7.90812 23.625 13.5 23.625Z"
                stroke="black"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.375 9V14.625H18"
                stroke="black"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-2xl leading-[29px]">
              {format(date, "dd.MM.yy")}
            </span>
          </span>
          <span className="text-end text-2xl font-semibold leading-[29px] text-black">
            {price} ₽
          </span>
          <span className="inline-flex items-center gap-x-[5px] font-inter text-black">
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.5625 5.625V3.375M8.4375 5.625V3.375M3.65625 9H23.3438M3.375 11.2995C3.375 8.92012 3.375 7.72988 3.8655 6.82088C4.30903 6.01009 4.99724 5.36007 5.832 4.9635C6.795 4.5 8.055 4.5 10.575 4.5H16.425C18.945 4.5 20.205 4.5 21.168 4.9635C22.0151 5.37075 22.7025 6.021 23.1345 6.81975C23.625 7.731 23.625 8.92125 23.625 11.3006V16.8266C23.625 19.206 23.625 20.3962 23.1345 21.3052C22.691 22.116 22.0028 22.7661 21.168 23.1626C20.205 23.625 18.945 23.625 16.425 23.625H10.575C8.055 23.625 6.795 23.625 5.832 23.1615C4.99741 22.7652 4.30921 22.1156 3.8655 21.3052C3.375 20.394 3.375 19.2037 3.375 16.8244V11.2995Z"
                stroke="black"
                strokeWidth="1.6875"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-2xl leading-[29px]">{time}</span>
          </span>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center gap-y-5"
          >
            <div className="flex flex-col gap-y-1.5 w-full">
              <Input
                {...form.register("name")}
                placeholder="ФИО"
                required
                aria-invalid={!!form.formState.errors.name}
              />
              {form.formState.errors.name && (
                <span className="text-red-500">
                  {form.formState.errors.name.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-y-1.5 w-full">
              <PhoneInput
                {...form.register("phone", {
                  onChange: (event) => {
                    form.setValue("phone", event.target.value)
                  },
                })}
                aria-invalid={!!form.formState.errors.phone}
                required
              />
              {form.formState.errors.phone && (
                <span className="text-red-500">
                  {form.formState.errors.phone.message}
                </span>
              )}
            </div>
            <Input
              {...form.register("promocode")}
              placeholder="Промокод для получения скидки"
              aria-invalid={!!form.formState.errors.promocode}
            />
            {form.formState.errors.promocode && (
              <span className="text-red-500">
                {form.formState.errors.promocode.message}
              </span>
            )}

            <Textarea
              {...form.register("comment")}
              placeholder="Комментарий"
              className="resize-none"
            />

            <p className="text-center font-inter text-[16px] leading-[19px] text-black">
              Если у вас не получится прийти, пожалуйста, отмените игру заранее
              по телефону +7(4822) 630-444
            </p>

            <Button
              variant="gradient"
              size="lg"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Отправка..." : "Записаться"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
})

export default BookingForm
