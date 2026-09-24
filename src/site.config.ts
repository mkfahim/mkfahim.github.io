import type {
  FooterConfig,
  LinkConfig,
  ProfileConfig,
  PublicationConfig,
  SiteConfig,
} from "@/types"

export const SITE: SiteConfig = {
  // Website title / name shown in site metadata.
  title: "M K Fahim Shahariar",

  // Short description used for SEO and social/meta information.
  description:
    "Research in digital asic design, advanced memory, and agentic ai for semiconductor design",

  // Canonical URL of the website.
  href: "https://mkfahim.github.io/",

  // Website author / owner name.
  author: "M K Fahim Shahariar",

  // Text direction: "ltr" = left-to-right, "rtl" = right-to-left.
  dir: "ltr",

  // Default images used for pages/posts when no custom image is provided.
  defaultPageImage: "/img/social-preview.png",
  defaultPostImage: "/img/social-preview.png",

  locale: {
    lang: "en-US",
    options: {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    },
  },

  // Maximum heading depth shown in the table of contents.
  tocMaxDepth: 3,

  blog: {
    // Number of featured blog posts shown on the homepage.
    featuredPostCount: 3,

    // Number of blog posts shown per page.
    postsPerPage: 8,

    // Social platforms available for sharing blog posts.
    shareActions: ["x"],
  },

  home: {
    // Number of career/experience highlights shown on the homepage.
    careerHighlightCount: 4,

    // Number of recent updates shown on the homepage.
    updateCount: 3,

    // Number of selected publications shown on the homepage.
    publicationCount: 3,
  },

  // Website favicon. Change this if you replace the default favicon.
  favicon: "/favicon.ico",

  // Keep true for Astro's prerendering behavior.
  prerender: true,

  // CDN used for npm packages when required by the site.
  npmCDN: "https://cdn.jsdelivr.net/npm",

  // License applied to the site's content.
  license: {
    label: "CC-BY-4.0",
    href: "https://creativecommons.org/licenses/by/4.0/",
  },
}

export const PROFILE: ProfileConfig = {
  // Your name displayed in the profile section.
  name: SITE.title,

  // Short professional tagline shown below your name.
  tagline: "Digital ASIC Design & Verification",

  email: "shahariar2103022@stud.kuet.ac.bd",

  // Your present location.
  location: "Dhaka, Bangladesh",

  pronouns: "he/him",
  links: {
    github: "https://github.com/mkfahim",
    website: "https://mkfahim.github.io/",
  },
  highlightLinks: ["github"],
  linksPlacement: {
    header: ["email", "github", "website"],
    about: false,

    // Set to true to also show profile links in the footer.
    footer: false,
  },
}

// Main navigation links shown in the website header/menu.
export const NAV_LINKS: LinkConfig[] = [
  { href: "/projects", label: "Projects" },
  { href: "/publications", label: "Publications" },
  { href: "/teaching", label: "Teaching" },
  { href: "/blog", label: "Blog" },
]

// Internal navigation configuration generated from NAV_LINKS.
export const NAVIGATION: LinkConfig[] = NAV_LINKS.map(({ href, label }) => ({
  href,
  label,
}))

export const PUB_CONFIG: PublicationConfig = {
  maxFirstAuthors: 6,
  maxLastAuthors: 1,
  highlightAuthor: {
    firstName: "M K Fahim",
    lastName: "Shahariar",

    // Add alternative name formats here if your publications use a different spelling.
    // Example: ["M. K. Fahim Shahariar", "Fahim Shahariar"]
    aliases: [],
  },
  equalSymbols: {
    first: "*",
    second: "†",
    third: "‡",
    last: "§",
  },
}

export const FOOTER: FooterConfig = {
  // Set to false to hide the template/theme credit from the footer.
  credits: false,
  sourceCode: "https://github.com/mkfahim/mkfahim.github.io",
  sourceContent:
    "https://github.com/mkfahim/mkfahim.github.io/tree/main/src/content",

  // Add additional custom links to the footer here.
  footerLinks: [],
}

if (import.meta.env.DEV && typeof window === "undefined") {
  const {
    FooterConfigSchema,
    ProfileConfigSchema,
    PublicationConfigSchema,
    SiteConfigSchema,
  } = await import("@/schemas")

  // Validate the configuration during development.
  SiteConfigSchema.parse(SITE)
  ProfileConfigSchema.parse(PROFILE)
  FooterConfigSchema.parse(FOOTER)
  PublicationConfigSchema.parse(PUB_CONFIG)
}
