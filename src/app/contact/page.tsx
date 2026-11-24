import type { Metadata } from "next";
import { DonateCta, Footer } from "@/components/layout";
import { ContactHero } from "@/components/sections/contact";
import { FaqSection } from "@/components/sections/home";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "We are here. Let us talk. Reach out to JemiCare Foundation for partnership enquiries, volunteering, or programme information.",
  openGraph: {
    title: `Contact Us | ${SITE_CONFIG.name}`,
    description:
      "We welcome enquiries from individuals, organisations, and institutions interested in our work.",
    images: [SITE_CONFIG.ogImage.url],
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <main>
        <FaqSection />
        <DonateCta />
      </main>
      <Footer />
    </>
  );
}
