export type ProjectCategory = "website" | "extension" | "mini"

export type Project = {
  slug: string
  name: string
  label: string
  category: ProjectCategory
  categoryLabel: string
  description: string
  color: string
  accent: string
  href: string
  features: string[]
  story: string
  stack: string[]
}

export const projects: Project[] = [
  {
    slug: "base97",
    name: "base97",
    label: "Utility Hub",
    category: "website",
    categoryLabel: "Websites",
    description:
      "A growing collection of focused browser tools for everyday tasks.",
    color: "#B7CD9D",
    accent: "#EAF3D8",
    href: "/base97",
    features: [
      "Fast, single-purpose tools with no unnecessary onboarding",
      "A consistent product system across a growing set of utilities",
      "Search-friendly landing pages paired with practical guides",
      "Built for speed, clarity and repeat use",
    ],
    story:
      "base97 grew from a simple observation: many everyday browser tasks are buried inside oversized products. Each tool is deliberately narrow, fast to understand and useful within seconds, while the shared system keeps the collection familiar as it grows.",
    stack: ["Next.js", "Tailwind CSS", "TypeScript", "SEO"],
  },
  {
    slug: "nameideabox",
    name: "NameIdeaBox",
    label: "Naming Toolkit",
    category: "website",
    categoryLabel: "Websites",
    description:
      "Name generators built for real search intent, not random noise.",
    color: "#FFF2A6",
    accent: "#FFF9D4",
    href: "/nameideabox",
    features: [
      "Generator flows tailored to different naming intents",
      "Large result sets with useful filters and quick copying",
      "Content architecture designed around long-tail search",
      "Friendly editorial guidance around every generator",
    ],
    story:
      "Most name generators optimize for volume instead of relevance. NameIdeaBox starts with the context behind a search, then shapes the generator, filters and guidance around the decision a person is actually trying to make.",
    stack: ["Next.js", "Tailwind CSS", "TypeScript", "Content design"],
  },
  {
    slug: "gamebodycam",
    name: "GameBodycam Wiki",
    label: "Game Wiki",
    category: "website",
    categoryLabel: "Websites",
    description:
      "A lightweight game guide site engineered around fast answers and SEO.",
    color: "#C7DDAA",
    accent: "#EDF5DE",
    href: "/gamebodycam",
    features: [
      "Markdown-first content workflow",
      "Fast page delivery without a heavy database",
      "Search-intent driven guide structure",
      "Readable layouts built for quick in-game questions",
    ],
    story:
      "GameBodycam Wiki is designed for the moment a player pauses a game to find one precise answer. Pages stay concise, scannable and quick to load, with a content structure shaped by real questions rather than a generic encyclopedia template.",
    stack: ["Next.js", "MDX", "Tailwind CSS", "Technical SEO"],
  },
  {
    slug: "link-highlighter",
    name: "Link Highlighter",
    label: "Browser Extension",
    category: "extension",
    categoryLabel: "Extensions",
    description:
      "Inspect links, anchor text and follow attributes directly on any page.",
    color: "#9DBF7C",
    accent: "#E3EFD6",
    href: "/link-highlighter",
    features: [
      "Highlight links visually on any webpage",
      "See domain, anchor text and destination URL quickly",
      "Differentiate dofollow and nofollow links",
      "A compact browser-native workflow with minimal friction",
    ],
    story:
      "Link audits often involve jumping between a page, developer tools and a spreadsheet. This extension brings the most useful link context onto the page itself so quick SEO and content checks stay visual and immediate.",
    stack: ["TypeScript", "WebExtensions API", "Vite", "Manifest V3"],
  },
  {
    slug: "site-inspector",
    name: "Site Inspector",
    label: "Browser Extension",
    category: "extension",
    categoryLabel: "Extensions",
    description:
      "A compact on-page inspection toolkit for titles, metadata and structure.",
    color: "#E6F0C3",
    accent: "#F3F8E0",
    href: "/site-inspector",
    features: [
      "Inspect page title and metadata at a glance",
      "Review heading structure without leaving the page",
      "A small floating UI that stays out of the content's way",
      "Useful for fast SEO, publishing and QA checks",
    ],
    story:
      "Site Inspector collects the handful of page signals that matter during a quick review. It is intentionally smaller than a full audit suite: open it, verify the page, make the fix and move on.",
    stack: ["TypeScript", "WebExtensions API", "React", "Manifest V3"],
  },
  {
    slug: "mianyu",
    name: "Mianyu",
    label: "WeChat Mini Program",
    category: "mini",
    categoryLabel: "Mini Programs",
    description:
      "A calm WeChat mini program concept for sleep sounds and bedtime rituals.",
    color: "#A7BC9A",
    accent: "#E7EEE2",
    href: "/mini-programs#mianyu",
    features: [
      "A calm library of sleep sounds and gentle ambient loops",
      "Simple bedtime routines that are easy to repeat",
      "A lightweight interface designed for low-light use",
      "Native sharing and quick access inside WeChat",
    ],
    story:
      "Mianyu explores how a very small interface can support the transition from a busy screen to a quieter evening. The product focuses on routine, tone and restraint rather than an endless catalogue of wellness features.",
    stack: [
      "WeChat Mini Program",
      "TypeScript",
      "Cloud functions",
      "UX writing",
    ],
  },
]

export const projectMap = new Map(
  projects
    .filter((project) => project.slug !== "mianyu")
    .map((project) => [project.slug, project])
)

export const categoryContent: Record<
  ProjectCategory,
  { title: string; eyebrow: string; description: string; path: string }
> = {
  website: {
    title: "Websites",
    eyebrow: "Portfolio collection",
    description:
      "Focused websites and small internet products built around real user intent.",
    path: "/websites",
  },
  extension: {
    title: "Browser Extensions",
    eyebrow: "Portfolio collection",
    description:
      "Small browser utilities with simple interfaces, clear value and very little friction.",
    path: "/extensions",
  },
  mini: {
    title: "Mini Programs",
    eyebrow: "Portfolio collection",
    description:
      "Experiments and focused experiences designed for lightweight app ecosystems.",
    path: "/mini-programs",
  },
}

export function getProjectsByCategory(category: ProjectCategory) {
  return projects.filter((project) => project.category === category)
}
