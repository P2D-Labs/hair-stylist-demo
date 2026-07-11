/**
 * ============================================================================
 *  GLOBAL THEME — the single source of truth for the entire site's look.
 * ============================================================================
 *  Change a value here and it updates everywhere: header, buttons, dividers,
 *  the signature "thread line" motif, gallery, etc. Nothing else in the code
 *  should hard-code a color or font — it should all read from this file
 *  (via <ThemeProvider> which writes these values onto :root as CSS vars,
 *  and via the `theme` object for places that need raw JS values, like SVG
 *  or framer-motion animations).
 *
 *  To re-skin the site for a different client, this is the only file (plus
 *  `site.ts` for text/content) you should need to touch.
 * ============================================================================
 */

export const theme = {
  colors: {
    // Primary — deep aubergine/plum purple. Main brand color: header, hero,
    // primary buttons, footer.
    primary: "#3A1440",
    primaryDark: "#26092C",
    primaryLight: "#5C2568",

    // Secondary — softer lilac purple. Used for secondary surfaces, tags,
    // hover states, subtle backgrounds.
    secondary: "#9C7BAE",
    secondaryLight: "#E7DCEC",
    secondaryDark: "#6E4E7F",

    // Accent — sage/emerald green. Used sparingly: CTA accents, the thread
    // line motif, active states, small highlight details.
    accent: "#4C7A5B",
    accentLight: "#8FAE93",
    accentDark: "#2F5B3D",

    // Neutrals
    ink: "#1B1120",       // near-black text
    inkSoft: "#4A3A50",   // secondary text
    paper: "#FBF8F6",     // main light background
    paperMuted: "#F2EBEE",// section alternate background
    line: "#E4D9E2",      // hairline borders/dividers
    white: "#FFFFFF",
  },

  fonts: {
    // Display: headings, hero type, section titles — an editorial serif.
    display: "'Fraunces', 'Iowan Old Style', serif",
    // Body: paragraphs, nav, buttons — a clean modern grotesk.
    body: "'Manrope', 'Helvetica Neue', sans-serif",
    // Label: eyebrows, chapter numerals, small caps utility text.
    label: "'Manrope', sans-serif",
  },

  radius: {
    sm: "2px",
    md: "4px",
    lg: "0px", // salon brand leans sharp/editorial rather than rounded
    pill: "999px",
  },

  motion: {
    fast: 0.25,
    base: 0.55,
    slow: 0.9,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // expo-out
  },
} as const;

export type Theme = typeof theme;

/**
 * Tailwind's `bg-brand-x/50` opacity modifiers only work if the underlying
 * theme color resolves to "R G B" channel numbers, not a hex string or a
 * plain `var(--x)` reference — otherwise Tailwind emits an invalid
 * `rgb(#hex / alpha)` declaration that the browser silently drops. So every
 * color gets both a hex CSS var (for raw/non-alpha uses like SVG `stroke` or
 * inline styles) and an "R G B" triplet var that `tailwind.config.js`
 * references as `rgb(var(--color-x-rgb) / <alpha-value>)`.
 */
function hexToRgbTriplet(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r} ${g} ${b}`;
}

/** Flattened map of CSS custom properties written onto :root by ThemeProvider. */
export const cssVarMap: Record<string, string> = {
  "--color-primary": theme.colors.primary,
  "--color-primary-dark": theme.colors.primaryDark,
  "--color-primary-light": theme.colors.primaryLight,
  "--color-secondary": theme.colors.secondary,
  "--color-secondary-light": theme.colors.secondaryLight,
  "--color-secondary-dark": theme.colors.secondaryDark,
  "--color-accent": theme.colors.accent,
  "--color-accent-light": theme.colors.accentLight,
  "--color-accent-dark": theme.colors.accentDark,
  "--color-ink": theme.colors.ink,
  "--color-ink-soft": theme.colors.inkSoft,
  "--color-paper": theme.colors.paper,
  "--color-paper-muted": theme.colors.paperMuted,
  "--color-line": theme.colors.line,
  "--color-white": theme.colors.white,
  "--color-primary-rgb": hexToRgbTriplet(theme.colors.primary),
  "--color-primary-dark-rgb": hexToRgbTriplet(theme.colors.primaryDark),
  "--color-primary-light-rgb": hexToRgbTriplet(theme.colors.primaryLight),
  "--color-secondary-rgb": hexToRgbTriplet(theme.colors.secondary),
  "--color-secondary-light-rgb": hexToRgbTriplet(theme.colors.secondaryLight),
  "--color-secondary-dark-rgb": hexToRgbTriplet(theme.colors.secondaryDark),
  "--color-accent-rgb": hexToRgbTriplet(theme.colors.accent),
  "--color-accent-light-rgb": hexToRgbTriplet(theme.colors.accentLight),
  "--color-accent-dark-rgb": hexToRgbTriplet(theme.colors.accentDark),
  "--color-ink-rgb": hexToRgbTriplet(theme.colors.ink),
  "--color-ink-soft-rgb": hexToRgbTriplet(theme.colors.inkSoft),
  "--color-paper-rgb": hexToRgbTriplet(theme.colors.paper),
  "--color-paper-muted-rgb": hexToRgbTriplet(theme.colors.paperMuted),
  "--color-line-rgb": hexToRgbTriplet(theme.colors.line),
  "--color-white-rgb": hexToRgbTriplet(theme.colors.white),
  "--font-display": theme.fonts.display,
  "--font-body": theme.fonts.body,
  "--font-label": theme.fonts.label,
  "--radius-sm": theme.radius.sm,
  "--radius-md": theme.radius.md,
  "--radius-lg": theme.radius.lg,
  "--radius-pill": theme.radius.pill,
};
