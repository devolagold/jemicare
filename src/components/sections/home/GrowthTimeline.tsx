"use client";

import { useRef, useState } from "react";
import { TIMELINE_ITEMS } from "@/data/home";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function GrowthTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const activeIndexRef = useRef(0);

  const getItemAnchorX = (index: number) => {
    const items = sectionRef.current?.querySelectorAll<HTMLElement>(".tl-item");
    const item = items?.[index];
    if (!item) return 24 + index * 384;
    const padLeft = parseFloat(getComputedStyle(item).paddingLeft) || 24;
    return item.offsetLeft + padLeft;
  };

  // Scroll-driven timeline: pins while scrubbing slider, horizontal pan, and active years
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const maxIndex = TIMELINE_ITEMS.length - 1;
        const getMaxPan = () =>
          Math.max(
            0,
            (innerRef.current?.scrollWidth ?? 2016) -
              (viewportRef.current?.clientWidth ?? 1200),
          );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 14%",
            end: () => {
              const isCompact = window.innerWidth < 768;
              const multiplier = isCompact ? 1.35 : 1.8;
              const minDistance = isCompact ? 1000 : 1400;
              return `+=${Math.max(minDistance, getMaxPan() * multiplier)}`;
            },
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const nextIndex = Math.min(
                maxIndex,
                Math.round(self.progress * maxIndex),
              );
              if (nextIndex !== activeIndexRef.current) {
                activeIndexRef.current = nextIndex;
                setActiveIndex(nextIndex);
              }
            },
          },
        });

        triggerRef.current = tl.scrollTrigger ?? null;

        tl.fromTo(
          progressRef.current,
          { width: () => getItemAnchorX(0) },
          { width: () => getItemAnchorX(maxIndex), ease: "none" },
          0,
        )
          .fromTo(
            handleRef.current,
            { left: () => getItemAnchorX(0) - 12 },
            { left: () => getItemAnchorX(maxIndex) - 12, ease: "none" },
            0,
          )
          .to(
            innerRef.current,
            {
              x: () => -getMaxPan(),
              ease: "none",
            },
            0,
          );

        return () => {
          triggerRef.current = null;
        };
      });
    },
    { scope: sectionRef },
  );

  // Smooth opacity transition for active/inactive years
  useGSAP(
    () => {
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const items = sectionRef.current?.querySelectorAll(".tl-item");
      items?.forEach((el, index) => {
        gsap.to(el, {
          opacity: index <= activeIndex ? 1 : 0.4,
          duration: prefersReduced ? 0 : 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
      });

      if (prefersReduced) {
        const targetX = getItemAnchorX(activeIndex);
        gsap.set(progressRef.current, { width: targetX });
        gsap.set(handleRef.current, { left: targetX - 12 });
      }
    },
    { scope: sectionRef, dependencies: [activeIndex] },
  );

  const handleSelectYear = (index: number) => {
    const st = triggerRef.current;
    if (st) {
      const maxIndex = TIMELINE_ITEMS.length - 1;
      const targetScroll = st.start + (index / maxIndex) * (st.end - st.start);
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
      return;
    }
    activeIndexRef.current = index;
    setActiveIndex(index);
  };

  return (
    <div ref={sectionRef} className="mt-16 sm:mt-24 min-[1100px]:mt-[124px]">
      <h2 className="text-grad font-display text-[30px] font-bold leading-[36px] tracking-[-0.02em] sm:text-[38px] sm:leading-[44px] min-[1100px]:text-[44px] min-[1100px]:leading-[48px]">
        Our growth timeline
      </h2>

      <div
        ref={viewportRef}
        id="timeline"
        className="scrollbar-none mt-8 overflow-hidden pb-[8px] sm:mt-10 min-[1100px]:mt-[44px] motion-reduce:overflow-x-auto"
      >
        <div
          ref={innerRef}
          className="w-max will-change-transform min-[1100px]:w-[2016px]"
        >
          <div className="relative h-[24px] w-full before:absolute before:inset-x-0 before:inset-y-[8px] before:rounded-[4px] before:bg-[rgba(237,176,26,0.3)] before:content-['']">
            <div
              ref={progressRef}
              className="absolute left-0 top-[6px] h-[12px] rounded-[4px] bg-brand-yellow"
              style={{ width: "24px" }}
            />
            <div
              ref={handleRef}
              className="absolute top-0 h-[24px] w-[24px] rounded-full border-[3px] border-brand-yellow bg-white shadow-[0_4px_8px_-2px_rgba(16,24,40,0.1)]"
              style={{ left: "12px" }}
            />
          </div>

          <ol className="mt-8 flex w-max gap-5 sm:mt-10 sm:gap-[24px] min-[1100px]:mt-[44px] min-[1100px]:w-[2016px]">
            {TIMELINE_ITEMS.map((item, index) => (
              <li
                key={item.year}
                role="button"
                tabIndex={0}
                aria-pressed={index === activeIndex}
                onClick={() => handleSelectYear(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelectYear(index);
                  }
                }}
                className="tl-item relative flex w-[272px] flex-none cursor-pointer flex-col gap-6 py-4 pl-5 before:absolute before:-left-[20px] before:top-0 before:h-[120px] before:w-px before:content-[''] before:[background:url('/assets/tl-divider.svg')_center/100%_100%_no-repeat] sm:w-[320px] sm:gap-8 sm:py-5 sm:pl-[24px] sm:before:-left-[24px] sm:before:h-[145px] min-[1100px]:w-[360px] min-[1100px]:gap-[44px] min-[1100px]:py-[24px]"
                style={{ opacity: index === 0 ? 1 : 0.4 }}
              >
                <b className="font-display text-[36px] font-bold leading-normal tracking-[-0.02em] sm:text-[42px] min-[1100px]:text-[48px]">
                  {item.year}
                </b>
                {item.bullets ? (
                  <div>
                    <p className="text-[15px] leading-[22px] text-brand-grey-light sm:text-[16px] sm:leading-[24px]">
                      {item.description}
                    </p>
                    <ul className="ml-[20px] list-disc text-[15px] leading-[22px] text-brand-grey-light sm:ml-[24px] sm:text-[16px] sm:leading-[24px]">
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-[15px] leading-[22px] text-brand-grey-light sm:text-[16px] sm:leading-[24px]">
                    {item.description}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
