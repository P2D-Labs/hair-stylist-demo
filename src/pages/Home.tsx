import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { site } from "@/config/site";
import { theme } from "@/config/theme";
import { Reveal, RevealGroup, RevealText } from "@/components/site/Reveal";
import { ThreadLine, ChapterMark } from "@/components/site/ThreadLine";
import { CtaLink } from "@/components/site/CtaLink";
import { Image } from "@/components/site/Image";
import { Section } from "@/components/site/Section";
import { Link } from "react-router-dom";

export default function Home() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageYRaw = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentYRaw = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const fadeRaw = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const imageY = reduceMotion ? "0%" : imageYRaw;
  const contentY = reduceMotion ? "0%" : contentYRaw;
  const fade = reduceMotion ? 1 : fadeRaw;

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section ref={heroRef} className="relative h-[100svh] min-h-[640px] overflow-hidden">
        <motion.div style={{ y: imageY }} className="absolute inset-0">
          <Image src={site.hero.image} alt="" eager className="h-[118%] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/5" />
        </motion.div>

        <motion.div
          style={{ y: contentY, opacity: fade }}
          className="container-edit relative flex h-full flex-col justify-end pb-20 pt-32 text-white md:pb-28"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: theme.motion.ease }}
            className="font-label text-xs uppercase tracking-[0.3em] text-brand-accent-light"
          >
            {site.hero.eyebrow}
          </motion.p>

          <h1 className="mt-5 max-w-2xl font-display text-5xl leading-[1.05] md:text-7xl">
            {site.hero.headline.split("\n").map((line, i) => (
              <RevealText
                key={line}
                as="span"
                immediate
                delay={0.45 + i * 0.12}
                text={line}
                className="block"
              />
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7, ease: theme.motion.ease }}
            className="mt-6 max-w-md text-base leading-relaxed text-white/80"
          >
            {site.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7, ease: theme.motion.ease }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <CtaLink to={site.hero.ctaPrimary.path} variant="primary" className="!bg-white !text-brand-primary hover:!bg-brand-accent-light">
              {site.hero.ctaPrimary.label}
            </CtaLink>
            <CtaLink to={site.hero.ctaSecondary.path} variant="ghost" className="!text-white">
              {site.hero.ctaSecondary.label}
            </CtaLink>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/70 md:flex"
        >
          <span className="font-label text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="h-8 w-px bg-white/60"
          />
        </motion.div>
      </section>

      {/* ---------- STATS STRIP ---------- */}
      <section className="border-b border-brand-line bg-brand-paper">
        <div className="container-edit">
          <RevealGroup className="grid grid-cols-2 divide-x divide-brand-line md:grid-cols-4">
            {site.stats.map((s) => (
              <Reveal key={s.label} className="px-4 py-10 text-center md:py-14">
                <p className="font-display text-4xl text-brand-primary md:text-5xl">{s.value}</p>
                <p className="mt-2 font-label text-xs uppercase tracking-wide text-brand-ink-soft">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------- PHILOSOPHY ---------- */}
      <Section>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <ChapterMark numeral="I" label={site.philosophy.eyebrow} />
          </Reveal>
          <div className="md:col-span-8">
            <Reveal delay={0.05}>
              <h2 className="font-display text-3xl leading-tight text-brand-primary md:text-5xl">
                {site.philosophy.title}
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-ink-soft">
                {site.philosophy.body}
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-8">
                <CtaLink to="/about" variant="ghost">
                  Read our story
                </CtaLink>
              </div>
            </Reveal>
          </div>
        </div>
        <ThreadLine className="mt-20" />
      </Section>

      {/* ---------- FEATURED SERVICES ---------- */}
      <Section bg="paper-muted">
        <Reveal className="mb-14">
          <ChapterMark numeral="II" label="Featured services" />
          <h2 className="mt-4 max-w-lg font-display text-3xl text-brand-primary md:text-4xl">
            Three ways to begin a new chapter
          </h2>
        </Reveal>

        <RevealGroup className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {site.featuredServices.map((s, i) => (
            <Reveal key={s.id} y={36} variant="image">
              <Link to="/services" className="group block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-epoch group-hover:scale-[1.06]"
                  />
                  <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-brand-paper/90 font-label text-xs text-brand-primary">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                <h3 className="mt-5 font-display text-xl text-brand-primary transition-colors group-hover:text-brand-accent">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-ink-soft">
                  {s.description}
                </p>
                <p className="mt-3 font-label text-xs uppercase tracking-wide text-brand-accent">
                  {s.price}
                </p>
              </Link>
            </Reveal>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-14 text-center">
          <CtaLink to="/services" variant="secondary" className="mx-auto">
            View full service menu
          </CtaLink>
        </Reveal>
      </Section>

      {/* ---------- GALLERY TEASER ---------- */}
      <Section>
        <Reveal className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <ChapterMark numeral="III" label="Recent work" />
            <h2 className="mt-4 max-w-lg font-display text-3xl text-brand-primary md:text-4xl">
              A few pages from the studio archive
            </h2>
          </div>
          <CtaLink to="/gallery" variant="ghost">
            Open full gallery
          </CtaLink>
        </Reveal>

        <RevealGroup className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {site.gallery.items.slice(0, 4).map((g) => (
            <Reveal key={g.id} variant="image" className="group overflow-hidden">
              <div className="aspect-[3/4] overflow-hidden bg-brand-paper-muted">
                <Image
                  src={g.image}
                  alt={g.caption}
                  className="h-full w-full object-cover transition-transform duration-700 ease-epoch group-hover:scale-110"
                />
              </div>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      {/* ---------- TESTIMONIALS ---------- */}
      <Section bg="primary">
        <Reveal className="mb-14">
          <ChapterMark numeral="IV" label="In their words" />
        </Reveal>
        <RevealGroup className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {site.testimonials.map((t) => (
            <Reveal key={t.name} className="border-t border-white/20 pt-6">
              <p className="font-display text-xl leading-snug text-white/95">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="mt-6 font-label text-xs uppercase tracking-wide text-brand-accent-light">
                {t.name} — {t.role}
              </p>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      {/* ---------- CLOSING CTA ---------- */}
      <Section size="lg" className="text-center">
        <Reveal>
          <p className="font-label text-xs uppercase tracking-[0.3em] text-brand-accent">
            Ready when you are
          </p>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-4xl leading-tight text-brand-primary md:text-6xl">
            Your next chapter starts in the chair.
          </h2>
          <div className="mt-9 flex justify-center">
            <CtaLink to="/contact" variant="primary">
              Book your appointment
            </CtaLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
