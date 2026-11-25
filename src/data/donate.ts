import type { DonationImpactTier, SupportWayItem } from "@/types";

export const WAYS_TO_SUPPORT: SupportWayItem[] = [
  {
    id: "individual",
    title: "Individual Donations",
    description:
      "Support our programmes through one-time or recurring financial contributions.",
  },
  {
    id: "corporate",
    title: "Corporate Partnerships",
    description:
      "Collaborate with us through corporate social responsibility initiatives. Align your organisation with measurable, lasting impact.",
  },
  {
    id: "sponsorship",
    title: "Programme Sponsorship",
    description:
      "Fund a specific programme that resonates with your values. Choose the initiative closest to your heart.",
  },
];

export const DONATION_CONFIG = {
  min: 10_000,
  max: 1_000_000,
  step: 10_000,
  defaultAmount: 50_000,
} as const;

export const DONATION_IMPACT_TIERS: DonationImpactTier[] = [
  {
    minAmount: 1_000_000,
    outcome:
      "fully fund a ₦1,000,000 business empowerment grant and EGMP mentorship for a widow entrepreneur.",
  },
  {
    minAmount: 500_000,
    outcome:
      "sponsor five widows through a full Empower Widows for Resilience financial support cycle.",
  },
  {
    minAmount: 250_000,
    outcome:
      "equip multiple women entrepreneurs with capital, business mentorship, and digital literacy tools.",
  },
  {
    minAmount: 100_000,
    outcome:
      "provide a complete household stabilisation grant for one widow in our annual programme cycle.",
  },
  {
    minAmount: 50_000,
    outcome: "provide a week of livelihood support.",
  },
  {
    minAmount: 10_000,
    outcome:
      "provide essential household supplies and educational support materials for a family in need.",
  },
];

export function getDonationImpactOutcome(amount: number): string {
  const matched = DONATION_IMPACT_TIERS.find((tier) => amount >= tier.minAmount);
  return (
    matched?.outcome ??
    DONATION_IMPACT_TIERS[DONATION_IMPACT_TIERS.length - 1].outcome
  );
}
