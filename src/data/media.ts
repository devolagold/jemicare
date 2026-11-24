import type { GalleryPhoto } from "@/types";

export const MEDIA_HERO_CARDS = [
  {
    src: "/assets/gallery/gallery-02.jpg",
    alt: "Smiling community member waving during outreach",
  },
  {
    src: "/assets/gallery/gallery-03.jpg",
    alt: "JemiCare volunteers smiling together in green shirts",
  },
  {
    src: "/assets/gallery/gallery-04.jpg",
    alt: "Women from the JemiCare community celebrating together",
  },
] as const;

export const MEDIA_GALLERY_COLUMNS: GalleryPhoto[][] = [
  [
    {
      id: "gallery-01",
      src: "/assets/gallery/gallery-01.jpg",
      alt: "Community event attendees celebrating together",
      weight: 2.0,
      mobileAspect: "aspect-[3/4]",
    },
    {
      id: "gallery-02",
      src: "/assets/gallery/gallery-02.jpg",
      alt: "Team group photo during community outreach",
      weight: 0.95,
      mobileAspect: "aspect-[16/10]",
    },
    {
      id: "gallery-03",
      src: "/assets/gallery/gallery-03.jpg",
      alt: "Volunteers laughing together in green shirts",
      weight: 1.425,
      mobileAspect: "aspect-square",
    },
    {
      id: "gallery-04",
      src: "/assets/gallery/gallery-04.jpg",
      alt: "Two women smiling warmly at a community gathering",
      weight: 1.425,
      mobileAspect: "aspect-square",
    },
  ],
  [
    {
      id: "gallery-05",
      src: "/assets/gallery/gallery-05.jpg",
      alt: "Community partners laughing in conversation",
      weight: 0.95,
      mobileAspect: "aspect-[16/10]",
    },
    {
      id: "gallery-06",
      src: "/assets/gallery/gallery-06.jpg",
      alt: "Interactive team-building activity at an event",
      weight: 2.0,
      mobileAspect: "aspect-[3/4]",
    },
    {
      id: "gallery-07",
      src: "/assets/gallery/gallery-07.jpg",
      alt: "Warm embrace between beneficiaries during outreach",
      weight: 1.95,
      mobileAspect: "aspect-[3/4]",
    },
    {
      id: "gallery-08",
      src: "/assets/gallery/gallery-08.jpg",
      alt: "One-on-one mentorship session",
      weight: 0.9,
      mobileAspect: "aspect-[16/10]",
    },
  ],
  [
    {
      id: "gallery-09",
      src: "/assets/gallery/gallery-09.jpg",
      alt: "Technology showcase and hands-on learning session",
      weight: 1.95,
      mobileAspect: "aspect-[3/4]",
    },
    {
      id: "gallery-10",
      src: "/assets/gallery/gallery-10.jpg",
      alt: "Volunteers planning programme activities around laptops",
      weight: 0.95,
      mobileAspect: "aspect-[16/10]",
    },
    {
      id: "gallery-11",
      src: "/assets/gallery/gallery-11.jpg",
      alt: "Team discussion during a programme workshop",
      weight: 0.95,
      mobileAspect: "aspect-[16/10]",
    },
    {
      id: "gallery-12",
      src: "/assets/gallery/gallery-12.jpg",
      alt: "Portrait of a smiling beneficiary in blue patterned attire",
      weight: 1.95,
      mobileAspect: "aspect-[3/4]",
    },
  ],
  [
    {
      id: "gallery-13",
      src: "/assets/gallery/gallery-13.jpg",
      alt: "JemiCare team and volunteers group portrait",
      weight: 1.425,
      mobileAspect: "aspect-square",
    },
    {
      id: "gallery-14",
      src: "/assets/gallery/gallery-14.jpg",
      alt: "Mentors collaborating with digital tools",
      weight: 1.425,
      mobileAspect: "aspect-square",
    },
    {
      id: "gallery-15",
      src: "/assets/gallery/gallery-15.jpg",
      alt: "Portrait of a woman in patterned shawl",
      weight: 2.0,
      mobileAspect: "aspect-[3/4]",
    },
    {
      id: "gallery-16",
      src: "/assets/gallery/gallery-16.jpg",
      alt: "Family sharing a warm meal together",
      weight: 0.95,
      mobileAspect: "aspect-[16/10]",
    },
  ],
];
