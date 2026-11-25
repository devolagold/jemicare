"use client";

import { useRef } from "react";
import { Navbar } from "@/components/layout";
import { gsap, useGSAP } from "@/lib/gsap";
import { VolunteerForm } from "./VolunteerForm";

export function VolunteerHero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".hero-nav", {
          y: -18,
          opacity: 0,
          duration: 0.7,
        })
          .from(
            ".volunteer-stagger",
            {
              y: 28,
              opacity: 0,
              duration: 0.8,
              stagger: 0.1,
            },
            0.15,
          )
          .from(
            ".volunteer-form-card",
            {
              y: 36,
              opacity: 0,
              duration: 0.9,
            },
            0.25,
          );
      });
    },
    { scope: containerRef },
  );

  return (
    <header
      ref={containerRef}
      className="relative overflow-hidden bg-black text-white"
    >
      <Navbar />

      <div className="relative z-10 mx-auto grid w-[min(1200px,calc(100%-32px))] grid-cols-1 items-start gap-12 pt-12 pb-14 sm:w-[min(1200px,calc(100%-48px))] sm:pt-16 sm:pb-20 min-[1100px]:grid-cols-[1fr_500px] min-[1100px]:gap-[72px] min-[1100px]:pt-[76px] min-[1100px]:pb-[92px]">
        {/* Left column: volunteer intro */}
        <div className="flex flex-col items-start min-[1100px]:pt-4">
          <p className="volunteer-stagger flex items-center gap-2 font-label text-[14px] font-medium leading-[1.2] text-white sm:text-[15px]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.45866 4.08333C1.45866 5.372 2.50333 6.41667 3.79199 6.41667C5.08066 6.41667 6.12533 5.372 6.12533 4.08333C6.12533 2.79467 5.08066 1.75 3.79199 1.75C2.50333 1.75 1.45866 2.79467 1.45866 4.08333ZM1.16699 12.25V9.625C1.16699 8.17524 2.34225 7 3.79199 7C5.24174 7 6.41699 8.17524 6.41699 9.625V12.25H1.16699ZM10.2087 6.41667C8.92002 6.41667 7.87533 5.372 7.87533 4.08333C7.87533 2.79467 8.92002 1.75 10.2087 1.75C11.4973 1.75 12.542 2.79467 12.542 4.08333C12.542 5.372 11.4973 6.41667 10.2087 6.41667ZM7.58366 12.25V9.625C7.58366 8.17524 8.7589 7 10.2087 7C11.6584 7 12.8337 8.17524 12.8337 9.625V12.25H7.58366Z" fill="white" />
            </svg>

            Volunteer
          </p>

          <h1 className="volunteer-stagger text-grad mt-5 font-display text-[36px] font-bold leading-[40px] tracking-[-0.02em] sm:text-[48px] sm:leading-[52px] min-[1100px]:text-[56px] min-[1100px]:leading-[60px]">
            Lend your hands.
            <br />
            Multiply the impact.
          </h1>

          <div className="volunteer-stagger mt-5 max-w-[460px] space-y-5 text-[15px] leading-[24px] text-brand-grey-light sm:text-[16px] sm:leading-[25px]">
            <p>
              JemiCare Foundation is powered by volunteers who contribute their
              time, skills, and energy to support our mission. Volunteering lets
              you contribute to meaningful community work while gaining valuable
              experience in development.
            </p>
            <p>
              Whether you are a student, a professional, or someone with a few
              hours to spare, there is a role for you here.
            </p>
          </div>
        </div>

        {/* Right column: volunteer application form */}
        <VolunteerForm />
      </div>

      {/* Decorative hand-drawn raised hands doodle strip */}
      <div
        aria-hidden="true"
        className="relative z-10 w-full overflow-hidden bg-black"
      >
        <img
          src="/assets/volunteer-doodles.png"
          alt=""
          className="h-[72px] w-full object-cover object-bottom sm:h-[96px] min-[1100px]:h-auto"
        />
      </div>
    </header>
  );
}
