import { site } from "@/config/site";
import { Reveal, RevealGroup, RevealText } from "@/components/site/Reveal";
import { ThreadLine, ChapterMark } from "@/components/site/ThreadLine";
import { CtaLink } from "@/components/site/CtaLink";
import { Image } from "@/components/site/Image";
import { Section } from "@/components/site/Section";
import { VideoSection } from "@/components/site/VideoSection";
import { getWhatsAppHref } from "@/lib/whatsapp";

export default function About() {
  return (
    <>
      {/* ---------- INTRO ---------- */}
      <Section size="intro">
        <Reveal>
          <ChapterMark numeral="I" label="About Epoch" />
        </Reveal>
        <RevealText
          as="h1"
          delay={0.08}
          text="A studio built on the idea that hair marks time."
          className="mt-6 block max-w-3xl font-display text-4xl leading-[1.08] text-brand-primary md:text-6xl"
        />
        <Reveal delay={0.16}>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-brand-ink-soft">
            Epoch opened its doors in 2013 as a single chair in Colombo 7. More than a
            decade later, the philosophy hasn&rsquo;t changed — every appointment begins
            with a conversation, not a photo.
          </p>
        </Reveal>
      </Section>

      <section className="container-edit">
        <Reveal variant="image">
          <div className="aspect-[16/8] w-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=1800&auto=format&fit=crop"
              alt="Inside the Epoch studio"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <ThreadLine className="mt-16" />
      </section>

      {/* ---------- TIMELINE ---------- */}
      <Section>
        <Reveal className="mb-16">
          <ChapterMark numeral="II" label="Four chapters so far" />
          <h2 className="mt-4 max-w-lg font-display text-3xl text-brand-primary md:text-4xl">
            How the studio got here
          </h2>
        </Reveal>

        <div className="relative">
          <div className="absolute left-[15px] top-2 hidden h-[calc(100%-16px)] w-px bg-brand-line md:block" />
          <div className="space-y-14 md:space-y-20">
            {site.timeline.map((t, index) => (
              <Reveal
                key={t.chapter}
                y={-56}
                delay={index * 0.14}
                className="relative grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8"
              >
                <div className="flex items-center gap-4 md:col-span-3">
                  <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-accent bg-brand-paper font-label text-xs text-brand-accent">
                    {t.chapter}
                  </span>
                  <span className="font-display text-2xl text-brand-primary md:hidden">{t.year}</span>
                </div>
                <div className="md:col-span-2">
                  <span className="hidden font-display text-3xl text-brand-primary md:block">
                    {t.year}
                  </span>
                </div>
                <div className="md:col-span-7">
                  <h3 className="font-display text-xl text-brand-primary md:text-2xl">{t.title}</h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-brand-ink-soft">
                    {t.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <VideoSection
        video={site.aboutFeature.video}
        poster={site.aboutFeature.poster}
        eyebrow={site.aboutFeature.eyebrow}
        title={site.aboutFeature.title}
      />

      {/* ---------- TEAM ---------- */}
      <Section bg="paper-muted">
        <Reveal className="mb-14">
          <ChapterMark numeral="III" label="The team" />
          <h2 className="mt-4 max-w-lg font-display text-3xl text-brand-primary md:text-4xl">
            The people behind every appointment
          </h2>
        </Reveal>

        <RevealGroup className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {site.team.map((member) => (
            <Reveal key={member.name} variant="image" className="group">
              <div className="aspect-[3/4] overflow-hidden bg-brand-line">
                <Image
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover grayscale transition-all duration-700 ease-epoch group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 font-display text-lg text-brand-primary">{member.name}</h3>
              <p className="font-label text-xs uppercase tracking-wide text-brand-accent">
                {member.role}
              </p>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      {/* ---------- CTA ---------- */}
      <Section size="lg" className="text-center">
        <Reveal>
          <ChapterMark numeral="IV" label="Meet the team" />
          <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl leading-tight text-brand-primary md:text-5xl">
            Come sit in the chair and tell us where you&rsquo;re headed.
          </h2>
          <div className="mt-9 flex justify-center">
            <CtaLink to={getWhatsAppHref()} external variant="primary">
              Book a consultation
            </CtaLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
