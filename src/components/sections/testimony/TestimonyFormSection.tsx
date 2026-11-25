"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { TestimonyForm } from "./TestimonyForm";

export function TestimonyFormSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".testimony-sticky-item", {
          y: 24,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform",
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
      id="testimony-form"
      className="bg-black py-16 text-white sm:py-24 min-[1100px]:py-[112px]"
    >
      <div className="mx-auto grid w-[min(1200px,calc(100%-32px))] grid-cols-1 items-start gap-12 sm:w-[min(1200px,calc(100%-48px))] min-[1100px]:grid-cols-[minmax(0,410px)_minmax(0,1fr)] min-[1100px]:gap-[88px]">
        {/* Left column stays pinned while the form column scrolls up */}
        <div className="flex flex-col items-start gap-5 min-[1100px]:sticky min-[1100px]:top-[96px] min-[1100px]:self-start">
          <span className="testimony-sticky-item inline-flex items-center rounded-full bg-white px-3.5 py-1.5 font-label text-[13px] font-semibold leading-[14px] tracking-[-0.01em] text-black">
            Testimony Submission
          </span>

          <h2 className="testimony-sticky-item text-grad font-display text-[32px] font-bold leading-[38px] tracking-[-0.02em] sm:text-[40px] sm:leading-[46px] min-[1100px]:text-[44px] min-[1100px]:leading-[50px]">
            We&apos;d love to hear your story.
          </h2>

          <p className="testimony-sticky-item max-w-[385px] text-[15px] leading-[24px] text-brand-grey-light sm:text-[16px] sm:leading-[25px]">
            Please tell us a little about yourself and the support you received
            from Jemicare Foundation. You can write your testimony, upload
            pictures or share a video. There is no perfect way to tell your
            story; what matters is that it comes from you.
          </p>
        </div>

        {/* Right column scrolls naturally */}
        <div className="w-full min-w-0">
          <TestimonyForm />
        </div>
      </div>
    </section>
  );
}
