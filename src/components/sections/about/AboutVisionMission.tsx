"use client";

import { useRef } from "react";
import { Eyebrow } from "@/components/ui";
import { gsap, useGSAP } from "@/lib/gsap";

const SCRUB_WORDS =
  "Through partnerships, community outreach, and empowerment programs, we help individuals regain confidence, stability, and independence.".split(
    " ",
  );

export function AboutVisionMission() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".vm-row", {
          y: 28,
          opacity: 0,
          duration: 0.8,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        });

        gsap.from(".vm-photo", {
          y: 30,
          scale: 0.95,
          opacity: 0,
          duration: 0.85,
          stagger: 0.16,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".vm-photos",
            start: "top 84%",
            once: true,
          },
        });

        // Progressive scroll-scrubbed text highlight for the second "Who we are" paragraph
        gsap.fromTo(
          ".vm-scrub-word",
          { color: "#d4d4d8" },
          {
            color: "#000000",
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: ".vm-scrub-paragraph",
              start: "top 82%",
              end: "bottom 55%",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-x-clip bg-white py-16 text-black sm:py-24 min-[1100px]:py-[108px]"
    >
      {/* Top-left black geometric pixel accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-10 hidden select-none min-[1100px]:grid min-[1100px]:grid-cols-2"
      >
        <span className="h-[34px] w-[34px] bg-black" />
        <span className="h-[34px] w-[34px]" />
        <span className="h-[34px] w-[34px] bg-black" />
        <span className="h-[34px] w-[34px] bg-black" />
        <span className="h-[34px] w-[34px] bg-black" />
        <span className="h-[34px] w-[34px]" />
      </div>

      {/* Bottom-right brand-yellow geometric pixel accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-10 hidden select-none min-[1100px]:grid min-[1100px]:grid-cols-2"
      >
        <span className="h-[34px] w-[34px]" />
        <span className="h-[34px] w-[34px] bg-brand-yellow" />
        <span className="h-[34px] w-[34px] bg-brand-yellow" />
        <span className="h-[34px] w-[34px]" />
        <span className="h-[34px] w-[34px]" />
        <span className="h-[34px] w-[34px] bg-brand-yellow" />
      </div>

      <div className="mx-auto grid w-[min(1200px,calc(100%-32px))] grid-cols-1 gap-12 sm:w-[min(1200px,calc(100%-48px))] min-[1100px]:grid-cols-[1fr_210px] min-[1100px]:gap-[64px]">
        {/* Left + Center stacked rows */}
        <div className="flex flex-col gap-12 sm:gap-16 min-[1100px]:gap-[88px]">
          {/* Our Vision */}
          <div className="vm-row grid grid-cols-1 items-start gap-4 sm:grid-cols-[180px_1fr] sm:gap-8 min-[1100px]:grid-cols-[200px_1fr]">
            <div className="pt-1">
              <Eyebrow>Our vision</Eyebrow>
            </div>
            <p className="max-w-[580px] font-display text-[22px] font-medium leading-[30px] tracking-[-0.02em] text-black sm:text-[26px] sm:leading-[34px] min-[1100px]:text-[28px] min-[1100px]:leading-[36px]">
              A society where individuals and communities overcome poverty
              through access to education, technology, and sustainable
              opportunities.
            </p>
          </div>

          {/* Our Mission */}
          <div className="vm-row grid grid-cols-1 items-start gap-4 sm:grid-cols-[180px_1fr] sm:gap-8 min-[1100px]:grid-cols-[200px_1fr]">
            <div className="pt-1">
              <Eyebrow>Our mission</Eyebrow>
            </div>
            <p className="max-w-[580px] font-display text-[22px] font-medium leading-[30px] tracking-[-0.02em] text-black sm:text-[26px] sm:leading-[34px] min-[1100px]:text-[28px] min-[1100px]:leading-[36px]">
              To alleviate poverty by empowering vulnerable communities through
              education, technology, and sustainable livelihood initiatives.
            </p>
          </div>

          {/* Who We Are */}
          <div className="vm-row grid grid-cols-1 items-start gap-4 sm:grid-cols-[180px_1fr] sm:gap-8 min-[1100px]:grid-cols-[200px_1fr]">
            <div className="pt-1">
              <Eyebrow>Who we are</Eyebrow>
            </div>
            <div className="flex max-w-[580px] flex-col gap-6 sm:gap-8">
              <p className="font-display text-[22px] font-medium leading-[30px] tracking-[-0.02em] text-black sm:text-[26px] sm:leading-[34px] min-[1100px]:text-[28px] min-[1100px]:leading-[36px]">
                Jemicare Foundation is a nonprofit organization dedicated to
                improving the lives of widows, struggling families, and
                underserved communities.
              </p>
              <p className="vm-scrub-paragraph font-display text-[22px] font-medium leading-[30px] tracking-[-0.02em] text-black sm:text-[26px] sm:leading-[34px] min-[1100px]:text-[28px] min-[1100px]:leading-[36px]">
                {SCRUB_WORDS.map((word, index) => (
                  <span key={`${word}-${index}`} className="vm-scrub-word">
                    {word}
                    {index < SCRUB_WORDS.length - 1 ? " " : ""}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>

        {/* Right Community Photos */}
        <div className="vm-photos grid grid-cols-2 gap-4 sm:max-w-[440px] min-[1100px]:flex min-[1100px]:max-w-none min-[1100px]:flex-col min-[1100px]:justify-center min-[1100px]:gap-[48px]">
          <div className="vm-photo aspect-square overflow-hidden rounded-[14px] bg-black/5">
            <img
              src="/assets/intro-2.png"
              alt="Smiling women from the JemiCare community"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="vm-photo aspect-square overflow-hidden rounded-[14px] bg-black/5">
            <img
              src="/assets/intro-3.png"
              alt="Community members celebrating together"
              className="h-full w-full object-cover object-center grayscale"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
