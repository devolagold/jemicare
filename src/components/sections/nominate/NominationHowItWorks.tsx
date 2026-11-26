"use client";

import { useRef } from "react";
import { NOMINATION_STEPS } from "@/data/nominate";
import { gsap, useGSAP } from "@/lib/gsap";
import type { NominationStep } from "@/types";

function StepIcon({ id }: { id: NominationStep["id"] }) {
  switch (id) {
    case "submit":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 20h9" />
          <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
          <path d="M19 13v4" />
          <path d="M17 15h4" />
        </svg>
      );
    case "evidence":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M12 12v6" />
          <path d="m9.5 14.5 2.5-2.5 2.5 2.5" />
        </svg>
      );
    case "review":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
          <path d="M15.5 5.5v3" />
          <path d="M14 7h3" />
        </svg>
      );
    case "support":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
          <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
          <path d="m2 16 6 6" />
          <circle cx="16" cy="6" r="2" />
          <circle cx="10.5" cy="4.5" r="1.5" />
        </svg>
      );
  }
}

export function NominationHowItWorks() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".how-header-item", {
          y: 26,
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

        gsap.from(".how-visual", {
          y: 30,
          scale: 0.96,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".how-grid",
            start: "top 82%",
            once: true,
          },
        });

        gsap.from(".how-step-item", {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".how-grid",
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
      id="how-it-works"
      className="bg-white py-16 text-black sm:py-20 min-[1100px]:py-[96px]"
    >
      <div className="mx-auto w-[min(1200px,calc(100%-32px))] sm:w-[min(1200px,calc(100%-48px))]">
        {/* Centered Intro Header */}
        <div className="mx-auto flex max-w-[660px] flex-col items-center text-center">
          <p className="how-header-item font-label text-[13px] font-semibold leading-[1.2] text-black sm:text-[14px]">
            How it works
          </p>
          <h2 className="how-header-item mt-3 font-display text-[30px] font-bold leading-[36px] tracking-[-0.02em] text-black sm:text-[40px] sm:leading-[46px] min-[1100px]:text-[44px] min-[1100px]:leading-[50px]">
            Your nomination could help
            <br className="hidden sm:inline" /> someone get the support they
            need.
          </h2>
          <p className="how-header-item mt-4 max-w-[540px] text-[15px] leading-[24px] text-brand-grey sm:text-[16px] sm:leading-[25px]">
            We believe that everyone deserves an opportunity to live with
            dignity. Our nomination process allows individuals, families, and
            community members to bring deserving widows to our attention.
          </p>
        </div>

        {/* Two-column visual + numbered steps */}
        <div className="how-grid mt-12 grid grid-cols-1 items-center gap-10 sm:mt-16 min-[1100px]:mt-[64px] min-[1100px]:grid-cols-[1fr_1px_1fr] min-[1100px]:gap-[56px]">
          <div className="how-visual flex items-center justify-center">
            <img
              src="/assets/nominate-hands.png"
              alt="Community hands stacked together in unity and support"
              className="w-full max-w-[460px] object-contain"
            />
          </div>

          <div
            aria-hidden="true"
            className="hidden h-full min-h-[380px] w-px bg-black/[0.08] min-[1100px]:block"
          />

          <ol className="flex flex-col gap-7 sm:gap-8">
            {NOMINATION_STEPS.map((step) => (
              <li
                key={step.number}
                className="how-step-item flex items-start gap-4 sm:gap-5"
              >
                <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[10px] border border-black/[0.08] bg-white text-black shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                  <StepIcon id={step.id} />
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display text-[19px] font-bold leading-[24px] tracking-[-0.02em] text-black sm:text-[21px] sm:leading-[26px]">
                    {step.number}. {step.title}
                  </h3>
                  <p className="text-[14px] leading-[22px] text-brand-grey sm:text-[15px] sm:leading-[23px]">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
