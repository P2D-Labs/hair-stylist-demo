import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type CtaLinkProps = {
  to: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
};

const base =
  "group relative inline-flex items-center gap-2 font-label text-sm tracking-wide transition-all duration-300 ease-epoch hover:-translate-y-0.5 active:translate-y-0 active:duration-100";

const variants: Record<string, string> = {
  primary:
    "bg-brand-primary text-white px-7 py-3.5 rounded-[var(--button-radius)] hover:bg-brand-primary-dark",
  secondary:
    "border border-brand-primary text-brand-primary px-7 py-3.5 rounded-[var(--button-radius)] hover:bg-brand-primary hover:text-white",
  ghost: "text-brand-ink px-0 py-1",
};

export function CtaLink({ to, children, variant = "primary", className = "", external }: CtaLinkProps) {
  const content = (
    <>
      <span className="relative">
        {children}
        {variant === "ghost" && (
          <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-brand-accent transition-transform duration-300 ease-epoch group-hover:scale-x-100" />
        )}
      </span>
      <ArrowUpRight
        size={16}
        className="transition-transform duration-300 ease-epoch group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </>
  );

  const classes = `${base} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link to={to} className={classes}>
      {content}
    </Link>
  );
}
