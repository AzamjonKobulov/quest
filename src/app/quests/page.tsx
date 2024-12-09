import QuestSection from "@/components/sections/quests/section"
import { Button } from "@/components/ui/button"
import { MaxWidthWrapper } from "@/components/width-wrapper"

import element_1 from "../../../public/quests_element_1.png"
import element_2 from "../../../public/quests_element_2.png"
import Image from "next/image"
import ReviewsSection from "@/components/sections/reviews/section"
import CtaSection from "@/components/sections/cta/section"

export default function QuestsPage() {
  return (
    <div className="flex flex-col gap-y-[140px] pb-[140px] pt-[140px]">
      <section className="pt-[82px] pb-[245px] relative">
        <MaxWidthWrapper>
          <div className="flex flex-col gap-y-5 justify-start items-start">
            <h1 className="text-brand-main font-bold text-[72px] leading-[89px]">
              Квесты
            </h1>
            <h3 className="font-semibold text-[36px] leading-[44px]">
              Откройся новым приключениям
            </h3>
            <p className="text-2xl leading-[29px]">
              Детективные квесты, жуткие хоррор квесты, экшен
              <br /> и перформансы
            </p>
            <Button
              variant={"gradient"}
              size="lg"
              className="max-w-[575px] w-full mt-5"
            >
              Оставить заявку
            </Button>
          </div>
        </MaxWidthWrapper>
        <Image
          src={element_2}
          quality={100}
          alt="Arrow"
          placeholder="blur"
          className="absolute left-0 top-[113px] pointer-events-none max-w-none"
        />
        <Image
          src={element_1}
          quality={100}
          alt="Chest"
          placeholder="blur"
          className="absolute -top-[13px] right-0 pointer-events-none max-w-none"
        />
      </section>
      <QuestSection />
      <CtaSection />
      <ReviewsSection />
    </div>
  )
}
