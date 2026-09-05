import type { Metadata } from "next";
import Link from "next/link";
import { Smartphone, Download, ArrowLeft, CheckCircle2, Globe, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Download Invoice Maker Android App | Free Invoice Generator",
  description: "Download Invoice Maker for Android. Create professional invoices on your phone. Available on Amazon Appstore and direct APK download.",
};

const AMAZON_URL = "https://www.amazon.com/dp/B0H8ZT83M2";

const benefits = [
  { icon: Zap, text: "Create invoices offline" },
  { icon: Globe, text: "Works without internet" },
  { icon: Smartphone, text: "Native Android experience" },
];

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-3xl mx-auto px-5 py-12 md:py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-body-sm text-text-secondary hover:text-text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-card bg-accent/10 mb-5">
            <Smartphone className="w-7 h-7 text-accent" />
          </div>
          <h1 className="text-display-md text-text-primary mb-3">
            Download Invoice Maker
          </h1>
          <p className="text-body-lg text-text-secondary max-w-md mx-auto">
            Create professional invoices anywhere, anytime. No signup required.
          </p>
        </div>

        <div className="grid gap-4 max-w-md mx-auto mb-10">
          <div className="card p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <Download className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 className="text-label-lg text-text-primary">Amazon Appstore</h2>
                <p className="text-body-sm text-text-secondary">Recommended — auto-updates</p>
              </div>
            </div>
            <a
              href={AMAZON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full"
            >
              <Download className="w-4 h-4" />
              Get it on Amazon
            </a>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-surface-muted flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5 text-text-secondary" />
              </div>
              <div>
                <h2 className="text-label-lg text-text-primary">Use Online</h2>
                <p className="text-body-sm text-text-secondary">No download needed — works in any browser</p>
              </div>
            </div>
            <Link href="/new" className="btn-secondary w-full">
              Launch Web App
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-10">
          {benefits.map((b) => (
            <div key={b.text} className="flex items-center gap-2 text-body-sm text-text-secondary">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              {b.text}
            </div>
          ))}
        </div>

        <div className="rounded-card bg-surface-muted p-6 text-center">
          <h3 className="text-label-lg text-text-primary mb-1">Free Invoice Generator</h3>
          <p className="text-body-sm text-text-secondary mb-4">
            No signup required. No credit card needed. Create unlimited invoices forever.
          </p>
          <Link href="/new" className="btn-primary">
            Generate Invoice Now
          </Link>
        </div>
      </div>
    </div>
  );
}
