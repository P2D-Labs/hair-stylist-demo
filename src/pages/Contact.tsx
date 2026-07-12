import { useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { Clock, Mail, MapPin, Share2 } from "lucide-react";
import { site } from "@/config/site";
import { Reveal, RevealText } from "@/components/site/Reveal";
import { ThreadLine, ChapterMark } from "@/components/site/ThreadLine";
import { Section } from "@/components/site/Section";
import { socialIcons, WhatsAppIcon } from "@/components/site/SocialIcons";
import { CtaLink } from "@/components/site/CtaLink";
import { getWhatsAppHref } from "@/lib/whatsapp";

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const whatsappHref = getWhatsAppHref();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // No backend wired up — replace this with your booking API / email service.
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Request sent — we'll confirm your appointment by email shortly.");
      (e.target as HTMLFormElement).reset();
    }, 700);
  };

  return (
    <>
      <Section size="intro">
        <Reveal>
          <ChapterMark numeral="—" label="Contact" />
        </Reveal>
        <RevealText
          as="h1"
          delay={0.08}
          text="Let’s find your next chapter."
          className="mt-6 block max-w-2xl font-display text-4xl leading-[1.08] text-brand-primary md:text-6xl"
        />
      </Section>

      <div className="container-edit">
        <ThreadLine className="mb-4" />
      </div>

      <section className="container-edit pb-24 md:pb-32">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-x-12">
          <Reveal className="md:col-span-5">
            <div className="divide-y divide-brand-line border-y border-brand-line">
              <ContactRow icon={MapPin} label="Studio address">
                <p className="text-base text-brand-ink">{site.contact.address}</p>
              </ContactRow>
              <ContactRow icon={Mail} label="Phone & email">
                <p className="text-base text-brand-ink">{site.contact.phone}</p>
                <p className="text-base text-brand-ink">{site.contact.email}</p>
              </ContactRow>
              <ContactRow icon={Clock} label="Hours">
                <ul className="space-y-1.5">
                  {site.contact.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-6 text-sm text-brand-ink-soft">
                      <span>{h.day}</span>
                      <span>{h.time}</span>
                    </li>
                  ))}
                </ul>
              </ContactRow>
              <ContactRow icon={Share2} label="Follow along">
                <div className="flex gap-3">
                  {site.contact.social.map((s) => {
                    const Icon = socialIcons[s.label];
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-line text-brand-ink transition-colors hover:border-brand-accent hover:text-brand-accent"
                      >
                        {Icon && <Icon size={16} />}
                      </a>
                    );
                  })}
                </div>
              </ContactRow>
            </div>

            <div className="mt-10 aspect-[4/3] w-full overflow-hidden border border-brand-line">
              <iframe
                title="Studio location"
                src={site.contact.mapEmbed}
                className="h-full w-full grayscale"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-7">
            <div className="border border-brand-line bg-brand-paper-muted/50 p-6 sm:p-10">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-brand-accent">
                Request an appointment
              </p>
              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Field label="First name" name="firstName" required />
                  <Field label="Last name" name="lastName" required />
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Phone" name="phone" type="tel" />
                </div>
                <div>
                  <label className="font-label text-xs uppercase tracking-wide text-brand-ink-soft">
                    Service interested in
                  </label>
                  <select
                    name="service"
                    className="mt-2 w-full border-b border-brand-line bg-transparent py-3 font-body text-base text-brand-ink outline-none transition-colors focus:border-brand-accent"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {site.serviceGroups.flatMap((g) =>
                      g.services.map((s) => (
                        <option key={s.name} value={s.name}>
                          {s.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>
                <div>
                  <label className="font-label text-xs uppercase tracking-wide text-brand-ink-soft">
                    Tell us about what you're looking for
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    className="mt-2 w-full resize-none border-b border-brand-line bg-transparent py-3 font-body text-base text-brand-ink outline-none transition-colors focus:border-brand-accent"
                    placeholder="Reference photos, hair history, allergies — anything helps."
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="group relative inline-flex items-center gap-2 bg-brand-primary px-8 py-4 font-label text-sm tracking-wide text-white transition-all duration-300 ease-epoch hover:-translate-y-0.5 hover:bg-brand-primary-dark disabled:opacity-60"
                >
                  {submitting ? "Sending…" : "Request appointment"}
                </button>
              </form>

              <div className="mt-8 flex flex-col gap-3 border-t border-brand-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-brand-ink-soft">
                  Prefer a faster reply? Message us directly.
                </p>
                <CtaLink to={whatsappHref} variant="secondary" external className="!py-3">
                  <span className="flex items-center gap-2">
                    <WhatsAppIcon size={16} />
                    Book via WhatsApp
                  </span>
                </CtaLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-4 py-6 first:pt-0 last:pb-0">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-accent text-brand-accent">
        <Icon size={16} />
      </span>
      <div className="flex-1 space-y-2">
        <p className="font-label text-xs uppercase tracking-[0.2em] text-brand-accent">{label}</p>
        {children}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="font-label text-xs uppercase tracking-wide text-brand-ink-soft">
        {label}
        {required && <span className="text-brand-accent"> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full border-b border-brand-line bg-transparent py-3 font-body text-base text-brand-ink outline-none transition-colors focus:border-brand-accent"
      />
    </div>
  );
}
