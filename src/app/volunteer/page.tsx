import type { Metadata } from "next";
import { DonateCta, Footer } from "@/components/layout";
import { FaqSection } from "@/components/sections/home";
import { VolunteerHero } from "@/components/sections/volunteer";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Volunteer",
  description:
    "Lend your hands. Multiply the impact. Join the JemiCare Foundation volunteer team and contribute your time, skills, and energy to empowering communities across Nigeria.",
  openGraph: {
    title: `Volunteer | ${SITE_CONFIG.name}`,
    description:
      "Lend your hands. Multiply the impact. Apply to volunteer with JemiCare Foundation.",
    images: [SITE_CONFIG.ogImage.url],
  },
};

export default function VolunteerPage() {
  return (
    <>
      <VolunteerHero />
      <main>
        <FaqSection />
        <DonateCta />
      </main>
      <Footer />
    </>
  );
}
