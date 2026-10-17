"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Check,
  ChevronDown,
  Gauge,
  Languages,
  Mail,
  Menu,
  ShieldCheck,
} from "lucide-react"

import { Button } from "@/components/animate-ui/components/buttons/button"
import {
  Menu as LanguageMenu,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuPanel,
  MenuSeparator,
  MenuTrigger,
} from "@/components/animate-ui/components/base/menu"
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
import { siteProfile } from "@/data/site"
import { cn } from "@/lib/utils"

const navigation = [
  { href: "/", label: "Home" },
  { href: "/websites", label: "Websites" },
  { href: "/extensions", label: "Extensions" },
  { href: "/mini-programs", label: "Mini Programs" },
]

const aboutNavigation = { href: "/about", label: "About" }

const languages = ["EN", "中文"] as const

function activePath(pathname: string) {
  const slug = pathname.split("/").filter(Boolean)[0]
  const project = slug ? projectMap.get(slug) : undefined

  if (project?.category === "website") return "/websites"
  if (project?.category === "extension") return "/extensions"
  return pathname
}

export function SiteHeader() {
  const pathname = usePathname()
  const [language, setLanguage] = useState<(typeof languages)[number]>("EN")
  const currentPath = activePath(pathname)
  const toolsActive = pathname.startsWith("/tools")

  return (
    <header className="glass sticky top-0 z-50 border-b border-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="lovechoose home"
        >
          <span className="logo-mark grid size-10 place-items-center rounded-sm border border-foreground bg-secondary font-serif text-xl text-primary transition-transform duration-180 group-hover:-translate-y-0.5 group-hover:rotate-3">
            L
          </span>
          <span>
            <span className="block font-serif text-[1.35rem] leading-none tracking-[-0.03em]">
              lovechoose
            </span>
            <span className="mt-1 block text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              product studio / 2026
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label="Primary navigation"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "nav-link text-[13px] font-bold text-muted-foreground transition-colors hover:text-foreground",
                currentPath === item.href && "active text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="group relative">
            <Link
              href="/tools/free-dr-checker"
              className={cn(
                "nav-link inline-flex items-center gap-1 text-[13px] font-bold text-muted-foreground transition-colors hover:text-foreground",
                toolsActive && "active text-foreground"
              )}
              aria-label="Tools"
            >
              Tools
              <ChevronDown
                className="size-3.5 transition-transform duration-200 group-focus-within:rotate-180 group-hover:rotate-180"
                aria-hidden="true"
              />
            </Link>
            <div className="pointer-events-none invisible absolute top-full left-1/2 z-50 w-72 -translate-x-1/2 pt-4 opacity-0 transition-[opacity,transform,visibility] duration-200 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
              <div className="border border-foreground bg-card p-1.5 shadow-[7px_7px_0_rgba(25,26,23,0.14)]">
                <p className="px-3 py-2 text-[10px] font-bold tracking-[0.16em] text-muted-foreground uppercase">
                  Quick tools
                </p>
                <Link
                  href="/tools/free-dr-checker"
                  className="group/item flex items-center gap-3 border border-transparent px-3 py-3 transition-colors hover:border-foreground hover:bg-secondary focus-visible:border-foreground focus-visible:bg-secondary focus-visible:outline-none"
                >
                  <span className="grid size-10 shrink-0 place-items-center border border-foreground bg-[#5368ff] text-white">
                    <Gauge className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold">
                      Free DR Checker
                    </span>
                    <span className="mt-0.5 block text-xs/5 text-muted-foreground">
                      Check a domain&apos;s rating in seconds.
                    </span>
                  </span>
                </Link>
                <Link
                  href="/tools/free-da-pa-spam-checker"
                  className="group/item flex items-center gap-3 border border-transparent px-3 py-3 transition-colors hover:border-foreground hover:bg-secondary focus-visible:border-foreground focus-visible:bg-secondary focus-visible:outline-none"
                >
                  <span className="grid size-10 shrink-0 place-items-center border border-foreground bg-[#ff7659] text-primary">
                    <ShieldCheck className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold">
                      Free DA, PA &amp; Spam Checker
                    </span>
                    <span className="mt-0.5 block text-xs/5 text-muted-foreground">
                      Read three Moz authority metrics at once.
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <Link
            href={aboutNavigation.href}
            className={cn(
              "nav-link text-[13px] font-bold text-muted-foreground transition-colors hover:text-foreground",
              currentPath === aboutNavigation.href && "active text-foreground"
            )}
          >
            {aboutNavigation.label}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageMenu>
            <MenuTrigger
              render={
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  hoverScale={1.03}
                  tapScale={0.96}
                  className="h-9 rounded-sm border-foreground/40 bg-card px-3 text-xs shadow-none hover:border-foreground"
                  aria-label="Change display language"
                >
                  {language}
                  <ChevronDown className="size-3.5" aria-hidden="true" />
                </Button>
              }
            />
            <MenuPanel
              align="end"
              sideOffset={8}
              className="min-w-40 rounded-sm border-foreground bg-card p-1.5 shadow-[6px_6px_0_rgba(25,26,23,0.14)]"
            >
              <MenuGroup>
                <MenuGroupLabel className="flex items-center gap-2 px-2 py-2 text-[11px] font-bold tracking-[0.12em] text-muted-foreground uppercase">
                  <Languages className="size-3.5" aria-hidden="true" />
                  Language
                </MenuGroupLabel>
                <MenuSeparator />
                {languages.map((item) => (
                  <MenuItem
                    key={item}
                    onClick={() => setLanguage(item)}
                    className="h-9 cursor-pointer justify-between rounded-sm px-3 font-semibold"
                  >
                    {item}
                    {language === item ? (
                      <Check
                        className="size-3.5 text-[#5368ff]"
                        aria-hidden="true"
                      />
                    ) : null}
                  </MenuItem>
                ))}
              </MenuGroup>
            </MenuPanel>
          </LanguageMenu>

          <Button
            asChild
            size="sm"
            className="hidden h-9 rounded-sm border border-primary px-4 shadow-none sm:inline-flex"
          >
            <a href={`mailto:${siteProfile.email}`}>
              Say hello
              <Mail className="size-3.5" aria-hidden="true" />
            </a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-9 rounded-sm border-foreground/40 bg-card shadow-none lg:hidden"
                aria-label="Open navigation"
              >
                <Menu className="size-4" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[min(88vw,360px)] border-foreground bg-background p-2">
              <SheetHeader className="border-b border-foreground px-5 py-5 text-left">
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
                        "flex items-center justify-between rounded-sm px-4 py-4 text-lg font-semibold transition-colors hover:bg-secondary",
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
                <SheetClose asChild>
                  <Link
                    href="/tools/free-dr-checker"
                    className={cn(
                      "flex items-center justify-between rounded-sm px-4 py-4 text-lg font-semibold transition-colors hover:bg-secondary",
                      toolsActive && "bg-secondary text-primary"
                    )}
                  >
                    <span>Free DR Checker</span>
                    <Gauge className="size-4" aria-hidden="true" />
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/tools/free-da-pa-spam-checker"
                    className={cn(
                      "flex items-center justify-between rounded-sm px-4 py-4 text-lg font-semibold transition-colors hover:bg-secondary",
                      pathname === "/tools/free-da-pa-spam-checker" &&
                        "bg-secondary text-primary"
                    )}
                  >
                    <span>Free DA, PA &amp; Spam Checker</span>
                    <ShieldCheck className="size-4" aria-hidden="true" />
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href={aboutNavigation.href}
                    className={cn(
                      "flex items-center justify-between rounded-sm px-4 py-4 text-lg font-semibold transition-colors hover:bg-secondary",
                      currentPath === aboutNavigation.href &&
                        "bg-secondary text-primary"
                    )}
                  >
                    <span>{aboutNavigation.label}</span>
                    <span className="font-serif text-sm text-muted-foreground">
                      06
                    </span>
                  </Link>
                </SheetClose>
              </nav>
              <div className="mt-auto p-5">
                <Button asChild className="h-11 w-full rounded-sm">
                  <a href={`mailto:${siteProfile.email}`}>Say hello</a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
