"use client";

import { useRef, useState } from "react";
import { PARTNER_LOGOS, PARTNER_TESTIMONIALS } from "@/data/partnerships";
import { gsap, useGSAP } from "@/lib/gsap";

export function PartnersShowcase() {
  const [activeIndex, setActiveIndex] = useState(1);
  const containerRef = useRef<HTMLElement>(null);
  const quoteBodyRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".partners-heading", {
          y: 26,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 82%",
            once: true,
          },
        });

        gsap.from(".partner-logo", {
          y: 20,
          opacity: 0,
          duration: 0.65,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".partner-logos-grid",
            start: "top 84%",
            once: true,
          },
        });

        gsap.from(".partner-quote-item", {
          y: 24,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".partner-quote",
            start: "top 84%",
            once: true,
          },
        });
      });
    },
    { scope: containerRef },
  );

  // Smooth GSAP cross-fade when switching between partner quotes
  useGSAP(
    () => {
      if (!hasMountedRef.current) {
        hasMountedRef.current = true;
        return;
      }

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced || !quoteBodyRef.current) return;

      gsap.fromTo(
        quoteBodyRef.current.children,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
          overwrite: "auto",
        },
      );
    },
    { scope: containerRef, dependencies: [activeIndex] },
  );

  const activeQuote = PARTNER_TESTIMONIALS[activeIndex];

  return (
    <section
      ref={containerRef}
      className="bg-white py-16 text-black sm:py-20 min-[1100px]:py-[96px]"
    >
      <div className="mx-auto flex w-[min(1200px,calc(100%-32px))] flex-col items-center text-center sm:w-[min(1200px,calc(100%-48px))]">
        <h2 className="partners-heading font-display text-[30px] font-bold leading-[36px] tracking-[-0.02em] text-black sm:text-[38px] sm:leading-[44px] min-[1100px]:text-[42px] min-[1100px]:leading-[46px]">
          Jemicare Foundation Partners
        </h2>

        {/* 4x3 Partner Logos Grid */}
        <ul className="partner-logos-grid mt-12 grid w-full max-w-[1040px] grid-cols-2 items-center justify-items-center gap-x-8 gap-y-10 sm:mt-16 sm:grid-cols-3 md:grid-cols-4 md:gap-x-12 md:gap-y-12">
          {PARTNER_LOGOS.map((partner) => (
            <li
              key={partner.name}
              className="partner-logo flex h-[44px] w-full items-center justify-center"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-[34px] w-auto max-w-[160px] object-contain opacity-90 transition-opacity duration-200 hover:opacity-100 sm:max-h-[38px]"
              />
            </li>
          ))}
        </ul>

        {/* Switchable Partner Testimonial */}
        <figure className="partner-quote mt-16 flex w-full max-w-[680px] flex-col items-center gap-5 sm:mt-20 sm:gap-[24px] min-[1100px]:mt-[88px]">
          <div
            ref={quoteBodyRef}
            className="flex flex-col items-center gap-5 sm:gap-[24px]"
            aria-live="polite"
          >
            <img
              className="partner-quote-item h-[56px] w-[56px] rounded-full border border-black/5 object-cover sm:h-[64px] sm:w-[64px]"
              src={activeQuote.avatar}
              alt={activeQuote.name}
            />
            <blockquote className="partner-quote-item min-h-[84px] font-serif text-[21px] leading-[28px] tracking-[-0.02em] sm:min-h-[90px] sm:text-[25px] sm:leading-[30px] min-[1100px]:min-h-[96px] min-[1100px]:text-[28px] min-[1100px]:leading-[34px]">
              &ldquo;{activeQuote.quote}&rdquo;
            </blockquote>
            <figcaption className="partner-quote-item text-[15px] font-medium leading-[22px] text-brand-grey sm:text-[18px] sm:leading-[28px]">
              <strong className="font-medium text-black">
                {activeQuote.name},
              </strong>{" "}
              {activeQuote.role}
            </figcaption>
          </div>

          <div
            className="partner-quote-item flex items-center gap-[20px] px-[32px] py-[8px]"
            role="tablist"
            aria-label="Select partner testimonial"
          >
            {PARTNER_TESTIMONIALS.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={item.name}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`View testimonial from ${item.name}`}
                  onClick={() => setActiveIndex(index)}
                  className={`flex items-center justify-center rounded-full p-0.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
                    isActive
                      ? "scale-110 opacity-100 ring-2 ring-black/15"
                      : "opacity-25 hover:scale-105 hover:opacity-70"
                  }`}
                >
                  <img
                    className="h-[32px] w-[32px] rounded-full border border-black/5 object-cover"
                    src={item.avatar}
                    alt=""
                  />
                </button>
              );
            })}
          </div>
        </figure>
      </div>
    </section>
  );
}
