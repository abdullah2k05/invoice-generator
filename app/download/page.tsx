import type { Metadata } from "next";
import Link from "next/link";
import { Smartphone, Download, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Download Invoice Maker Android App | Free Invoice Generator",
  description: "Download Invoice Maker for Android. Create professional invoices on your phone. Available on Amazon Appstore and direct APK download.",
};

const AMAZON_URL = "https://www.amazon.com/dp/B0H8ZT83M2";

export default function DownloadPage() {
  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-12 border-l border-r border-[#E2E8F0] min-h-screen">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-[#64748B] hover:text-[#0F172A] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F1F5F9] mb-6">
            <Smartphone className="w-8 h-8 text-[#4F46E5]" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-[#0F172A] mb-4">
            Download Invoice Maker
          </h1>
          <p className="text-lg text-[#64748B] max-w-xl mx-auto">
            Create professional invoices anywhere, anytime. No signup required.
          </p>
        </div>

        <div className="grid gap-6 max-w-lg mx-auto">
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] flex items-center justify-center flex-shrink-0">
                <Download className="w-6 h-6 text-[#4F46E5]" />
              </div>
              <div>
                <h2 className="font-semibold text-[#0F172A] text-lg">Amazon Appstore</h2>
                <p className="text-sm text-[#64748B]">Recommended — auto-updates</p>
              </div>
            </div>
            <a
              href={AMAZON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-lg bg-[#0F172A] text-white hover:bg-[#1E293B] px-5 py-3 font-medium transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Get it on Amazon
            </a>
          </div>

          <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-6 h-6 text-[#4F46E5]" />
              </div>
              <div>
                <h2 className="font-semibold text-[#0F172A] text-lg">Use Online</h2>
                <p className="text-sm text-[#64748B]">No download needed — works in any browser</p>
              </div>
            </div>
            <Link
              href="/new"
              className="inline-flex w-full items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F1F5F9] px-5 py-3 font-medium transition-colors"
            >
              Launch Web App
            </Link>
          </div>
        </div>

        <div className="mt-12 p-6 rounded-xl bg-[#F1F5F9] text-center">
          <h3 className="font-semibold text-[#0F172A] mb-2">Free Invoice Generator</h3>
          <p className="text-sm text-[#64748B] mb-4">
            No signup required. No credit card needed. Create unlimited invoices forever.
          </p>
          <Link
            href="/new"
            className="inline-flex items-center justify-center rounded-lg bg-[#0F172A] text-white hover:bg-[#1E293B] px-6 py-2.5 text-sm font-medium transition-colors"
          >
            Generate Invoice Now
          </Link>
        </div>
      </div>
    </div>
  );
}
