import { site } from "@/config/site";
import { Reveal, RevealGroup, RevealText } from "@/components/site/Reveal";
import { ThreadLine, ChapterMark } from "@/components/site/ThreadLine";
import { CtaLink } from "@/components/site/CtaLink";
import { Section } from "@/components/site/Section";
import { VideoSection } from "@/components/site/VideoSection";
import { getWhatsAppHref } from "@/lib/whatsapp";

export default function Services() {
  return (
    <>
      <Section size="intro">
        <Reveal>
          <ChapterMark numeral="—" label="Service menu" />
        </Reveal>
        <RevealText
          as="h1"
          delay={0.08}
          text="Four chapters of service, one continuous standard."
          className="mt-6 block max-w-2xl font-display text-4xl leading-[1.08] text-brand-primary md:text-6xl"
        />
        <Reveal delay={0.16}>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-brand-ink-soft">
            Every service includes a consultation, so your stylist can tailor
            the details to your hair before any work begins.
          </p>
        </Reveal>
      </Section>

      <VideoSection
        video={site.servicesFeature.video}
        poster={site.servicesFeature.poster}
        eyebrow={site.servicesFeature.eyebrow}
        title={site.servicesFeature.title}
        heightClassName="h-[80svh] min-h-[420px]"
      />

      {site.serviceGroups.map((group, gi) => (
        <Section key={group.id} size="sm" border={gi !== 0 ? "top" : "none"}>
          <Reveal className="mb-10 md:mb-12">
            <ChapterMark numeral={group.chapter} label={group.title} />
          </Reveal>

          <RevealGroup className="grid grid-cols-1 divide-y divide-brand-line md:grid-cols-2 md:gap-x-16 md:divide-y-0">
            {group.services.map((s) => (
              <Reveal key={s.name} className="py-5 md:border-b md:border-brand-line md:py-6">
                <h3 className="font-display text-lg text-brand-primary md:text-xl">{s.name}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-brand-ink-soft">
                  {s.description}
                </p>
              </Reveal>
            ))}
          </RevealGroup>
        </Section>
      ))}

      <div className="container-edit">
        <ThreadLine className="my-4" />
      </div>

      <Section size="lg" className="text-center">
        <Reveal>
          <h2 className="mx-auto max-w-xl font-display text-3xl leading-tight text-brand-primary md:text-5xl">
            Not sure where to start? Book a free consultation.
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
