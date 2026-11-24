"use client";

import { useRef } from "react";
import { Button, Eyebrow } from "@/components/ui";
import { TRUST_PILLARS } from "@/data/home";
import { gsap, useGSAP } from "@/lib/gsap";
import { FundAllocationChart } from "./FundAllocationChart";

export function Transparency() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".trust-head", {
          y: 28,
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

        gsap.from(".trust-card", {
          y: 34,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".trust-grid",
            start: "top 82%",
            once: true,
          },
        });

        gsap.from(".fund-chart", {
          scale: 0.92,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".fund-block",
            start: "top 82%",
            once: true,
          },
        });

        gsap.from(".fund-reveal", {
          y: 28,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".fund-block",
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
      className="bg-white py-14 text-black sm:py-16 min-[1100px]:py-[80px]"
    >
      <div className="mx-auto flex w-[min(1200px,calc(100%-32px))] flex-col items-center text-center sm:w-[min(1200px,calc(100%-48px))]">
        <div className="trust-head">
          <Eyebrow>Transparency &amp; Accountability</Eyebrow>
        </div>
        <h2 className="trust-head mt-5 font-display text-[30px] font-bold leading-[36px] tracking-[-0.02em] text-black sm:mt-7 sm:text-[38px] sm:leading-[44px] min-[1100px]:mt-[34px] min-[1100px]:text-[44px] min-[1100px]:leading-[48px]">
          Trust is not asked for. It is earned.
        </h2>

        <div className="trust-grid mt-9 grid w-full grid-cols-1 gap-8 text-left sm:mt-11 md:grid-cols-3 md:gap-8 min-[1100px]:mt-[44px] min-[1100px]:gap-[50px]">
          {TRUST_PILLARS.map((pillar) => (
            <article
              key={pillar.title}
              className="trust-card flex flex-col gap-3 sm:gap-[14px]"
            >
              <span className="mb-2 grid h-[52px] w-[52px] place-items-center rounded-full bg-black/5 sm:mb-4 sm:h-[56px] sm:w-[56px] min-[1100px]:mb-[20px]">
                <img className="h-[24px] w-[24px]" src={pillar.icon} alt="" />
              </span>
              <h3 className="font-display text-[20px] font-semibold leading-[26px] tracking-[-0.02em] text-black sm:text-[22px] min-[1100px]:text-[24px] min-[1100px]:leading-[28px]">
                {pillar.title}
              </h3>
              <p className="text-[15px] leading-[24px] text-brand-grey sm:text-[16px]">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>

        <div className="fund-block mt-12 flex w-full flex-col items-center gap-8 text-left sm:mt-14 sm:gap-10 min-[1100px]:mt-[64px] min-[1100px]:flex-row min-[1100px]:gap-[44px]">
          <FundAllocationChart />
          <div className="flex w-full flex-1 flex-col items-start gap-[14px]">
            <h3 className="fund-reveal font-display text-[22px] font-semibold leading-[28px] tracking-[-0.02em] text-black sm:text-[24px]">
              Fund Allocation Breakdown
            </h3>
            <p className="fund-reveal text-[15px] leading-[24px] text-brand-grey sm:text-[16px]">
              All funds are directed toward programmes supporting vulnerable
              individuals and communities. We maintain clear internal processes
              to ensure every naira is used effectively.
            </p>
            <div className="fund-reveal mt-4 w-full sm:mt-6 sm:w-auto min-[1100px]:mt-[30px]">
              <Button href="#" variant="black" className="w-full sm:w-auto">
                Download annual report{" "}
                <img
                  className="h-[16px] w-[16px]"
                  src="/assets/ic-download.svg"
                  alt=""
                  width={16}
                  height={16}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
