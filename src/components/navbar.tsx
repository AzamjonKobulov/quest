"use client"
import { LogoFull } from "@/icons/logo"
import { MaxWidthWrapper } from "./width-wrapper"
import Link from "next/link"
import { Button } from "./ui/button"
import { MenuIcon, XIcon } from "lucide-react"
import { useState, useEffect } from "react"

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => {
    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])
  return (
    <nav className="sticky inset-x-0 top-0 z-[250] w-full bg-gray-100 pt-4 lg:pt-[6px]">
      <MaxWidthWrapper>
        <div className="flex w-full items-center justify-between pb-2 md:block lg:flex">
          <Link className="block w-max md:hidden xl:block" href="/">
            <LogoFull className="h-10 w-[166px] lg:w-[300px]" />
          </Link>
          <div className="hidden w-full items-center justify-between gap-x-5 whitespace-nowrap md:flex lg:justify-end lg:gap-x-[30px]">
            <Link
              href="/"
              className="text-lg leading-[29px] text-white transition duration-300 hover:opacity-75 lg:text-2xl"
            >
              Квесты
            </Link>
            <Link
              href="/"
              className="text-lg leading-[29px] text-white transition duration-300 hover:opacity-75 lg:text-2xl"
            >
              Праздникиe
            </Link>
            <Link
              href="/certificate"
              className="text-lg leading-[29px] text-white transition duration-300 hover:opacity-75 lg:text-2xl"
            >
              Сертификат
            </Link>
            <Link
              href="/"
              className="text-lg leading-[29px] text-white transition duration-300 hover:opacity-75 lg:text-2xl"
            >
              +7 (4822) 630-444
            </Link>
            <Button
              className="!px-5 !py-2.5 !text-lg transition duration-300 hover:opacity-75 lg:!px-[26px] lg:!py-[13px] lg:!text-2xl"
              variant={"gradient"}
            >
              Записаться
            </Button>
          </div>
          <button onClick={toggleMenu} className="relative z-[999] md:hidden">
            {!isOpen ? (
              <MenuIcon className="!h-6 !w-[30px] !text-[#F8BC0F]"></MenuIcon>
            ) : (
              <XIcon className="!h-6 !w-[30px] !text-[#F8BC0F]"></XIcon>
            )}
          </button>
        </div>
      </MaxWidthWrapper>
      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-10 ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
        onClick={toggleMenu}
      >
        <div
          className={`fixed right-0 top-0 block size-full bg-gray-100 p-4 transition-transform duration-300 md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mx-auto mt-32 flex w-full max-w-64 flex-col items-center justify-between gap-x-5 gap-y-3 whitespace-nowrap md:hidden lg:justify-end lg:gap-x-[30px]">
            <Link
              href="/"
              className="text-lg leading-[29px] text-white transition duration-300 hover:opacity-75 lg:text-2xl"
            >
              Квесты
            </Link>
            <Link
              href="/"
              className="text-lg leading-[29px] text-white transition duration-300 hover:opacity-75 lg:text-2xl"
            >
              Праздникиe
            </Link>
            <Link
              href="/certificate"
              className="text-lg leading-[29px] text-white transition duration-300 hover:opacity-75 lg:text-2xl"
            >
              Сертификат
            </Link>
            <Link
              href="/"
              className="text-lg leading-[29px] text-white transition duration-300 hover:opacity-75 lg:text-2xl"
            >
              +7 (4822) 630-444
            </Link>
            <Button
              className="mt-8 w-full !px-5 !py-2.5 !text-lg lg:!px-[26px] lg:!py-[13px] lg:!text-2xl"
              variant={"gradient"}
            >
              Записаться
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavigationBar
