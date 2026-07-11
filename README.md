# Epoch Hair Studio — Website

A React + Vite + Tailwind CSS site for Epoch Hair Studio, with five pages
(Home, About, Services, Gallery, Contact), route transitions, and scroll-
triggered animations built with Framer Motion.

## Getting started

```bash
pnpm install   # or npm install / yarn install
pnpm dev       # start local dev server
pnpm build     # production build → dist/
pnpm preview   # preview the production build locally
```

## Rebranding — the two files that control everything

**`src/config/theme.ts`** — every color, font, and radius in the site.
Change a hex value here (e.g. `colors.primary`) and it updates the header,
buttons, dividers, the signature line motif, everywhere — nothing else in
the codebase hard-codes a color. Fonts are loaded from Google Fonts in
`src/index.css`; swap the `@import` line there if you change `fonts.display`
or `fonts.body` to a different typeface.

**`src/config/site.ts`** — every word and image on the site: business name,
logo initial, nav labels, hero copy, services + prices, team, timeline,
testimonials, gallery images, contact details, hours, and map embed URL.

You should not need to touch any component or page file to reskin the site
for a different client — just edit these two files.

> Note: the gallery, hero, and team photography currently point to
> placeholder Unsplash URLs. Swap `site.gallery.items[].image`,
> `site.hero.image`, and `site.team[].image` for the studio's real
> photography before launch.

## Structure

```
src/
  config/
    theme.ts          — design tokens (source of truth)
    site.ts            — content (source of truth)
    ThemeProvider.tsx  — writes theme.ts onto :root as CSS variables
  components/
    site/              — header, footer, reveal-on-scroll, thread-line motif,
                          scroll progress bar, CTA button, page transitions
    ui/                — shadcn/ui primitives (button, input, etc.) — used
                          selectively, available for future pages
  pages/
    Home.tsx, About.tsx, Services.tsx, Gallery.tsx, Contact.tsx
```

## Design notes

- **Motif:** a single hand-drawn "thread line" (`ThreadLine.tsx`) draws
  itself in once per section as you scroll — the one recurring signature
  element that ties every page together, echoing the idea that hair (and
  the studio's history) is one continuous line, told in chapters.
- **Chapters:** sections are marked with roman numerals (`ChapterMark.tsx`)
  since the brand concept is literally "epochs" — this is content-driven,
  not decoration for its own sake.
- **Animation approach:** every reveal uses one shared primitive
  (`Reveal` / `RevealGroup` in `components/site/Reveal.tsx`) with
  `whileInView` and `once: true`, so effects only ever fire forward, once,
  in reading order — no retriggering or randomness. Motion respects
  `prefers-reduced-motion`.
- **Performance:** animations are limited to `opacity`/`transform`
  (GPU-friendly), images are `loading="lazy"` outside the hero, and the
  scroll progress bar uses a spring-driven `scaleX` transform rather than
  re-rendering on every scroll tick.

## Contact form

The form on `/contact` is wired to a local success toast only — there's no
backend yet. Point `handleSubmit` in `src/pages/Contact.tsx` at your booking
API, or a service like Formspree/Resend, when you're ready to go live.
