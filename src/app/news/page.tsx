import type { Metadata } from "next";
import { DonateCta, Footer } from "@/components/layout";
import { NewsGrid, NewsHero } from "@/components/sections/news";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "News & Updates",
  description:
    "Follow the work as it unfolds. Programme milestones, beneficiary stories, community updates, and announcements from JemiCare Foundation.",
  openGraph: {
    title: `News & Updates | ${SITE_CONFIG.name}`,
    description:
      "Programme milestones, beneficiary stories, community updates, and future announcements from JemiCare Foundation.",
    images: [SITE_CONFIG.ogImage.url],
  },
};

export default function NewsPage() {
  return (
    <>
      <NewsHero />
      <main>
        <NewsGrid />
        <DonateCta />
      </main>
      <Footer />
    </>
  );
}
