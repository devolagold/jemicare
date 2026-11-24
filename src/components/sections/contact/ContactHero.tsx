"use client";

import { useRef } from "react";
import { Navbar } from "@/components/layout";
import { CONTACT_INFO } from "@/data/contact";
import { gsap, useGSAP } from "@/lib/gsap";
import { ContactForm } from "./ContactForm";

export function ContactHero() {
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
            ".contact-stagger",
            {
              y: 28,
              opacity: 0,
              duration: 0.8,
              stagger: 0.1,
            },
            0.15,
          )
          .from(
            ".contact-form-card",
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
        {/* Left column: intro & direct contact details */}
        <div className="flex flex-col items-start min-[1100px]:pt-4">
          <p className="contact-stagger flex items-center gap-2 font-label text-[14px] font-medium leading-[1.2] text-white sm:text-[15px]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.25 9.57833V11.6411C12.25 11.9473 12.0132 12.2014 11.7078 12.223C11.4526 12.241 11.2445 12.25 11.0833 12.25C5.92865 12.25 1.75 8.07135 1.75 2.91667C1.75 2.7555 1.75901 2.54734 1.77704 2.29221C1.79863 1.98676 2.05271 1.75 2.35892 1.75H4.42173C4.57146 1.75 4.69686 1.86341 4.71189 2.01238C4.72539 2.14612 4.73794 2.2535 4.74954 2.33451C4.86754 3.15859 5.10856 3.94296 5.45341 4.66843C5.50876 4.78488 5.47266 4.92426 5.36775 4.9992L4.10874 5.89855C4.87522 7.68897 6.31102 9.12479 8.10145 9.89129L8.99914 8.63444C9.07503 8.52827 9.21608 8.49176 9.33392 8.5477C10.0593 8.89227 10.8436 9.13302 11.6676 9.25073C11.7481 9.26228 11.8548 9.27471 11.9876 9.28812C12.1366 9.30317 12.25 9.42859 12.25 9.57833Z" fill="white" />
            </svg>

            Contact us
          </p>

          <h1 className="contact-stagger text-grad mt-5 font-display text-[36px] font-bold leading-[40px] tracking-[-0.02em] sm:text-[48px] sm:leading-[52px] min-[1100px]:text-[56px] min-[1100px]:leading-[60px]">
            We are here. Let us talk.
          </h1>

          <p className="contact-stagger mt-4 max-w-[460px] text-[15px] leading-[24px] text-brand-grey-light sm:text-[16px]">
            We welcome enquiries from individuals, organisations, and
            institutions interested in our work.
          </p>

          <ul className="contact-stagger mt-9 flex flex-col gap-5 sm:mt-11">
            <li className="flex items-center gap-4">
              <span className="grid h-[36px] w-[36px] shrink-0 place-items-center rounded-full bg-white/10 text-white">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.86886 5.71194L9.57442 1.09048C9.83834 0.932188 10.1681 0.932247 10.4319 1.09063L18.1309 5.71192C18.2564 5.78723 18.3332 5.92284 18.3332 6.06917V16.6666C18.3332 17.1269 17.9601 17.5 17.4998 17.5H2.49984C2.0396 17.5 1.6665 17.1269 1.6665 16.6666V6.06927C1.6665 5.92288 1.74332 5.78724 1.86886 5.71194ZM15.2878 6.86984L10.0503 11.4024L4.70585 6.86472L3.62715 8.13523L10.0608 13.5976L16.3785 8.13011L15.2878 6.86984Z" fill="white" />
                </svg>

              </span>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-[15px] leading-[22px] text-white/90 transition-colors hover:text-brand-yellow sm:text-[16px]"
              >
                {CONTACT_INFO.email}
              </a>
            </li>

            <li className="flex items-start gap-4 sm:items-center">
              <span className="grid h-[36px] w-[36px] shrink-0 place-items-center rounded-full bg-white/10 text-white">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5 13.6833V16.6301C17.5 17.0676 17.1617 17.4306 16.7254 17.4614C16.3609 17.4872 16.0636 17.5 15.8333 17.5C8.4695 17.5 2.5 11.5305 2.5 4.16667C2.5 3.93642 2.51288 3.63906 2.53863 3.27458C2.56948 2.83823 2.93245 2.5 3.36988 2.5H6.31675C6.53065 2.5 6.7098 2.66202 6.73127 2.87483C6.75056 3.06589 6.76848 3.21928 6.78506 3.33502C6.95362 4.51227 7.29794 5.6328 7.79058 6.66919C7.86966 6.83554 7.81809 7.03466 7.66821 7.14172L5.86962 8.4265C6.9646 10.9843 9.01575 13.0354 11.5735 14.1304L12.8559 12.3349C12.9643 12.1832 13.1658 12.1311 13.3342 12.211C14.3705 12.7032 15.4909 13.0472 16.668 13.2153C16.783 13.2318 16.9354 13.2496 17.1252 13.2687C17.338 13.2902 17.5 13.4694 17.5 13.6833Z" fill="white" />
                </svg>

              </span>
              <div className="flex flex-wrap gap-x-2.5 gap-y-1.5 text-[15px] leading-[22px] text-white/90 sm:text-[16px]">
                {CONTACT_INFO.phones.map((phone, index) => (
                  <a
                    key={`${phone}-${index}`}
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="whitespace-nowrap transition-colors hover:text-brand-yellow"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </li>

            <li className="flex items-center gap-4">
              <span className="grid h-[36px] w-[36px] shrink-0 place-items-center rounded-full bg-white/10 text-white">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.3033 14.47L10 19.7733L4.6967 14.47C1.76777 11.541 1.76777 6.79232 4.6967 3.86339C7.62563 0.934454 12.3743 0.934454 15.3033 3.86339C18.2323 6.79232 18.2323 11.541 15.3033 14.47ZM10 12.5C11.8409 12.5 13.3333 11.0076 13.3333 9.16669C13.3333 7.32574 11.8409 5.83335 10 5.83335C8.15905 5.83335 6.66667 7.32574 6.66667 9.16669C6.66667 11.0076 8.15905 12.5 10 12.5ZM10 10.8334C9.0795 10.8334 8.33333 10.0872 8.33333 9.16669C8.33333 8.24621 9.0795 7.50002 10 7.50002C10.9205 7.50002 11.6667 8.24621 11.6667 9.16669C11.6667 10.0872 10.9205 10.8334 10 10.8334Z" fill="white" />
                </svg>

              </span>
              <span className="text-[15px] leading-[22px] text-white/90 sm:text-[16px]">
                {CONTACT_INFO.address}
              </span>
            </li>
          </ul>

          <p className="contact-stagger mt-10 max-w-[460px] text-[14px] leading-[22px] text-brand-grey-light/85 sm:mt-14 sm:text-[15px]">
            For partnership enquiries, volunteering, or programme information,
            reach out and a member of our team will respond.
          </p>
        </div>

        {/* Right column: contact form card */}
        <ContactForm />
      </div>

      {/* Decorative hand-drawn contact doodle strip */}
      <div
        aria-hidden="true"
        className="relative z-10 w-full overflow-hidden bg-black"
      >
        <img
          src="/assets/contact-doodles.png"
          alt=""
          className="h-[72px] w-full object-cover object-bottom sm:h-[96px] min-[1100px]:h-auto"
        />
      </div>
    </header>
  );
}
