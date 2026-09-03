# Repository Guidelines

## Project Structure & Module Organization
The site runs on Next.js 14 App Router. Pages live under `src/app` — `/` (about), `/thoughts`, `/projects`, and `/privacy`. There are only two components (`Nav`, `TransitionLink`) in `src/components`. Structured content lives in `src/data` as JSON validated by the zod schemas in `src/lib/schemas.ts`; long-form writing lives in `src/content/thoughts/` as Markdown. Static assets belong in `public/`.

## Build, Test, and Development Commands
Use `npm run dev` for a hot-reloading local server on all interfaces. `npm run build` compiles the production bundle and `npm run start` serves it. `npm run lint` enforces Next.js/ESLint rules, and `npm run format` applies Prettier with the Tailwind plugin.

## Design System
The layout follows a single pattern: a right-aligned italic serif nav column, a hairline vertical rule, and a 700px content column. Rules to preserve when adding pages:

- Every page is one `<article className="prose-page">` opening with an `<h1 className="title">`. The title is bold body text, not a larger size — size is never used to signal hierarchy. The one exception is `/thoughts`, which is a bare index: its `<h1>` is `sr-only` so the first row sits level with the first nav link.
- Index rows (`/thoughts`) make the whole row one link — title, dotted leader, and date darken together on hover. Titles are `font-medium` (500 — never semibold), rest at `heading/85`, and go to full `heading` on hover; dates rest at `muted` in the regular weight. Row links carry `no-underline`, since `.prose-page` underlines bare anchors.
- Vertical rhythm is a single 28px line. Body text is 15px/28px, paragraphs are one blank line apart (`mt-7`). Do not introduce other spacing steps.
- Colour comes from four tokens only: `background`, `foreground`, `heading`, `muted`, plus `rule` for hairlines. They are defined once in `globals.css`; never hardcode a colour. The site is light-only — there is no dark mode, and no theme switcher.
- Use `.link` for inline links, and the `.leader` dotted spacer for any "label ......... value" row (see `/thoughts` and `/projects`).
- Two faces, both from the reference site: Inter (`font-sans`) for all content, and Lora **italic only** (`font-serif`) for the nav. Do not use the serif anywhere but the nav, and do not add a third family.
- Route changes crossfade through a 3px blur, driven by `TransitionLink` and the View Transitions API. `<main>` carries `view-transition-name: content` so only the content column animates — the nav is left in the root snapshot and cuts over instantly. Any new internal link should use `TransitionLink`, not `next/link`. A single thought adds `.thought-enter` on top of that, so opening one settles in through the same fade.

## Coding Style & Naming Conventions
TypeScript is required; favor server components unless interactivity demands `"use client"`. Follow functional component patterns, camelCase for functions/variables, and PascalCase for components. Two-space indentation and trailing commas come from Prettier—do not hand-format files.

## Content
Site content is data-driven: edit `src/data/*.json` (`home`, `projects`, `socials`, `routes`) rather than hardcoding copy in components. The one exception is the about page's prose, which carries inline links and so lives in `src/app/page.tsx`. Nav links are derived from `routes.json` entries with `showInNav: true`. Images referenced from those files live in `public/img/`.

To publish a thought, add a Markdown file to `src/content/thoughts/`. The frontmatter needs `title` and `date` (`YYYY-MM-DD`), with `summary` optional. The URL slug is derived from the title (`An Obligatory Post` becomes `/thoughts/an-obligatory-post`), so retitling a post moves its link; the filename is only a fallback, for titles with no Latin characters. The list orders itself newest-first and renders dates as `2026.09.02`.
