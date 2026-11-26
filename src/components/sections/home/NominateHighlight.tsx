"use client";

import { useRef } from "react";
import { Button, Eyebrow } from "@/components/ui";
import { gsap, useGSAP } from "@/lib/gsap";

export function NominateHighlight() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".home-nom-reveal", {
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

        gsap.from(".home-nom-photo", {
          y: 34,
          scale: 0.96,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
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
      id="nominate"
      className="bg-black py-16 text-white sm:py-20 min-[1100px]:py-[96px]"
    >
      <div className="mx-auto grid w-[min(1200px,calc(100%-32px))] grid-cols-1 items-center gap-10 sm:w-[min(1200px,calc(100%-48px))] sm:gap-12 min-[1100px]:grid-cols-[1fr_480px] min-[1100px]:gap-[72px]">
        <div className="flex flex-col items-start gap-5 sm:gap-6">
          <div className="home-nom-reveal">
            <Eyebrow light>Nominate a widow</Eyebrow>
          </div>

          <h2 className="home-nom-reveal text-grad max-w-[540px] font-display text-[30px] font-bold leading-[36px] tracking-[-0.02em] sm:text-[38px] sm:leading-[44px] min-[1100px]:text-[44px] min-[1100px]:leading-[48px]">
            Do you know a widow who deserves a helping hand?
          </h2>

          <p className="home-nom-reveal max-w-[500px] text-[15px] leading-[24px] text-brand-grey-light sm:text-[16px] sm:leading-[25px]">
            Many women around us are quietly navigating hardship while caring
            for their families. If you know a widow who needs financial
            assistance, nominate her to receive support from JemiCare
            Foundation. Every submission is free and carefully reviewed.
          </p>

          <p className="home-nom-reveal text-[13px] leading-[20px] text-white/55 sm:text-[14px]">
            Free submission{" "}
            <span className="mx-1.5 text-white/35">&bull;</span> Open year-round{" "}
            <span className="mx-1.5 text-white/35">&bull;</span> Nationwide
            across Nigeria
          </p>

          <div className="home-nom-reveal mt-1 w-full sm:w-auto">
            <Button
              href="/nominate-a-widow#how-it-works"
              variant="yellow"
              className="w-full sm:w-auto"
            >
              Nominate a Widow{" "}
              <img
                className="h-[12px] w-[14px]"
                src="/assets/arrow-dark.svg"
                alt=""
              />
            </Button>
          </div>
        </div>

        <div className="home-nom-photo mx-auto aspect-square w-full max-w-[480px] overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#111] min-[1100px]:mx-0">
          <img
            src="/assets/nominate-hero.png"
            alt="Monochrome portrait representing women supported through JemiCare nominations"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
