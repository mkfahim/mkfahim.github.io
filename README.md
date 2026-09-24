# Customization notes

Start with content and config. Don’t go into CSS, icons, or Markdown pipeline changes until the site is building with my own data and content.

## 1. Replace content

Most of the site content lives in `src/content/`.

- `src/content/about.md`: about-page copy
- `src/content/tech.md`, `src/content/misc.md`, `src/content/services.md`: homepage/profile sections
- `src/content/blog/`: blog posts and subposts
- `src/content/projects/`: project cards and project detail pages
- `src/content/updates/`: timeline entries
- `src/content/experience.json`: education, research, and teaching timeline
- `src/content/people.toml`: author records used by blog posts
- `src/content/publications/main.bib`: BibTeX source for `/publications`

Blog posts are Markdown files with required frontmatter:

```yaml
---
title: Example post
description: Short social and SEO description.
createdAt: 2026-01-15
tags:
  - research
authors:
  - your-author-id
draft: false
---
```

Subposts live under `src/content/blog/` as a folder with an `index.md` parent and ordered child `.md` files. If I don’t want a file to be collected by the loader, prefix it with `_`.

## 2. Replace public assets

Static assets live in `public/` and are served from the site root.

- Favicons and app icons: `public/favicon.ico`, `public/favicon.svg`,
  `public/apple-touch-icon.png`, `public/web-app-manifest-*.png`
- Web manifest: `public/site.webmanifest`
- Social fallback image: `public/img/social-preview.png`
- Documents: `public/doc/`
- Fonts: `public/fonts/`

If I remove or rename an asset, I need to update the paths in `src/site.config.ts`, Markdown frontmatter, and any page/component references.

## 3. Configure identity, navigation, and metadata

I’ll edit `src/site.config.ts`.

- `SITE`: title, description, canonical URL, author, default images, locale,
  blog pagination, table-of-contents depth, share actions, favicon, and content
  license
- `PROFILE`: name, tagline, email, pronunciation, pronouns, and social links
- `NAV_LINKS`: top-level header navigation
- `PUB_CONFIG`: publication author highlighting and equal-contribution symbols
- `FOOTER`: source links, footer links, and theme credits

This config is validated in development with Zod schemas from `src/schemas.ts`.
If the dev server or build breaks, I should read the schema error before I touch layout code.

## 4. Update routes and pages

Pages live in `src/pages/`.

- Remove a page by deleting the route file and removing the navigation link
- Add a simple content page by following `src/pages/teaching.md` or
  `src/pages/uses.astro`
- Add collection-backed pages by following `src/pages/projects/index.astro` and
  `src/pages/projects/[...id].astro`

Route changes need to be kept in sync with `src/site.config.ts`,
`src/content.config.ts`, and sitemap filtering in `astro.config.ts`.

## 5. Change colors

Theme colors are CSS custom properties in `src/styles/color.css`.

The palette uses OKLCH and `light-dark()`:

```css
:root {
  --background: light-dark(oklch(...), oklch(...));
  --foreground: light-dark(oklch(...), oklch(...));
  --primary: light-dark(oklch(...), oklch(...));
}
```

I should change the semantic tokens instead of hard-coding colors in components:

- `--background`, `--foreground`
- `--primary`, `--primary-foreground`
- `--muted`, `--muted-foreground`
- `--accent`, `--accent-foreground`
- `--destructive`
- `--border`, `--ring`

After changing colors, I should check both light and dark modes. The theme toggle relies on `color-scheme` and `[data-theme]` selectors in the same file.

## 6. Typography, spacing, and shape

- Fonts: `src/styles/fonts.css` and `public/fonts/`
- Type scale and prose measure: `src/styles/typography.css`
- Heading treatment: `src/styles/typography-headings.css`
- Utopia spacing and grid tokens: `src/styles/layout.css`
- Radius and motion tokens: `src/styles/shape.css`

Start by adjusting tokens. Component-local CSS should consume those tokens instead of inventing its own one-off visual system.

## 7. Change icons

My Scholar supports three icon paths:

1. Semantic names in `src/icon.config.ts`, such as `blog`, `research`, or
   `arrow-right`
2. Direct Iconify names from installed sets, such as `mingcute:github-line`
3. Local SVG files in `src/assets/icons/`, referenced by filename without
   `.svg`

If I add a profile link type, I need to add a key to `PROFILE_ICON_MAP` in
`src/icon.config.ts`, then use that key in `PROFILE.links`.

If I add a new Iconify set:

```bash
pnpm add @iconify-json/<set-name>
```

Then import it and register it in `src/lib/icons.ts`.

## 8. Callouts, math, code, and Markdown behavior

Markdown behavior is configured in `astro.config.ts` through Sätteri plugins.

The current features include:

- Directive and Obsidian-style callouts from `src/lib/callout.ts`
- Inline and display math from `src/lib/math.ts`
- Code highlighting from `src/lib/expressive-code/`
- External-link attributes from `src/lib/external-links.ts`
- Heading ids and anchor links from `src/lib/heading-namespace.ts` and
  `src/lib/heading-anchors.ts`
- Heading normalization from `src/plugins/satteri-normalize-headings.ts`
- Sidenotes from `src/plugins/satteri-sidenotes.ts`

For callouts, use Markdown directives:

```md
:::note[Optional label]
Callout body.
:::
```

or Obsidian-style callouts:

```md
> [!warning]- Collapsed warning
> Callout body.
```

## 9. Publications

Publications are loaded from `src/content/publications/main.bib` and rendered by
`src/lib/publications/` plus `src/components/publications/PubCard.astro`.

I should keep BibTeX fields consistent. Link-like fields are mapped to icons by
`PUBLICATION_LINK_TYPES` in `src/icon.config.ts`. If I add a custom BibTeX field
for links, I should add a matching entry there as well.

Publication cards also support optional representative media. I can add a public
or remote image URL with `image`, plus concise alternative text with `imagealt`:

```bibtex
image={/img/publications/example.svg},
imagealt={Diagram summarizing the publication's method},
```

Entries without these fields keep the standard text-only card layout.

## 10. Agent workflow

When I use a coding agent:

1. Ask it to read `docs/INSTALL.md`, this file, `src/site.config.ts`,
   `src/content.config.ts`, and `src/icon.config.ts` first
2. Replace content before redesigning components
3. Run `pnpm build` after content changes
4. Run `pnpm format:check`, `pnpm lint`, `pnpm test:markdown`, and
   `pnpm astro check` before opening a pull request
5. Take screenshots of at least `/`, `/blog`, `/projects`, `/publications`, and
   one post page after visual changes

This is the main rule: make the content mine first, make it work, then tweak the design.
