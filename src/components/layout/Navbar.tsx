"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui";
import { GET_INVOLVED_LINKS, NAV_LINKS } from "@/data/navigation";
import type { NavDropdownItem } from "@/types";

function DropdownIcon({ icon }: { icon: NavDropdownItem["icon"] }) {
  switch (icon) {
    case "partnerships":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m11 17 2 2a1 1 0 1 0 3-3" />
          <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
          <path d="m21 3 1 11h-2" />
          <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
          <path d="M3 4h8" />
        </svg>
      );
    case "nominate":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      );
    case "testimony":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
      );
  }
}

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [involvedOpen, setInvolvedOpen] = useState(false);
  const involvedRef = useRef<HTMLDivElement>(null);

  const isInvolvedActive = GET_INVOLVED_LINKS.some(
    (item) => pathname === item.href,
  );

  useEffect(() => {
    if (!menuOpen && !involvedOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setInvolvedOpen(false);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      if (
        involvedOpen &&
        involvedRef.current &&
        !involvedRef.current.contains(e.target as Node)
      ) {
        setInvolvedOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [menuOpen, involvedOpen]);

  return (
    <div className="relative z-30 w-full">
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
            const isActive =
              pathname === link.href ||
              (link.href === "/news" && pathname.startsWith("/news/"));

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
            {/* Get Involved Dropdown */}
            <div ref={involvedRef} className="relative">
              <button
                type="button"
                aria-expanded={involvedOpen}
                aria-haspopup="menu"
                aria-controls="get-involved-menu"
                onClick={() => setInvolvedOpen((prev) => !prev)}
                className={`flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[14px] font-medium leading-[18px] tracking-[-0.02em] whitespace-nowrap text-white transition-[background-color,opacity] duration-150 hover:bg-white/10 ${
                  involvedOpen || isInvolvedActive ? "bg-white/10" : ""
                }`}
              >
                Get Involved
                <img
                  src="/assets/arrow-badge.svg"
                  alt=""
                  className={`transition-transform duration-200 ${
                    involvedOpen ? "rotate-90" : ""
                  }`}
                />
              </button>

              <div
                id="get-involved-menu"
                role="menu"
                aria-label="Get Involved pages"
                className={`absolute right-0 top-[calc(100%+10px)] z-40 w-[310px] origin-top-right rounded-[16px] border border-white/15 bg-[#0c0c0f]/95 p-2 shadow-[0_24px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-all duration-200 ${
                  involvedOpen
                    ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                    : "pointer-events-none -translate-y-1.5 scale-[0.97] opacity-0"
                }`}
              >
                <p className="px-3 pt-2 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-white/45">
                  Get Involved
                </p>
                <ul className="flex flex-col gap-1">
                  {GET_INVOLVED_LINKS.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                      <li key={item.href} role="none">
                        <Link
                          href={item.href}
                          role="menuitem"
                          onClick={() => setInvolvedOpen(false)}
                          aria-current={isActive ? "page" : undefined}
                          className={`group flex items-start gap-3 rounded-[11px] px-3 py-2.5 transition-colors ${
                            isActive
                              ? "bg-white/[0.1]"
                              : "hover:bg-white/[0.07]"
                          }`}
                        >
                          <span
                            className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border transition-colors ${
                              isActive
                                ? "border-brand-yellow/40 bg-brand-yellow/15 text-brand-yellow"
                                : "border-white/10 bg-white/[0.05] text-white/80 group-hover:border-brand-yellow/35 group-hover:bg-brand-yellow/15 group-hover:text-brand-yellow"
                            }`}
                          >
                            <DropdownIcon icon={item.icon} />
                          </span>
                          <span className="flex min-w-0 flex-1 flex-col">
                            <span className="flex items-center justify-between gap-2 text-[14px] font-medium leading-[18px] text-white">
                              {item.label}
                              <svg
                                width="13"
                                height="13"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                                className={`shrink-0 transition-transform duration-150 ${
                                  isActive
                                    ? "text-brand-yellow"
                                    : "text-white/35 group-hover:translate-x-0.5 group-hover:text-white/80"
                                }`}
                              >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                              </svg>
                            </span>
                            <span className="mt-0.5 text-[12px] leading-[17px] text-white/55">
                              {item.description}
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <Button href="/donate" variant="yellow" size="sm">
              Make a donation
            </Button>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            onClick={() => {
              setInvolvedOpen(false);
              setMenuOpen((prev) => !prev);
            }}
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
      {menuOpen && (
        <div
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] min-[1100px]:hidden"
        />
      )}
      <div
        id="mobile-nav-menu"
        className={`fixed inset-x-0 top-[74px] z-50 transition-all duration-300 sm:top-[88px] min-[1100px]:hidden ${
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="mx-4 max-h-[calc(100svh-100px)] overflow-y-auto rounded-2xl border border-white/15 bg-black/95 p-5 shadow-2xl backdrop-blur-md sm:mx-8">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href === "/news" && pathname.startsWith("/news/"));

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

          {/* Get Involved links for mobile & tablet */}
          <div className="mt-4 border-t border-white/10 pt-4">
            <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-white/45">
              Get Involved
            </p>
            <ul className="flex flex-col gap-1">
              {GET_INVOLVED_LINKS.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/10 ${
                        isActive ? "bg-white/10 text-white" : "text-[#f9f9f9]"
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] border ${
                          isActive
                            ? "border-brand-yellow/40 bg-brand-yellow/15 text-brand-yellow"
                            : "border-white/10 bg-white/[0.06] text-white/80"
                        }`}
                      >
                        <DropdownIcon icon={item.icon} />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-[15px] font-medium leading-[20px]">
                          {item.label}
                        </span>
                        <span className="text-[12px] leading-[16px] text-white/50">
                          {item.description}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-4 flex flex-col gap-2.5 border-t border-white/10 pt-4 sm:hidden">
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
