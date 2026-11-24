"use client";

import { useRef } from "react";
import { Navbar } from "@/components/layout";
import { MEDIA_HERO_CARDS } from "@/data/media";
import { gsap, useGSAP } from "@/lib/gsap";

export function MediaHero() {
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
            ".media-stagger",
            {
              y: 28,
              opacity: 0,
              duration: 0.8,
              stagger: 0.12,
            },
            0.15,
          )
        // .from(
        //   ".media-card-center",
        //   {
        //     y: 36,
        //     scale: 0.92,
        //     opacity: 0,
        //     duration: 0.85,
        //   },
        //   0.22,
        // )
        // .from(
        //   ".media-card-left",
        //   {
        //     x: 48,
        //     rotation: 12,
        //     opacity: 0,
        //     duration: 0.9,
        //     ease: "back.out(1.4)",
        //   },
        //   0.35,
        // )
        // .from(
        //   ".media-card-right",
        //   {
        //     x: -48,
        //     rotation: -12,
        //     opacity: 0,
        //     duration: 0.9,
        //     ease: "back.out(1.4)",
        //   },
        //   0.35,
        // );
      });
    },
    { scope: containerRef },
  );

  const [leftCard, centerCard, rightCard] = MEDIA_HERO_CARDS;

  return (
    <header
      ref={containerRef}
      className="relative overflow-hidden bg-black text-white"
    >
      <Navbar />

      <div className="relative z-10 mx-auto grid w-[min(1200px,calc(100%-32px))] grid-cols-1 items-center gap-12 pt-12 sm:w-[min(1200px,calc(100%-48px))] sm:gap-16 sm:pt-16 min-[1100px]:grid-cols-[1fr_540px] min-[1100px]:gap-[48px] min-[1100px]:pt-[84px]">
        <div className="flex flex-col items-start gap-5 sm:gap-6">
          <p className="media-stagger flex items-center gap-2 font-label text-[14px] font-medium leading-[1.2] text-white sm:text-[15px]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.2503 2.91667H7.24194L6.07528 1.75H1.75033C1.42816 1.75 1.16699 2.01117 1.16699 2.33333V11.6667C1.16699 11.9888 1.42816 12.25 1.75033 12.25H12.2503C12.5725 12.25 12.8337 11.9888 12.8337 11.6667V3.5C12.8337 3.17784 12.5725 2.91667 12.2503 2.91667ZM8.75079 7.38908C8.85801 7.46054 8.887 7.60544 8.81548 7.71266C8.79839 7.73827 8.7764 7.76026 8.75079 7.77735L5.90477 9.6747C5.79755 9.74622 5.65265 9.71723 5.58119 9.61001C5.55564 9.57168 5.54199 9.52665 5.54199 9.48057V5.68585C5.54199 5.55698 5.64647 5.45252 5.77533 5.45252C5.82141 5.45252 5.86644 5.46615 5.90477 5.4917L8.75079 7.38908Z" fill="white" />
            </svg>

            Media &amp; Gallery
          </p>

          <h1 className="media-stagger text-grad max-w-[540px] font-display text-[36px] font-bold leading-[40px] tracking-[-0.02em] sm:text-[50px] sm:leading-[54px] min-[1100px]:text-[58px] min-[1100px]:leading-[64px]">
            The faces and places
            <br />
            behind the mission
          </h1>

          <p className="media-stagger max-w-[420px] text-[15px] leading-[24px] text-brand-grey-light sm:text-[16px] sm:leading-[25px]">
            Visual moments from JemiCare Foundation&apos;s programmes and
            community activities.
          </p>
        </div>

        {/* Fanned 3-card polaroid stack */}
        <div className="relative mx-auto flex h-[240px] w-full my-14 max-w-[360px] items-center justify-center sm:h-[310px] sm:max-w-[480px] min-[1100px]:mx-0 min-[1100px]:h-[340px] min-[1100px]:max-w-none">
          <div className="media-card-left absolute z-10 aspect-square w-[46%] -translate-x-[52%] translate-y-[10%] -rotate-[12deg] overflow-hidden rounded-[20px] border-2 border-white/90 bg-neutral-900 shadow-[0_20px_50px_rgba(0,0,0,0.65)] transition-transform duration-300 hover:z-30 hover:-translate-y-1 sm:rounded-[26px]">
            <img
              src={leftCard.src}
              alt={leftCard.alt}
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="media-card-right absolute z-10 aspect-square w-[46%] translate-x-[52%] translate-y-[12%] rotate-[12deg] overflow-hidden rounded-[20px] border-2 border-white/90 bg-neutral-900 shadow-[0_20px_50px_rgba(0,0,0,0.65)] transition-transform duration-300 hover:z-30 hover:-translate-y-1 sm:rounded-[26px]">
            <img
              src={rightCard.src}
              alt={rightCard.alt}
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="media-card-center relative z-20 aspect-square w-[52%] -translate-y-[4%] overflow-hidden rounded-[20px] border-2 border-white/95 bg-neutral-900 shadow-[0_24px_60px_rgba(0,0,0,0.75)] transition-transform duration-300 hover:scale-[1.03] sm:rounded-[26px]">
            <img
              src={centerCard.src}
              alt={centerCard.alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
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
