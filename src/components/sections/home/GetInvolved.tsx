"use client";

import { useRef } from "react";
import { Button, Eyebrow } from "@/components/ui";
import { INVOLVE_WAYS } from "@/data/home";
import { gsap, useGSAP } from "@/lib/gsap";

export function GetInvolved() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".involve-reveal", {
          y: 30,
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

        gsap.from(".involve-art-item", {
          y: 32,
          scale: 0.96,
          opacity: 0,
          duration: 0.95,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".involve-art",
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
      id="involved"
      className="bg-brand-tint py-14 text-black sm:py-16 min-[1100px]:py-[80px]"
    >
      <div className="mx-auto grid w-[min(1200px,calc(100%-32px))] grid-cols-1 items-center gap-10 sm:w-[min(1200px,calc(100%-48px))] sm:gap-12 min-[1100px]:grid-cols-[544px_592px] min-[1100px]:gap-[64px]">
        <div className="flex flex-col items-start gap-6 sm:gap-7 min-[1100px]:gap-[34px]">
          <div className="involve-reveal">
            <Eyebrow>Get involved</Eyebrow>
          </div>
          <h2 className="involve-reveal max-w-[520px] font-display text-[30px] font-bold leading-[36px] tracking-[-0.02em] text-black sm:text-[38px] sm:leading-[44px] min-[1100px]:-mb-[10px] min-[1100px]:text-[44px] min-[1100px]:leading-[48px]">
            Change does not happen from the sidelines.
          </h2>
          <div className="involve-reveal text-[15px] leading-[24px] text-brand-grey sm:text-[16px]">
            <p>
              There are many ways to support JemiCare Foundation&apos;s work:
            </p>
            <ul className="ml-[24px] list-disc">
              {INVOLVE_WAYS.map((way) => (
                <li key={way}>{way}</li>
              ))}
            </ul>
            <p>
              Together, we create opportunities that help individuals and
              communities rise above poverty.
            </p>
          </div>
          <div className="involve-reveal w-full sm:w-auto">
            <Button href="#donate" variant="black" className="w-full sm:w-auto">
              Get involved{" "}
              <img
                className="h-[12px] w-[14px]"
                src="/assets/arrow-light.svg"
                alt=""
              />
            </Button>
          </div>
        </div>

        <div className="involve-art relative overflow-hidden min-[1100px]:h-[610px]">
          <img
            className="involve-art-item mx-auto h-auto w-full max-w-[460px] object-contain min-[1100px]:absolute min-[1100px]:left-[calc(50%+0.5px)] min-[1100px]:top-[16px] min-[1100px]:h-[559px] min-[1100px]:w-[521px] min-[1100px]:max-w-none min-[1100px]:-translate-x-1/2"
            src="/assets/involve-photo.png"
            alt="Hands stacked together in a circle"
          />
        </div>
      </div>
    </section>
  );
}
