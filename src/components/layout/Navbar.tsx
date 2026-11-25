"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import { NAV_LINKS } from "@/data/navigation";

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <div className="relative z-20 w-full">
      <nav className="hero-nav mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 py-4 sm:px-8 min-[1100px]:px-[60px] min-[1100px]:py-[18px]">
        <Link className="shrink-0 min-[1100px]:flex-1" href="/">
          <img
            className="h-[42px] w-[78px] object-cover sm:h-[52px] sm:w-[96px]"
            src="/assets/logo.png"
            alt="JemiCare Foundation"
          />
        </Link>

        <ul className="hidden min-[1100px]:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;

            return (
              <li key={link.label}>
                <Link
                  className={`block rounded-[6px] px-[14px] py-[6px] text-[14px] leading-[20px] tracking-[-0.02em] transition-colors duration-150 hover:bg-white/10 ${
                    isActive
                      ? "bg-white/10 font-medium text-white"
                      : "text-[#f9f9f9]"
                  }`}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center justify-end gap-2 sm:gap-[10px] min-[1100px]:flex-1">
          <div className="hidden items-center gap-[10px] sm:flex">
            <Button href="/volunteer" variant="ghost">
              Get Involved{" "}
              <img src="/assets/arrow-badge.svg" alt="" />
            </Button>
            <Button href="/donate" variant="yellow" size="sm">
              Make a donation
            </Button>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 min-[1100px]:hidden"
          >
            <span className="flex w-[18px] flex-col gap-[5px]">
              <span
                className={`block h-[1.5px] w-full bg-current transition-transform duration-200 ${
                  menuOpen ? "translate-y-[6.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-full bg-current transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-full bg-current transition-transform duration-200 ${
                  menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile & Tablet Navigation Drawer */}
      <div
        id="mobile-nav-menu"
        className={`absolute inset-x-0 top-full z-30 overflow-hidden transition-all duration-300 min-[1100px]:hidden ${
          menuOpen
            ? "pointer-events-auto max-h-[480px] opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <div className="mx-4 rounded-2xl border border-white/15 bg-black/95 p-5 shadow-2xl backdrop-blur-md sm:mx-8">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;

              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`block rounded-lg px-3 py-2.5 text-[16px] font-medium transition-colors hover:bg-white/10 ${
                      isActive ? "bg-white/10 text-white" : "text-[#f9f9f9]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 flex flex-col gap-2.5 border-t border-white/10 pt-4 sm:hidden">
            <Button
              href="/volunteer"
              variant="ghost"
              className="w-full border border-white/15"
              onClick={() => setMenuOpen(false)}
            >
              Get Involved{" "}
              <img src="/assets/arrow-badge.svg" alt="" />
            </Button>
            <Button
              href="/donate"
              variant="yellow"
              size="sm"
              className="w-full"
              onClick={() => setMenuOpen(false)}
            >
              Make a donation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
