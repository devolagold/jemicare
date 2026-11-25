export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface TrustPillar {
  icon: string;
  title: string;
  description: string;
}

export interface LeadershipQuote {
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

export interface FundAllocationItem {
  label: string;
  shortLabel: string;
  percentage: number;
  color: string;
}

export interface ImpactStat {
  value: string;
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface TimelineItem {
  year: string;
  description: string;
  bullets?: string[];
}

export interface StoryVideo {
  id: number;
  bg: string;
  label: string;
  image: string;
  caption: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface StrategicFocusItem {
  id: "economic" | "education" | "technology";
  title: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  supportHref: string;
  learnMoreHref: string;
}

export interface ContactInfo {
  email: string;
  phones: string[];
  address: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  weight: number;
  mobileAspect: string;
}

export interface NewsArticle {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  content: string[];
}

export interface SupportWayItem {
  id: "individual" | "corporate" | "sponsorship";
  title: string;
  description: string;
}

export interface DonationImpactTier {
  minAmount: number;
  outcome: string;
}

export interface PartnerLogo {
  name: string;
  logo: string;
}

export interface NominationStep {
  number: string;
  id: "submit" | "evidence" | "review" | "support";
  title: string;
  description: string;
}

export interface TestimonyPermissionOption {
  value: "public" | "private";
  title: string;
  description: string;
}
