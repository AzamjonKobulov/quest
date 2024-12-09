import { Button } from "../../ui/button"
import { MaxWidthWrapper } from "../../width-wrapper"
import ReviewCard from "./card"

const ReviewsSection = () => {
  return (
    <section>
      <MaxWidthWrapper className="">
        <h2 className="leading-[21px pb-5 text-center text-[17px] font-bold lg:pb-10 lg:text-[36px] lg:leading-[45px]">
          Отзывы игроков
        </h2>
        <div className="grid gap-5 pb-5 sm:grid-cols-2 sm:gap-3 lg:gap-5 xl:grid-cols-3">
          <ReviewCard
            name="Злата С."
            date="1 сентября 2024"
            rating={5}
            review="Прошли почти все квесты у них. Очень нравится. Ездим специально ради квестов из..."
          />
          <ReviewCard
            name="Злата С."
            date="1 сентября 2024"
            rating={1}
            review="Прошли почти все квесты у них. Очень нравится. Ездим специально ради квестов из..."
          />
          <ReviewCard
            name="Злата С."
            date="1 сентября 2024"
            rating={4}
            review="Прошли почти все квесты у них. Очень нравится. Ездим специально ради квестов из..."
          />
          <ReviewCard
            name="Злата С."
            date="1 сентября 2024"
            rating={5}
            review="Прошли почти все квесты у них. Очень нравится. Ездим специально ради квестов из..."
          />
          <ReviewCard
            name="Злата С."
            date="1 сентября 2024"
            rating={2}
            review="Прошли почти все квесты у них. Очень нравится. Ездим специально ради квестов из..."
          />
          <ReviewCard
            name="Злата С."
            date="1 сентября 2024"
            rating={3}
            review="Прошли почти все квесты у них. Очень нравится. Ездим специально ради квестов из..."
          />
        </div>
        <div className="inline-flex w-full flex-col items-end justify-end gap-y-3 sm:flex-row sm:items-center sm:gap-2.5 lg:gap-x-5">
          <Button
            className="h-9 w-max px-9 transition duration-300 hover:opacity-75 sm:px-5 lg:h-[60px]"
            variant={"glowing"}
          >
            Открыть Яндекс отзывы
          </Button>
          <Button className="h-9 w-max px-9 transition duration-300 hover:opacity-75 sm:px-5 lg:h-[60px]">
            Оставить отзыв
          </Button>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}

export default ReviewsSection
