/**
 * ============================================================================
 *  GLOBAL THEME — Luxury Salon Brand Theme
 * ============================================================================
 *  Single source of truth for the entire website.
 *  All colors, fonts and design tokens are managed here.
 * ============================================================================
 */

export const theme = {
  colors: {
    // Primary — Luxury Purple
    primary: "#7B047B",
    primaryDark: "#5A015A",
    primaryLight: "#A32BA3",

    // Secondary — Vibrant Orchid
    secondary: "#AB09D3",
    secondaryLight: "#E07CF5",
    secondaryDark: "#8507A5",

    // Accent — Premium Magenta
    accent: "#A71669",
    accentLight: "#D64C97",
    accentDark: "#7A104D",

    // Supporting accent
    success: "#1C4839",

    // Neutrals
    ink: "#231525",
    inkSoft: "#6A556B",

    paper:
      "#FCFAFD",

    paperMuted:
      "#F7F2F9",

    line:
      "#E9DCEC",

    white:
      "#FFFFFF",

    black:
      "#000000",
  },


  fonts: {
    // Luxury salon headings
    display:
      "'Cormorant Garamond', 'Playfair Display', serif",

    // Clean modern body
    body:
      "'Manrope', 'Helvetica Neue', sans-serif",

    // Small labels
    label:
      "'Manrope', sans-serif",
  },


  radius: {
    sm: "4px",
    md: "8px",
    lg: "18px",
    pill: "999px",
  },


  shadows: {
    soft:
      "0 15px 45px rgba(123,4,123,0.12)",

    hover:
      "0 25px 60px rgba(123,4,123,0.22)",

    dark:
      "0 20px 60px rgba(0,0,0,0.35)",
  },


  motion: {
    fast: 0.25,
    base: 0.55,
    slow: 0.9,

    ease:
      [0.16,1,0.3,1] as [
        number,
        number,
        number,
        number
      ],
  },
} as const;



export type Theme = typeof theme;



/**
 * Convert HEX colors into RGB values
 * Used for Tailwind opacity support
 */
function hexToRgbTriplet(hex:string):string {

  const r=parseInt(hex.slice(1,3),16);
  const g=parseInt(hex.slice(3,5),16);
  const b=parseInt(hex.slice(5,7),16);

  return `${r} ${g} ${b}`;
}



/**
 * CSS variables injected into :root
 */
export const cssVarMap:Record<string,string> = {


  "--color-primary":
    theme.colors.primary,

  "--color-primary-dark":
    theme.colors.primaryDark,

  "--color-primary-light":
    theme.colors.primaryLight,


  "--color-secondary":
    theme.colors.secondary,

  "--color-secondary-light":
    theme.colors.secondaryLight,

  "--color-secondary-dark":
    theme.colors.secondaryDark,


  "--color-accent":
    theme.colors.accent,

  "--color-accent-light":
    theme.colors.accentLight,

  "--color-accent-dark":
    theme.colors.accentDark,


  "--color-success":
    theme.colors.success,


  "--color-ink":
    theme.colors.ink,

  "--color-ink-soft":
    theme.colors.inkSoft,


  "--color-paper":
    theme.colors.paper,

  "--color-paper-muted":
    theme.colors.paperMuted,


  "--color-line":
    theme.colors.line,


  "--color-white":
    theme.colors.white,

  "--color-black":
    theme.colors.black,



  // RGB variables

  "--color-primary-rgb":
    hexToRgbTriplet(theme.colors.primary),

  "--color-primary-dark-rgb":
    hexToRgbTriplet(theme.colors.primaryDark),

  "--color-primary-light-rgb":
    hexToRgbTriplet(theme.colors.primaryLight),



  "--color-secondary-rgb":
    hexToRgbTriplet(theme.colors.secondary),

  "--color-secondary-light-rgb":
    hexToRgbTriplet(theme.colors.secondaryLight),

  "--color-secondary-dark-rgb":
    hexToRgbTriplet(theme.colors.secondaryDark),



  "--color-accent-rgb":
    hexToRgbTriplet(theme.colors.accent),

  "--color-accent-light-rgb":
    hexToRgbTriplet(theme.colors.accentLight),

  "--color-accent-dark-rgb":
    hexToRgbTriplet(theme.colors.accentDark),



  "--color-success-rgb":
    hexToRgbTriplet(theme.colors.success),



  "--color-ink-rgb":
    hexToRgbTriplet(theme.colors.ink),

  "--color-ink-soft-rgb":
    hexToRgbTriplet(theme.colors.inkSoft),



  "--color-paper-rgb":
    hexToRgbTriplet(theme.colors.paper),

  "--color-paper-muted-rgb":
    hexToRgbTriplet(theme.colors.paperMuted),



  "--color-line-rgb":
    hexToRgbTriplet(theme.colors.line),



  "--color-white-rgb":
    hexToRgbTriplet(theme.colors.white),



  // Fonts

  "--font-display":
    theme.fonts.display,

  "--font-body":
    theme.fonts.body,

  "--font-label":
    theme.fonts.label,



  // Radius

  "--radius-sm":
    theme.radius.sm,

  "--radius-md":
    theme.radius.md,

  "--radius-lg":
    theme.radius.lg,

  "--radius-pill":
    theme.radius.pill,
};