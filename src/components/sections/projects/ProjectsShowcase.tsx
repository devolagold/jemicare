"use client";

import { useRef } from "react";
import { Button } from "@/components/ui";
import { PROJECTS_LIST } from "@/data/projects";
import { gsap, useGSAP } from "@/lib/gsap";

export function ProjectsShowcase() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const blocks =
          containerRef.current?.querySelectorAll<HTMLElement>(".project-block");

        blocks?.forEach((block) => {
          const textItems = block.querySelectorAll(".project-reveal");
          const photo = block.querySelector(".project-photo");

          gsap.from(textItems, {
            y: 28,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 82%",
              once: true,
            },
          });

          if (photo) {
            gsap.from(photo, {
              y: 36,
              scale: 0.98,
              opacity: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: photo,
                start: "top 85%",
                once: true,
              },
            });
          }
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
        {PROJECTS_LIST.map((project, index) => (
          <div key={project.id}>
            {index > 0 && (
              <div
                aria-hidden="true"
                className="my-14 flex items-center gap-6 sm:my-20 min-[1100px]:my-[88px]"
              >
                <div className="hidden gap-3 sm:flex">
                  <span className="h-14 w-px bg-black/[0.06]" />
                  <span className="h-14 w-px bg-black/[0.06]" />
                  <span className="h-14 w-px bg-black/[0.06]" />
                </div>
                <div className="h-px flex-1 bg-black/[0.07]" />
                <div className="hidden gap-3 sm:flex">
                  <span className="h-14 w-px bg-black/[0.06]" />
                  <span className="h-14 w-px bg-black/[0.06]" />
                  <span className="h-14 w-px bg-black/[0.06]" />
                </div>
              </div>
            )}

            <article id={project.id} className="project-block">
              <div className="grid grid-cols-1 items-start gap-6 sm:gap-8 min-[1100px]:grid-cols-[440px_1fr] min-[1100px]:gap-[80px]">
                <h2 className="project-reveal font-display text-[30px] font-bold leading-[34px] tracking-[-0.02em] text-black sm:text-[36px] sm:leading-[40px] min-[1100px]:text-[40px] min-[1100px]:leading-[44px]">
                  {project.title}
                </h2>

                <div className="flex flex-col items-start">
                  <div className="space-y-4 text-[15px] leading-[24px] text-brand-grey sm:text-[16px] sm:leading-[25px]">
                    {project.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 24)}
                        className="project-reveal"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="project-reveal mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
                    <Button
                      href={project.supportHref}
                      variant="black"
                      size="sm"
                      className="w-full gap-2 px-5 py-3 sm:w-auto"
                    >
                      Support this Programme{" "}
                      <img
                        src="/assets/arrow-badge.svg"
                        alt=""
                        className="h-[18px] w-[18px]"
                      />
                    </Button>
                    <Button
                      href={project.learnMoreHref}
                      variant="white"
                      size="sm"
                      className="w-full border border-black/15 px-5 py-3 text-black hover:border-black/35 sm:w-auto"
                    >
                      Learn more
                    </Button>
                  </div>
                </div>
              </div>

              <div className="project-photo mt-9 overflow-hidden rounded-[20px] bg-black/5 sm:mt-12 sm:rounded-[24px] min-[1100px]:mt-[52px]">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className="aspect-[1200/640] h-full w-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
