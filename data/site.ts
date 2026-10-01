export const siteProfile = {
  name: "lovechoose",
  email: "hexiaobai555@gmail.com",
  github: "https://github.com/MattCraftsCode",
  x: "https://x.com/waynemakes",
} as const

export const siteLinks = [
  { label: "GitHub", href: siteProfile.github },
  { label: "X", href: siteProfile.x },
  { label: "Email", href: `mailto:${siteProfile.email}` },
] as const
