import type { Metadata } from "next";
import { DonateCta, Footer } from "@/components/layout";
import {
  DonateHero,
  ImpactCalculator,
  WaysToSupport,
} from "@/components/sections/donate";
import { SITE_CONFIG } from "@/config/site";
import { FaqSection } from "@/components/sections/home";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Your generosity builds futures that outlast the moment. Support JemiCare Foundation through individual donations, corporate partnerships, or programme sponsorships.",
  openGraph: {
    title: `Donate | ${SITE_CONFIG.name}`,
    description:
      "Every contribution creates opportunities for individuals and communities facing economic hardship across Nigeria.",
    images: [SITE_CONFIG.ogImage.url],
  },
};

export default function DonatePage() {
  return (
    <>
      <DonateHero />
      <main>
        <WaysToSupport />
        <ImpactCalculator />
      </main>
      <FaqSection/>
      <DonateCta />
      <Footer />
    </>
  );
}
