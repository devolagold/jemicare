import type { TestimonyPermissionOption } from "@/types";

export const TESTIMONY_PERMISSION_OPTIONS: TestimonyPermissionOption[] = [
  {
    value: "public",
    title: "Option 1 (Public Publication):",
    description:
      "I am happy for Jemicare Foundation to publish my testimony, pictures or videos on its website and social media platforms.",
  },
  {
    value: "private",
    title: "Option 2 (Private Internal Review):",
    description:
      "I would like my testimony to be reviewed and kept private. I do not give permission for public publication.",
  },
];

export const TESTIMONY_MAX_UPLOAD_MB = 30;
export const TESTIMONY_MAX_UPLOAD_BYTES = TESTIMONY_MAX_UPLOAD_MB * 1024 * 1024;
export const TESTIMONY_ACCEPTED_UPLOAD_TYPES = ".jpg,.jpeg,.png,.mp4";
