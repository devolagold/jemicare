import type { Metadata } from "next";
import { DonateCta, Footer } from "@/components/layout";
import { MediaGalleryGrid, MediaHero } from "@/components/sections/media";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Media & Gallery",
  description:
    "The faces and places behind the mission. Visual moments from JemiCare Foundation's programmes and community activities.",
  openGraph: {
    title: `Media & Gallery | ${SITE_CONFIG.name}`,
    description:
      "Visual moments from JemiCare Foundation's programmes and community activities across Nigeria.",
    images: [SITE_CONFIG.ogImage.url],
  },
};

export default function MediaPage() {
  return (
    <>
      <MediaHero />
      <main>
        <MediaGalleryGrid />
        <DonateCta />
      </main>
      <Footer />
    </>
  );
}
