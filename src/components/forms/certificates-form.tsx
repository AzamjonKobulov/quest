"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "../ui/input"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Textarea } from "../ui/textarea"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useTransition } from "react"
import { submitForm } from "@/actions/order-certificate"
import { Form } from "../ui/form"

const formSchema = z.object({
  name: z.string().min(10, "ФИО должно содержать не менее 10 символов"),
  email: z.string().email("Некорректный адрес электронной почты"),
  address: z.string().min(1, "Адрес обязателен для заполнения"),
  shipment: z.boolean().optional(),
  value: z.number().min(0, "Некорректный формат цены"),
  comment: z.string().optional(),
})

export default function CertificatesForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: 4500,
      shipment: false,
    },
  })

  const [isPending, startTransition] = useTransition()

  function onSubmit(data: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        const result = await submitForm(data)
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
        <Button
          variant={"gradient"}
          size={"lg"}
          className="!text-xs !font-semibold transition duration-300 hover:opacity-75 md:mt-5 md:w-[384px] md:!text-lg lg:!text-2xl"
        >
          Приобрести сертификат
        </Button>
      </DialogTrigger>
      <DialogContent>
        <span className="pb-10 font-inter text-[36px] font-semibold leading-[44px] text-black">
          Покупка сертификата
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
              <Input
                {...form.register("email")}
                placeholder="Email"
                type="email"
                required
                aria-invalid={!!form.formState.errors.email}
              />
              {form.formState.errors.email && (
                <span className="text-red-500">
                  {form.formState.errors.email.message}
                </span>
              )}
            </div>

            <div className="flex w-full flex-col gap-y-1.5">
              <Input
                {...form.register("address")}
                placeholder="Адрес доставки"
                required
                aria-invalid={!!form.formState.errors.address}
              />
              {form.formState.errors.address && (
                <span className="text-red-500">
                  {form.formState.errors.address.message}
                </span>
              )}
            </div>
            <span className="font-inter text-2xl leading-[29px] text-black">
              Сумма сертификата
            </span>
            <RadioGroup
              onValueChange={(value) => form.setValue("value", Number(value))}
              defaultValue="4500"
              className="inline-flex w-full items-center justify-between px-[41px]"
            >
              <RadioGroupItem
                className="w-full"
                label="3.300 ₽"
                value="3300"
                id="r1"
              />
              <RadioGroupItem
                className="w-full"
                label="4.500 ₽"
                value="4500"
                id="r2"
              />
              <RadioGroupItem
                className="w-full"
                label="6.000 ₽"
                value="6000"
                id="r3"
              />
            </RadioGroup>

            <Textarea
              {...form.register("comment")}
              placeholder="Комментарий"
              className="resize-none"
            />

            <Button
              variant="gradient"
              size="lg"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Отправка..." : "Оставить заявку"}
            </Button>

            <p className="text-center font-inter text-[16px] leading-[19px] text-black">
              После заказа, если с Вами не связались в течении дня, позвоните
              нам: +7(4822) 630-444
            </p>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
