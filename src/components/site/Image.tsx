import { useState, type ImgHTMLAttributes } from "react";
import { site } from "@/config/site";

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "loading" | "onError"> & {
  src: string;
  alt: string;
  /** Hero-only escape hatch — everything else lazy-loads by default. */
  eager?: boolean;
};

/**
 * Wraps <img> so a failed or slow-loading photo never shows a broken-image
 * icon or blank flash: it fades in on load, and falls back to a branded
 * placeholder (sized to fill the same box, so layout never shifts) on error.
 * Every photo on the site should go through this instead of a bare <img>.
 */
export function Image({ src, alt, eager, className = "", ...rest }: ImageProps) {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");

  if (state === "error") {
    return (
      <div
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
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onLoad={() => setState("loaded")}
      onError={() => setState("error")}
      className={`transition-opacity duration-700 ease-epoch ${
        state === "loaded" ? "opacity-100" : "opacity-0"
      } ${className}`}
      {...rest}
    />
  );
}
