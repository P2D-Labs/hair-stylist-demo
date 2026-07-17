import type { ComponentType, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function InstagramIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...base} {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function FacebookIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...base} {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

/** Stylized note glyph — a generic stand-in rather than a literal logo trace. */
export function TikTokIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      {...base}
      {...props}
    >
      <path d="M15 3v11.5a4.5 4.5 0 1 1-4-4.47" />
      <path d="M15 3c.65 2.8 2.35 4.5 5 5" />
    </svg>
  );
}

/** A generic chat-bubble glyph for "message us" — not a trace of any brand mark. */
export function WhatsAppIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...base} {...props}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <path d="M8.5 10.5c.3 2.5 2.2 4.4 4.7 4.7" strokeWidth="1.4" />
    </svg>
  );
}

export const socialIcons: Record<string, ComponentType<IconProps>> = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  TikTok: TikTokIcon,
};
