import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, LoaderCircle, AlertTriangle } from "lucide-react";
import { theme } from "@/config/theme";
import { useGalleryData } from "@/hooks/useGalleryData";
import { Reveal, RevealText } from "@/components/site/Reveal";
import { ChapterMark } from "@/components/site/ThreadLine";
import { Image } from "@/components/site/Image";
import { Section } from "@/components/site/Section";

export default function Gallery() {
  const galleryState = useGalleryData();
  const [filter, setFilter] = useState<string>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const allItems = galleryState.status === "ready" ? galleryState.data.items : [];
  const filters = useMemo(
    () => ["All", ...(galleryState.status === "ready" ? galleryState.data.categories : [])],
    [galleryState]
  );

  const items = useMemo(
    () => (filter === "All" ? allItems : allItems.filter((i) => i.category === filter)),
    [allItems, filter]
  );

  const openAt = (id: string) => {
    const idx = items.findIndex((i) => i.id === id);
    setActiveIndex(idx);
  };

  const step = (dir: 1 | -1) => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + dir + items.length) % items.length);
  };

  return (
    <>
      <Section size="intro">
        <Reveal>
          <ChapterMark numeral="—" label="Gallery" />
        </Reveal>
        <RevealText
          as="h1"
          delay={0.08}
          text="A running archive of finished work."
          className="mt-6 block max-w-2xl font-display text-4xl leading-[1.08] text-brand-primary md:text-6xl"
        />
      </Section>

      <section className="sticky top-20 z-30 border-y border-brand-line bg-brand-paper py-4 shadow-[0_1px_0_0_var(--color-line)]">
        <div className="container-edit flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-[var(--radius-pill)] border px-4 py-2 font-label text-xs uppercase tracking-wide transition-colors duration-300 ease-epoch ${
                filter === f
                  ? "border-brand-primary bg-brand-primary text-white"
                  : "border-brand-line text-brand-ink-soft hover:border-brand-accent hover:text-brand-accent"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <section className="container-edit py-10 md:py-14">
        {galleryState.status === "loading" && (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-brand-ink-soft">
            <LoaderCircle size={28} className="animate-spin" />
            <p className="font-label text-xs uppercase tracking-wide">Loading gallery…</p>
          </div>
        )}

        {galleryState.status === "error" && (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-center text-brand-ink-soft">
            <AlertTriangle size={28} />
            <p className="font-label text-xs uppercase tracking-wide">Couldn't load the gallery</p>
            <p className="max-w-md text-sm text-brand-ink-soft/80">{galleryState.error}</p>
          </div>
        )}

        {galleryState.status === "ready" && items.length === 0 && (
          <div className="flex items-center justify-center py-24 text-brand-ink-soft">
            <p className="font-label text-xs uppercase tracking-wide">No images in this category yet.</p>
          </div>
        )}

        {galleryState.status === "ready" && items.length > 0 && (
          <motion.div layout className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.button
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: theme.motion.ease }}
                  onClick={() => openAt(item.id)}
                  className={`group relative overflow-hidden bg-brand-paper-muted text-left ${
                    (index + 1) % 5 === 0
                      ? "col-span-2 aspect-[16/10] md:col-span-1 md:aspect-[3/4]"
                      : "aspect-[3/4]"
                  }`}
                >
                  <Image
                    src={item.thumbnail}
                    fallbackSrc={item.image}
                    alt={item.caption}
                    className="h-full w-full object-cover transition-transform duration-700 ease-epoch group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/85 via-black/25 via-40% to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="p-4 font-label text-xs uppercase tracking-wide text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                      {item.caption}
                    </p>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-brand-primary-dark/95 p-6"
            onClick={() => setActiveIndex(null)}
          >
            <button
              className="absolute right-6 top-6 text-white/80 transition-colors hover:text-white"
              onClick={() => setActiveIndex(null)}
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 transition-colors hover:text-white md:left-8"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 transition-colors hover:text-white md:right-8"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>

            <motion.div
              key={items[activeIndex]?.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: theme.motion.ease }}
              className="max-h-[80vh] max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={items[activeIndex]?.image ?? ""}
                fallbackSrc={items[activeIndex]?.thumbnail}
                alt={items[activeIndex]?.caption ?? ""}
                eager
                className="max-h-[75vh] w-auto object-contain"
              />
              <p className="mt-4 text-center font-label text-xs uppercase tracking-wide text-white/70">
                {items[activeIndex]?.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
