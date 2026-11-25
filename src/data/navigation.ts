import type { NavDropdownItem, NavLink, SocialLink } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "About us", href: "/about" },
  { label: "Our Projects", href: "/projects" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "Media & Gallery", href: "/media" },
  { label: "News", href: "/news" },
  { label: "Contact us", href: "/contact" },
];

export const GET_INVOLVED_LINKS: NavDropdownItem[] = [
  {
    label: "Partnerships",
    description: "Collaborate with us to scale lasting impact",
    href: "/partnerships",
    icon: "partnerships",
  },
  {
    label: "Nominate a Widow",
    description: "Recommend a deserving widow for support",
    href: "/nominate-a-widow",
    icon: "nominate",
  },
  {
    label: "Share Your Testimony",
    description: "Tell your story and inspire others",
    href: "/share-your-testimony",
    icon: "testimony",
  },
];

export const FOOTER_LINKS: NavLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Partnerships", href: "/partnerships" },
  { label: "Nominate a Widow", href: "/nominate-a-widow" },
  { label: "Share a Testimony", href: "/share-your-testimony" },
  { label: "Our Impact", href: "/#stories" },
  { label: "Our Journey", href: "/#timeline" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "LinkedIn", href: "#", icon: "/assets/so-linkedin.svg" },
  { label: "Twitter", href: "#", icon: "/assets/so-twitter.svg" },
  { label: "Facebook", href: "#", icon: "/assets/so-facebook.svg" },
  { label: "YouTube", href: "#", icon: "/assets/so-youtube.svg" },
];
