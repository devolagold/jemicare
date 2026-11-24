"use client";

import { useRef } from "react";
import { STRATEGIC_FOCUS_ITEMS } from "@/data/about";
import { gsap, useGSAP } from "@/lib/gsap";
import type { StrategicFocusItem } from "@/types";

function FocusIcon({ id }: { id: StrategicFocusItem["id"] }) {
  if (id === "economic") {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
        <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
        <path d="m2 16 6 6" />
        <circle cx="16" cy="6" r="3" />
      </svg>
    );
  }

  if (id === "education") {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    );
  }

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="12" rx="2" />
      <path d="M8 20h8" />
      <path d="M12 16v4" />
      <path d="m9 9 2 2-2 2" />
      <path d="M13 13h2" />
    </svg>
  );
}

export function AboutStrategicFocus() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".focus-head", {
          y: 24,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 82%",
            once: true,
          },
        });

        gsap.from(".focus-card", {
          y: 34,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".focus-grid",
            start: "top 82%",
            once: true,
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="bg-white pt-6 pb-16 text-black sm:pt-8 sm:pb-24 min-[1100px]:pt-10 min-[1100px]:pb-[96px]"
    >
      <div className="mx-auto flex w-[min(1200px,calc(100%-32px))] flex-col items-center text-center sm:w-[min(1200px,calc(100%-48px))]">
        <h2 className="focus-head font-display text-[30px] font-bold leading-[36px] tracking-[-0.02em] text-black sm:text-[38px] sm:leading-[44px] min-[1100px]:text-[44px] min-[1100px]:leading-[48px]">
          Our Strategic Focus
        </h2>
        <p className="focus-head mt-3 text-[15px] leading-[24px] text-brand-grey sm:text-[16px]">
          Three focus areas guide everything we do:
        </p>

        <div className="focus-grid mt-10 grid w-full grid-cols-1 gap-6 text-left sm:mt-12 md:grid-cols-3 min-[1100px]:gap-[28px]">
          {STRATEGIC_FOCUS_ITEMS.map((item) => (
            <article
              key={item.id}
              className="focus-card flex min-h-[260px] flex-col justify-between rounded-[16px] border border-black/[0.08] bg-white p-7 transition-colors duration-200 hover:border-black/20 sm:min-h-[300px] sm:p-8"
            >
              <span className="mb-10 grid h-[56px] w-[56px] place-items-center rounded-full bg-black text-white sm:mb-14">
                <FocusIcon id={item.id} />
              </span>
              <div className="flex flex-col gap-3">
                <h3 className="font-display text-[20px] font-semibold leading-[26px] tracking-[-0.02em] text-black sm:text-[22px]">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-[23px] text-brand-grey">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
