"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { PageData } from "@/lib/seo-pages";
import { getRelatedPages } from "@/lib/seo-pages";
import { AdBanner } from "@/components/AdBanner";
import { SeoNativeAd } from "@/components/SeoNativeAd";
import { Capacitor } from "@capacitor/core";

function ListSection({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 my-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-[#475569]">
          <span className="text-[#4F46E5] mt-1 flex-shrink-0">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function TableSection({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-[#F1F5F9]">
            {headers.map((h, i) => (
              <th key={i} className="p-3 text-left font-semibold text-[#0F172A] border border-[#E2E8F0]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="p-3 text-[#475569] border border-[#E2E8F0]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function injectJsonLd(page: PageData, siteUrl: string) {
  const url = `${siteUrl}${page.path}`;
  const isBlog = page.path.startsWith("/blog");
  const isFAQ = page.path === "/faq";
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: page.title.split(" |")[0].replace(/ – .*$/, ""), item: url },
    ],
  };

  const webPage: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": isBlog ? "Article" : isFAQ ? "FAQPage" : "WebPage",
    name: page.title,
    description: page.description,
    url,
    breadcrumb,
  };

  if (isBlog) {
    webPage.headline = page.title;
    webPage.author = { "@type": "Person", name: "Muhammad Abdullah" };
  }

  let script = document.getElementById("ld-json");
  if (!script) {
    const s = document.createElement("script");
    s.id = "ld-json";
    s.type = "application/ld+json";
    document.head.appendChild(s);
    script = s;
  }
  script.textContent = JSON.stringify(webPage);
}

export default function PageRenderer({ pageData, siteUrl }: { pageData: PageData; siteUrl: string }) {
  const relatedPages = getRelatedPages(pageData.category, pageData.path);

  useEffect(() => {
    injectJsonLd(pageData, siteUrl);
  }, [pageData, siteUrl]);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      import("@/app/component/seo/interstitialAdPlugin").then(
        ({ InterstitialAd }) => {
          InterstitialAd.showAd({ adUnitId: "ca-app-pub-6235199437488383/1783336018" }).catch((e: unknown) => {
            console.error("InterstitialAd failed:", e);
          });
        }
      ).catch((e: unknown) => {
        console.error("InterstitialAd import failed:", e);
      });
    }
  }, []);

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      {/* Real slot: 3591241703 */}
      <AdBanner adSlot="9214589741" format="horizontal" className="border-b border-[#E2E8F0]" />
      <div className="max-w-3xl mx-auto px-4 py-12 border-l border-r border-[#E2E8F0] min-h-screen">
        <nav className="mb-8 text-sm text-[#64748B] flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-[#0F172A] transition-colors underline underline-offset-2">
            Home
          </Link>
          <span className="text-[#CBD5E1]">/</span>
          <span className="text-[#0F172A] font-medium">
            {pageData.title.split(" |")[0].replace(/ – .*$/, "")}
          </span>
        </nav>
        <SeoNativeAd />

        {pageData.sections.map((section, i) => {
          switch (section.type) {
            case "hero":
              return (
                <div key={i} className="mb-10">
                  <h1 className="text-3xl md:text-5xl font-bold text-[#0F172A] mb-4">
                    {section.heading}
                  </h1>
                  {section.content && (
                    <p className="text-lg text-[#475569] leading-relaxed">
                      {section.content}
                    </p>
                  )}
                </div>
              );

            case "text":
              return (
                <div key={i} className="mb-8">
                  {section.heading && (
                    <h2 className="text-xl md:text-2xl font-semibold text-[#0F172A] mb-3">
                      {section.heading}
                    </h2>
                  )}
                  {section.subheading && (
                    <h3 className="text-lg font-medium text-[#334155] mb-2">
                      {section.subheading}
                    </h3>
                  )}
                  {Array.isArray(section.content) ? (
                    section.content.map((p, j) => (
                      <p key={j} className="text-[#475569] leading-relaxed mb-3">
                        {p}
                      </p>
                    ))
                  ) : (
                    <p className="text-[#475569] leading-relaxed">{section.content}</p>
                  )}
                </div>
              );

            case "list":
              return (
                <div key={i} className="mb-8">
                  {section.heading && (
                    <h2 className="text-xl md:text-2xl font-semibold text-[#0F172A] mb-3">
                      {section.heading}
                    </h2>
                  )}
                  <ListSection items={section.items!} />
                </div>
              );

            case "table":
              return (
                <div key={i} className="mb-8">
                  {section.heading && (
                    <h2 className="text-xl md:text-2xl font-semibold text-[#0F172A] mb-3">
                      {section.heading}
                    </h2>
                  )}
                  <TableSection headers={section.headers!} rows={section.rows!} />
                </div>
              );

            case "divider":
              return <hr key={i} className="my-10 border-[#E2E8F0]" />;

            default:
              return null;
          }
        })}

        {relatedPages.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[#E2E8F0]">
            <h2 className="text-xl font-semibold text-[#0F172A] mb-4">
              Related Pages
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {relatedPages.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="p-4 rounded-lg border border-[#E2E8F0] hover:border-[#4F46E5] hover:bg-[#F1F5F9] transition-colors text-[#475569] hover:text-[#0F172A]"
                >
                  <span className="font-medium text-sm">{link.label}</span>
                  <span className="block text-xs text-[#94A3B8] mt-1">Learn more →</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-[#E2E8F0] text-center">
          <p className="text-sm text-[#64748B] mb-3">
            Prefer using your phone? Download Invoice Maker for Android.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://www.amazon.com/dp/B0H8ZT83M2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-medium text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
            >
              Amazon Appstore
            </a>
            <Link
              href="/download"
              className="inline-flex items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-medium text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
            >
              Download APK
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#E2E8F0]">
          <Link
            href="/new"
            className="inline-flex items-center justify-center rounded-lg font-medium transition-colors bg-[#0F172A] text-white hover:bg-[#1E293B] px-6 py-3 text-lg"
          >
            Create Your Free Invoice Now →
          </Link>
        </div>
      </div>
    </div>
  );
}
