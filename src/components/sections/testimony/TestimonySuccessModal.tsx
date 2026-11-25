"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap, useGSAP } from "@/lib/gsap";

interface TestimonySuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TestimonySuccessModal({
  isOpen,
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
        className="relative flex w-full max-w-[420px] flex-col items-center rounded-[20px] border border-white/[0.08] bg-black px-7 pt-11 pb-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.85)] sm:px-9"
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

        <img
          src="/assets/testimony-clap.png"
          alt=""
          className="h-[76px] w-auto object-contain"
        />

        <h3
          id="testimony-success-title"
          className="text-grad mt-6 font-display text-[28px] font-bold leading-[34px] tracking-[-0.02em] sm:text-[32px] sm:leading-[38px]"
        >
          Thank you for
          <br />
          sharing your story!
        </h3>

        <p className="mt-4 max-w-[340px] text-[14px] leading-[22px] text-white/80 sm:text-[15px] sm:leading-[23px]">
          Your testimony has been successfully submitted to Jemicare Foundation.
          We appreciate you taking the time to share your experience with us.
          Your story means a lot, and our team will review your submission
          before any further action is taken.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-7 flex h-[48px] w-full items-center justify-center rounded-full bg-brand-yellow px-6 text-[15px] font-medium leading-[18px] tracking-[-0.02em] text-black shadow-[inset_0_2px_0_rgba(0,0,0,0.2)] transition-[transform,opacity] duration-150 hover:opacity-[0.88] active:scale-[0.98]"
        >
          Done
        </button>
      </div>
    </div>,
    document.body,
  );
}
