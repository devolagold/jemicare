"use client";

import { useRef } from "react";
import { Navbar } from "@/components/layout";
import { Button } from "@/components/ui";
import { gsap, useGSAP } from "@/lib/gsap";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".hero-bg-photo", {
          scale: 1.08,
          duration: 1.4,
          ease: "power2.out",
        })
          .from(
            ".hero-nav",
            {
              y: -18,
              opacity: 0,
              duration: 0.7,
            },
            0.1,
          )
          .from(
            ".hero-stagger",
            {
              y: 36,
              opacity: 0,
              duration: 0.85,
              stagger: 0.14,
            },
            0.25,
          );

        gsap.to(".hero-bg-photo", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <header
      ref={containerRef}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-black min-[1100px]:block min-[1100px]:min-h-[1036px]"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <img
          className="hero-bg-photo absolute inset-x-0 -top-[10%] h-[110%] w-full object-cover object-center brightness-50 will-change-transform"
          src="/assets/hero-bg.png"
          alt=""
        />
      </div>

      <Navbar />

      <div className="relative z-[2] mx-auto flex w-[min(1200px,calc(100%-32px))] flex-col gap-6 pt-24 pb-14 sm:w-[min(1200px,calc(100%-48px))] sm:gap-8 sm:pt-36 sm:pb-20 min-[1100px]:absolute min-[1100px]:left-1/2 min-[1100px]:top-[546px] min-[1100px]:-translate-x-1/2 min-[1100px]:gap-[46px] min-[1100px]:pt-0 min-[1100px]:pb-0">
        <h1 className="hero-stagger text-grad max-w-[830px] font-display text-[36px] font-bold leading-[40px] tracking-[-0.02em] sm:text-[52px] sm:leading-[56px] min-[1100px]:text-[72px] min-[1100px]:leading-[68px]">
          Empowering lives through education, technology, and opportunity.
        </h1>
        <p className="hero-stagger max-w-[847px] text-[16px] leading-[24px] text-brand-grey-light sm:text-[18px] sm:leading-[26px] min-[1100px]:-mt-[10px] min-[1100px]:text-[20px] min-[1100px]:leading-[28px]">
          Across Nigeria, vulnerable communities face barriers to education,
          economic opportunity, and basic support. JemiCare Foundation works
          alongside them, providing the knowledge, skills, and resources to
          build resilient, self-sustaining futures.
        </p>
        <div className="hero-stagger flex flex-col gap-[10px] sm:flex-row sm:flex-wrap">
          <Button
            href="/projects"
            variant="yellow"
            className="w-full sm:w-auto"
          >
            Our programmes{" "}
            <img
              className="h-[12px] w-[14px]"
              src="/assets/arrow-dark.svg"
              alt=""
            />
          </Button>
          <Button
            href="#donate"
            variant="white"
            className="w-full sm:w-auto"
          >
            Support our work
          </Button>
        </div>
      </div>
    </header>
  );
}
