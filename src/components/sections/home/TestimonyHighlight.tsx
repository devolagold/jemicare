"use client";

import { useRef } from "react";
import { Button, Eyebrow } from "@/components/ui";
import { gsap, useGSAP } from "@/lib/gsap";

export function TestimonyHighlight() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".home-testimony-visual", {
          y: 30,
          scale: 0.96,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        });

        gsap.from(".home-testimony-reveal", {
          y: 26,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
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
      id="testimony"
      className="bg-brand-tint py-16 text-black sm:py-20 min-[1100px]:py-[96px]"
    >
      <div className="mx-auto grid w-[min(1200px,calc(100%-32px))] grid-cols-1 items-center gap-10 sm:w-[min(1200px,calc(100%-48px))] sm:gap-12 min-[1100px]:grid-cols-[480px_1fr] min-[1100px]:gap-[72px]">
        <div className="home-testimony-visual flex items-center justify-center min-[1100px]:justify-start">
          <img
            src="/assets/testimony-story.png"
            alt="Smiling women and children supported by JemiCare Foundation"
            className="w-full max-w-[460px] object-contain"
          />
        </div>

        <div className="flex flex-col items-start gap-5 sm:gap-6">
          <div className="home-testimony-reveal">
            <Eyebrow>Share your testimony</Eyebrow>
          </div>

          <h2 className="home-testimony-reveal max-w-[540px] font-display text-[30px] font-bold leading-[36px] tracking-[-0.02em] text-black sm:text-[38px] sm:leading-[44px] min-[1100px]:text-[44px] min-[1100px]:leading-[48px]">
            Your story could give someone else a reason to believe in a better
            tomorrow.
          </h2>

          <p className="home-testimony-reveal max-w-[500px] text-[15px] leading-[24px] text-brand-grey sm:text-[16px] sm:leading-[25px]">
            Have you received support from JemiCare Foundation? Whether through
            words, pictures, or videos, sharing your experience helps celebrate
            real impact, encourage others facing difficult times, and inspire
            more people to give.
          </p>

          <div className="home-testimony-reveal mt-1 w-full sm:w-auto">
            <Button
              href="/share-your-testimony#why-your-story-matters"
              variant="black"
              className="w-full sm:w-auto"
            >
              Share Your Testimony{" "}
              <img
                className="h-[12px] w-[14px]"
                src="/assets/arrow-light.svg"
                alt=""
              />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
