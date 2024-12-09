import { Button } from "../../ui/button"
import { MaxWidthWrapper } from "../../width-wrapper"
import QuestCard from "./card"

import quest_background from "../../../../public/quests_background.png"
import Image from "next/image"
import KeyIcon from "@/icons/key-icon"
import { cn } from "@/lib/utils"

const QuestSection = () => {
  return (
    <>
      <section className="relative mx-auto inline-flex w-full items-center">
        <MaxWidthWrapper>
          <h2 className="pb-5 text-center text-[17px] font-bold leading-[21px] lg:pb-10 lg:text-[36px] lg:leading-[45px]">
            Наши квесты
          </h2>
          <div className="flex flex-col items-center gap-y-5">
            <div className="grid w-full gap-2.5 text-center sm:grid-cols-2 md:gap-4 lg:grid-flow-row xl:grid-cols-3">
              <QuestCard
                label="Узник подземелья"
                description="Настоящая командная игра"
                type="quest"
                difficulty={2}
                players="2-8"
                background="bg-[url('/quests/test.png')]"
              />
              <QuestCard
                label="Пираты карибского моря"
                description="Настоящая командная игра"
                type="quest"
                difficulty={2}
                players="2-8"
                background="bg-[url('/quests/test.png')]"
              />
              <QuestCard
                label="Пираты карибского моря"
                description="Настоящая командная игра"
                type="quest"
                difficulty={2}
                players="2-8"
                background="bg-[url('/quests/test.png')]"
              />
              <QuestCard
                label="Узник подземелья"
                description="Настоящая командная игра"
                type="horror"
                difficulty={2}
                players="2-8"
                background="bg-[url('/quests/test.png')]"
              />
              <QuestCard
                label="Узник подземелья"
                description="Настоящая командная игра"
                type="quest"
                difficulty={2}
                players="2-8"
                background="bg-[url('/quests/test.png')]"
              />
              <QuestCard
                label="Узник подземелья"
                description="Настоящая командная игра"
                type="drinking"
                difficulty={2}
                players="2-8"
                background="bg-[url('/quests/test.png')]"
              />
              <QuestCard
                label="Узник подземелья"
                description="Настоящая командная игра"
                type="quest"
                difficulty={2}
                players="2-8"
                background="bg-[url('/quests/test.png')]"
              />
              <div className="hidden sm:block">
                <div
                  className={cn(
                    "relative flex h-40 w-full flex-col items-center justify-center gap-y-4 rounded-[14px] border-[0.5px] border-white/50 bg-[#151515] sm:h-[103px] lg:h-[220px]"
                  )}
                  style={{
                    clipPath: "polygon(0 0, 100% 1%, 100% 89%, 0 70%)",
                  }}
                >
                  <div className="inline-flex items-center text-[#6A6A6A]">
                    <KeyIcon className="size-[19px] sm:size-[13px] md:size-5 lg:size-[26px]" />
                    <KeyIcon className="size-[19px] sm:size-[13px] md:size-5 lg:size-[26px]" />
                    <KeyIcon className="size-[19px] sm:size-[13px] md:size-5 lg:size-[26px]" />
                  </div>
                  <span className="max-w-[326px] text-xs font-bold uppercase leading-[30px] md:text-lg lg:text-2xl">
                    В разработке
                  </span>
                </div>
              </div>
              <div className="hidden xl:block">
                <div
                  className={cn(
                    "relative flex h-40 w-full flex-col items-center justify-center gap-y-4 rounded-[14px] border-[0.5px] border-white/50 bg-[#151515] sm:h-[103px] lg:h-[220px]"
                  )}
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% 30%, 100% 100%, 54% 100%, 0 90%, 0% 70%, 0% 30%)",
                  }}
                >
                  <div className="inline-flex items-center text-[#6A6A6A]">
                    <KeyIcon className="size-[19px] sm:size-[13px] md:size-5 lg:size-[26px]" />
                    <KeyIcon className="size-[19px] sm:size-[13px] md:size-5 lg:size-[26px]" />
                    <KeyIcon className="size-[19px] sm:size-[13px] md:size-5 lg:size-[26px]" />
                  </div>
                  <span className="max-w-[326px] text-xs font-bold uppercase leading-[30px] md:text-lg lg:text-2xl">
                    В разработке
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant={"gradient"}
              size="lg"
              className="hidden transition duration-300 hover:opacity-75 sm:block"
            >
              Записаться
            </Button>
          </div>
        </MaxWidthWrapper>
        <Image
          src={quest_background}
          alt="background"
          placeholder="blur"
          quality={100}
          className="absolute inset-x-0 bottom-[44px] top-1/2 z-[-5] mx-auto h-full -translate-y-1/2 sm:h-auto lg:top-0 lg:translate-y-0"
        />
      </section>
    </>
  )
}

export default QuestSection
