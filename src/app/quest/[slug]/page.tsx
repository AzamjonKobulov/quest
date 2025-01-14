import { Button } from "@/components/ui/button"
import { MaxWidthWrapper } from "@/components/width-wrapper"
import KeyIcon from "@/icons/key-icon"
import PlayersIcon from "@/icons/players-icon"
import { getQuest, getQuests } from "@/lib/quests"
import { notFound } from "next/navigation"
import Image from "next/image"

interface QuestPageProps {
  params: {
    slug: string
  }
}

export default async function QuestPage({ params }: QuestPageProps) {
  const quest = await getQuest(params.slug)
  if (!quest) notFound()

  // Get all quests to determine prev/next
  const quests = await getQuests()
  const currentIndex = quests.findIndex((q) => q.slug === params.slug)
  const prevQuest = currentIndex > 0 ? quests[currentIndex - 1] : null
  const nextQuest =
    currentIndex < quests.length - 1 ? quests[currentIndex + 1] : null

  return (
    <div className="flex flex-col gap-y-[60px] pb-16 pt-[60px] sm:gap-20 sm:pt-20 lg:gap-[120px] lg:gap-y-[160px] lg:pb-[160px] lg:pt-[120px] xl:pt-[140px]">
      <section className="">
        <MaxWidthWrapper className="relative">
          <div className="md:border-tranparent relative flex h-full w-full flex-col overflow-hidden border-brand-main sm:rounded-xl sm:border-2 sm:p-6 sm:shadow-custom-shadow md:gap-5 md:border-transparent md:p-12 md:shadow-none lg:border-brand-main lg:p-12 lg:shadow-custom-shadow xl:max-h-[697px] xl:gap-y-20 xl:rounded-[30px] xl:px-[98px] xl:pb-[81px] xl:pt-[49px]">
            <div className="relative z-30 flex flex-col gap-y-1 lg:gap-y-5">
              <h1 className="font-inter text-[28px] font-bold leading-8 text-brand-main sm:text-[33px] sm:leading-10 md:text-[54px] md:leading-[64px] xl:text-[72px] xl:leading-[87px]">
                Узник подземелья
              </h1>
              <span className="font-inter font-semibold leading-5 md:text-[27px] md:leading-9 xl:text-[36px] xl:leading-[44px]">
                Настоящая командая игра
              </span>
            </div>
            <div className="relative z-30 mt-40 inline-flex w-full max-w-[632px] justify-between sm:mt-5 sm:flex-col md:mt-80 md:flex-row lg:mt-10 lg:flex-col xl:mt-0 xl:flex-row">
              <div className="flex flex-col sm:gap-0.5 md:gap-4 lg:gap-y-5">
                <span className="inline-flex items-center gap-x-5">
                  <span className="font-inter text-xs font-semibold leading-4 sm:text-[11px] md:text-lg md:leading-[22px] lg:text-2xl lg:leading-[29px]">
                    18.388 человек сыграло
                  </span>
                </span>
                <span className="inline-flex items-center gap-2 xl:gap-x-5">
                  <span className="font-inter text-xs font-semibold leading-4 sm:text-[11px] md:text-lg md:leading-[22px] lg:text-2xl lg:leading-[29px]">
                    Время
                  </span>
                  <span className="font-inter text-xs leading-[29px] sm:text-[11px] md:text-lg xl:text-2xl">
                    60 мин
                  </span>
                </span>
                <span className="inline-flex items-center gap-2 xl:gap-x-5">
                  <span className="font-inter text-xs font-semibold leading-4 sm:text-[11px] md:text-lg md:leading-[22px] lg:text-2xl lg:leading-[29px]">
                    Игроков
                  </span>
                  <span className="inline-flex items-center gap-0.5 font-inter text-xs leading-[29px] sm:text-[11px] md:text-lg xl:gap-x-2 xl:text-2xl">
                    2-8{" "}
                    <PlayersIcon className="size-3.5 md:size-6 xl:size-[29px]" />
                  </span>
                </span>
                <span className="inline-flex items-center gap-2 xl:gap-x-5">
                  <span className="font-inter text-xs font-semibold leading-4 sm:text-[11px] md:text-lg md:leading-[22px] lg:text-2xl lg:leading-[29px]">
                    Сложность
                  </span>
                  <span className="inline-flex items-center">
                    <KeyIcon className="size-3 text-brand-main md:size-5 xl:size-[26px]" />
                    <KeyIcon className="size-3 text-brand-main md:size-5 xl:size-[26px]" />
                    <KeyIcon className="size-3 text-brand-main md:size-5 xl:size-[26px]" />
                  </span>
                </span>
              </div>
              <div className="flex flex-col sm:gap-0.5 md:gap-1.5 lg:mt-8 lg:gap-y-1">
                <span className="bg-gradient-to-b from-brand-main via-[#F8BC0F] to-[#F6A819] bg-clip-text pl-1 font-inter text-sm font-semibold text-transparent sm:text-[17px] md:text-2xl md:leading-8 lg:pb-5 lg:text-[36px] xl:leading-[44px]">
                  9.85
                </span>
                <span className="pl-[1px] font-inter text-xs font-semibold leading-4 sm:text-[11px] md:text-lg md:leading-[22px] lg:text-2xl lg:leading-[29px]">
                  Рейтинг квеста
                </span>
                <span className="font-inter text-[9px] leading-[10px] md:text-xs lg:text-[16px] xl:leading-[19px]">
                  На основе 51 оценки
                </span>
              </div>
            </div>
            <div className="relative z-30 mt-2 inline-flex items-center gap-2.5 md:gap-5 xl:gap-x-5">
              <Button
                size="lg"
                variant="gradient"
                className="w-full max-w-[268px] hover:opacity-75"
              >
                Записаться
              </Button>
              <Button
                size="lg"
                variant={"glowing"}
                className="w-full max-w-[251px]"
              >
                Подарить
              </Button>
              <svg
                width="45"
                height="46"
                viewBox="0 0 45 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 shrink-0 md:size-11 xl:size-auto"
              >
                <path
                  d="M31.1438 39.8748C29.9013 39.8748 28.8469 39.4404 27.9806 38.5716C27.1156 37.7016 26.6831 36.6454 26.6831 35.4029C26.6831 35.2154 26.7656 34.7423 26.9306 33.9835L13.4362 25.9716C13.0312 26.4391 12.5356 26.806 11.9494 27.0723C11.3631 27.3385 10.7338 27.4716 10.0613 27.4716C8.82875 27.4716 7.78125 27.0329 6.91875 26.1554C6.05625 25.2779 5.625 24.226 5.625 22.9998C5.625 21.7735 6.05625 20.7216 6.91875 19.8441C7.78125 18.9666 8.82875 18.5279 10.0613 18.5279C10.7325 18.5279 11.3619 18.661 11.9494 18.9273C12.5369 19.1935 13.0325 19.561 13.4362 20.0298L26.9325 12.0516C26.845 11.8091 26.7819 11.5685 26.7431 11.3298C26.7031 11.0898 26.6831 10.8448 26.6831 10.5948C26.6831 9.35351 27.1188 8.29788 27.99 7.42788C28.8612 6.55913 29.9188 6.12476 31.1625 6.12476C32.4063 6.12476 33.4613 6.56038 34.3275 7.43163C35.1938 8.30288 35.6262 9.36038 35.625 10.6041C35.6238 11.8479 35.1894 12.9029 34.3219 13.7691C33.4544 14.6354 32.3981 15.0679 31.1531 15.0666C30.4756 15.0666 29.8506 14.9279 29.2781 14.6504C28.7056 14.3729 28.2181 13.9998 27.8156 13.531L14.3175 21.5429C14.405 21.7854 14.4681 22.0266 14.5069 22.2666C14.5469 22.5054 14.5669 22.7498 14.5669 22.9998C14.5669 23.2498 14.5469 23.4941 14.5069 23.7329C14.4669 23.9716 14.4044 24.2129 14.3194 24.4566L27.8156 32.4685C28.2194 31.9998 28.7069 31.6266 29.2781 31.3491C29.8506 31.0716 30.4756 30.9329 31.1531 30.9329C32.3956 30.9329 33.4519 31.3679 34.3219 32.2379C35.1906 33.1104 35.625 34.1685 35.625 35.4123C35.625 36.656 35.1894 37.711 34.3181 38.5773C33.4469 39.4435 32.3875 39.876 31.1438 39.8748Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="absolute inset-0 size-full h-60 sm:h-full md:mt-32 md:h-[406px] lg:top-0 lg:mt-0 lg:h-full">
              <div className="bg-quest-1 relative h-full w-full">
                <div className="bg-quest-2 sm:bg-quest-1 md:bg-quest-2 lg:bg-quest-1 absolute inset-0 z-20 size-full"></div>
                <button>
                  <svg
                    width="116"
                    height="116"
                    viewBox="0 0 116 116"
                    fill="none"
                    className="absolute inset-y-0 left-1/2 right-[252px] top-1/2 z-30 size-14 -translate-x-1/2 -translate-y-1/2 sm:left-2/3 sm:-translate-x-0 md:left-1/2 md:h-auto md:w-auto md:-translate-x-1/2 lg:left-[60%] lg:translate-x-0 xl:left-[70%]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M21.4452 22.3369C21.5844 21.1663 21.9948 20.0443 22.6437 19.0601C23.2927 18.0759 24.1623 17.2567 25.1834 16.6676C26.2045 16.0784 27.3489 15.7356 28.5258 15.6664C29.7026 15.5972 30.8794 15.8034 31.9625 16.2688C37.4377 18.6094 49.7079 25.5837 65.2777 34.5698C80.8526 43.5611 91.8082 50.0016 96.5668 53.5641C100.629 56.611 100.64 62.6533 96.5719 65.7106C91.8597 69.2525 80.6736 75.783 64.913 84.8877C49.137 93.9924 37.3758 100.706 31.9522 103.016C27.2813 105.011 22.0535 101.985 21.4452 96.9481C20.7337 91.0605 22.2773 78.7437 22.2773 60.689C22.2773 42.6446 20.7285 28.2297 21.4452 22.3369Z"
                      fill="url(#paint0_linear_1_1536)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_1_1536"
                        x1="59.5107"
                        y1="15.6533"
                        x2="59.5107"
                        y2="103.637"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FACC07" />
                        <stop offset="0.5" stop-color="#F8BC0F" />
                        <stop offset="1" stop-color="#F6A819" />
                      </linearGradient>
                    </defs>
                  </svg>
                </button>
                <Image
                  src="/quests/test.png"
                  alt="Image"
                  className="absolute inset-0 z-10 size-full object-cover"
                  width={1200}
                  height={600}
                />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section>
        <MaxWidthWrapper>
          <div className="flex flex-col gap-y-5">
            <h2 className="font-inter font-semibold text-brand-main md:text-lg lg:text-[36px]">
              Сюжет
            </h2>
            <p className="font-inter text-sm leading-4 lg:text-2xl lg:leading-[29px]">
              Не зря говорят, что нельзя доверять древним подземельям. Кажется,
              что там давным-давно никто не живет и что никто не проходит с
              факелом вдоль старинных стен… Но когда вы оказываетесь там, то
              будьте начеку. Кажется, за вами следят нечистые силы, которые так
              и норовят закрыть дверь, как только вы отвернулись. И сделают это!
              Как же быть дальше? Решать вам, но ясно одно - только став
              командой, реально выбраться из этих темниц.
              <br /> <br /> “Узники подземелья” - квест, который погружает в
              атмосферу таинственности и неожиданности - никогда не знаешь, за
              каким поворотом находится выход. Этот квест в реальности уже давно
              имеет своих поклонников, которым удалось сбежать из этого темного
              подземелья. Пройти его решится не каждый - уж слишком много тут
              запутанных ходов. Но от этого становится еще интересней!
              <br /> <br /> Конечно, оказаться взаперти довольно неприятно, но
              если рядом команда от 2 до 6 человек, то все испытания оказываются
              вам по плечу. Вы должны открыть загадку древних механизмов, чтобы
              квест “Узник подземелья” в Твери поддался вам и тоже открыл свои
              тайны, а их, поверьте нам, немало!. Хитроумные ловушки, которые
              приготовили для вас древние мудрецы, тоже реально преодолеть
              только командой. Так что захватите с собой лучших друзей - и
              вперед, искать сокровища и выход из подземелья.
            </p>
            <span className="inline-flex items-center gap-3 pt-5 lg:gap-x-5">
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-[29px] w-[15px] shrink-0 lg:size-auto"
              >
                <path
                  d="M24.0922 8.75C24.5294 8.75005 24.9609 8.84838 25.355 9.0377C25.749 9.22702 26.0955 9.50249 26.3687 9.84375L31.7645 16.5885C31.9716 16.8472 32.0844 17.1687 32.0844 17.5C32.0844 17.8313 31.9716 18.1528 31.7645 18.4115L26.3687 25.1548C26.0956 25.4963 25.7492 25.7721 25.3552 25.9616C24.9611 26.1512 24.5295 26.2498 24.0922 26.25H5.83388C5.55921 26.2498 5.29017 26.1721 5.05774 26.0257C4.82531 25.8794 4.63893 25.6704 4.52007 25.4227C4.40121 25.1751 4.3547 24.899 4.3859 24.6261C4.41709 24.3532 4.52471 24.0946 4.69638 23.8802L9.80055 17.5L4.69638 11.1198C4.53287 10.9162 4.42701 10.6725 4.38985 10.4141C4.35269 10.1556 4.38559 9.89196 4.48512 9.65058C4.58465 9.4092 4.74716 9.19897 4.95568 9.04184C5.1642 8.8847 5.41109 8.78644 5.67055 8.75729L5.83388 8.75H24.0922Z"
                  fill="#F8BC0F"
                />
              </svg>
              <span className="font-inter text-xs leading-4 lg:text-2xl lg:leading-[29px]">
                Для посещения квеста обязательно предварительная запись по
                телефону или через сайт
              </span>
            </span>
            <span className="inline-flex items-center gap-3 lg:gap-x-5">
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-[29px] w-[15px] shrink-0 lg:size-auto"
              >
                <path
                  d="M24.0922 8.75C24.5294 8.75005 24.9609 8.84838 25.355 9.0377C25.749 9.22702 26.0955 9.50249 26.3687 9.84375L31.7645 16.5885C31.9716 16.8472 32.0844 17.1687 32.0844 17.5C32.0844 17.8313 31.9716 18.1528 31.7645 18.4115L26.3687 25.1548C26.0956 25.4963 25.7492 25.7721 25.3552 25.9616C24.9611 26.1512 24.5295 26.2498 24.0922 26.25H5.83388C5.55921 26.2498 5.29017 26.1721 5.05774 26.0257C4.82531 25.8794 4.63893 25.6704 4.52007 25.4227C4.40121 25.1751 4.3547 24.899 4.3859 24.6261C4.41709 24.3532 4.52471 24.0946 4.69638 23.8802L9.80055 17.5L4.69638 11.1198C4.53287 10.9162 4.42701 10.6725 4.38985 10.4141C4.35269 10.1556 4.38559 9.89196 4.48512 9.65058C4.58465 9.4092 4.74716 9.19897 4.95568 9.04184C5.1642 8.8847 5.41109 8.78644 5.67055 8.75729L5.83388 8.75H24.0922Z"
                  fill="#F8BC0F"
                />
              </svg>
              <span className="font-inter text-xs leading-4 lg:text-2xl lg:leading-[29px]">
                Стоимость указана за команду от 2-х до 4-х человек. Если вас
                больше, то за каждого дополнительного человека необходимо будет
                доплатить 1000 рублей.
              </span>
            </span>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  )
}
