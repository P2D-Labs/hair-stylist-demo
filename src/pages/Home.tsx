import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";
import { site } from "@/config/site";
import { theme } from "@/config/theme";
import { Reveal, RevealGroup, RevealText } from "@/components/site/Reveal";
import { ThreadLine, ChapterMark } from "@/components/site/ThreadLine";
import { CtaLink } from "@/components/site/CtaLink";
import { Image } from "@/components/site/Image";
import { Section } from "@/components/site/Section";
import { Counter } from "@/components/site/Counter";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { Link } from "react-router-dom";

function partnerInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .filter((c) => /[A-Za-z]/.test(c))
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function CuttingScissors() {
  const bladeTransition = {
    duration: 0.28,
    repeat: Infinity,
    repeatType: "mirror" as const,
    ease: "easeInOut" as const,
  };

  return (
    <div className="relative h-12 w-16 drop-shadow-[0_5px_8px_rgba(133,7,165,0.45)]">
      {[0, 1, 2].map((particle) => (
        <motion.span
          key={particle}
          animate={{ x: [-2, -16 - particle * 5], y: [0, (particle - 1) * 8], opacity: [0.9, 0] }}
          transition={{ duration: 0.55, repeat: Infinity, delay: particle * 0.13, ease: "easeOut" }}
          className="absolute left-2 top-1/2 h-px w-2 origin-right bg-brand-primary-light"
        />
      ))}
      <svg viewBox="0 0 72 48" className="relative h-full w-full overflow-visible" fill="none">
        <motion.g
          animate={{ rotate: [-7, 5] }}
          transition={bladeTransition}
          style={{ transformOrigin: "31px 24px" }}
        >
          <path d="M31 23.5L70 7.5C64 16 52 22 31 26Z" fill="url(#blade-top)" stroke="white" strokeOpacity=".75" strokeWidth=".7" />
          <circle cx="18" cy="15" r="9" stroke={theme.colors.primaryLight} strokeWidth="4.5" />
          <path d="M24 18L32 24" stroke={theme.colors.secondary} strokeWidth="4" strokeLinecap="round" />
        </motion.g>
        <motion.g
          animate={{ rotate: [7, -5] }}
          transition={bladeTransition}
          style={{ transformOrigin: "31px 24px" }}
        >
          <path d="M31 24.5L70 40.5C64 32 52 26 31 22Z" fill="url(#blade-bottom)" stroke="white" strokeOpacity=".75" strokeWidth=".7" />
          <circle cx="18" cy="33" r="9" stroke={theme.colors.primaryLight} strokeWidth="4.5" />
          <path d="M24 30L32 24" stroke={theme.colors.secondary} strokeWidth="4" strokeLinecap="round" />
        </motion.g>
        <circle cx="31" cy="24" r="3.25" fill={theme.colors.paper} stroke={theme.colors.secondaryDark} strokeWidth="1.2" />
        <circle cx="31" cy="24" r="1" fill={theme.colors.secondaryDark} />
        <defs>
          <linearGradient id="blade-top" x1="31" y1="24" x2="68" y2="9" gradientUnits="userSpaceOnUse">
            <stop stopColor={theme.colors.inkSoft} />
            <stop offset=".48" stopColor={theme.colors.white} />
            <stop offset="1" stopColor={theme.colors.primaryLight} />
          </linearGradient>
          <linearGradient id="blade-bottom" x1="31" y1="24" x2="68" y2="39" gradientUnits="userSpaceOnUse">
            <stop stopColor={theme.colors.inkSoft} />
            <stop offset=".5" stopColor={theme.colors.paper} />
            <stop offset="1" stopColor={theme.colors.primaryLight} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function Home() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });
  const imageYRaw = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentYRaw = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const fadeRaw = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scissorsX = useTransform(scrollYProgress, [0.08, 0.88], ["-12vw", "108vw"]);
  const scissorsRotate = useTransform(scrollYProgress, [0.08, 0.88], [-8, 8]);
  const cutLineScale = useTransform(scrollYProgress, [0.08, 0.88], [0, 1]);
  const cutOpacity = useTransform(scrollYProgress, [0.02, 0.08, 0.88, 1], [0, 1, 1, 0]);
  const imageY = reduceMotion ? "0%" : imageYRaw;
  const contentY = reduceMotion ? "0%" : contentYRaw;
  const fade = reduceMotion ? 1 : fadeRaw;

  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: parallaxProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const parallaxYRaw = useTransform(parallaxProgress, [0, 1], ["-12%", "12%"]);
  const parallaxY = reduceMotion ? "0%" : parallaxYRaw;

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section ref={heroRef} className="relative h-[140svh] min-h-[896px]">
        <div className="sticky top-0 h-[100svh] min-h-[640px] overflow-hidden">
        <motion.div style={{ y: imageY }} className="absolute inset-0">
          <Image src={site.hero.image} alt="" eager className="h-[118%] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/5" />
        </motion.div>

        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            style={{ opacity: cutOpacity }}
            className="pointer-events-none absolute inset-x-0 bottom-6 z-20 md:bottom-8"
          >
            <span className="absolute left-0 top-1/2 block w-full border-t border-dashed border-white/30" />
            <motion.span
              style={{ scaleX: cutLineScale }}
              className="absolute left-0 top-1/2 block w-full origin-left border-t-2 border-brand-primary-light shadow-[0_0_9px_rgba(163,43,163,0.8)]"
            />
            <motion.span
              style={{ x: scissorsX, rotate: scissorsRotate }}
              className="absolute -top-6 left-0"
            >
              <CuttingScissors />
            </motion.span>
          </motion.div>
        )}

        <motion.div
          style={{ y: contentY, opacity: fade }}
          className="container-edit relative flex h-full flex-col justify-end pb-20 pt-32 text-white md:pb-28"
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.3, duration: 0.75, ease: theme.motion.ease }}
          >
          <p
            className="font-label text-xs uppercase tracking-[0.3em] text-brand-accent-light"
          >
            {site.hero.eyebrow}
          </p>

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

          <p className="mt-6 max-w-md text-base leading-relaxed text-white/80">
            {site.hero.sub}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <CtaLink to={getWhatsAppHref()} external variant="primary" className="!bg-white !text-brand-primary hover:!bg-brand-primary hover:!text-white">
              {site.hero.ctaPrimary.label}
            </CtaLink>
            <CtaLink to={site.hero.ctaSecondary.path} variant="ghost" className="!text-white">
              {site.hero.ctaSecondary.label}
            </CtaLink>
          </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduceMotion ? 0 : 1.2, duration: 0.8 }}
          className="absolute bottom-16 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/70 md:flex"
        >
          <span className="font-label text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="h-8 w-px bg-white/60"
          />
        </motion.div>
        </div>
      </section>

      {/* ---------- STATS STRIP ---------- */}
      <section className="border-b border-brand-line bg-brand-paper">
        <div className="container-edit">
          <RevealGroup className="grid grid-cols-2 divide-x divide-brand-line md:grid-cols-4">
            {site.stats.map((s) => (
              <Reveal key={s.label} className="px-4 py-10 text-center md:py-14">
                <p className="font-display text-4xl text-brand-primary md:text-5xl">
                  <Counter value={s.value} />
                </p>
                <p className="mt-2 font-label text-xs uppercase tracking-wide text-brand-ink-soft">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------- SPECIALIST SPOTLIGHT ---------- */}
      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-center md:gap-10">
          <Reveal className="relative md:col-span-5">
            <div
              className="absolute -bottom-5 -right-5 hidden h-full w-full border border-brand-accent md:block"
              aria-hidden="true"
            />
            <div className="relative">
              <Reveal variant="image">
                <div className="aspect-[3/4] overflow-hidden">
                  <Image
                    src={site.specialistSpotlight.image}
                    alt={site.specialistSpotlight.name}
                    className="h-full w-full object-cover grayscale transition-all duration-700 ease-epoch hover:scale-105 hover:grayscale-0"
                  />
                </div>
              </Reveal>
              <span className="absolute -top-4 left-6 flex h-16 w-16 items-center justify-center bg-brand-primary font-display text-sm text-white md:left-8">
                12 yrs
              </span>
            </div>
          </Reveal>

          <div className="md:col-span-7">
            <Reveal>
              <ChapterMark numeral="I" label={site.specialistSpotlight.eyebrow} />
            </Reveal>
            <RevealText
              as="h2"
              delay={0.08}
              text={`“${site.specialistSpotlight.quote}”`}
              className="mt-6 block font-display text-3xl italic leading-snug text-brand-primary md:text-4xl"
            />
            <Reveal delay={0.2} className="mt-6 flex items-center gap-4">
              <span className="h-px w-10 bg-brand-accent" />
              <div>
                <p className="font-display text-lg text-brand-primary">
                  {site.specialistSpotlight.name}
                </p>
                <p className="font-label text-xs uppercase tracking-wide text-brand-accent">
                  {site.specialistSpotlight.role}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.28}>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-brand-ink-soft">
                {site.specialistSpotlight.bio}
              </p>
            </Reveal>
            <div className="mt-8 divide-y divide-brand-line border-y border-brand-line">
              {site.specialistSpotlight.specialties.map((s, i) => (
                <Reveal
                  key={s}
                  delay={0.3 + i * 0.05}
                  className="flex items-baseline gap-4 py-3"
                >
                  <span className="font-label text-xs text-brand-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-base text-brand-ink">{s}</span>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.5} className="mt-8">
              <CtaLink to="/about" variant="ghost">
                Meet the full team
              </CtaLink>
            </Reveal>
          </div>
        </div>
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

      {/* ---------- PHILOSOPHY ---------- */}
      <Section>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <ChapterMark numeral="III" label={site.philosophy.eyebrow} />
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

      {/* ---------- PARALLAX SHOWCASE ---------- */}
      <section ref={parallaxRef} className="relative h-[70svh] min-h-[440px] overflow-hidden">
        <motion.div style={{ y: parallaxY }} className="absolute -inset-y-[15%] inset-x-0">
          <Image
            src={site.parallaxFeature.image}
            alt=""
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/45" />
        <div className="container-edit relative flex h-full flex-col items-center justify-center text-center text-white">
          <Reveal>
            <p className="font-label text-xs uppercase tracking-[0.3em] text-brand-accent-light">
              {site.parallaxFeature.eyebrow}
            </p>
          </Reveal>
          <RevealText
            as="h2"
            delay={0.08}
            text={site.parallaxFeature.title}
            className="mx-auto mt-5 block max-w-2xl font-display text-3xl leading-[1.2] md:text-5xl"
          />
        </div>
      </section>

      {/* ---------- GALLERY TEASER ---------- */}
      <Section>
        <Reveal className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <ChapterMark numeral="IV" label="Recent work" />
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

      {/* ---------- PARTNERS ---------- */}
      <Section size="sm" border="top">
        <Reveal className="mb-10 text-center">
          <p className="font-label text-xs uppercase tracking-[0.25em] text-brand-ink-soft/70">
            Trusted products &amp; partners
          </p>
        </Reveal>
        <RevealGroup
          stagger={0.05}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8"
        >
          {site.partners.map((p) => (
            <Reveal key={p} className="group flex flex-col items-center gap-2">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-line font-display text-sm text-brand-ink-soft/50 transition-colors duration-300 group-hover:border-brand-accent group-hover:text-brand-primary">
                {partnerInitials(p)}
              </span>
              <span className="font-display text-sm italic text-brand-ink-soft/45 transition-colors duration-300 group-hover:text-brand-primary">
                {p}
              </span>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      {/* ---------- TESTIMONIALS ---------- */}
      <Section bg="primary">
        <Reveal className="mb-14">
          <ChapterMark numeral="V" label="In their words" tone="light" />
        </Reveal>
        <RevealGroup className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {site.testimonials.map((t) => (
            <Reveal
              key={t.name}
              className="border-t border-white/20 pt-6 transition-transform duration-300 ease-epoch hover:-translate-y-1"
            >
              <div className="flex gap-0.5 text-brand-accent-light">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-4 font-display text-xl leading-snug text-white/95">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 font-label text-xs text-white/90">
                  {t.name.charAt(0)}
                </span>
                <p className="font-label text-xs uppercase tracking-wide text-brand-accent-light">
                  {t.name} — {t.role}
                </p>
              </div>
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
            <CtaLink to={getWhatsAppHref()} external variant="primary">
              Book your appointment
            </CtaLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
