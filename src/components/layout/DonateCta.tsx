"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui";

export function DonateCta() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".cta-card", {
          y: 40,
          scale: 0.97,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 84%",
            once: true,
          },
        });

        gsap.from(".cta-reveal", {
          y: 24,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 84%",
            once: true,
          },
        });

        gsap.from(".cta-photo", {
          y: 36,
          opacity: 0,
          duration: 0.95,
          stagger: 0.14,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 84%",
            once: true,
          },
        });

        gsap.to(".cta-lines", {
          rotation: 8,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="donate"
      className="bg-[linear-gradient(#fff_50%,#000_50%)] py-8 sm:py-12 min-[1100px]:h-[508px] min-[1100px]:pt-[89px] min-[1100px]:pb-0"
    >
      <div className="cta-card relative mx-auto flex w-[min(1200px,calc(100%-32px))] flex-col overflow-hidden rounded-[18px] bg-brand-yellow text-black sm:w-[min(1200px,calc(100%-48px))] min-[1100px]:block min-[1100px]:h-[420px]">
        <img
          className="cta-lines pointer-events-none absolute left-1/2 top-1/2 h-[160%] w-[220%] max-w-none -translate-x-1/2 -translate-y-1/2 rotate-[50deg] object-cover min-[1100px]:h-full min-[1100px]:w-full"
          src="/assets/cta-lines.svg"
          alt=""
        />
        <div className="relative z-10 flex w-full flex-col items-center gap-5 px-6 pt-12 pb-6 text-center sm:gap-[24px] sm:px-10 sm:pt-14 min-[1100px]:h-full min-[1100px]:w-[600px] min-[1100px]:items-start min-[1100px]:justify-center min-[1100px]:pt-[112px] min-[1100px]:pr-0 min-[1100px]:pb-0 min-[1100px]:pl-[120px] min-[1100px]:text-left">
          <h2 className="cta-reveal max-w-[300px] font-display text-[32px] font-bold leading-[36px] tracking-[-0.02em] sm:max-w-[340px] sm:text-[36px] sm:leading-[40px] min-[1100px]:max-w-[330px] min-[1100px]:text-[38px] min-[1100px]:leading-[42px]">
            Your kindness can change a life today
          </h2>
          <p className="cta-reveal max-w-[340px] text-[15px] leading-[22px] text-[#2a2a2a] sm:max-w-[434px] sm:text-[16px] sm:leading-[24px]">
            With your support, we can reach more widows in need and give them a
            chance at a better future.
          </p>
          <div className="cta-reveal mt-1">
            <Button href="/donate" variant="black">
              Make a donation{" "}
              <img
                className="h-[12px] w-[14px]"
                src="/assets/arrow-light.svg"
                alt=""
              />
            </Button>
          </div>
        </div>

        {/* Bottom cutout portraits on mobile/tablet; side-positioned on desktop */}
        <div className="relative mx-auto mt-2 aspect-[390/265] w-full max-w-[540px] min-[1100px]:static min-[1100px]:m-0 min-[1100px]:aspect-auto min-[1100px]:max-w-none">
          <img
            className="cta-photo pointer-events-none absolute -left-[32%] bottom-0 h-auto w-[122%] max-w-none object-contain min-[1100px]:bottom-auto min-[1100px]:left-[519px] min-[1100px]:top-[73px] min-[1100px]:h-[385px] min-[1100px]:w-[577px] min-[1100px]:object-cover"
            src="/assets/cta-1.png"
            alt=""
          />
          <img
            className="cta-photo pointer-events-none absolute -left-[16%] bottom-0 h-auto w-[124%] max-w-none object-contain min-[1100px]:bottom-auto min-[1100px]:left-[597px] min-[1100px]:top-[63px] min-[1100px]:h-[423px] min-[1100px]:w-[635px] min-[1100px]:object-cover"
            src="/assets/cta-2.png"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
