"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function WhyYourStoryMatters() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".story-matters-visual", {
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

        gsap.from(".story-matters-item", {
          y: 26,
          opacity: 0,
          duration: 0.75,
          stagger: 0.12,
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
      className="bg-white py-16 text-black sm:py-20 min-[1100px]:py-[96px]"
    >
      <div className="mx-auto grid w-[min(1200px,calc(100%-32px))] grid-cols-1 items-center gap-10 sm:w-[min(1200px,calc(100%-48px))] sm:gap-12 min-[1100px]:grid-cols-[1fr_1fr] min-[1100px]:gap-[72px]">
        <div className="story-matters-visual flex items-center justify-center min-[1100px]:justify-start">
          <img
            src="/assets/testimony-story.png"
            alt="Group of smiling women and children from the JemiCare Foundation community"
            className="w-full max-w-[480px] object-contain"
          />
        </div>

        <div className="flex flex-col items-start gap-4 sm:gap-5">
          <p className="story-matters-item font-label text-[13px] font-semibold leading-[1.2] text-black sm:text-[14px]">
            Why your story matters
          </p>

          <h2 className="story-matters-item font-display text-[30px] font-bold leading-[36px] tracking-[-0.02em] text-black sm:text-[38px] sm:leading-[44px] min-[1100px]:text-[44px] min-[1100px]:leading-[48px]">
            By sharing your
            <br />
            experience, you help
            <br />
            others see the difference
            <br />
            that kindness can make.
          </h2>

          <div className="story-matters-item mt-1 max-w-[465px] space-y-5 text-[15px] leading-[24px] text-brand-grey sm:text-[16px] sm:leading-[25px]">
            <p>
              Every person we reach has a story worth telling. Your testimony
              gives others a glimpse into your experience and helps us show the
              impact of the support we provide.
            </p>
            <p>
              Your story could encourage someone going through a difficult time,
              inspire a donor to contribute, or motivate another person to help
              someone in need.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
