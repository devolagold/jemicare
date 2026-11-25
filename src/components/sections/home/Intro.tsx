"use client";

import { useRef } from "react";
import { Button } from "@/components/ui";
import { gsap, useGSAP } from "@/lib/gsap";

export function Intro() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".intro-reveal", {
          y: 36,
          opacity: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".intro-top",
            start: "top 82%",
            once: true,
          },
        });

        gsap.from(".intro-tile", {
          y: 44,
          scale: 0.96,
          opacity: 0,
          duration: 0.9,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".intro-gallery",
            start: "top 82%",
            once: true,
          },
        });

        gsap.from(".intro-caption", {
          y: 18,
          opacity: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".intro-captions",
            start: "top 90%",
            once: true,
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} id="about" className="bg-lines">
      <img
        src="/assets/line art 2.svg"
        alt="line_art"
        className="w-full py-10 sm:py-16 min-[1100px]:py-20"
      />

      <div className="relative mx-auto w-[min(1200px,calc(100%-32px))] sm:w-[min(1200px,calc(100%-48px))]">
        <div className="intro-top flex flex-col justify-between gap-6 sm:gap-8 min-[1100px]:flex-row min-[1100px]:gap-[48px]">
          <h2 className="intro-reveal text-grad w-full font-display text-[30px] font-bold leading-[36px] tracking-[-0.02em] sm:text-[38px] sm:leading-[44px] min-[1100px]:w-[564px] min-[1100px]:flex-none min-[1100px]:text-[44px] min-[1100px]:leading-[48px]">
            When one person is equipped to rise, a whole community moves
            forward.
          </h2>
          <div className="flex w-full flex-col items-start gap-5 sm:gap-[24px] min-[1100px]:w-[529px]">
            <p className="intro-reveal text-[15px] leading-[24px] text-white/85 sm:text-[16px]">
              Behind every person we serve is a family looking for a way
              forward. A mother searching for a path to provide. A young person
              with ambition but no access. A community with untapped potential.
              Our education, technology, and livelihood programmes turn that
              potential into progress.
            </p>
            <div className="intro-reveal w-full sm:w-auto">
              <Button href="/donate" variant="white" className="w-full sm:w-auto">
                Support our work{" "}
                <img
                  className="h-[12px] w-[14px]"
                  src="/assets/arrow-dark.svg"
                  alt=""
                />
              </Button>
            </div>
          </div>
        </div>

        <div className="intro-gallery mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:aspect-[1200/586] sm:grid-cols-[737fr_439fr] sm:grid-rows-2 sm:gap-5 min-[1100px]:mt-[80px] min-[1100px]:gap-[24px]">
          <div className="intro-tile relative aspect-[737/586] overflow-hidden rounded-[12px] bg-black sm:row-span-2 sm:aspect-auto">
            <img
              className="h-full w-full object-cover object-center"
              src="/assets/intro-1.png"
              alt="Smiling woman in patterned wrap"
            />
          </div>
          <div className="intro-tile relative aspect-[439/281] overflow-hidden rounded-[12px] bg-black sm:aspect-auto">
            <img
              className="h-full w-full object-cover object-center"
              src="/assets/intro-2.png"
              alt="Woman in blue patterned dress waving"
            />
          </div>
          <div className="intro-tile relative aspect-[439/281] overflow-hidden rounded-[12px] bg-black sm:aspect-auto">
            <img
              className="h-full w-full object-cover object-center"
              src="/assets/intro-3.png"
              alt="Smiling woman in hijab"
            />
          </div>
        </div>

        <div className="intro-captions mt-5 flex flex-wrap justify-between gap-2 font-notch text-[15px] font-medium leading-[1.1] opacity-85 sm:text-[18px] min-[1100px]:mt-[20px] min-[1100px]:text-[20px] min-[1100px]:leading-[0.9]">
          <span className="intro-caption">Real Lives.</span>
          <span className="intro-caption">Real Stories.</span>
          <span className="intro-caption">Real Hope.</span>
        </div>
      </div>

      <img
        src="/assets/line art.svg"
        alt="line_art"
        className="w-full pt-10 sm:pt-16 min-[1100px]:pt-20"
      />
    </section>
  );
}
