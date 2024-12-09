import { Button } from "@/components/ui/button"
import pirates from "../../../../public/cta_pirates.png"
import Image from "next/image"

const CtaSection = () => {
  return (
    <div className="w-full bg-[url('/cta_background.png')] bg-cover bg-no-repeat bg-center relative">
      <Image
        src={pirates}
        alt="pirates"
        quality={90}
        className="absolute bottom-0 left-[37px]"
      />
      <div className="flex flex-col items-center gap-y-5 pt-[74px] pb-[45px]">
        <h1 className="font-bold text-[36px] leading-[45px] text-brand-main">
          Праздник ВКвесте
        </h1>
        <p className="text-center text-2xl leading-[29px]">
          Альтернатива стандартным подаркам,
          <br /> переводим фокус с вещей на яркие, наполненные жизнью события
        </p>
        <Button className="mt-5 max-w-[228px]" size="lg">
          Подробнее
        </Button>
      </div>
    </div>
  )
}

export default CtaSection
