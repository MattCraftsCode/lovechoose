import type { Metadata } from "next"
import { DM_Sans, Playfair_Display } from "next/font/google"

import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { siteProfile } from "@/data/site"
import { cn } from "@/lib/utils"

import "./globals.css"

const sans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" })
const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: {
    default: "lovechoose — Indie Developer Portfolio",
    template: "%s — lovechoose",
  },
  description:
    "Independent developer portfolio for focused websites, browser extensions and mini programs.",
  authors: [{ name: "MattCraftsCode", url: siteProfile.github }],
  creator: "MattCraftsCode",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(sans.variable, serif.variable)}
      data-scroll-behavior="smooth"
    >
      <body>
        <div className="grain" aria-hidden="true" />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
