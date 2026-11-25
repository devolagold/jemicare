"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DONATION_CONFIG, getDonationImpactOutcome } from "@/data/donate";
import { gsap, useGSAP } from "@/lib/gsap";

export function ImpactCalculator() {
  const [amount, setAmount] = useState<number>(DONATION_CONFIG.defaultAmount);
  const [modalOpen, setModalOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".calc-card", {
          y: 36,
          scale: 0.97,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".calc-card",
            start: "top 84%",
            once: true,
          },
        });
      });
    },
    { scope: containerRef },
  );

  useEffect(() => {
    if (!modalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [modalOpen]);

  const percentage =
    ((amount - DONATION_CONFIG.min) /
      (DONATION_CONFIG.max - DONATION_CONFIG.min)) *
    100;

  const formattedAmount = amount.toLocaleString("en-NG");
  const impactOutcome = getDonationImpactOutcome(amount);

  return (
    <section
      ref={containerRef}
      id="calculator"
      className="relative overflow-hidden bg-black pt-6 text-white sm:pt-10"
    >
      <div className="relative z-10 mx-auto flex w-[min(1200px,calc(100%-32px))] flex-col items-center pb-14 sm:w-[min(1200px,calc(100%-48px))] sm:pb-20">
        {/* Elevated Calculator Card */}
        <div className="calc-card relative flex w-full max-w-[540px] flex-col items-center overflow-hidden rounded-[24px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(24,22,36,0.92)_0%,rgba(12,12,14,0.96)_100%)] px-6 py-10 text-center sm:px-10 sm:py-12">
          {/* Subtle top-left purple glow matching design */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-[260px] w-[260px] rounded-full bg-indigo-500/20 blur-[80px]"
          />

          <h2 className="relative z-10 text-grad font-display text-[28px] font-bold leading-[34px] tracking-[-0.02em] sm:text-[34px] sm:leading-[40px]">
            Calculate your Impact
          </h2>

          {/* White Interactive Slider Box */}
          <div className="relative z-10 mt-7 flex w-full flex-col items-start rounded-[16px] bg-white p-6 text-left text-black shadow-lg sm:mt-8 sm:p-7">
            <label
              htmlFor="donation-amount-slider"
              className="text-[14px] font-medium leading-[20px] text-black/80"
            >
              I&apos;d like to give
            </label>

            <div className="relative mt-4 flex w-full items-center">
              <input
                id="donation-amount-slider"
                type="range"
                min={DONATION_CONFIG.min}
                max={DONATION_CONFIG.max}
                step={DONATION_CONFIG.step}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                aria-valuetext={`₦${formattedAmount}`}
                style={{
                  background: `linear-gradient(to right, #000 0%, #000 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
                }}
                className="h-[6px] w-full cursor-pointer appearance-none rounded-full accent-black [&::-moz-range-thumb]:h-[20px] [&::-moz-range-thumb]:w-[20px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-black/20 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-md [&::-webkit-slider-thumb]:h-[20px] [&::-webkit-slider-thumb]:w-[20px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black/20 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md"
              />
            </div>

            <div className="mt-5 font-display text-[36px] font-bold leading-none tracking-[-0.03em] text-black sm:text-[44px]">
              ₦{formattedAmount}
            </div>
          </div>

          <p
            aria-live="polite"
            className="relative z-10 mt-7 max-w-[380px] text-[15px] leading-[23px] text-white/85 sm:text-[16px] sm:leading-[24px]"
          >
            Your{" "}
            <strong className="font-semibold text-white">
              {formattedAmount} Naira
            </strong>{" "}
            donation to JemiCare Foundation can {impactOutcome}
          </p>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="relative z-10 mt-7 flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[15px] font-medium leading-[18px] tracking-[-0.02em] text-black transition-[transform,opacity] duration-150 hover:opacity-[0.88] active:scale-[0.98]"
          >
            Donate now
            <img
              className="h-[12px] w-[14px]"
              src="/assets/arrow-dark.svg"
              alt=""
            />
          </button>
        </div>
      </div>

      {/* Bottom Illustrated Giving Hands Artwork */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative z-10 mx-auto w-full max-w-[1440px] select-none overflow-hidden"
      >
        <img
          src="/assets/donate-hands.png"
          alt=""
          className="h-[140px] w-full object-cover object-bottom sm:h-[220px] min-[1100px]:h-auto"
        />
      </div>

      {/* Donation Pledge / Confirmation Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="donate-modal-title"
          onClick={() => setModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[460px] rounded-[20px] border border-white/15 bg-[#121216] p-6 text-left text-white shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-wider text-brand-yellow">
                  JemiCare Foundation
                </p>
                <h3
                  id="donate-modal-title"
                  className="mt-1 font-display text-[24px] font-bold leading-[28px] tracking-[-0.02em]"
                >
                  Complete your ₦{formattedAmount} gift
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close donation modal"
                onClick={() => setModalOpen(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/15"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <p className="mt-4 text-[14px] leading-[22px] text-brand-grey-light">
              Your{" "}
              <strong className="font-semibold text-white">
                ₦{formattedAmount}
              </strong>{" "}
              contribution can {impactOutcome}
            </p>

            <div className="mt-5 rounded-[12px] border border-white/10 bg-white/[0.03] p-4 text-[14px] leading-[22px] text-white/85">
              <p className="font-medium text-white">
                Direct Donation &amp; Corporate Partnerships
              </p>
              <p className="mt-1 text-brand-grey-light">
                Reach out to our stewardship team for bank transfer details or
                recurring giving setup at{" "}
                <a
                  href="mailto:help@jemicarefoundation.org"
                  className="font-medium text-brand-yellow underline"
                >
                  help@jemicarefoundation.org
                </a>
                .
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <Link
                href="/contact"
                onClick={() => setModalOpen(false)}
                className="flex flex-1 items-center justify-center rounded-full bg-brand-yellow px-5 py-3 text-[14px] font-medium text-black shadow-[inset_0_2px_0_rgba(0,0,0,0.2)] transition-opacity hover:opacity-90"
              >
                Coordinate with our team
              </Link>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex items-center justify-center rounded-full border border-white/15 px-5 py-3 text-[14px] font-medium text-white transition-colors hover:bg-white/10"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
