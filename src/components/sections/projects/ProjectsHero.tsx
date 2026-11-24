"use client";

import { useRef } from "react";
import { Navbar } from "@/components/layout";
import { gsap, useGSAP } from "@/lib/gsap";

export function ProjectsHero() {
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
            ".projects-stagger",
            {
              y: 30,
              opacity: 0,
              duration: 0.8,
              stagger: 0.12,
            },
            0.15,
          )
          .from(
            ".projects-photo",
            {
              y: 36,
              scale: 0.96,
              opacity: 0,
              duration: 0.95,
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

      <div className="relative z-10 mx-auto grid w-[min(1200px,calc(100%-32px))] grid-cols-1 items-center gap-10 pt-12 sm:w-[min(1200px,calc(100%-48px))] sm:gap-12 sm:pt-16 min-[1100px]:grid-cols-[1fr_540px] min-[1100px]:gap-[64px] min-[1100px]:pt-[72px]">
        <div className="flex flex-col items-start gap-5 sm:gap-6">
          <p className="projects-stagger flex items-center gap-2 font-label text-[14px] font-medium leading-[1.2] text-white sm:text-[15px]">
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
              className="shrink-0"
            >
              <path d="M1.5 3.5A1.5 1.5 0 0 1 3 2h2.764a1.5 1.5 0 0 1 1.06.44l.94.94a.5.5 0 0 0 .354.146H13A1.5 1.5 0 0 1 14.5 5v7.5A1.5 1.5 0 0 1 13 14H3a1.5 1.5 0 0 1-1.5-1.5v-9Z" />
            </svg>
            Our Projects
          </p>

          <h1 className="projects-stagger text-grad max-w-[520px] font-display text-[36px] font-bold leading-[40px] tracking-[-0.02em] sm:text-[50px] sm:leading-[54px] min-[1100px]:text-[60px] min-[1100px]:leading-[64px]">
            Projects built
            <br />
            for lasting change.
          </h1>

          <p className="projects-stagger max-w-[400px] text-[15px] leading-[24px] text-brand-grey-light sm:text-[16px] sm:leading-[25px]">
            Each initiative is designed to move people from crisis to
            confidence, from short-term relief to long-term independence.
          </p>
        </div>

        <div className="projects-photo mx-auto aspect-square w-full max-w-[540px] overflow-hidden rounded-[24px] bg-white/5 sm:rounded-[32px] min-[1100px]:mx-0">
          <img
            src="/assets/projects-hero.jpg"
            alt="Team members collaborating and planning community projects"
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
