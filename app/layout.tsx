import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import Script from "next/script";
import Link from "next/link";
import { BackButtonHandler } from "@/components/BackButtonHandler";
import { AppInit } from "@/components/AppInit";

export const viewport: Viewport = {
  themeColor: "#f97316",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
    languages: { "en-US": "/en-US" },
  },
  title: "Free Invoice Generator: Create & Send Professional Invoices in Minutes",
  description:
    "Get paid on time with our free invoice maker. Create professional invoices & get them to clients instantly.",
  keywords: [
    "invoice generator",
    "free invoice template",
    "invoice maker",
    "online invoice",
    "create invoice",
  ],
  robots: "index, follow",
  openGraph: {
    title:
      "Free Invoice Generator: Create & Send Professional Invoices in Minutes",
    description:
      "Get paid on time with our free invoice maker. Create professional invoices & get them to clients instantly.",
    url: "https://invoice-generator.mabdullah.top",
    type: "website",
    images: "/og-image.jpeg",
    siteName: "Invoice Generator",
  },
};

const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-0000000000000000";
const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-2KHJ1FLV47";

const footerColumns = [
  {
    heading: "Templates",
    links: [
      { label: "All Templates", href: "/invoice-template" },
      { label: "PDF Template", href: "/invoice-template-pdf" },
      { label: "Word Template", href: "/invoice-template-word" },
      { label: "Excel Template", href: "/invoice-template-excel" },
      { label: "Google Docs", href: "/invoice-template-google-docs" },
      { label: "Google Sheets", href: "/invoice-template-google-sheets" },
    ],
  },
  {
    heading: "Examples",
    links: [
      { label: "Invoice Example", href: "/invoice-example" },
      { label: "Freelance", href: "/freelance-invoice-example" },
      { label: "Web Design", href: "/web-design-invoice-example" },
      { label: "Consulting", href: "/consulting-invoice-example" },
      { label: "Dev Project", href: "/software-development-invoice-example" },
    ],
  },
  {
    heading: "Countries",
    links: [
      { label: "US", href: "/invoice-generator-us" },
      { label: "UK", href: "/invoice-generator-uk" },
      { label: "Pakistan", href: "/invoice-generator-pakistan" },
      { label: "India", href: "/invoice-generator-india" },
      { label: "Canada", href: "/invoice-generator-canada" },
    ],
  },
  {
    heading: "By Industry",
    links: [
      { label: "Freelancers", href: "/invoice-generator-for-freelancers" },
      { label: "Designers", href: "/invoice-generator-for-designers" },
      { label: "Developers", href: "/invoice-generator-for-developers" },
      { label: "Consultants", href: "/invoice-generator-for-consultants" },
      { label: "Agencies", href: "/invoice-generator-for-agencies" },
    ],
  },
  {
    heading: "Features",
    links: [
      { label: "Invoice Generator", href: "/invoice-generator" },
      { label: "PDF Generator", href: "/invoice-pdf-generator" },
      { label: "Invoice Maker", href: "/invoice-maker" },
      { label: "Tax Calculator", href: "/tax-calculator" },
      { label: "GST Generator", href: "/gst-invoice-generator" },
      { label: "VAT Generator", href: "/vat-invoice-generator" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "How to Create an Invoice", href: "/blog/how-to-create-an-invoice" },
      { label: "Invoice vs Receipt", href: "/blog/invoice-vs-receipt" },
      { label: "Payment Terms Guide", href: "/blog/how-to-write-payment-terms" },
      { label: "Tax Guide", href: "/blog/how-to-calculate-invoice-tax" },
      { label: "Late Fee Guide", href: "/blog/late-payment-fee-guide" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/blog/how-to-create-an-invoice" },
      { label: "Portfolio", href: "https://mabdullah.top", external: true },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "DMCA", href: "/dmca" },
    ],
  },
];

const footerBottomLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "https://mabdullah.top", external: true },
  { label: "GitHub", href: "https://github.com/abdullah2k05/invoice-generator", external: true },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f97316" />
        <meta name="msapplication-TileColor" content="#f97316" />
        <meta name="theme-color" content="#f97316" />
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}
        </Script>
      </head>
      <body className={`${GeistSans.className} flex flex-col min-h-screen`}>
        <AppInit />
        <BackButtonHandler />
        {/* Navbar */}
        <nav className="border-b border-[#E2E8F0] bg-white sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between border-l border-r border-[#E2E8F0]">
            <Link href="/" className="font-bold text-lg text-[#0F172A] hover:text-[#4F46E5] transition-colors">
              Invoice Generator
            </Link>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/new" className="text-[#64748B] hover:text-[#0F172A] transition-colors">Create</Link>
              <Link href="/invoice-template" className="text-[#64748B] hover:text-[#0F172A] transition-colors">Templates</Link>
              <Link href="/invoice-example" className="text-[#64748B] hover:text-[#0F172A] transition-colors">Examples</Link>
              <Link href="/faq" className="text-[#64748B] hover:text-[#0F172A] transition-colors">FAQ</Link>
              <a href="https://github.com/abdullah2k05/invoice-generator" target="_blank" rel="noreferrer" className="text-[#64748B] hover:text-[#0F172A] transition-colors">GitHub</a>
            </div>
          </div>
        </nav>

        {children}

        {/* Footer */}
        <footer className="border-t border-[#E2E8F0] bg-white">
          <div className="max-w-4xl mx-auto px-4 py-12 border-l border-r border-[#E2E8F0]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerColumns.map((col) => (
                <div key={col.heading}>
                  <h3 className="font-semibold text-[#0F172A] text-sm mb-3 uppercase tracking-wider">
                    {col.heading}
                  </h3>
                  <ul className="space-y-2">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        {link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#64748B] hover:text-[#0F172A] transition-colors text-sm"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-[#64748B] hover:text-[#0F172A] transition-colors text-sm"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-[#94A3B8]">
                © {new Date().getFullYear()} Muhammad Abdullah. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-4 text-xs">
                {footerBottomLinks.map((link) => (
                  link.external ? (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#94A3B8] hover:text-[#0F172A] transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-[#94A3B8] hover:text-[#0F172A] transition-colors"
                    >
                      {link.label}
                    </Link>
                  )
                ))}
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
