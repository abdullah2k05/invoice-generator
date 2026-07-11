import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_URL || "https://invoice-generator.mabdullah.top";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
