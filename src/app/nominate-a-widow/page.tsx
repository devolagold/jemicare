import type { Metadata } from "next";
import { DonateCta, Footer } from "@/components/layout";
import { FaqSection } from "@/components/sections/home";
import {
  NominateHero,
  NominationFormSection,
  NominationHowItWorks,
} from "@/components/sections/nominate";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Nominate a Widow",
  description:
    "Do you know a widow who deserves a helping hand? Nominate a widow across Nigeria to receive free financial assistance and support from JemiCare Foundation.",
  openGraph: {
    title: `Nominate a Widow | ${SITE_CONFIG.name}`,
    description:
      "Nominate a deserving widow in Nigeria to receive support from JemiCare Foundation. Free submission, open year-round.",
    images: [SITE_CONFIG.ogImage.url],
  },
};

export default function NominateWidowPage() {
  return (
    <>
      <NominateHero />
      <main>
        <NominationHowItWorks />
        <NominationFormSection />
        <FaqSection />
        <DonateCta />
      </main>
      <Footer />
    </>
  );
}
