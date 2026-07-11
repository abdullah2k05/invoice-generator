import type { MetadataRoute } from "next";
import { seoPages } from "@/lib/seo-pages";

const siteUrl = process.env.NEXT_PUBLIC_URL || "https://invoice-generator.mabdullah.top";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/new`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const seoPageEntries: MetadataRoute.Sitemap = seoPages.map((page) => ({
    url: `${siteUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...seoPageEntries];
}
