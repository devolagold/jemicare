"use client";

import { useRef, useState } from "react";
import { Eyebrow } from "@/components/ui";
import { LEADERSHIP_QUOTES } from "@/data/home";
import { gsap, useGSAP } from "@/lib/gsap";

export function Governance() {
  const [activeIndex, setActiveIndex] = useState(1);
  const containerRef = useRef<HTMLElement>(null);
  const quoteBodyRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);

  // Scroll entrance animation
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".gov-reveal", {
          y: 28,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        });

        gsap.from(".gov-quote-item", {
          y: 24,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gov-quote",
            start: "top 82%",
            once: true,
          },
        });
      });
    },
    { scope: containerRef },
  );

  // Smooth GSAP cross-fade/lift when switching between leadership quotes
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

  const activeQuote = LEADERSHIP_QUOTES[activeIndex];

  return (
    <section
      ref={containerRef}
      className="bg-white py-14 text-black sm:py-16 min-[1100px]:py-[80px]"
    >
      <div className="mx-auto flex w-[min(1200px,calc(100%-32px))] flex-col items-center text-center sm:w-[min(1200px,calc(100%-48px))]">
        <div className="gov-reveal">
          <Eyebrow>Governance &amp; Leadership</Eyebrow>
        </div>
        <h2 className="gov-reveal mt-5 font-display text-[30px] font-bold leading-[36px] tracking-[-0.02em] text-black sm:mt-7 sm:text-[38px] sm:leading-[44px] min-[1100px]:mt-[34px] min-[1100px]:text-[44px] min-[1100px]:leading-[48px]">
          Led with integrity. Driven by mission.
        </h2>
        <p className="gov-reveal mt-4 max-w-[694px] text-[15px] leading-[24px] text-brand-grey sm:mt-6 sm:text-[16px]">
          JemiCare Foundation is guided by a commitment to integrity,
          accountability, and responsible stewardship. Our leadership team works
          closely with volunteers and partners to ensure programmes remain
          impactful, sustainable, and aligned with our mission.
        </p>

        <figure className="gov-quote mt-10 flex w-full max-w-[666px] flex-col items-center gap-5 sm:mt-12 sm:gap-[24px] min-[1100px]:mt-[64px]">
          <div
            ref={quoteBodyRef}
            className="flex flex-col items-center gap-5 sm:gap-[24px]"
            aria-live="polite"
          >
            <img
              className="gov-quote-item h-[56px] w-[56px] rounded-full border border-black/5 object-cover sm:h-[64px] sm:w-[64px]"
              src={activeQuote.avatar}
              alt={activeQuote.name}
            />
            <blockquote className="gov-quote-item min-h-[84px] font-serif text-[21px] leading-[28px] tracking-[-0.02em] sm:min-h-[90px] sm:text-[25px] sm:leading-[30px] min-[1100px]:min-h-[96px] min-[1100px]:text-[28px] min-[1100px]:leading-[32px]">
              &ldquo;{activeQuote.quote}&rdquo;
            </blockquote>
            <figcaption className="gov-quote-item text-[15px] font-medium leading-[22px] text-brand-grey sm:text-[18px] sm:leading-[28px]">
              <strong className="font-medium text-black">
                {activeQuote.name},
              </strong>{" "}
              {activeQuote.role}
            </figcaption>
          </div>

          <div
            className="gov-quote-item flex items-center gap-[20px] px-[32px] py-[8px]"
            role="tablist"
            aria-label="Select leadership quote"
          >
            {LEADERSHIP_QUOTES.map((leader, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={leader.name}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`View quote from ${leader.name}`}
                  onClick={() => setActiveIndex(index)}
                  className={`flex items-center justify-center rounded-full p-0.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
                    isActive
                      ? "scale-110 opacity-100 ring-2 ring-black/15"
                      : "opacity-25 hover:scale-105 hover:opacity-70"
                  }`}
                >
                  <img
                    className="h-[32px] w-[32px] rounded-full border border-black/5 object-cover"
                    src={leader.avatar}
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
