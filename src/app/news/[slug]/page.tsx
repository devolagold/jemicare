import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DonateCta, Footer, Navbar } from "@/components/layout";
import { NewsArticleNav } from "@/components/sections/news";
import { SITE_CONFIG } from "@/config/site";
import { NEWS_ARTICLES } from "@/data/news";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return NEWS_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = NEWS_ARTICLES.find((item) => item.slug === slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | ${SITE_CONFIG.name}`,
      description: article.excerpt,
      images: [SITE_CONFIG.ogImage.url],
    },
  };
}

export default async function NewsArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const currentIndex = NEWS_ARTICLES.findIndex((item) => item.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const article = NEWS_ARTICLES[currentIndex];
  const prevArticle = currentIndex > 0 ? NEWS_ARTICLES[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < NEWS_ARTICLES.length - 1
      ? NEWS_ARTICLES[currentIndex + 1]
      : null;

  return (
    <>
      <header className="overflow-hidden bg-black text-white">
        <Navbar />
        <div className="mx-auto w-[min(820px,calc(100%-32px))] pt-10 pb-8 sm:w-[min(820px,calc(100%-48px))] sm:pt-14 sm:pb-12">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-brand-grey-light transition-colors hover:text-white"
          >
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
            >
              <path d="M19 12H5" />
              <path d="m11 18-6-6 6-6" />
            </svg>
            Back to News &amp; Updates
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-[13px] font-medium">
            <time className="text-brand-yellow">{article.date}</time>
            <span className="text-white/25" aria-hidden="true">
              ·
            </span>
            <span className="text-brand-grey-light">
              Article {currentIndex + 1} of {NEWS_ARTICLES.length}
            </span>
          </div>

          <h1 className="text-grad mt-3 font-display text-[32px] font-bold leading-[38px] tracking-[-0.02em] sm:text-[44px] sm:leading-[48px]">
            {article.title}
          </h1>
        </div>
        <img
          src="/assets/line art.svg"
          alt="line_art"
          className="w-full pt-4 sm:pt-6"
        />
      </header>

      <main className="bg-white text-black">
        <article className="mx-auto w-[min(820px,calc(100%-32px))] py-12 sm:w-[min(820px,calc(100%-48px))] sm:py-16">
          <div className="mx-auto aspect-[16/10] w-full overflow-hidden rounded-[16px] bg-[#faf2e8]">
            <img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="mt-10 space-y-5 text-[16px] leading-[26px] text-brand-grey">
            {article.content.map((paragraph) => (
              <p key={paragraph.slice(0, 28)}>{paragraph}</p>
            ))}
          </div>

          <NewsArticleNav prevArticle={prevArticle} nextArticle={nextArticle} />
        </article>

        <DonateCta />
      </main>

      <Footer />
    </>
  );
}
