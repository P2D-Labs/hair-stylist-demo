import { useReducedMotion } from "framer-motion";
import { Reveal, RevealText } from "@/components/site/Reveal";
import { Image } from "@/components/site/Image";
import type { ReactNode } from "react";

type VideoSectionProps = {
  video: string;
  poster: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
  /** Tailwind height classes — defaults to a full-screen moment. */
  heightClassName?: string;
};

/**
 * Full-screen, muted/looping background-video moment — the same structure as
 * the Home hero (dark scrim + Reveal/RevealText copy) so it reads as the same
 * visual language elsewhere in the site rather than a one-off effect.
 * Under prefers-reduced-motion, the <video> is skipped entirely and only the
 * poster still shows, matching how the hero's parallax already degrades.
 */
export function VideoSection({
  video,
  poster,
  eyebrow,
  title,
  children,
  heightClassName = "h-[100svh] min-h-[560px]",
}: VideoSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className={`relative overflow-hidden ${heightClassName}`}>
      <div className="absolute inset-0">
        {reduceMotion ? (
          <Image src={poster} alt="" eager className="h-full w-full object-cover" />
        ) : (
          <video
            className="h-full w-full object-cover"
            src={video}
            poster={poster}
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
      </div>

      <div className="container-edit relative flex h-full flex-col items-start justify-end pb-20 text-white md:pb-28">
        <Reveal>
          <p className="font-label text-xs uppercase tracking-[0.3em] text-brand-accent-light">
            {eyebrow}
          </p>
        </Reveal>
        <RevealText
          as="h2"
          delay={0.08}
          text={title}
          className="mt-5 block max-w-2xl font-display text-3xl leading-[1.15] md:text-5xl"
        />
        {children && (
          <Reveal delay={0.2} className="mt-7">
            {children}
          </Reveal>
        )}
      </div>
    </section>
  );
}
