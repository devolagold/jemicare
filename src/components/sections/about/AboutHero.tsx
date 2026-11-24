"use client";

import { useRef } from "react";
import { Navbar } from "@/components/layout";
import { gsap, useGSAP } from "@/lib/gsap";

export function AboutHero() {
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
            ".about-stagger",
            {
              y: 32,
              opacity: 0,
              duration: 0.8,
              stagger: 0.12,
            },
            0.15,
          )
          .from(
            ".about-photo",
            {
              y: 40,
              scale: 0.97,
              opacity: 0,
              duration: 0.95,
            },
            0.35,
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
      {/* Subtle architectural dark arcs flanking the hero copy */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[620px] select-none overflow-hidden"
      >
        <div className="absolute -left-[260px] top-[60px] h-[560px] w-[560px] rounded-full border-[64px] border-white/[0.03] blur-[2px] sm:-left-[200px] sm:h-[680px] sm:w-[680px]" />
        <div className="absolute -right-[260px] top-[60px] h-[560px] w-[560px] rounded-full border-[64px] border-white/[0.03] blur-[2px] sm:-right-[200px] sm:h-[680px] sm:w-[680px]" />
      </div>

      <Navbar />

      <div className="relative z-10 mx-auto flex w-[min(1200px,calc(100%-32px))] flex-col items-center pt-14 text-center sm:w-[min(1200px,calc(100%-48px))] sm:pt-20 min-[1100px]:pt-[88px]">
        <p className="about-stagger flex items-center justify-center gap-2 font-label text-[14px] font-medium leading-[1.2] text-white sm:text-[15px]">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.99992 11.0833H8.16658V3.50002L11.8964 5.0985C12.1109 5.19042 12.2499 5.40132 12.2499 5.63467V11.0833H13.4166V12.25H0.583252V11.0833H1.74992V3.29578C1.74992 3.06525 1.88568 2.85634 2.09634 2.76272L6.58978 0.765631C6.73701 0.700204 6.90938 0.7665 6.97478 0.913698C6.99134 0.950991 6.99992 0.991346 6.99992 1.03216V11.0833Z" fill="white" />
          </svg>
          About us
        </p>

        <h1 className="about-stagger text-grad mt-5 max-w-[780px] font-display text-[36px] font-bold leading-[40px] tracking-[-0.02em] sm:mt-6 sm:text-[52px] sm:leading-[56px] min-[1100px]:text-[64px] min-[1100px]:leading-[68px]">
          We build pathways <br className="md:hidden" /> out of <br className="hidden md:inline" /> poverty. Not dependencies.
        </h1>

        <p className="about-stagger mt-5 max-w-[740px] text-[15px] leading-[24px] text-brand-grey-light sm:mt-6 sm:text-[16px] sm:leading-[26px]">
          Founded in 2020, JemiCare Foundation is a Nigerian non-governmental
          organisation dedicated to alleviating poverty through education,
          technology, and sustainable livelihood initiatives. We work with
          communities, volunteers, and partners to create opportunities that
          enable vulnerable individuals to build resilient and productive lives.
          Our approach is simple: equip people with the knowledge, skills, and
          support they need to overcome economic challenges and participate
          meaningfully in society.
        </p>

        <div className="about-photo mt-12 w-full overflow-hidden rounded-[20px] bg-white/5 sm:mt-16 sm:rounded-[28px] min-[1100px]:mt-[68px] min-[1100px]:rounded-[32px]">
          <img
            src="/assets/about-hero.jpg"
            alt="JemiCare Foundation community and team members collaborating together"
            className="aspect-[849/455] h-full w-full object-cover object-center"
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
