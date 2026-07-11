import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug, seoPages } from "@/lib/seo-pages";
import PageRenderer from "@/components/seo/PageRenderer";

interface Props {
  params: { slug: string[] };
}

const siteUrl = "https://invoice-generator.mabdullah.top";

export function generateStaticParams() {
  return seoPages.map((page) => ({
    slug: page.path.split("/").filter(Boolean),
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const page = getPageBySlug(params.slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `${siteUrl}${page.path}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${siteUrl}${page.path}`,
      siteName: "Free Invoice Generator",
      type: page.path.startsWith("/blog") ? "article" : "website",
      images: [{ url: `${siteUrl}/og-image.jpeg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: `${siteUrl}/og-image.jpeg`,
    },
  };
}

export default function SEOPage({ params }: Props) {
  const page = getPageBySlug(params.slug);
  if (!page) notFound();

  return <PageRenderer pageData={page} siteUrl={siteUrl} />;
}
