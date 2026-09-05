import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import Script from "next/script";
import Link from "next/link";
import { BackButtonHandler } from "@/components/BackButtonHandler";
import { AppInit } from "@/components/AppInit";
import { NativeBanner } from "@/components/NativeBanner";
import { AppStoreBadges } from "@/components/AppStoreBadges";

export const viewport: Viewport = {
  themeColor: "#059669",
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

const footerSections = [
  {
    heading: "Product",
    links: [
      { label: "Create Invoice", href: "/new" },
      { label: "Templates", href: "/invoice-template" },
      { label: "Examples", href: "/invoice-example" },
      { label: "Download App", href: "/download" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "Templates",
    links: [
      { label: "PDF Template", href: "/invoice-template-pdf" },
      { label: "Word Template", href: "/invoice-template-word" },
      { label: "Excel Template", href: "/invoice-template-excel" },
      { label: "Google Docs", href: "/invoice-template-google-docs" },
      { label: "Google Sheets", href: "/invoice-template-google-sheets" },
    ],
  },
  {
    heading: "Use Cases",
    links: [
      { label: "Freelancers", href: "/invoice-generator-for-freelancers" },
      { label: "Designers", href: "/invoice-generator-for-designers" },
      { label: "Developers", href: "/invoice-generator-for-developers" },
      { label: "Consultants", href: "/invoice-generator-for-consultants" },
      { label: "Agencies", href: "/invoice-generator-for-agencies" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "How to Create an Invoice", href: "/blog/how-to-create-an-invoice" },
      { label: "Invoice vs Receipt", href: "/blog/invoice-vs-receipt" },
      { label: "Payment Terms Guide", href: "/blog/how-to-write-payment-terms" },
      { label: "Tax Guide", href: "/blog/how-to-calculate-invoice-tax" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
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
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#059669" />
        <meta name="msapplication-TileColor" content="#059669" />
        <meta name="theme-color" content="#059669" />
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
      <body className={`${GeistSans.className} flex flex-col min-h-screen bg-surface pb-32`}>
        <AppInit />
        <BackButtonHandler />
        <NativeBanner />

        {/* Navbar */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
          <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-white text-xs font-bold">IN</span>
              </div>
              <span className="font-semibold text-text-primary text-[15px] group-hover:text-accent transition-colors">
                Invoice Maker
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <Link href="/new" className="btn-ghost text-[13px]">Create Invoice</Link>
              <Link href="/invoice-template" className="btn-ghost text-[13px]">Templates</Link>
              <Link href="/invoice-example" className="btn-ghost text-[13px]">Examples</Link>
              <Link href="/faq" className="btn-ghost text-[13px]">FAQ</Link>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/new" className="btn-primary text-[13px] px-4 py-2">
                New Invoice
              </Link>
            </div>
          </div>
        </nav>

        {children}

        {/* Footer */}
        <footer className="border-t border-border bg-white mt-auto">
          <div className="max-w-5xl mx-auto px-5 py-12 md:py-16">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6">
              {footerSections.map((section) => (
                <div key={section.heading}>
                  <h3 className="text-label-md text-text-primary font-semibold mb-3">
                    {section.heading}
                  </h3>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-body-sm text-text-secondary hover:text-text-primary transition-colors duration-150"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-col items-center md:items-start gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-accent flex items-center justify-center">
                    <span className="text-white text-[8px] font-bold">IN</span>
                  </div>
                  <p className="text-body-sm text-text-secondary">
                    &copy; {new Date().getFullYear()} Invoice Maker
                  </p>
                </div>
                <p className="text-xs text-text-muted">
                  Built by{" "}
                  <a
                    href="https://mabdullah.top"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-text-primary transition-colors underline underline-offset-2"
                  >
                    Muhammad Abdullah
                  </a>
                </p>
              </div>
              <AppStoreBadges showHeading={false} variant="subtle" />
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
