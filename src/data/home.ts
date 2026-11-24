import type {
  FaqItem,
  FundAllocationItem,
  ImpactStat,
  LeadershipQuote,
  StoryVideo,
  TimelineItem,
  TrustPillar,
} from "@/types";

export const INVOLVE_WAYS: string[] = [
  "Volunteer your time and skills",
  "Partner with us on community initiatives",
  "Support our programmes through donations",
  "Advocate for our mission and share our work",
];

export const LEADERSHIP_QUOTES: LeadershipQuote[] = [
  {
    name: "Amina Bello",
    role: "Director of Programmes, JemiCare Foundation",
    avatar: "/assets/avatar-2.png",
    quote:
      "Every programme we design begins by listening to the communities we serve, ensuring support translates into lasting independence and dignity.",
  },
  {
    name: "Oluwasesan Yackon",
    role: "Founder, JemiCare Foundation",
    avatar: "/assets/founder.png",
    quote:
      "True change happens when people are given not just support, but the knowledge and opportunities needed to transform their own lives.",
  },
  {
    name: "Tunde Adeyemi",
    role: "Head of Community Partnerships, JemiCare Foundation",
    avatar: "/assets/avatar-3.png",
    quote:
      "When volunteers, local leaders, and partners unite around a clear mission, transparent stewardship turns generosity into measurable impact.",
  },
];

export const TRUST_PILLARS: TrustPillar[] = [
  {
    icon: "/assets/ic-commit.svg",
    title: "Our Commitment",
    description:
      "Trust is built through transparency, responsible stewardship, and clear accountability to the communities we serve and the partners who support our work.",
  },
  {
    icon: "/assets/ic-resources.svg",
    title: "Responsible Use of Resources",
    description:
      "All funds are directed toward programmes supporting vulnerable individuals and communities. We maintain clear internal processes to ensure every naira is used effectively.",
  },
  {
    icon: "/assets/ic-monitor.svg",
    title: "Monitoring and Learning",
    description:
      "We continuously evaluate our programmes to understand what works, identify gaps, and strengthen future interventions. Impact without accountability is incomplete.",
  },
];

export const FUND_ALLOCATIONS: FundAllocationItem[] = [
  {
    label: "Livelihood & Widow Grants",
    shortLabel: "Livelihood Grants",
    percentage: 55,
    color: "#edb01a",
  },
  {
    label: "Business Grants & Mentorship",
    shortLabel: "Business & EGMP",
    percentage: 20,
    color: "#111111",
  },
  {
    label: "Education & Tech Access",
    shortLabel: "Education & Tech",
    percentage: 15,
    color: "#595959",
  },
  {
    label: "Community Outreach & M&E",
    shortLabel: "Outreach & M&E",
    percentage: 6,
    color: "#9ca3af",
  },
  {
    label: "Operations & Governance",
    shortLabel: "Operations",
    percentage: 4,
    color: "#d4d4d8",
  },
];

export const IMPACT_STATS: ImpactStat[] = [
  { value: "500+", target: 500, suffix: "+", label: "Support Grants Provided" },
  {
    value: "₦47M+",
    target: 47,
    prefix: "₦",
    suffix: "M+",
    label: "Distributed in Livelihood Support",
  },
  { value: "5", target: 5, label: "Programme Cycles Since 2021" },
  { value: "6", target: 6, label: "Volunteer Team Members" },
];

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    year: "2021",
    description:
      "₦50,000 support provided to 30 widows. The first programme cycle.",
  },
  {
    year: "2022",
    description:
      "₦50,000 support provided to 70 widows. Expanded to new communities.",
  },
  {
    year: "2023",
    description:
      "₦100,000 support provided to 100 widows. Programme funding doubled.",
  },
  {
    year: "2024",
    description:
      "₦100,000 support provided to 150 widows. Partnerships deepened.",
  },
  {
    year: "2025",
    description:
      "Programme evolved to combine financial support with business empowerment:",
    bullets: [
      "147 widows received ₦100,000 each",
      "3 widows received ₦1,000,000 business grants",
      "EmpowerHer Growth Mentorship Programme (EGMP) launched",
    ],
  },
];

export const STORY_VIDEOS: StoryVideo[] = [
  {
    id: 1,
    bg: "#001514",
    label: "Play story 1",
    image: "/assets/story-1.png",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
  {
    id: 2,
    bg: "#edb01a",
    label: "Play story 2",
    image: "/assets/story-2.png",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
  {
    id: 3,
    bg: "#edb01a",
    label: "Play story 3",
    image: "/assets/story-3.png",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
  {
    id: 4,
    bg: "#6809b9",
    label: "Play story 4",
    image: "/assets/story-4.png",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is JemiCare Foundation?",
    answer: "Placeholder answer — not provided in the design.",
  },
  {
    question: "Who can benefit from your programmes?",
    answer:
      "Widows, vulnerable women, young people, and families experiencing financial hardship across Nigeria. We work with community leaders to identify individuals who genuinely need support and ensure resources reach where they matter most.",
  },
  {
    question: "How can I request help or support?",
    answer: "Placeholder answer — not provided in the design.",
  },
  {
    question: "How can I support JemiCare Foundation?",
    answer: "Placeholder answer — not provided in the design.",
  },
  {
    question: "How are donations used?",
    answer: "Placeholder answer — not provided in the design.",
  },
  {
    question: "Can I volunteer?",
    answer: "Placeholder answer — not provided in the design.",
  },
  {
    question: "Do you accept corporate partnerships?",
    answer: "Placeholder answer — not provided in the design.",
  },
];
