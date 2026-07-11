import { useLayoutEffect, type ReactNode } from "react";
import { cssVarMap } from "./theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    Object.entries(cssVarMap).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, []);

  return children;
}
