import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { theme } from "@/config/theme";

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

export function PageShell({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.main
      initial={{ opacity: 0, y: reduceMotion ? 0 : 18, scale: reduceMotion ? 1 : 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: reduceMotion ? 0 : -14, scale: reduceMotion ? 1 : 0.99 }}
      transition={{ duration: theme.motion.fast, ease: theme.motion.ease }}
    >
      {children}
    </motion.main>
  );
}
