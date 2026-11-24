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
