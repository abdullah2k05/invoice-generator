/* eslint-disable @next/next/no-img-element */
"use client";

import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FileText,
  Infinity,
  Rocket,
  Smartphone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DemoPreview from "./components/demoPreview";
import { SeoNativeAd } from "@/components/SeoNativeAd";
import { RecentInvoices } from "@/app/component/RecentInvoices";

const features = [
  {
    icon: Rocket,
    title: "Create in seconds",
    description: "Fill in the blanks, pick a template, and download. No signup, no complexity.",
  },
  {
    icon: Infinity,
    title: "No limits",
    description: "Create as many invoices as you need. No credit card, no trials, no catches.",
  },
  {
    icon: FileText,
    title: "Professional templates",
    description: "Four carefully designed templates that make your invoices look polished and credible.",
  },
  {
    icon: Clock,
    title: "Fast and simple",
    description: "Fill in the blanks, pick a template, and download your invoice in minutes.",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-5 pt-12 md:pt-20 pb-10 md:pb-16">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-light text-accent text-label-sm mb-6 animate-fade-in">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Free to use
            </div>

            <h1 className="text-display-lg text-text-primary mb-4 animate-fade-in" style={{ animationDelay: '50ms' }}>
              Professional invoices
              <br />
              <span className="text-accent">in seconds</span>
            </h1>

            <p className="text-body-lg text-text-secondary max-w-lg mx-auto mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
              Create, download, and send polished invoices in minutes.
              Free forever, no account needed.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in" style={{ animationDelay: '150ms' }}>
              <Link href="/new" className="btn-primary px-7 py-3 text-[15px]">
                Create Invoice
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/download" className="btn-secondary px-7 py-3 text-[15px]">
                <Smartphone className="w-4 h-4" />
                Download App
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="max-w-5xl mx-auto px-5 mb-16 md:mb-24">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface pointer-events-none z-10" />
          <div className="bg-white rounded-card shadow-soft-lg border border-border p-2 md:p-3 overflow-hidden">
            <div className="rounded-[8px] overflow-hidden bg-white relative">
              <div className="absolute top-3 right-3 z-20 badge bg-surface-muted/90 backdrop-blur-sm">
                Sample Invoice
              </div>
              <DemoPreview />
            </div>
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-black/5 blur-xl rounded-full" />
        </div>
      </section>

      <SeoNativeAd adUnitId="ca-app-pub-6235199437488383/4973586076" />

      {/* Features */}
      <section className="max-w-5xl mx-auto px-5 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-display-sm text-text-primary mb-3">
            Why Invoice Maker?
          </h2>
          <p className="text-body-lg text-text-secondary max-w-md mx-auto">
            Everything you need to create professional invoices, nothing you don&apos;t.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-card border border-border bg-white hover:shadow-soft-md hover:border-accent/20 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                <feature.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-label-lg text-text-primary mb-1.5">
                {feature.title}
              </h3>
              <p className="text-body-sm text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Invoices */}
      <RecentInvoices />

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-5 py-16 md:py-20">
        <div className="relative rounded-card bg-text-primary p-8 md:p-12 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
          <div className="relative z-10">
            <h2 className="text-display-sm text-white mb-3">
              Start creating invoices now
            </h2>
            <p className="text-body-lg text-white/60 mb-6 max-w-md mx-auto">
              No signup. No credit card. Just professional invoices.
            </p>
            <Link href="/new" className="btn-primary bg-white text-text-primary hover:bg-surface-muted px-7 py-3 text-[15px]">
              Create Your First Invoice
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <SeoNativeAd adUnitId="ca-app-pub-6235199437488383/2648328140" />
    </div>
  );
};

export default Home;
