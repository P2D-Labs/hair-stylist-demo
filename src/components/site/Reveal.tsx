import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Children, cloneElement, isValidElement, type ReactNode, type ReactElement } from "react";
import { theme } from "@/config/theme";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li";
  once?: boolean;
  /**
   * "fade" (default) rises + fades in — the base reveal used for text and
   * general content. "image" clips in from the bottom edge with a soft
   * scale-settle — reserved for photography so images read as a distinct
   * motion from text, not the same effect repeated everywhere.
   */
  variant?: "fade" | "image";
};

/**
 * The single reveal primitive used everywhere in the site: a section or
 * element animates into place once, the first time it enters the viewport.
 * Keeping this in one place is what keeps all the scroll effects feeling
 * consistent instead of like a grab-bag of one-off animations.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
  once = true,
  variant = "fade",
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  const fadeVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: theme.motion.base, delay, ease: theme.motion.ease },
    },
  };

  const imageVariants: Variants = {
    hidden: {
      opacity: 0,
      clipPath: reduceMotion ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
      scale: reduceMotion ? 1 : 1.06,
    },
    visible: {
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      scale: 1,
      transition: { duration: theme.motion.slow, delay, ease: theme.motion.ease },
    },
  };

  const variants = variant === "image" ? imageVariants : fadeVariants;
  const Comp = motion[as];

  return (
    <Comp
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      variants={variants}
      className={className}
    >
      {children}
    </Comp>
  );
}

/**
 * Stagger container — wrap a row/grid of <Reveal> children and each one
 * cascades in with an incrementing delay, so a card grid or nav list reveals
 * left-to-right / top-to-bottom instead of all popping in at once.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const items = Children.toArray(children).filter(isValidElement) as ReactElement<RevealProps>[];

  return (
    <div className={className}>
      {items.map((child, i) =>
        cloneElement(child, { delay: (child.props.delay ?? 0) + i * stagger, key: i })
      )}
    </div>
  );
}

/**
 * Word-by-word rise for headlines — each word is masked in its own overflow
 * hidden box so it climbs up from behind a hard edge rather than fading in
 * place. Reserved for hero copy and major H2s; used elsewhere it would just
 * be noise instead of an accent.
 */
export function RevealText({
  text,
  as = "span",
  delay = 0,
  stagger = 0.05,
  className,
  immediate = false,
}: {
  text: string;
  as?: "span" | "h1" | "h2";
  delay?: number;
  stagger?: number;
  className?: string;
  /** Animate on mount instead of on scroll-into-view — for above-the-fold
   * copy (e.g. the hero headline) that must never wait on an
   * IntersectionObserver callback. */
  immediate?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");
  const Comp = motion[as];
  const trigger = immediate
    ? { animate: { y: "0%", opacity: 1 } }
    : {
        whileInView: { y: "0%", opacity: 1 },
        viewport: { once: true, margin: "-10% 0px -10% 0px" },
      };

  return (
    <Comp className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.15em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: reduceMotion ? 0 : "100%", opacity: reduceMotion ? 0 : 1 }}
            {...trigger}
            transition={{
              duration: theme.motion.base,
              delay: delay + i * stagger,
              ease: theme.motion.ease,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}
