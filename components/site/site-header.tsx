"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Mail, Menu } from "lucide-react"

import { Button } from "@/components/animate-ui/components/buttons/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/animate-ui/components/radix/sheet"
import { useState } from "react"
import { projectMap } from "@/data/projects"
import { cn } from "@/lib/utils"

const navigation = [
  { href: "/", label: "Home" },
  { href: "/websites", label: "Websites" },
  { href: "/extensions", label: "Extensions" },
  { href: "/mini-programs", label: "Mini Programs" },
  { href: "/about", label: "About" },
]

const languages = ["EN", "中文", "日本語"]

function activePath(pathname: string) {
  const slug = pathname.split("/").filter(Boolean)[0]
  const project = slug ? projectMap.get(slug) : undefined

  if (project?.category === "website") return "/websites"
  if (project?.category === "extension") return "/extensions"
  return pathname
}

export function SiteHeader() {
  const pathname = usePathname()
  const [languageIndex, setLanguageIndex] = useState(0)
  const currentPath = activePath(pathname)

  return (
    <header className="glass sticky top-0 z-50 border-b border-border/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="lovechoose home"
        >
          <span className="logo-mark grid size-10 place-items-center rounded-lg bg-primary font-serif text-xl text-primary-foreground transition-transform duration-300 group-hover:rotate-6">
            L
          </span>
          <span>
            <span className="block font-serif text-xl leading-none">
              lovechoose
            </span>
            <span className="mt-1 block text-[10px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
              indie developer
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Primary navigation"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "nav-link text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground",
                currentPath === item.href && "active text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            hoverScale={1.03}
            tapScale={0.96}
            className="h-9 rounded-full border-border bg-white/65 px-3 text-xs shadow-none"
            onClick={() =>
              setLanguageIndex((index) => (index + 1) % languages.length)
            }
            aria-label="Change display language"
          >
            {languages[languageIndex]}
            <ChevronDown className="size-3.5" aria-hidden="true" />
          </Button>

          <Button
            asChild
            size="sm"
            className="hidden h-9 rounded-full px-4 shadow-none sm:inline-flex"
          >
            <a href="mailto:hello@lovechoose.com">
              Say hello
              <Mail className="size-3.5" aria-hidden="true" />
            </a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-9 rounded-full border-border bg-white/65 shadow-none md:hidden"
                aria-label="Open navigation"
              >
                <Menu className="size-4" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[min(88vw,360px)] border-border bg-[#fffef8] p-2">
              <SheetHeader className="border-b border-border px-5 py-5 text-left">
                <SheetTitle className="font-serif text-2xl">
                  lovechoose
                </SheetTitle>
                <SheetDescription>
                  Independent developer portfolio
                </SheetDescription>
              </SheetHeader>
              <nav
                className="flex flex-col gap-1 p-3"
                aria-label="Mobile navigation"
              >
                {navigation.map((item, index) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-4 py-4 text-lg font-semibold transition-colors hover:bg-secondary",
                        currentPath === item.href && "bg-secondary text-primary"
                      )}
                    >
                      <span>{item.label}</span>
                      <span className="font-serif text-sm text-muted-foreground">
                        0{index + 1}
                      </span>
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto p-5">
                <Button asChild className="h-11 w-full rounded-full">
                  <a href="mailto:hello@lovechoose.com">Say hello</a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
