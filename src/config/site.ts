export const SITE_CONFIG = {
  name: "JemiCare Foundation",
  description:
    "Empowering lives through education, technology, and opportunity across Nigeria.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://jemicarefoundation.org",
  locale: "en_NG",
  email: "help@jemicarefoundation.org",
  ogImage: {
    url: "/og-image.png",
    width: 1200,
    height: 630,
    alt: "JemiCare Foundation — Empowering lives through education, technology, and opportunity.",
  },
} as const;
