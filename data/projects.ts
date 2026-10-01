export type ProjectCategory = "website" | "extension" | "mini"

export type PrivacySection = {
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

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
  liveUrl?: string
  storeUrl?: string
  cover?: string
  coverAlt?: string
  coverScroll?: boolean
  features: string[]
  story: string
  stack: string[]
  privacy?: {
    lastUpdated: string
    introduction: string
    sections: PrivacySection[]
  }
}

export const projects: Project[] = [
  {
    slug: "base97",
    name: "base97",
    label: "Everyday File Tools",
    category: "website",
    categoryLabel: "Websites",
    description:
      "Free, focused tools that make everyday image, PDF, audio and file tasks a little easier.",
    color: "#B7CD9D",
    accent: "#EAF3D8",
    href: "/base97",
    liveUrl: "https://base97.com/",
    cover: "/images/projects/base97-cover.webp",
    coverAlt: "base97 website home page",
    features: [
      "Free tools that work without an account or sign-up flow",
      "Focused utilities for images, PDFs, audio and everyday files",
      "Search and category navigation for quickly finding the right tool",
      "Practical articles and guides for choosing the right workflow",
    ],
    story:
      "base97 is built around a simple promise: less busywork and more possibilities. It collects small, single-purpose tools that help people finish common file tasks quickly, with no account between the user and the next step.",
    stack: ["Next.js", "Tailwind CSS", "TypeScript", "SEO"],
  },
  {
    slug: "nameideabox",
    name: "Name Idea Box",
    label: "Meaningful Name Generator",
    category: "website",
    categoryLabel: "Websites",
    description:
      "Describe what you are naming, discover meaningful ideas, save the names you love and choose with confidence.",
    color: "#FFF2A6",
    accent: "#FFF9D4",
    href: "/nameideabox",
    liveUrl: "https://nameideabox.com/",
    cover: "/images/projects/nameideabox-cover.webp",
    coverAlt: "NameIdeaBox website home page",
    features: [
      "A guided prompt for describing exactly what needs a name",
      "Dedicated directions for business, baby, pet, product and fantasy names",
      "A shortlist workflow for collecting and comparing favorite ideas",
      "Clear reminders to review cultural and language details independently",
    ],
    story:
      "Name Idea Box starts with context instead of an endless random list. The experience moves from the first spark to a useful shortlist, helping people explore names with meaning and make the final choice with more confidence.",
    stack: ["Next.js", "Tailwind CSS", "TypeScript", "Content design"],
  },
  {
    slug: "link-inspector",
    name: "Backlink Inspector",
    label: "Backlink Inspection",
    category: "extension",
    categoryLabel: "Extensions",
    description:
      "Inspect backlinks, link attributes, visibility and plain-text mentions on the current page.",
    color: "#E6F0C3",
    accent: "#F3F8E0",
    href: "/link-inspector",
    storeUrl:
      "https://chromewebstore.google.com/detail/backlink-inspector/hhaeopcfeiijaancahjhdogbhobnnngg",
    cover: "/images/projects/backlink-inspector.png",
    coverAlt: "Backlink Inspector extension scan results",
    coverScroll: true,
    features: [
      "Find hyperlinks and plain-text mentions for a target domain",
      "Optionally include subdomains and distinguish follow from nofollow links",
      "Review anchor text, destination URL, visibility and page location",
      "Locate and highlight matches, copy or open links and save useful results",
    ],
    story:
      "Backlink Inspector is designed for verifying how a target domain appears on the page currently open in the browser. Enter a domain, scan the page and review matching links and text mentions in the side panel, then locate individual results directly in the page when a closer check is needed.",
    stack: ["Chrome Extension", "Manifest V3", "Side panel", "TypeScript"],
    privacy: {
      lastUpdated: "October 1, 2026",
      introduction:
        "Backlink Inspector is a local inspection tool. It processes the current page only after you start a scan and does not send page content, target domains or scan results to the developer or to third-party servers.",
      sections: [
        {
          title: "Information processed by the extension",
          paragraphs: [
            "To provide its core feature, Backlink Inspector temporarily reads the content of the active page and the target domain you enter. This processing is used to identify matching hyperlinks and plain-text mentions, link attributes, visibility and page location.",
          ],
          bullets: [
            "The target domain entered by the user",
            "Links, anchor text and plain-text mentions on the active page",
            "Follow or nofollow attributes and element visibility",
            "Scan results, highlights and items the user chooses to save",
          ],
        },
        {
          title: "Data collection and transmission",
          paragraphs: [
            "The extension does not collect personal information, browsing history or page content for the developer. It does not transmit scan data to external servers and does not use analytics, advertising SDKs or tracking technologies.",
          ],
        },
        {
          title: "Local storage and retention",
          paragraphs: [
            "Preferences and results that you explicitly save are stored locally in browser-managed extension storage. Temporary scan data remains on the device and is replaced when you clear results or run another scan. You can remove locally stored data by clearing saved results or uninstalling the extension.",
          ],
        },
        {
          title: "Permissions",
          paragraphs: [
            "Browser permissions are used only to open the extension side panel, inspect the active page after a user action, highlight matching elements and retain user-requested settings or saved results. Permissions are not used to monitor unrelated browsing activity.",
          ],
        },
        {
          title: "Sharing, sale and prohibited uses",
          bullets: [
            "No user data is sold or shared with third parties.",
            "No data is used for advertising, profiling or purposes unrelated to the extension's single purpose.",
            "No data is used to determine creditworthiness or for lending purposes.",
          ],
        },
        {
          title: "Chrome Web Store Limited Use",
          paragraphs: [
            "The use of information received from Chrome APIs adheres to the Chrome Web Store User Data Policy, including its Limited Use requirements.",
          ],
        },
        {
          title: "Security and third-party services",
          paragraphs: [
            "Backlink Inspector performs its inspection locally and does not operate a remote service for scan data. Links opened from results lead to their stated destinations and are governed by the privacy practices of those websites.",
          ],
        },
        {
          title: "Children's privacy",
          paragraphs: [
            "Backlink Inspector is a developer utility and is not directed to children under 13. The extension does not knowingly collect personal information from children.",
          ],
        },
        {
          title: "Changes and contact",
          paragraphs: [
            "This policy may be updated when the extension's behavior or legal requirements change. Material changes will be reflected on this page with a revised date. Questions about this policy can be sent to hexiaobai555@gmail.com.",
          ],
        },
      ],
    },
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
