"use client";

import Link from "next/link";
import { useRef } from "react";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/data/navigation";
import { gsap, useGSAP } from "@/lib/gsap";

export function Footer() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".footer-reveal", {
          y: 22,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 88%",
            once: true,
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <footer
      ref={containerRef}
      className="bg-lines flex flex-col items-center gap-6 overflow-hidden bg-black px-4 pt-8 pb-[0px] sm:gap-[28px] sm:px-[24px] sm:pt-[20px] [&>*]:relative"
    >
      <img
        src="/assets/logo.png"
        alt="JemiCare Foundation"
        className="footer-reveal h-[44px] w-[82px] object-cover sm:h-[52px] sm:w-[96px]"
      />

      <div className="footer-reveal flex gap-[12px]">
        {SOCIAL_LINKS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            aria-label={social.label}
            className="grid h-[38px] w-[38px] place-items-center border-[0.5px] border-white/20 bg-white/10 transition-transform duration-150 hover:scale-105 sm:h-[34px] sm:w-[34px]"
          >
            <img className="h-[20px] w-[20px]" src={social.icon} alt="" />
          </a>
        ))}
      </div>

      <ul className="footer-reveal flex flex-wrap justify-center gap-y-1">
        {FOOTER_LINKS.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="px-[10px] py-[6px] text-[14px] leading-[20px] text-[#f9f9f9] transition-opacity duration-150 hover:opacity-75"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <p className="footer-reveal mt-2 px-[10px] py-[6px] text-center text-[13px] leading-[20px] text-[#f9f9f9] sm:mt-[16px] sm:text-[14px]">
        © 2026 Jemicare Foundation · All rights reserved.
      </p>

      <img
        src="/assets/line art.svg"
        alt="line_art"
        className="w-full"
      />
    </footer>
  );
}
