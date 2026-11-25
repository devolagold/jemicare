import type { Metadata } from "next";
import { DonateCta, Footer } from "@/components/layout";
import {
  PartnershipsHero,
  PartnersShowcase,
} from "@/components/sections/partnerships";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Partnerships",
  description:
    "Meaningful impact is built together. Partner with JemiCare Foundation to expand opportunities through education, technology, and livelihood development across Nigeria.",
  openGraph: {
    title: `Partnerships | ${SITE_CONFIG.name}`,
    description:
      "Sustainable impact is best achieved through collaboration. Explore JemiCare Foundation partnerships.",
    images: [SITE_CONFIG.ogImage.url],
  },
};

export default function PartnershipsPage() {
  return (
    <>
      <PartnershipsHero />
      <main>
        <PartnersShowcase />
        <DonateCta />
      </main>
      <Footer />
    </>
  );
}
