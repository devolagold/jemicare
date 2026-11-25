import Link from "next/link";
import type { NewsArticle } from "@/types";

interface NewsArticleNavProps {
  prevArticle: NewsArticle | null;
  nextArticle: NewsArticle | null;
}

export function NewsArticleNav({
  prevArticle,
  nextArticle,
}: NewsArticleNavProps) {
  if (!prevArticle && !nextArticle) {
    return null;
  }

  return (
    <nav
      aria-label="News article navigation"
      className="mt-14 border-t border-black/10 pt-10"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {prevArticle ? (
          <Link
            href={`/news/${prevArticle.slug}`}
            className="group flex flex-col justify-between gap-3 rounded-[16px] border border-black/10 bg-brand-tint/60 p-5 text-left transition-all duration-200 hover:border-black/30 hover:bg-brand-tint sm:p-6"
          >
            <span className="flex items-center gap-2 text-[13px] font-semibold text-brand-grey transition-colors group-hover:text-black">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:-translate-x-1"
              >
                <path d="M19 12H5" />
                <path d="m11 18-6-6 6-6" />
              </svg>
              Previous news
            </span>

            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-medium text-brand-grey">
                {prevArticle.date}
              </span>
              <span className="line-clamp-2 font-display text-[17px] font-bold leading-[22px] tracking-[-0.02em] text-black sm:text-[18px]">
                {prevArticle.title}
              </span>
            </div>
          </Link>
        ) : (
          <div className="hidden sm:block" aria-hidden="true" />
        )}

        {nextArticle ? (
          <Link
            href={`/news/${nextArticle.slug}`}
            className="group flex flex-col justify-between gap-3 rounded-[16px] border border-black/10 bg-brand-tint/60 p-5 text-left transition-all duration-200 hover:border-black/30 hover:bg-brand-tint sm:items-end sm:p-6 sm:text-right"
          >
            <span className="flex items-center gap-2 text-[13px] font-semibold text-brand-grey transition-colors group-hover:text-black">
              Next news
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </span>

            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-medium text-brand-grey">
                {nextArticle.date}
              </span>
              <span className="line-clamp-2 font-display text-[17px] font-bold leading-[22px] tracking-[-0.02em] text-black sm:text-[18px]">
                {nextArticle.title}
              </span>
            </div>
          </Link>
        ) : (
          <div className="hidden sm:block" aria-hidden="true" />
        )}
      </div>
    </nav>
  );
}
