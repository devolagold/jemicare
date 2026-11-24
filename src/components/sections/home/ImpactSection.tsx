"use client";

import { useRef } from "react";
import { Eyebrow } from "@/components/ui";
import { IMPACT_STATS, STORY_VIDEOS } from "@/data/home";
import { gsap, useGSAP } from "@/lib/gsap";
import { GrowthTimeline } from "./GrowthTimeline";

export function ImpactSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".impact-head-item", {
          y: 28,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".impact-head",
            start: "top 82%",
            once: true,
          },
        });

        gsap.from(".impact-stat", {
          y: 30,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".impact-stats",
            start: "top 84%",
            once: true,
          },
        });

        // Animate stat counters from 0 to their target numbers
        const statNodes =
          containerRef.current?.querySelectorAll<HTMLElement>(
            ".impact-stat-value",
          );

        statNodes?.forEach((node, index) => {
          const stat = IMPACT_STATS[index];
          if (!stat) return;
          const counter = { val: 0 };

          gsap.to(counter, {
            val: stat.target,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".impact-stats",
              start: "top 84%",
              once: true,
            },
            onUpdate: () => {
              node.textContent = `${stat.prefix ?? ""}${Math.round(counter.val)}${stat.suffix ?? ""}`;
            },
          });
        });

        gsap.from(".stories-reveal", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stories-head",
            start: "top 82%",
            once: true,
          },
        });

        gsap.from(".story-card", {
          y: 38,
          opacity: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".story-grid",
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
      id="stories"
      className="relative overflow-x-clip bg-black pt-14 pb-20 sm:pt-16 sm:pb-24 min-[1100px]:pt-[80px] min-[1100px]:pb-[120px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
      >
        <img
          src="/assets/glow.png"
          alt=""
          className="h-auto w-full min-w-[640px] object-cover object-left-top opacity-40"
        />
      </div>

      <div className="relative z-10 mx-auto w-[min(1200px,calc(100%-32px))] sm:w-[min(1200px,calc(100%-48px))]">
        <div className="impact-head mx-auto flex max-w-[595px] flex-col items-center gap-[14px] text-center">
          <div className="impact-head-item mb-1 sm:mb-[10px]">
            <Eyebrow light>Our impact</Eyebrow>
          </div>
          <h2 className="impact-head-item text-grad font-display text-[30px] font-bold leading-[36px] tracking-[-0.02em] sm:text-[38px] sm:leading-[44px] min-[1100px]:text-[44px] min-[1100px]:leading-[48px]">
            The proof is in the progress.
          </h2>
          <p className="impact-head-item text-[15px] leading-[24px] text-brand-grey-light sm:text-[16px]">
            Impact at JemiCare means creating opportunities that help
            individuals and communities move beyond immediate hardship and build
            sustainable futures. Numbers tell part of the story. The lives
            behind them tell the rest.
          </p>
        </div>

        <div className="impact-stats mt-12 grid grid-cols-2 gap-x-6 gap-y-9 sm:mt-16 sm:gap-x-10 sm:gap-y-12 min-[1100px]:mt-[84px] min-[1100px]:flex min-[1100px]:gap-[80px]">
          {IMPACT_STATS.map((stat) => (
            <div
              key={stat.label}
              className="impact-stat flex flex-1 flex-col gap-3 sm:gap-[18px]"
            >
              <strong className="impact-stat-value font-display text-[40px] font-bold leading-[0.9] tracking-[-0.02em] sm:text-[54px] min-[1100px]:text-[68px]">
                {stat.value}
              </strong>
              <span className="text-[14px] leading-[20px] text-brand-grey-light sm:text-[16px] sm:leading-[24px] min-[1100px]:whitespace-nowrap">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <GrowthTimeline />

        <div className="stories-head mt-16 flex flex-col gap-6 sm:mt-24 sm:gap-10 min-[1100px]:mt-[120px] min-[1100px]:flex-row min-[1100px]:gap-[64px]">
          <div className="w-full min-[1100px]:w-[575px] min-[1100px]:flex-none">
            <div className="stories-reveal mb-4 sm:mb-[24px]">
              <Eyebrow light>Stories of resilience</Eyebrow>
            </div>
            <h2 className="stories-reveal text-grad font-display text-[30px] font-bold leading-[36px] tracking-[-0.02em] sm:text-[38px] sm:leading-[44px] min-[1100px]:text-[44px] min-[1100px]:leading-[48px]">
              Behind every number is a name. Behind every name is a story.
            </h2>
          </div>

          <div className="flex flex-1 flex-col gap-4 text-[15px] leading-[24px] text-brand-grey-light sm:gap-[24px] sm:text-[16px]">
            <p className="stories-reveal">
              Many of the women supported through the Empower Widows for
              Resilience initiative face significant economic challenges while
              caring for their families. Through the programme, they receive not
              only financial assistance but renewed confidence to rebuild.
            </p>
            <p className="stories-reveal">
              For some, the support stabilises their households. For others, it
              creates opportunities to expand small businesses and generate
              sustainable income. With the introduction of business grants and
              mentorship, JemiCare continues to move from short-term assistance
              toward long-term empowerment.
            </p>
          </div>
        </div>

        <div className="story-grid mt-8 grid grid-cols-2 gap-7 sm:mt-16 sm:grid-cols-4 sm:gap-6 min-[1100px]:mt-[44px] min-[1100px]:grid-cols-4 min-[1100px]:gap-[28px]">
          {STORY_VIDEOS.map((story) => (
            <figure
              key={story.id}
              className="story-card flex flex-col gap-4 sm:gap-[24px]"
            >
              <button
                type="button"
                className="group relative flex aspect-[279/360] w-full overflow-hidden rounded-[16px]"
                style={{ backgroundColor: story.bg }}
                aria-label={story.label}
              >
                <img
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  src={story.image}
                  alt=""
                />
                <span className="absolute left-1/2 top-1/2 grid h-[46px] w-[46px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-black/50 transition-transform duration-300 group-hover:scale-110">
                  <img
                    className="h-[20px] w-[20px]"
                    src="/assets/play.svg"
                    alt=""
                  />
                </span>
              </button>
              <figcaption className="font-serif text-[15px] italic leading-[20px] text-brand-grey-light sm:text-[16px]">
                {story.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
