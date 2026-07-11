import { Link } from "react-router-dom";
import { site } from "@/config/site";
import { Reveal } from "./Reveal";
import { socialIcons } from "./SocialIcons";

export function Footer() {
  return (
    <footer className="bg-brand-primary text-white">
      <div className="container-edit py-16 md:py-20">
        <Reveal className="grid grid-cols-1 gap-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40">
                <span className="font-display text-sm">{site.brand.mark}</span>
              </span>
              <span className="font-display text-xl">{site.brand.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
              {site.brand.tagline}
            </p>
          </div>

          <div>
            <p className="font-label text-xs uppercase tracking-[0.2em] text-brand-accent-light">
              Studio
            </p>
            <ul className="mt-4 space-y-2.5">
              {site.nav.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-label text-xs uppercase tracking-[0.2em] text-brand-accent-light">
              Hours
            </p>
            <ul className="mt-4 space-y-2.5">
              {site.contact.hours.map((h) => (
                <li key={h.day} className="text-sm text-white/75">
                  <span className="block">{h.day}</span>
                  <span className="text-white/50">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-label text-xs uppercase tracking-[0.2em] text-brand-accent-light">
              Contact
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              <li>{site.contact.address}</li>
              <li>{site.contact.phone}</li>
              <li>{site.contact.email}</li>
            </ul>
            <div className="mt-5 flex gap-4">
              {site.contact.social.map((s) => {
                const Icon = socialIcons[s.label];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="text-white/60 transition-colors hover:text-brand-accent-light"
                  >
                    {Icon && <Icon size={19} />}
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-8 text-xs text-white/45 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} {site.brand.fullName}. All rights reserved.</span>
          <span>Crafted as a living template — rebrand freely.</span>
        </div>
      </div>
    </footer>
  );
}
