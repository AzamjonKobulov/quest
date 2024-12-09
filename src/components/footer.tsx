import Link from "next/link"
import { MaxWidthWrapper } from "./width-wrapper"
import InstagramIcon from "@/icons/instagram-icon"
import VkontakteIcon from "@/icons/vkontakte-icon"
import Image from "next/image"

import widget from "../../public/widget-world-of-quests.png"
import { Button } from "./ui/button"

const Footer = () => {
  return (
    <div className="w-full bg-gray-200">
      <MaxWidthWrapper>
        <footer className="inline-flex w-full items-start justify-between pb-5 pt-[55px] lg:pb-[71px]">
          <div className="flex flex-col gap-y-8 lg:gap-y-[61px]">
            <div className="flex flex-col gap-y-2 text-xs leading-4 transition duration-300 hover:opacity-75 sm:gap-3 sm:text-base md:gap-y-5 md:text-[27px] md:leading-[29px] lg:gap-7 lg:text-4xl lg:leading-[43px]">
              <Link href="/">Главная</Link>
              <Link href="/">Квесты</Link>
              <Link href="/">Праздники</Link>
              <Link href="/">Приобрести сертификат</Link>
            </div>
            <div className="flex flex-col gap-y-2.5">
              <span className="text-xs leading-[19px] text-white/40 md:text-lg lg:text-2xl">
                © Все права защищены. 2024
              </span>
              <span className="hidden text-xs leading-[19px] text-white/40 lg:text-base xl:block">
                Разработано <span className="font-semibold">Vielton</span>
              </span>
            </div>
          </div>
          <div className="inline-flex items-center gap-x-[310px]">
            <Button
              variant="gradient"
              size="lg"
              className="mb-[17px] hidden transition duration-300 hover:opacity-75 xl:block"
            >
              Записаться
            </Button>
            <div className="flex flex-col items-end gap-y-2 lg:gap-y-9">
              <div className="flex flex-col items-end justify-end gap-y-2 md:gap-y-5 lg:gap-7">
                <Link
                  href="/"
                  className="text-xs font-light leading-4 transition duration-300 hover:opacity-75 sm:text-base md:text-2xl md:text-[27px] lg:text-3xl lg:leading-[29px]"
                >
                  +7 (4822) 630-444
                </Link>
                <Link
                  href="/"
                  className="text-xs font-light leading-4 transition duration-300 hover:opacity-75 sm:text-base md:text-2xl md:text-[27px] lg:text-3xl lg:leading-[29px]"
                >
                  mail@vzaperti.com
                </Link>
                <div className="inline-flex items-center">
                  <Link
                    href="/"
                    className="text-white transition duration-300 hover:opacity-75"
                  >
                    <InstagramIcon className="size-6 sm:size-9 md:size-[57px] lg:size-20" />
                  </Link>
                  <Link
                    href="/"
                    className="text-white transition duration-300 hover:opacity-75"
                  >
                    <VkontakteIcon className="size-6 sm:size-9 md:size-[57px] lg:size-20" />
                  </Link>
                </div>
              </div>
              <Image
                src={widget}
                quality={100}
                placeholder="blur"
                alt="widget"
                className="h-12 w-[110px] sm:h-[72px] sm:w-[165px] md:h-[114px] md:w-[264px]"
              />
            </div>
          </div>
        </footer>
      </MaxWidthWrapper>
    </div>
  )
}

export default Footer
