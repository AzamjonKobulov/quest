import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-zinc-300",
  {
    variants: {
      variant: {
        default:
          "bg-brand-main text-xs leading-[15px] rounded-[8px] text-gray-100 font-semibold lg:text-2xl lg:leading-[29px] shadow-inset-default-button lg:rounded-[14px]",
        gradient:
          "rounded-[14px] text-2xl leading-[29px] text-white font-semibold bg-gradient-to-r from-brand-main to-[#F8470F]",
        glowing:
          "border-2 border-transparent border-image-gradient-border shadow-custom-shadow font-semibold text-[#F7AF16] text-xs leading-[15px] rounded-[8px] lg:rounded-[14px] lg:leading-[29px] lg:text-2xl border-2 border-brand-secondary",
        destructive:
          "bg-red-500 text-zinc-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90",
        outline:
          "rounded-[14px] text-2xl leading-[29px] text-white font-semibold bg-black border border-white/50",
        secondary:
          "bg-zinc-100 text-zinc-900 shadow-sm hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80",
        ghost:
          "hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
        link: "text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50",
      },
      size: {
        default: "h-[55px] px-[26px] py-[13px]",
        sm: "font-semibold text-xs md:text-lg lg:text-2xl py-3 sm:py-2 md:py-[17px] px-5",
        lg: "font-semibold text-xs md:text-lg lg:text-2xl px-[34px] py-3 sm:px-9 sm:py-3.5 md:py-[18px] lg:py-[26px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
