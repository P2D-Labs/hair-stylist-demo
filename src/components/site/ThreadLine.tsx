import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { theme } from "@/config/theme";

/**
 * ThreadLine — the site's one recurring signature element. A single hand-
 * drawn stroke that "writes itself" the first time it scrolls into view.
 * Used between chapters everywhere (Home, About, Services) so the site reads
 * as one continuous line rather than stacked, unrelated blocks.
 */
export function ThreadLine({ className = "" }: { className?: string }) {
  return (
    <div className={`flex w-full items-center justify-center py-2 ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 400 24"
        className="h-6 w-full max-w-[220px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M2 12 C 60 2, 100 22, 160 12 S 260 2, 320 12 S 380 20, 398 12"
          stroke={theme.colors.accent}
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
          transition={{ duration: 1.1, ease: theme.motion.ease }}
        />
      </svg>
    </div>
  );
}

/**
 * Spine — a persistent vertical thread in the left gutter (desktop only)
 * that fills top-to-bottom with overall scroll progress. Rendered once at
 * the app shell level, it's what makes chapters across a page (and across
 * pages) read as one continuous line rather than disconnected sections.
 */
export function Spine() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  if (reduceMotion) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-24 left-6 top-24 z-40 hidden w-px lg:block"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-brand-line" />
      <motion.div
        style={{ scaleY, transformOrigin: "top" }}
        className="absolute inset-0 bg-brand-accent"
      />
    </div>
  );
}

/** Roman-numeral chapter marker — used as the eyebrow above each major section. */
export function ChapterMark({ numeral, label }: { numeral: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-label text-xs tracking-[0.25em] text-brand-accent">
        {numeral}
      </span>
      <span className="h-px w-8 bg-brand-line" />
      <span className="font-label text-xs uppercase tracking-[0.25em] text-brand-ink-soft">
        {label}
      </span>
    </div>
  );
}
