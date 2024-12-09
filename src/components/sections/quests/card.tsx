import DrinkIcon from "@/icons/drink-icon"
import KeyIcon from "@/icons/key-icon"
import PlayersIcon from "@/icons/players-icon"
import SkullIcon from "@/icons/skull-icon"
import { cn } from "@/lib/utils"

interface QuestCardProps {
  label: string
  description: string
  type: "horror" | "drinking" | "quest"
  difficulty: 1 | 2 | 3
  players: string
  background?: string
}

const questIcons = {
  horror: (
    <SkullIcon className="size-[19px] sm:size-2.5 md:size-4 lg:size-[26px]" />
  ),
  drinking: (
    <DrinkIcon className="size-[19px] sm:size-3 md:size-5 lg:size-[26px]" />
  ),
  quest: (
    <KeyIcon className="size-[19px] sm:size-[13px] md:size-5 lg:size-[26px]" />
  ),
}

const QuestCard = ({
  label,
  description,
  type,
  difficulty,
  players,
  background,
}: QuestCardProps) => {
  const difficultyIcons = Array.from({ length: 3 }, (_, index) => (
    <span
      key={index}
      className={index < difficulty ? "text-brand-main" : "text-[#6A6A6A]"}
    >
      {questIcons[type]}
    </span>
  ))
  return (
    <div
      className={cn(
        "relative flex h-[161px] w-full flex-col items-center justify-center gap-y-3 rounded-[14px] border-[0.5px] border-white/50 sm:h-[103px] sm:gap-y-1 md:h-40 md:gap-3 lg:h-[220px] xl:w-[420px] xl:gap-y-4",
        background
      )}
    >
      <div className="inline-flex items-center">{difficultyIcons}</div>
      <span className="lg :text-[17px] max-w-[326px] text-xs font-bold uppercase leading-[21px] md:text-lg xl:text-2xl xl:leading-[30px]">
        {label}
      </span>
      <p className="text-xs leading-[14px] sm:text-[8px] md:text-xs xl:text-[16px] xl:leading-[19px]">
        {description}
      </p>
      <div className="absolute bottom-2.5 right-[14px] inline-flex items-center gap-x-[5px] xl:gap-x-[7px]">
        <span className="text-xs leading-[14px] lg:text-[16px] xl:leading-[19px]">
          {players}
        </span>
        <PlayersIcon className="size-[17px] lg:size-[24px]" />
      </div>
    </div>
  )
}

export default QuestCard
