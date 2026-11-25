"use client";

import { useRef } from "react";
import { Navbar } from "@/components/layout";
import { gsap, useGSAP } from "@/lib/gsap";

export function DonateHero() {
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
            ".donate-stagger",
            {
              y: 28,
              opacity: 0,
              duration: 0.8,
              stagger: 0.12,
            },
            0.15,
          )
          .from(
            ".donate-hero-photo",
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
          <p className="donate-stagger flex items-center gap-2 font-label text-[14px] font-medium leading-[1.2] text-white sm:text-[15px]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.44512 6.70965L6.71095 6.70994C8.16071 6.70994 9.33595 7.88518 9.33595 9.33494L5.25202 9.33441L5.2526 9.91827L9.91928 9.9178V9.33494C9.91928 8.70348 9.73367 8.10813 9.40239 7.58447L11.0859 7.58494C12.2481 7.58494 13.2515 8.26464 13.7203 9.24825C12.3409 11.0686 10.1071 12.2516 7.58595 12.2516C5.97519 12.2516 4.61064 11.9071 3.50237 11.3038L3.50321 5.87635C4.22978 5.98042 4.89464 6.2757 5.44512 6.70965ZM2.33594 5.25159C2.63509 5.25159 2.88165 5.47678 2.91535 5.7669L2.91927 5.83441V11.0849C2.91927 11.4071 2.65811 11.6683 2.33594 11.6683H1.16927C0.847107 11.6683 0.585938 11.4071 0.585938 11.0849V5.83494C0.585938 5.51276 0.847107 5.25159 1.16927 5.25159H2.33594ZM7.96302 2.08723L8.16911 2.2936L8.37549 2.08723C8.945 1.51772 9.86842 1.51772 10.4379 2.08723C11.0074 2.65675 11.0074 3.58011 10.4379 4.14962L8.16928 6.41827L5.90064 4.14962C5.33112 3.58011 5.33112 2.65675 5.90064 2.08723C6.47015 1.51772 7.39351 1.51772 7.96302 2.08723Z" fill="white" />
            </svg>

            Support our work
          </p>

          <h1 className="donate-stagger text-grad max-w-[520px] font-display text-[36px] font-bold leading-[40px] tracking-[-0.02em] sm:text-[50px] sm:leading-[54px] min-[1100px]:text-[58px] min-[1100px]:leading-[64px]">
            Your generosity builds
            <br />
            futures that outlast
            <br />
            the moment.
          </h1>

          <p className="donate-stagger max-w-[440px] text-[15px] leading-[24px] text-brand-grey-light sm:text-[16px] sm:leading-[25px]">
            Every contribution creates opportunities for individuals and
            communities facing economic hardship. Your support enables JemiCare
            Foundation to expand programmes that promote long-term economic
            resilience.
          </p>
        </div>

        <div className="donate-hero-photo mx-auto aspect-[4/3] w-full max-w-[540px] overflow-hidden rounded-[24px] bg-white/5 sm:rounded-[28px] min-[1100px]:mx-0">
          <img
            src="/assets/donate-hero.jpg"
            alt="Glass donation jar filled with coins"
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
