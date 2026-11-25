"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap, useGSAP } from "@/lib/gsap";

interface TestimonySuccessModalProps {
  isOpen: boolean;
  referenceNumber: string;
  onClose: () => void;
}

export function TestimonySuccessModal({
  isOpen,
  referenceNumber,
  onClose,
}: TestimonySuccessModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useGSAP(
    () => {
      if (!isOpen) return;

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) return;

      if (overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.25, ease: "power2.out" },
        );
      }

      if (dialogRef.current) {
        gsap.fromTo(
          dialogRef.current,
          { opacity: 0, scale: 0.94, y: 14 },
          { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "power3.out" },
        );
      }
    },
    { dependencies: [isOpen] },
  );

  if (!isOpen || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="testimony-success-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-full max-w-[420px] flex-col items-center rounded-[20px] border border-white/[0.08] bg-black px-7 pt-10 pb-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.85)] sm:px-9"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close confirmation modal"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.14] text-white/80 transition-colors hover:bg-white/25 hover:text-white"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <span className="flex h-[68px] w-[68px] items-center justify-center">
          <svg
            width="68"
            height="68"
            viewBox="0 0 68 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <radialGradient
                id="tst-check-sphere"
                cx="35%"
                cy="25%"
                r="75%"
              >
                <stop offset="0%" stopColor="#B4FF4A" />
                <stop offset="48%" stopColor="#62DB19" />
                <stop offset="100%" stopColor="#1D9D09" />
              </radialGradient>
              <linearGradient
                id="tst-check-gloss"
                x1="34"
                y1="6"
                x2="34"
                y2="34"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.48" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>
              <filter
                id="tst-check-shadow"
                x="14"
                y="18"
                width="40"
                height="36"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feDropShadow
                  dx="0"
                  dy="2"
                  stdDeviation="1.5"
                  floodColor="#0E5A04"
                  floodOpacity="0.45"
                />
              </filter>
            </defs>
            <circle cx="34" cy="34" r="30" fill="url(#tst-check-sphere)" />
            <ellipse
              cx="34"
              cy="19"
              rx="20"
              ry="11"
              fill="url(#tst-check-gloss)"
            />
            <path
              d="M22.5 34.8L30.2 42.5L46 25.5"
              stroke="white"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#tst-check-shadow)"
            />
          </svg>
        </span>

        <h3
          id="testimony-success-title"
          className="text-grad mt-6 font-display text-[28px] font-bold leading-[34px] tracking-[-0.02em] sm:text-[32px] sm:leading-[38px]"
        >
          Your testimony
          <br />
          has been received!
        </h3>

        <div className="mt-4 space-y-4 text-[14px] leading-[22px] text-white/80 sm:text-[15px] sm:leading-[23px]">
          <p>
            Thank you for sharing your story with us. Your testimony has been
            sent to the Jemicare Foundation team for review.
          </p>
          <p>We truly appreciate you being part of our community.</p>
        </div>

        <div
          aria-hidden="true"
          className="my-6 h-px w-full bg-white/[0.08]"
        />

        <p className="text-[13px] font-normal leading-[18px] text-white/60 sm:text-[14px]">
          Reference Number:
        </p>
        <p className="text-grad mt-1.5 font-display text-[28px] font-bold leading-[34px] tracking-[-0.01em] sm:text-[30px]">
          {referenceNumber}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 flex h-[48px] w-full items-center justify-center rounded-full bg-brand-yellow px-6 text-[15px] font-medium leading-[18px] tracking-[-0.02em] text-black shadow-[inset_0_2px_0_rgba(0,0,0,0.2)] transition-[transform,opacity] duration-150 hover:opacity-[0.88] active:scale-[0.98]"
        >
          Done
        </button>
      </div>
    </div>,
    document.body,
  );
}
