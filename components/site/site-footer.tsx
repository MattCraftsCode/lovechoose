import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between lg:px-8">
        <p>Made with curiosity, code & matcha · lovechoose.com</p>
        <nav className="flex gap-5" aria-label="Social links">
          <Link href="#" className="transition-colors hover:text-foreground">
            GitHub
          </Link>
          <Link href="#" className="transition-colors hover:text-foreground">
            YouTube
          </Link>
          <a
            href="mailto:hello@lovechoose.com"
            className="transition-colors hover:text-foreground"
          >
            Email
          </a>
        </nav>
      </div>
    </footer>
  )
}
