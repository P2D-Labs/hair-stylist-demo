import { useEffect, useState, type ImgHTMLAttributes } from "react";
import { site } from "@/config/site";

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "loading" | "onError"> & {
  src: string;
  alt: string;
  /** Hero-only escape hatch — everything else lazy-loads by default. */
  eager?: boolean;
  /** If src fails to load, retry once with this URL before showing the fallback badge. */
  fallbackSrc?: string;
};

/**
 * Wraps <img> so a failed or slow-loading photo never shows a broken-image
 * icon or blank flash: it fades in on load, and falls back to a branded
 * placeholder (sized to fill the same box, so layout never shifts) on error.
 * Every photo on the site should go through this instead of a bare <img>.
 */
export function Image({ src, alt, eager, fallbackSrc, className = "", ...rest }: ImageProps) {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
    setState("loading");
  }, [src]);

  if (state === "error") {
    return (
      <div
        // Inline min-size guards against callers passing width/height utilities
        // (e.g. the lightbox's "w-auto") that would otherwise collide with the
        // h-full/w-full below and collapse this fallback to an invisible box.
        style={{ minHeight: "10rem", minWidth: "10rem" }}
        className={`flex h-full w-full items-center justify-center bg-brand-paper-muted ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-line font-display text-sm text-brand-secondary">
          {site.brand.mark}
        </span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onLoad={() => setState("loaded")}
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
          setState("loading");
        } else {
          setState("error");
        }
      }}
      className={`transition-opacity duration-700 ease-epoch ${
        state === "loaded" ? "opacity-100" : "opacity-0"
      } ${className}`}
      {...rest}
    />
  );
}
