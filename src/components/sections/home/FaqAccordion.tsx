"use client";

import { useRef, useState } from "react";
import { FAQ_ITEMS } from "@/data/home";
import { gsap, useGSAP } from "@/lib/gsap";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasMountedRef = useRef(false);

  // Stagger FAQ items in on scroll
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".faq-item", {
          y: 22,
          opacity: 0,
          duration: 0.65,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 84%",
            once: true,
          },
        });
      });
    },
    { scope: containerRef },
  );

  // Smooth GSAP height + opacity transition on open/close
  useGSAP(
    () => {
      const isInitial = !hasMountedRef.current;
      hasMountedRef.current = true;

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      panelRefs.current.forEach((panel, index) => {
        if (!panel) return;
        const isOpen = openIndex === index;

        if (isInitial || prefersReduced) {
          gsap.set(panel, {
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
          });
          return;
        }

        if (isOpen) {
          gsap.to(panel, {
            height: "auto",
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });
        } else {
          gsap.to(panel, {
            height: 0,
            opacity: 0,
            duration: 0.25,
            ease: "power2.inOut",
            overwrite: "auto",
          });
        }
      });
    },
    { scope: containerRef, dependencies: [openIndex] },
  );

  return (
    <div
      ref={containerRef}
      id="acc"
      className="flex w-full flex-1 flex-col gap-2.5 sm:gap-[12px]"
    >
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={item.question}
            className={`faq-item relative overflow-hidden rounded-[10px] border px-4 py-3.5 transition-[background-color,border-color] duration-200 sm:px-[20px] sm:py-[16px] ${
              isOpen ? "border-black bg-[#fcfcfd]" : "border-black/10"
            }`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className={`flex w-full items-center pr-[36px] text-left font-label text-[15px] font-medium leading-[22px] text-black after:absolute after:right-[15px] after:top-[16px] after:h-[20px] after:w-[20px] after:bg-contain after:bg-center after:bg-no-repeat after:content-[''] sm:text-[16px] sm:leading-[24px] sm:after:top-[18px] ${
                isOpen
                  ? "after:bg-[url('/assets/subtract.svg')]"
                  : "after:bg-[url('/assets/add.svg')]"
              }`}
            >
              {item.question}
            </button>
            <div
              ref={(el) => {
                panelRefs.current[index] = el;
              }}
              className="overflow-hidden"
              style={
                index === 0
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
            >
              <p className="mt-2.5 text-[15px] leading-[22px] text-brand-grey sm:mt-[12px] sm:text-[16px] sm:leading-[24px]">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
