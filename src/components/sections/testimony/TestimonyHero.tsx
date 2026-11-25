"use client";

import { useRef } from "react";
import { Navbar } from "@/components/layout";
import { Button } from "@/components/ui";
import { gsap, useGSAP } from "@/lib/gsap";

export function TestimonyHero() {
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
            ".testimony-stagger",
            {
              y: 28,
              opacity: 0,
              duration: 0.8,
              stagger: 0.1,
            },
            0.15,
          )
          .from(
            ".testimony-hero-card",
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
          <p className="testimony-stagger flex items-center gap-2 font-label text-[14px] font-medium leading-[1.2] text-white sm:text-[15px]">
            <svg
              width="15"
              height="15"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
              className="shrink-0"
            >
              <path d="M12.7 2.6a.75.75 0 0 1 1.05.13 8.5 8.5 0 0 1 0 10.54.75.75 0 1 1-1.18-.92 7 7 0 0 0 0-8.7.75.75 0 0 1 .13-1.05ZM10.4 4.7a.75.75 0 0 1 1.06.1 5.25 5.25 0 0 1 0 6.4.75.75 0 0 1-1.16-.95 3.75 3.75 0 0 0 0-4.5.75.75 0 0 1 .1-1.05ZM8.5 2.5a.75.75 0 0 0-1.22-.58L4.1 4.5H2.25A1.25 1.25 0 0 0 1 5.75v4.5c0 .69.56 1.25 1.25 1.25H4.1l3.18 2.58A.75.75 0 0 0 8.5 13.5v-11Z" />
            </svg>
            Share your testimony
          </p>

          <h1 className="testimony-stagger text-grad max-w-[520px] font-display text-[34px] font-bold leading-[38px] tracking-[-0.02em] sm:text-[46px] sm:leading-[50px] min-[1100px]:text-[54px] min-[1100px]:leading-[58px]">
            Your story could
            <br />
            give someone else a
            <br />
            reason to believe in a
            <br />
            better tomorrow.
          </h1>

          <p className="testimony-stagger max-w-[465px] text-[15px] leading-[24px] text-brand-grey-light sm:text-[16px] sm:leading-[25px]">
            Have you received support from Jemicare Foundation? We would love to
            hear about your experience. Whether through words, pictures or
            videos, your story helps us celebrate the lives touched by our work
            and inspire others to be part of the change.
          </p>

          <div className="testimony-stagger mt-1 w-full sm:w-auto">
            <Button
              href="#testimony-form"
              variant="yellow"
              className="w-full sm:w-auto"
            >
              Share your Story
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

          <p className="testimony-stagger text-[13px] italic leading-[20px] text-white/60 sm:text-[14px]">
            Your experience matters, and we&apos;d be honoured to hear it.
          </p>
        </div>

        <div className="testimony-hero-card mx-auto aspect-square w-full max-w-[520px] overflow-hidden rounded-[24px] border border-white/[0.06] bg-[#111] sm:rounded-[28px] min-[1100px]:mx-0">
          <img
            src="/assets/testimony-hero.png"
            alt="Smiling beneficiary wearing a white headwrap outdoors"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </header>
  );
}
