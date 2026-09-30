import type { Metadata } from "next"

import { CategoryPage } from "@/components/portfolio/category-page"

export const metadata: Metadata = {
  title: "Mini Programs",
  description: "Focused experiences designed for lightweight app ecosystems.",
}

export default function MiniProgramsPage() {
  return <CategoryPage category="mini" />
}
