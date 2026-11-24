"use client";

import { useEffect, useRef, useState } from "react";
import { MEDIA_GALLERY_COLUMNS } from "@/data/media";
import { gsap, useGSAP } from "@/lib/gsap";

const FLAT_PHOTOS = MEDIA_GALLERY_COLUMNS.flat();

export function MediaGalleryGrid() {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".gallery-tile", {
          y: 28,
          opacity: 0,
          duration: 0.75,
          stagger: { amount: 0.55, from: "start" },
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gallery-mosaic",
            start: "top 82%",
            once: true,
          },
        });
      });
    },
    { scope: containerRef },
  );

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev + 1) % FLAT_PHOTOS.length,
        );
      }
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + FLAT_PHOTOS.length) % FLAT_PHOTOS.length,
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedIndex]);

  const activePhoto =
    selectedIndex !== null ? FLAT_PHOTOS[selectedIndex] : null;

  return (
    <section
      ref={containerRef}
      className="bg-white py-12 text-black sm:py-16 min-[1100px]:py-[84px]"
    >
      <div className="mx-auto w-[min(1200px,calc(100%-32px))] sm:w-[min(1200px,calc(100%-48px))]">
        {/* Unified rounded 4-column photo collage */}
        <div className="gallery-mosaic grid grid-cols-1 gap-1.5 overflow-hidden rounded-[16px] bg-white sm:grid-cols-2 sm:rounded-[20px] min-[1100px]:h-[1160px] min-[1100px]:grid-cols-4 min-[1100px]:gap-[4px]">
          {MEDIA_GALLERY_COLUMNS.map((column, colIdx) => (
            <div
              key={colIdx}
              className="flex flex-col gap-1.5 min-[1100px]:h-full min-[1100px]:gap-[4px]"
            >
              {column.map((photo) => {
                const flatIndex = FLAT_PHOTOS.findIndex(
                  (p) => p.id === photo.id,
                );

                return (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => setSelectedIndex(flatIndex)}
                    aria-label={`View photo: ${photo.alt}`}
                    style={{ flexGrow: photo.weight }}
                    className={`gallery-tile group relative flex w-full overflow-hidden bg-black/5 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-yellow ${photo.mobileAspect} min-[1100px]:aspect-auto min-[1100px]:min-h-0 min-[1100px]:basis-0`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Lightbox */}
      {activePhoto && selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.alt}
          onClick={() => setSelectedIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] w-full max-w-[920px] flex-col items-center gap-4"
          >
            <div className="flex w-full items-center justify-between text-white/80">
              <span className="text-[14px] font-medium">
                {selectedIndex + 1} / {FLAT_PHOTOS.length}
              </span>
              <button
                type="button"
                aria-label="Close lightbox"
                onClick={() => setSelectedIndex(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div className="relative flex max-h-[75vh] w-full items-center justify-center">
              <button
                type="button"
                aria-label="Previous photo"
                onClick={() =>
                  setSelectedIndex(
                    (selectedIndex - 1 + FLAT_PHOTOS.length) %
                      FLAT_PHOTOS.length,
                  )
                }
                className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80 sm:left-4"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <img
                src={activePhoto.src}
                alt={activePhoto.alt}
                className="max-h-[75vh] w-auto max-w-full rounded-[16px] object-contain shadow-2xl"
              />

              <button
                type="button"
                aria-label="Next photo"
                onClick={() =>
                  setSelectedIndex((selectedIndex + 1) % FLAT_PHOTOS.length)
                }
                className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80 sm:right-4"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>

            <p className="text-center text-[14px] leading-[20px] text-white/80 sm:text-[15px]">
              {activePhoto.alt}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
