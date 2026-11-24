import type { NavLink, SocialLink } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "About us", href: "/about" },
  { label: "Our Projects", href: "/projects" },
  { label: "Volunteer", href: "/#involved" },
  { label: "Media & Gallery", href: "/media" },
  { label: "News", href: "/#news" },
  { label: "Contact us", href: "/contact" },
];

export const FOOTER_LINKS: NavLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Our Impact", href: "/#stories" },
  { label: "Our Journey", href: "/#timeline" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "LinkedIn", href: "#", icon: "/assets/so-linkedin.svg" },
  { label: "Twitter", href: "#", icon: "/assets/so-twitter.svg" },
  { label: "Facebook", href: "#", icon: "/assets/so-facebook.svg" },
  { label: "YouTube", href: "#", icon: "/assets/so-youtube.svg" },
];
