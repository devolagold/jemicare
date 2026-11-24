"use client";

import { useRef } from "react";
import { Eyebrow } from "@/components/ui";
import { ABOUT_STORY_PARAGRAPHS } from "@/data/about";
import { gsap, useGSAP } from "@/lib/gsap";

export function AboutStoryCard() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".story-card-shell", {
          y: 36,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        });

        gsap.from(".story-card-reveal", {
          y: 20,
          opacity: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".story-card-shell",
            start: "top 78%",
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
      className="bg-[#f7f7f8] bg-[repeating-linear-gradient(-45deg,rgba(0,0,0,0.03)_0_1px,transparent_1px_12px)] py-16 text-black sm:py-24 min-[1100px]:py-[104px]"
    >
      <div className="mx-auto w-[min(1200px,calc(100%-32px))] sm:w-[min(1200px,calc(100%-48px))]">
        <article className="story-card-shell mx-auto max-w-[760px] rounded-[20px] border border-black/[0.05] bg-white px-6 py-10 shadow-[0_2px_20px_rgba(0,0,0,0.03)] sm:px-12 sm:py-14 min-[1100px]:px-[68px] min-[1100px]:py-[64px]">
          <div className="story-card-reveal">
            <Eyebrow>Why JemiCare exists</Eyebrow>
          </div>

          <h2 className="story-card-reveal mt-5 font-display text-[28px] font-bold leading-[34px] tracking-[-0.02em] text-black sm:text-[36px] sm:leading-[42px] min-[1100px]:text-[40px] min-[1100px]:leading-[46px]">
            Born from a belief that poverty should not determine a person&apos;s
            future.
          </h2>

          <div className="mt-7 space-y-5 text-[15px] leading-[24px] text-brand-grey sm:mt-8 sm:text-[16px] sm:leading-[25px]">
            {ABOUT_STORY_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph.slice(0, 28)} className="story-card-reveal">
                {paragraph}
              </p>
            ))}
          </div>

          <figure className="story-card-reveal mt-10 pt-2">
            <blockquote className="font-serif text-[20px] leading-[28px] tracking-[-0.01em] text-black sm:text-[23px] sm:leading-[32px]">
              &ldquo;True change happens when people are given not just support,
              but the knowledge and opportunities needed to transform their own
              lives.&rdquo;
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3.5">
              <img
                src="/assets/founder.png"
                alt="Oluwasesan Yackon"
                className="h-[42px] w-[42px] rounded-full border border-black/10 object-cover"
              />
              <div className="flex flex-col">
                <strong className="text-[14px] font-semibold leading-[18px] text-black">
                  Oluwasesan Yackon
                </strong>
                <span className="text-[13px] leading-[18px] text-brand-grey">
                  Founder, JemiCare Foundation
                </span>
              </div>
            </figcaption>
          </figure>
        </article>
      </div>
    </section>
  );
}
