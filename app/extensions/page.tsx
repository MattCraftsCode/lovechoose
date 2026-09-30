import type { Metadata } from "next"

import { CategoryPage } from "@/components/portfolio/category-page"

export const metadata: Metadata = {
  title: "Browser Extensions",
  description:
    "Small browser utilities with simple interfaces and very little friction.",
}

export default function ExtensionsPage() {
  return <CategoryPage category="extension" />
}
