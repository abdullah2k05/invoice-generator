import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug, seoPages } from "@/lib/seo-pages";
import PageRenderer from "@/components/seo/PageRenderer";

interface Props {
  params: { slug: string[] };
}

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
    alternates: { canonical: `https://invoice-generator.mabdullah.top${page.path}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `https://invoice-generator.mabdullah.top${page.path}`,
    },
  };
}

export default function SEOPage({ params }: Props) {
  const page = getPageBySlug(params.slug);
  if (!page) notFound();

  return <PageRenderer pageData={page} />;
}
