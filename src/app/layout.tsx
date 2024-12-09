import type { Metadata } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import { Providers } from "../components/providers"
import NavigationBar from "../components/navbar"
import Footer from "../components/footer"
import { cn } from "@/utils"

import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const gilroy = localFont({
  src: [
    {
      path: "./fonts/gilroy-light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/gilroy-regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/gilroy-medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/gilroy-semibold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/gilroy-bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/gilroy-extrabold.woff",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-gilroy",
  display: "swap",
})

export const metadata: Metadata = {
  title: "vkveste rework wip",
  description: "yea",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn(inter.variable, gilroy.variable)}>
      <body className="bg-gray-100 w-full mx-auto font-gilroy text-white antialiased">
        <Providers>
          <NavigationBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
