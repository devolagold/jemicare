export const SITE_CONFIG = {
  name: "JemiCare Foundation",
  description:
    "Empowering lives through education, technology, and opportunity across Nigeria.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://jemicarefoundation.org",
  locale: "en_NG",
  email: "help@jemicarefoundation.org",
  ogImage: {
    url: "https://res.cloudinary.com/dn1doiatc/image/upload/v1795508181/og-image_fd4g9a.png",
    width: 1200,
    height: 630,
    alt: "JemiCare Foundation — Empowering lives through education, technology, and opportunity.",
  },
} as const;