"use client";

import { useRef } from "react";
import { Button, Eyebrow } from "@/components/ui";
import { PARTNER_LOGOS } from "@/data/partnerships";
import { gsap, useGSAP } from "@/lib/gsap";

export function PartnershipsHighlight() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".home-partners-reveal", {
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

        gsap.from(".home-partner-logo", {
          y: 18,
          opacity: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".home-partner-logos",
            start: "top 84%",
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
      id="partnerships"
      className="bg-brand-tint py-16 text-black sm:py-20 min-[1100px]:py-[96px]"
    >
      <div className="mx-auto w-[min(1200px,calc(100%-32px))] sm:w-[min(1200px,calc(100%-48px))]">
        <div className="flex flex-col items-start justify-between gap-6 min-[1100px]:flex-row min-[1100px]:items-end min-[1100px]:gap-12">
          <div className="flex max-w-[600px] flex-col items-start gap-4 sm:gap-5">
            <div className="home-partners-reveal">
              <Eyebrow>Partnerships</Eyebrow>
            </div>

            <h2 className="home-partners-reveal font-display text-[30px] font-bold leading-[36px] tracking-[-0.02em] text-black sm:text-[38px] sm:leading-[44px] min-[1100px]:text-[44px] min-[1100px]:leading-[48px]">
              Meaningful impact is built together.
            </h2>

            <p className="home-partners-reveal text-[15px] leading-[24px] text-brand-grey sm:text-[16px] sm:leading-[25px]">
              We partner with forward-thinking organisations, institutions, and
              individuals committed to expanding opportunities through
              education, technology, and livelihood development across Nigeria.
            </p>
          </div>

          <div className="home-partners-reveal w-full sm:w-auto">
            <Button
              href="/partnerships#partners"
              variant="black"
              className="w-full sm:w-auto"
            >
              Explore Partnerships{" "}
              <img
                className="h-[12px] w-[14px]"
                src="/assets/arrow-light.svg"
                alt=""
              />
            </Button>
          </div>
        </div>

        <div className="home-partner-logos mt-10 rounded-[20px] border border-black/[0.06] bg-white px-6 py-9 sm:mt-12 sm:px-10 sm:py-12">
          <ul className="grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-8 sm:grid-cols-3 md:grid-cols-4 md:gap-x-10 md:gap-y-10 min-[1100px]:grid-cols-6">
            {PARTNER_LOGOS.map((partner) => (
              <li
                key={partner.name}
                className="home-partner-logo flex h-[38px] w-full items-center justify-center"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-[30px] w-auto max-w-[132px] object-contain opacity-85 transition-opacity duration-200 hover:opacity-100 sm:max-h-[34px]"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
