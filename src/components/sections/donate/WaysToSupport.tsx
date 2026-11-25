"use client";

import { useRef } from "react";
import { WAYS_TO_SUPPORT } from "@/data/donate";
import { gsap, useGSAP } from "@/lib/gsap";
import type { SupportWayItem } from "@/types";

function SupportIcon({ id }: { id: SupportWayItem["id"] }) {
  if (id === "individual") {
    return (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.66602 31.1666C5.66602 24.9074 10.7401 19.8333 16.9993 19.8333C23.2586 19.8333 28.3327 24.9074 28.3327 31.1666H5.66602ZM16.9993 18.4166C12.3031 18.4166 8.49935 14.6129 8.49935 9.91663C8.49935 5.22038 12.3031 1.41663 16.9993 1.41663C21.6956 1.41663 25.4993 5.22038 25.4993 9.91663C25.4993 14.6129 21.6956 18.4166 16.9993 18.4166Z" fill="white" />
      </svg>

    );
  }

  if (id === "corporate") {
    return (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M29.7493 26.9167H32.5827V29.75H1.41602V26.9167H4.24935V5.66667C4.24935 4.88427 4.88362 4.25 5.66602 4.25H19.8327C20.6151 4.25 21.2493 4.88427 21.2493 5.66667V26.9167H24.0827V12.75H28.3327C29.1151 12.75 29.7493 13.3843 29.7493 14.1667V26.9167ZM9.91602 15.5833V18.4167H15.5827V15.5833H9.91602ZM9.91602 9.91667V12.75H15.5827V9.91667H9.91602Z" fill="white" />
      </svg>

    );
  }

  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M27.3301 8.49987H28.3343C29.1167 8.49987 29.7509 9.13414 29.7509 9.91654V19.8331C29.7509 20.6156 29.1167 21.2498 28.3343 21.2498H25.5009L19.5958 12.9827C18.8912 11.9962 17.6372 11.5674 16.4761 11.9157L12.9553 12.9719C11.9569 13.2714 10.8747 12.9986 10.1377 12.2615L9.72291 11.8468C9.09076 11.2147 9.19497 10.1622 9.93881 9.66633L17.5903 4.56534C18.5239 3.94301 19.7365 3.9301 20.6831 4.53244L26.5697 8.27839C26.7969 8.42305 27.0608 8.49987 27.3301 8.49987ZM7.12235 20.2508L4.83335 22.2537C4.16552 22.8379 4.1932 23.8854 4.891 24.4338L12.1737 30.1558C12.8538 30.6902 13.8499 30.4957 14.279 29.7447L15.2761 27.9997C15.8853 26.9336 15.7385 25.5966 14.9126 24.6881L11.0846 20.4772C10.0461 19.3348 8.28421 19.2342 7.12235 20.2508ZM9.98187 7.08329H4.25065C3.46825 7.08329 2.83398 7.71756 2.83398 8.49996V19.1473C2.83398 19.7259 3.01071 20.2828 3.33009 20.749C3.36396 20.717 3.39861 20.6854 3.43404 20.6544L5.72304 18.6515C7.75629 16.8725 10.8396 17.0485 12.657 19.0477L16.4851 23.2586C17.9304 24.8484 18.1873 27.1883 17.1212 29.0539L16.1943 30.6762C16.9917 30.9783 17.9002 30.9102 18.6567 30.4563L24.9031 26.7085C25.612 26.2831 25.8075 25.3436 25.3272 24.6706L17.8661 14.2178C17.6899 13.9712 17.3764 13.864 17.0861 13.951L13.5653 15.0073C11.8181 15.5314 9.92429 15.054 8.63447 13.7641L8.21971 13.3494C6.63936 11.769 6.89989 9.13795 8.75949 7.89821L9.98187 7.08329Z" fill="white" />
    </svg>
  );
}

export function WaysToSupport() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".ways-head", {
          y: 26,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 82%",
            once: true,
          },
        });

        gsap.from(".ways-card", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ways-grid",
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
      className="bg-black pt-14 pb-16 text-white sm:pt-20 sm:pb-24 min-[1100px]:pt-[88px] min-[1100px]:pb-[112px]"
    >
      <div className="mx-auto flex w-[min(1200px,calc(100%-32px))] flex-col items-center text-center sm:w-[min(1200px,calc(100%-48px))]">
        <h2 className="ways-head text-grad font-display text-[32px] font-bold leading-[38px] tracking-[-0.02em] sm:text-[40px] sm:leading-[46px] min-[1100px]:text-[44px] min-[1100px]:leading-[48px]">
          Ways to Support
        </h2>

        <div className="ways-grid mt-12 grid w-full grid-cols-1 gap-10 text-left sm:mt-16 md:grid-cols-3 md:gap-8 min-[1100px]:mt-[68px] min-[1100px]:gap-[52px]">
          {WAYS_TO_SUPPORT.map((item) => (
            <article key={item.id} className="ways-card flex flex-col gap-3.5">
              <span className="mb-3 grid h-[66px] w-[66px] place-items-center rounded-full bg-white/[0.1] text-white sm:mb-5">
                <SupportIcon id={item.id} />
              </span>
              <h3 className="font-display text-[20px] font-semibold leading-[26px] tracking-[-0.02em] text-white sm:text-[22px]">
                {item.title}
              </h3>
              <p className="text-[15px] leading-[24px] text-brand-grey-light/85">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
