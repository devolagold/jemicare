"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { FaqAccordion } from "./FaqAccordion";

export function FaqSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".faq-intro-item", {
          y: 28,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 82%",
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
      id="contact"
      className="bg-white py-14 text-black sm:py-16 min-[1100px]:py-[80px]"
    >
      <div className="mx-auto flex w-[min(1200px,calc(100%-32px))] flex-col items-start gap-8 sm:w-[min(1200px,calc(100%-48px))] sm:gap-10 min-[1100px]:flex-row min-[1100px]:gap-[124px]">
        <div className="flex w-full flex-col gap-4 sm:gap-[24px] min-[1100px]:w-[348px] min-[1100px]:flex-none">
          <h2 className="faq-intro-item font-display text-[30px] font-bold leading-[36px] tracking-[-0.02em] text-black sm:text-[38px] sm:leading-[44px] min-[1100px]:text-[44px] min-[1100px]:leading-[48px]">
            Got questions? We have answers.
          </h2>
          <p className="faq-intro-item text-[15px] leading-[24px] text-brand-grey sm:text-[16px]">
            If you need anything else, reach out at{" "}
            <a
              className="break-words font-semibold text-black underline"
              href="mailto:help@jemicarefhd.com"
            >
              help@jemicarefoundation.org
            </a>{" "}
            We would love to hear from you.
          </p>
        </div>

        <FaqAccordion />
      </div>
    </section>
  );
}
