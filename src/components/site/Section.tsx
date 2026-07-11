import type { ElementType, ReactNode } from "react";

type SectionSize = "sm" | "md" | "lg" | "intro";
type SectionBg = "paper" | "paper-muted" | "primary";

const sizeClasses: Record<SectionSize, string> = {
  // Dense content blocks — e.g. services list groups
  sm: "py-16 md:py-20",
  // Default rhythm — the majority of sections
  md: "py-24 md:py-32",
  // Closing CTAs — the most generous rhythm, used once per page
  lg: "py-28 md:py-36",
  // Page-opening hero/intro blocks, accounting for the fixed header
  intro: "pb-16 pt-40 md:pb-24 md:pt-48",
};

const bgClasses: Record<SectionBg, string> = {
  paper: "bg-brand-paper",
  "paper-muted": "bg-brand-paper-muted",
  primary: "bg-brand-primary text-white",
};

type SectionProps = {
  children: ReactNode;
  size?: SectionSize;
  bg?: SectionBg;
  border?: "top" | "none";
  container?: boolean;
  as?: ElementType;
  className?: string;
};

/**
 * Shared vertical-rhythm wrapper — every page section should use this
 * instead of hand-typing padding/background/border classes, so equivalent
 * sections (e.g. every page's closing CTA) always share the same spacing scale.
 */
export function Section({
  children,
  size = "md",
  bg,
  border = "none",
  container = true,
  as: Comp = "section",
  className = "",
}: SectionProps) {
  const classes = [
    sizeClasses[size],
    bg ? bgClasses[bg] : "",
    border === "top" ? "border-t border-brand-line" : "",
    container ? "container-edit" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Comp className={classes}>{children}</Comp>;
}
