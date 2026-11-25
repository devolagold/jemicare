"use client";

import { useRef } from "react";
import { Navbar } from "@/components/layout";
import { Button } from "@/components/ui";
import { gsap, useGSAP } from "@/lib/gsap";

export function PartnershipsHero() {
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
            ".partners-stagger",
            {
              y: 28,
              opacity: 0,
              duration: 0.8,
              stagger: 0.12,
            },
            0.15,
          )
          .from(
            ".partners-hero-card",
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

      <div className="relative z-10 mx-auto grid w-[min(1200px,calc(100%-32px))] grid-cols-1 items-center gap-10 pt-12 pb-16 sm:w-[min(1200px,calc(100%-48px))] sm:gap-12 sm:pt-16 sm:pb-24 min-[1100px]:grid-cols-[1fr_540px] min-[1100px]:gap-[64px] min-[1100px]:pt-[76px] min-[1100px]:pb-[96px]">
        <div className="flex flex-col items-start gap-5 sm:gap-6">
          <p className="partners-stagger flex items-center gap-2 font-label text-[14px] font-medium leading-[1.2] text-white sm:text-[15px]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.45768 4.08333C1.45768 5.372 2.50235 6.41667 3.79102 6.41667C5.07968 6.41667 6.12435 5.372 6.12435 4.08333C6.12435 2.79467 5.07968 1.75 3.79102 1.75C2.50235 1.75 1.45768 2.79467 1.45768 4.08333ZM1.16602 12.25V9.625C1.16602 8.17524 2.34127 7 3.79102 7C5.24076 7 6.41602 8.17524 6.41602 9.625V12.25H1.16602ZM10.2077 6.41667C8.91904 6.41667 7.87435 5.372 7.87435 4.08333C7.87435 2.79467 8.91904 1.75 10.2077 1.75C11.4963 1.75 12.541 2.79467 12.541 4.08333C12.541 5.372 11.4963 6.41667 10.2077 6.41667ZM7.58268 12.25V9.625C7.58268 8.17524 8.75792 7 10.2077 7C11.6574 7 12.8327 8.17524 12.8327 9.625V12.25H7.58268Z" fill="white" />
            </svg>

            Partnerships
          </p>

          <h1 className="partners-stagger text-grad max-w-[520px] font-display text-[36px] font-bold leading-[40px] tracking-[-0.02em] sm:text-[50px] sm:leading-[54px] min-[1100px]:text-[58px] min-[1100px]:leading-[64px]">
            Meaningful impact
            <br />
            is built together.
          </h1>

          <div className="partners-stagger max-w-[460px] space-y-4 text-[15px] leading-[24px] text-brand-grey-light sm:text-[16px] sm:leading-[25px]">
            <p>
              Sustainable impact is best achieved through collaboration. We
              welcome partnerships with organisations, institutions, and
              individuals committed to expanding opportunities through
              education, technology, and livelihood development.
            </p>
            <p>
              If your organisation shares our vision, we would love to explore
              what we can build together.
            </p>
          </div>

          <div className="partners-stagger mt-2 w-full sm:w-auto">
            <Button
              href="/contact"
              variant="yellow"
              className="w-full sm:w-auto"
            >
              Become a Partner{" "}
              <img
                className="h-[12px] w-[14px]"
                src="/assets/arrow-dark.svg"
                alt=""
              />
            </Button>
          </div>
        </div>

        <div className="partners-hero-card mx-auto aspect-square w-full max-w-[540px] overflow-hidden rounded-[24px] border border-white/[0.06] bg-[#0a0a0c] sm:rounded-[28px] min-[1100px]:mx-0">
          <img
            src="/assets/partnerships-hero.png"
            alt="Glowing polygonal handshake representing partnership and collaboration"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </header>
  );
}
