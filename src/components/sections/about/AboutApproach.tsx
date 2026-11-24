"use client";

import { useRef } from "react";
import { Eyebrow } from "@/components/ui";
import { APPROACH_SUPPORT_ITEMS } from "@/data/about";
import { gsap, useGSAP } from "@/lib/gsap";

export function AboutApproach() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".approach-reveal", {
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

        gsap.from(".approach-art", {
          y: 32,
          scale: 0.96,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".approach-art",
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
      className="bg-white py-14 text-black sm:py-20 min-[1100px]:py-[96px]"
    >
      <div className="mx-auto grid w-[min(1200px,calc(100%-32px))] grid-cols-1 items-center gap-10 sm:w-[min(1200px,calc(100%-48px))] sm:gap-12 min-[1100px]:grid-cols-[544px_592px] min-[1100px]:gap-[64px]">
        <div className="flex flex-col items-start gap-6 sm:gap-7">
          <div className="approach-reveal">
            <Eyebrow>Our approach</Eyebrow>
          </div>

          <h2 className="approach-reveal max-w-[520px] font-display text-[30px] font-bold leading-[36px] tracking-[-0.02em] text-black sm:text-[38px] sm:leading-[44px] min-[1100px]:text-[44px] min-[1100px]:leading-[48px]">
            Education. Technology. Opportunity. That is where lasting change
            lives.
          </h2>

          <p className="approach-reveal text-[15px] leading-[24px] text-brand-grey sm:text-[16px]">
            At JemiCare Foundation, we believe lasting solutions to poverty
            exist at the intersection of education, technology, and opportunity.
            Our programmes equip individuals with the tools and knowledge to
            improve their livelihoods and create sustainable change within their
            communities.
          </p>

          <div className="approach-reveal flex flex-col gap-3">
            <h3 className="text-[15px] font-semibold leading-[22px] text-black sm:text-[16px]">
              What we support:
            </h3>
            <ul className="ml-[22px] list-disc space-y-1.5 text-[15px] leading-[24px] text-brand-grey sm:text-[16px]">
              {APPROACH_SUPPORT_ITEMS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="approach-art relative overflow-hidden min-[1100px]:h-[610px]">
          <img
            className="mx-auto h-auto w-full max-w-[460px] object-contain min-[1100px]:absolute min-[1100px]:left-[calc(50%+0.5px)] min-[1100px]:top-[16px] min-[1100px]:h-[559px] min-[1100px]:w-[521px] min-[1100px]:max-w-none min-[1100px]:-translate-x-1/2"
            src="/assets/involve-photo.png"
            alt="Hands stacked together in a circle"
          />
        </div>
      </div>
    </section>
  );
}
