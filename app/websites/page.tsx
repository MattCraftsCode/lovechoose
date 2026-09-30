import type { Metadata } from "next"

import { CategoryPage } from "@/components/portfolio/category-page"

export const metadata: Metadata = {
  title: "Websites",
  description:
    "Focused websites and small internet products built around real user intent.",
}

export default function WebsitesPage() {
  return <CategoryPage category="website" />
}
