"use client";

import { useRef } from "react";
import { Navbar } from "@/components/layout";
import { Button } from "@/components/ui";
import { gsap, useGSAP } from "@/lib/gsap";

export function NominateHero() {
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
            ".nominate-stagger",
            {
              y: 28,
              opacity: 0,
              duration: 0.8,
              stagger: 0.1,
            },
            0.15,
          )
          .from(
            ".nominate-hero-card",
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

      <div className="relative z-10 mx-auto grid w-[min(1200px,calc(100%-32px))] grid-cols-1 items-center gap-10 pt-12 pb-16 sm:w-[min(1200px,calc(100%-48px))] sm:gap-12 sm:pt-16 sm:pb-24 min-[1100px]:grid-cols-[1fr_520px] min-[1100px]:gap-[64px] min-[1100px]:pt-[76px] min-[1100px]:pb-[96px]">
        <div className="flex flex-col items-start gap-5 sm:gap-6">
          <p className="nominate-stagger flex items-center gap-2 font-label text-[14px] font-medium leading-[1.2] text-white sm:text-[15px]">
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
              className="shrink-0"
            >
              <path d="M8 1.25a4.5 4.5 0 0 0-2.62 8.16c.42.3.7.76.78 1.27l.12.82h3.44l.12-.82c.08-.51.36-.97.78-1.27A4.5 4.5 0 0 0 8 1.25ZM6.25 12.75a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z" />
            </svg>
            Nominate a widow
          </p>

          <h1 className="nominate-stagger text-grad max-w-[520px] font-display text-[36px] font-bold leading-[40px] tracking-[-0.02em] sm:text-[48px] sm:leading-[52px] min-[1100px]:text-[56px] min-[1100px]:leading-[62px]">
            Do you know a
            <br />
            widow who deserves
            <br />a helping hand?
          </h1>

          <p className="nominate-stagger max-w-[465px] text-[15px] leading-[24px] text-brand-grey-light sm:text-[16px] sm:leading-[25px]">
            There are women around us facing difficult circumstances and
            struggling to provide for themselves and their families. If you know
            a widow who needs financial assistance, you can nominate her to
            receive support from JemiCare Foundation. Nominations are completely
            free, open year-round across Nigeria, and every submission will be
            carefully reviewed.
          </p>

          <div className="nominate-stagger mt-1 w-full sm:w-auto">
            <Button
              href="#nomination-form"
              variant="yellow"
              className="w-full sm:w-auto"
            >
              Nominate a Widow
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M8 3v10" />
                <path d="m4 9 4 4 4-4" />
              </svg>
            </Button>
          </div>

          <p className="nominate-stagger max-w-[360px] text-[13px] leading-[22px] text-white/60 sm:text-[14px]">
            Free submission{" "}
            <span className="mx-1.5 text-white/40">&bull;</span> Open year-round{" "}
            <span className="mx-1.5 text-white/40">&bull;</span> Nationwide
            support across Nigeria
          </p>
        </div>

        <div className="nominate-hero-card mx-auto aspect-square w-full max-w-[520px] overflow-hidden rounded-[24px] border border-white/[0.06] bg-[#111] sm:rounded-[28px] min-[1100px]:mx-0">
          <img
            src="/assets/nominate-hero.png"
            alt="Woman reflecting quietly in monochrome portrait"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </header>
  );
}
