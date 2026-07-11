"use client";

import Link from "next/link";
import type { PageData } from "@/lib/seo-pages";

function ListSection({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 my-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-neutral-700">
          <span className="text-orange-500 mt-1 flex-shrink-0">•</span>
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
          <tr className="bg-orange-50">
            {headers.map((h, i) => (
              <th key={i} className="p-3 text-left font-semibold text-neutral-800 border border-dashed border-gray-300">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="p-3 text-neutral-600 border border-dashed border-gray-300">
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

export default function PageRenderer({ pageData }: { pageData: PageData }) {
  return (
    <div className="bg-[#f7f7f7] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-12 border-l border-r border-dashed border-gray-300 min-h-screen">
        <nav className="mb-8 text-sm text-neutral-500 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-orange-500 transition-colors underline underline-offset-2">
            Home
          </Link>
          {pageData.path !== "/faq" && (
            <span className="text-neutral-300">/</span>
          )}
          <span className={pageData.path !== "/faq" ? "text-neutral-800 font-medium" : ""}>
            {pageData.path === "/faq" ? (
              <span className="text-neutral-800 font-medium">FAQ</span>
            ) : (
              pageData.title.split(" –")[0].split(" |")[0]
            )}
          </span>
        </nav>

        {pageData.sections.map((section, i) => {
          switch (section.type) {
            case "hero":
              return (
                <div key={i} className="mb-10">
                  <h1 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-4">
                    {section.heading}
                  </h1>
                  {section.content && (
                    <p className="text-lg text-neutral-600 leading-relaxed">
                      {section.content}
                    </p>
                  )}
                </div>
              );

            case "text":
              return (
                <div key={i} className="mb-8">
                  {section.heading && (
                    <h2 className="text-xl md:text-2xl font-semibold text-neutral-800 mb-3">
                      {section.heading}
                    </h2>
                  )}
                  {section.subheading && (
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">
                      {section.subheading}
                    </h3>
                  )}
                  {Array.isArray(section.content) ? (
                    section.content.map((p, j) => (
                      <p key={j} className="text-neutral-600 leading-relaxed mb-3">
                        {p}
                      </p>
                    ))
                  ) : (
                    <p className="text-neutral-600 leading-relaxed">{section.content}</p>
                  )}
                </div>
              );

            case "list":
              return (
                <div key={i} className="mb-8">
                  {section.heading && (
                    <h2 className="text-xl md:text-2xl font-semibold text-neutral-800 mb-3">
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
                    <h2 className="text-xl md:text-2xl font-semibold text-neutral-800 mb-3">
                      {section.heading}
                    </h2>
                  )}
                  <TableSection headers={section.headers!} rows={section.rows!} />
                </div>
              );

            case "divider":
              return <hr key={i} className="my-10 border-dashed border-gray-300" />;

            default:
              return null;
          }
        })}

        <div className="mt-12 pt-8 border-t border-dashed border-gray-300">
          <Link
            href="/new"
            className="inline-flex items-center justify-center rounded-lg font-medium transition-colors bg-gradient-to-br from-orange-500 to-pink-400 text-white hover:opacity-90 px-6 py-3 text-lg"
          >
            Create Your Invoice Now
          </Link>
        </div>
      </div>
    </div>
  );
}
