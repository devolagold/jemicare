import type { Metadata } from "next";
import { DonateCta, Footer } from "@/components/layout";
import { FaqSection } from "@/components/sections/home";
import {
  TestimonyFormSection,
  TestimonyHero,
  WhyYourStoryMatters,
} from "@/components/sections/testimony";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Share Your Testimony",
  description:
    "Your story could give someone else a reason to believe in a better tomorrow. Share your experience with JemiCare Foundation through words, pictures, or videos.",
  openGraph: {
    title: `Share Your Testimony | ${SITE_CONFIG.name}`,
    description:
      "Have you received support from JemiCare Foundation? Share your testimony to celebrate impact and inspire others.",
    images: [SITE_CONFIG.ogImage.url],
  },
};

export default function ShareTestimonyPage() {
  return (
    <>
      <TestimonyHero />
      <main>
        <WhyYourStoryMatters />
        <TestimonyFormSection />
        <FaqSection />
        <DonateCta />
      </main>
      <Footer />
    </>
  );
}
