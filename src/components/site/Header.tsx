import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { site } from "@/config/site";
import { theme } from "@/config/theme";
import { CtaLink } from "./CtaLink";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  // Only the home route has a dark photo hero directly under the header;
  // every other page opens on the plain light page background, so a
  // transparent header there already has enough contrast with dark text.
  const overDarkHero = location.pathname === "/";
  const lightText = overDarkHero && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ease-epoch ${
        scrolled || open
          ? "bg-brand-paper/90 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-md text-brand-ink"
          : lightText
            ? "bg-transparent text-white"
            : "bg-transparent text-brand-ink"
      }`}
    >
      <div className="container-edit flex h-20 items-center justify-between">
        <Link to="/" className="group flex items-center gap-3">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300"
            style={{
              borderColor: scrolled || open ? theme.colors.primary : "currentColor",
            }}
          >
            <span className="font-display text-sm">{site.brand.mark}</span>
          </span>
          <span className="font-display text-xl tracking-wide">{site.brand.name}</span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {site.nav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative py-1 font-label text-sm tracking-wide transition-colors duration-300 ${
                  isActive ? "text-brand-accent" : "hover:text-brand-accent"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 h-px w-full bg-brand-accent"
                      transition={{ duration: 0.4, ease: theme.motion.ease }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <CtaLink to="/contact" variant="primary" className="!py-2.5 !px-5 text-xs">
            Book now
          </CtaLink>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: theme.motion.ease }}
            className="overflow-hidden border-t border-brand-line bg-brand-paper md:hidden"
          >
            <nav className="container-edit flex flex-col gap-1 py-6">
              {site.nav.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `block py-3 font-display text-2xl ${isActive ? "text-brand-accent" : ""}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
              <div className="mt-4">
                <CtaLink to="/contact" variant="primary">
                  Book now
                </CtaLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
