import type { Metadata } from "next";
import { DonateCta, Footer } from "@/components/layout";
import {
  ProjectsHero,
  ProjectsShowcase,
} from "@/components/sections/projects";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Projects built for lasting change. Each initiative is designed to move people from crisis to confidence, from short-term relief to long-term independence.",
  openGraph: {
    title: `Our Projects | ${SITE_CONFIG.name}`,
    description:
      "Projects built for lasting change. Explore JemiCare Foundation's empowerment, education, and technology initiatives.",
    images: [SITE_CONFIG.ogImage.url],
  },
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectsHero />
      <main>
        <ProjectsShowcase />
        <DonateCta />
      </main>
      <Footer />
    </>
  );
}
