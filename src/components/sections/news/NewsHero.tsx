"use client";

import { useRef } from "react";
import { Navbar } from "@/components/layout";
import { gsap, useGSAP } from "@/lib/gsap";

export function NewsHero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".hero-nav", {
          y: -18,
          opacity: 0,
          duration: 0.7,
        })
          .from(
            ".news-stagger",
            {
              y: 28,
              opacity: 0,
              duration: 0.8,
              stagger: 0.12,
            },
            0.15,
          )
          .from(
            ".news-hero-card",
            {
              y: 36,
              scale: 0.96,
              opacity: 0,
              duration: 0.9,
            },
            0.25,
          );
      });
    },
    { scope: containerRef },
  );

  return (
    <header
      ref={containerRef}
      className="relative overflow-hidden bg-black text-white"
    >
      <Navbar />

      <div className="relative z-10 mx-auto grid w-[min(1200px,calc(100%-32px))] grid-cols-1 items-center gap-10 pt-12 sm:w-[min(1200px,calc(100%-48px))] sm:gap-12 sm:pt-16 min-[1100px]:grid-cols-[1fr_540px] min-[1100px]:gap-[64px] min-[1100px]:pt-[76px]">
        <div className="flex flex-col items-start gap-5 sm:gap-6">
          <p className="news-stagger flex items-center gap-2 font-label text-[14px] font-medium leading-[1.2] text-white sm:text-[15px]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.0837 12.8334H2.91699C1.9505 12.8334 1.16699 12.0499 1.16699 11.0834V1.75002C1.16699 1.42786 1.42816 1.16669 1.75033 1.16669H9.91699C10.2392 1.16669 10.5003 1.42786 10.5003 1.75002V5.83335H12.8337V11.0834C12.8337 12.0499 12.0502 12.8334 11.0837 12.8334ZM10.5003 7.00002V11.0834C10.5003 11.4055 10.7615 11.6667 11.0837 11.6667C11.4058 11.6667 11.667 11.4055 11.667 11.0834V7.00002H10.5003ZM2.91699 3.50002V7.00002H6.41699V3.50002H2.91699ZM2.91699 7.58335V8.75002H8.75033V7.58335H2.91699ZM2.91699 9.33335V10.5H8.75033V9.33335H2.91699ZM4.08366 4.66669H5.25033V5.83335H4.08366V4.66669Z" fill="white" />
            </svg>

            News &amp; Updates
          </p>

          <h1 className="news-stagger text-grad max-w-[520px] font-display text-[36px] font-bold leading-[40px] tracking-[-0.02em] sm:text-[50px] sm:leading-[54px] min-[1100px]:text-[58px] min-[1100px]:leading-[64px]">
            Follow the
            <br />
            work as it unfolds.
          </h1>

          <p className="news-stagger max-w-[440px] text-[15px] leading-[24px] text-brand-grey-light sm:text-[16px] sm:leading-[25px]">
            Programme milestones. Beneficiary stories. Community updates. Future
            announcements. This is where you stay connected to what JemiCare
            Foundation is doing and where it is headed.
          </p>
        </div>

        <div className="news-hero-card mx-auto flex aspect-[4/3] w-full max-w-[540px] items-center justify-center overflow-hidden rounded-[24px] border border-white/[0.06] bg-[#14110b] sm:rounded-[28px] min-[1100px]:mx-0">
          <img
            src="/assets/news-hero.png"
            alt="News and updates announcement illustration"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>

      <img
        src="/assets/line art.svg"
        alt="line_art"
        className="relative z-10 w-full pt-12 sm:pt-16 min-[1100px]:pt-20"
      />
    </header>
  );
}
