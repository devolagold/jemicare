import type { Metadata } from "next";
import { DonateCta, Footer } from "@/components/layout";
import {
  AboutApproach,
  AboutHero,
  AboutStoryCard,
  AboutStrategicFocus,
  AboutVisionMission,
} from "@/components/sections/about";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Founded in 2020, JemiCare Foundation is a Nigerian non-governmental organisation dedicated to alleviating poverty through education, technology, and sustainable livelihood initiatives.",
  openGraph: {
    title: `About Us | ${SITE_CONFIG.name}`,
    description:
      "We build pathways out of poverty. Not dependencies. Learn about JemiCare Foundation's vision, mission, story, approach, and strategic focus.",
    images: [SITE_CONFIG.ogImage.url],
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <main>
        <AboutVisionMission />
        <AboutStoryCard />
        <AboutApproach />
        <AboutStrategicFocus />
        <DonateCta />
      </main>
      <Footer />
    </>
  );
}
