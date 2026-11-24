"use client";

import { useRef, useState } from "react";
import { FUND_ALLOCATIONS } from "@/data/home";
import { gsap, useGSAP } from "@/lib/gsap";

const SIZE = 220;
const STROKE = 28;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP = 3;

const SEGMENTS = FUND_ALLOCATIONS.reduce<
  Array<{
    item: (typeof FUND_ALLOCATIONS)[number];
    length: number;
    offset: number;
  }>
>((acc, item) => {
  const prevOffset =
    acc.length > 0
      ? acc[acc.length - 1].offset + acc[acc.length - 1].length + GAP
      : 0;
  const rawLength = (item.percentage / 100) * CIRCUMFERENCE;
  const length = Math.max(0, rawLength - GAP);
  acc.push({ item, length, offset: prevOffset });
  return acc;
}, []);

export function FundAllocationChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".donut-segment", {
          strokeDasharray: `0 ${CIRCUMFERENCE}`,
          duration: 1.1,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "strokeDasharray",
          scrollTrigger: {
            trigger: chartRef.current,
            start: "top 82%",
            once: true,
          },
        });
      });
    },
    { scope: chartRef },
  );

  const activeItem =
    activeIndex !== null ? FUND_ALLOCATIONS[activeIndex] : null;

  return (
    <div
      ref={chartRef}
      className="fund-chart w-full max-w-[560px] flex-none rounded-[20px] border border-black/[0.08] bg-brand-tint p-6 sm:p-8 min-[1100px]:w-[560px]"
    >
      <div className="flex flex-col items-center gap-7 sm:flex-row sm:items-center sm:gap-7">
        {/* SVG Donut Chart */}
        <div className="relative h-[196px] w-[196px] shrink-0 sm:h-[200px] sm:w-[200px]">
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="h-full w-full -rotate-90 overflow-visible"
            role="img"
            aria-label="Fund allocation breakdown: 55% Livelihood & Widow Grants, 20% Business Grants & Mentorship, 15% Education & Tech Access, 6% Community Outreach & M&E, 4% Operations & Governance"
          >
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="rgba(0,0,0,0.05)"
              strokeWidth={STROKE}
            />
            {SEGMENTS.map(({ item, length, offset }, index) => {
              const isHighlighted =
                activeIndex === null || activeIndex === index;
              const isSelected = activeIndex === index;

              return (
                <circle
                  key={item.label}
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={RADIUS}
                  fill="none"
                  stroke={item.color}
                  strokeWidth={isSelected ? STROKE + 4 : STROKE}
                  strokeDasharray={`${length} ${CIRCUMFERENCE - length}`}
                  strokeDashoffset={-offset}
                  className="donut-segment cursor-pointer transition-[opacity,stroke-width] duration-200"
                  style={{ opacity: isHighlighted ? 1 : 0.3 }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  onClick={() =>
                    setActiveIndex((prev) => (prev === index ? null : index))
                  }
                />
              );
            })}
          </svg>

          {/* Center Summary */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <span className="font-display text-[36px] font-bold leading-none tracking-[-0.03em] text-black">
              {activeItem ? `${activeItem.percentage}%` : "90%"}
            </span>
            <span className="mt-1.5 text-[12px] font-medium leading-[15px] text-brand-grey">
              {activeItem ? activeItem.shortLabel : "Direct to Programmes"}
            </span>
          </div>
        </div>

        {/* Clean Breakdown Legend */}
        <ul className="flex w-full flex-1 flex-col gap-3">
          {FUND_ALLOCATIONS.map((item, index) => {
            const isActive = activeIndex === index;
            const isDimmed = activeIndex !== null && !isActive;

            return (
              <li key={item.label}>
                <button
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  onFocus={() => setActiveIndex(index)}
                  onBlur={() => setActiveIndex(null)}
                  onClick={() =>
                    setActiveIndex((prev) => (prev === index ? null : index))
                  }
                  className={`flex w-full flex-col gap-1.5 rounded-[10px] px-2.5 py-1.5 transition-all duration-200 ${
                    isActive ? "bg-black/[0.04]" : "hover:bg-black/[0.03]"
                  } ${isDimmed ? "opacity-45" : "opacity-100"}`}
                >
                  <div className="flex w-full items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-[14px] font-medium leading-[18px] text-black">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      {item.label}
                    </span>
                    <span className="shrink-0 font-display text-[14px] font-bold leading-[18px] text-black">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="h-[4px] w-full overflow-hidden rounded-full bg-black/[0.06]">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
