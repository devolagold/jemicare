"use client";

import Link from "next/link";
import { useRef } from "react";
import { NEWS_ARTICLES } from "@/data/news";
import { gsap, useGSAP } from "@/lib/gsap";

export function NewsGrid() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".news-card", {
          y: 32,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".news-grid",
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
      className="bg-white py-14 text-black sm:py-20 min-[1100px]:py-[96px]"
    >
      <div className="mx-auto w-[min(1200px,calc(100%-32px))] sm:w-[min(1200px,calc(100%-48px))]">
        <div className="news-grid grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 min-[1100px]:gap-x-[36px] min-[1100px]:gap-y-[56px]">
          {NEWS_ARTICLES.map((article) => (
            <article key={article.slug} className="news-card group flex flex-col">
              <Link
                href={`/news/${article.slug}`}
                className="block aspect-square w-full overflow-hidden rounded-[12px] bg-[#faf2e8]"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </Link>

              <time className="mt-5 text-[12px] font-medium leading-[16px] text-brand-grey">
                {article.date}
              </time>

              <h2 className="mt-2.5 font-display text-[19px] font-bold leading-[24px] tracking-[-0.02em] text-black sm:text-[20px] sm:leading-[25px]">
                <Link
                  href={`/news/${article.slug}`}
                  className="transition-opacity hover:opacity-75"
                >
                  {article.title}
                </Link>
              </h2>

              <p className="mt-2.5 text-[14px] leading-[21px] text-brand-grey">
                {article.excerpt}
              </p>

              <Link
                href={`/news/${article.slug}`}
                className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold leading-[20px] text-black transition-opacity hover:opacity-70"
              >
                Read more
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
