"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

import { submitForm } from "@/actions/create-request"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "../ui/form"
import { PhoneInput } from "../ui/phone-input"

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
  comment: z.string().optional(),
})

export default function RequestForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: '' // Remove this line
  })

  const [isPending, startTransition] = useTransition()

  function formatPhoneNumber(phoneNumber: string) {
    return phoneNumber.replace(/[^\d]/g, "")
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        const result = await submitForm({
          name: data.name,
          phone: formatPhoneNumber(data.phone),
          comment: data.comment,
        })
        if (result.success) {
          form.reset()
          alert("thank you")
        } else {
          alert(result.message)
        }
      } catch (error) {
        alert(`${error}`)
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"gradient"} size={"lg"} className="">
          Оставить заявку
        </Button>
      </DialogTrigger>
      <DialogContent>
        <span className="pb-10 font-inter text-[36px] font-semibold leading-[44px] text-black">
          Оставить заявку
        </span>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center gap-y-5"
          >
            <div className="flex w-full flex-col gap-y-1.5">
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

            <div className="flex w-full flex-col gap-y-1.5">
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

            <Textarea
              {...form.register("comment")}
              placeholder="Комментарий"
              className="resize-none"
            />

            <p className="text-center font-inter text-[16px] leading-[19px] text-black">
              С Вами свяжутся в течении дня
            </p>
            <Button
              variant="gradient"
              size="lg"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Отправка..." : "Отправить"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
