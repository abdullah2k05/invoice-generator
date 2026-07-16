/* eslint-disable @next/next/no-img-element */
"use client";

import {
  CodeXml,
  Download,
  Hourglass,
  Infinity,
  NotebookText,
  Receipt,
  Rocket,
  Smartphone,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DemoPreview from "./components/demoPreview";
import { SeoNativeAd } from "@/components/SeoNativeAd";
import { RecentInvoices } from "@/app/component/RecentInvoices";
import { AppStoreBadges } from "@/components/AppStoreBadges";

const Home = () => {
  return (
    <div className="bg-[#F8F9FA] flex justify-center items-center overflow-x-hidden">
      <div className="border-l border-r max-w-4xl w-full mx-auto h-full flex justify-center flex-col border-[#E2E8F0]">
        <div className="justify-center items-center h-full flex flex-col my-6 md:my-10">
          <div className="border-t border-[#E2E8F0] w-full mx-auto py-6 md:py-10 flex justify-center items-center relative">
            <Image
              src="/logo.png"
              width={80}
              height={80}
              className="rounded-lg md:w-[100px] md:h-[100px]"
              alt="logo"
            />
          </div>
          <div className="relative group">
            <h1 className="font-semibold text-2xl md:text-7xl text-center w-full border-t border-b py-4 md:py-6 text-balance px-4 text-[#0F172A] border-[#E2E8F0]">
              Free Invoice Generator –{' '}
              <span className="text-[#4F46E5]">
                No Signup Required
              </span>
            </h1>
          </div>
          <div className="pt-6 pb-6 md:pt-10 md:pb-8 flex flex-col md:flex-row gap-3 md:gap-4 items-center justify-center mx-auto border-[#E2E8F0] border-b w-full">
            <Link
              href="/new"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-semibold disabled:pointer-events-none disabled:opacity-50 bg-[#0F172A] text-white hover:bg-[#1E293B] px-5 md:px-7 py-2.5 md:py-3 text-sm md:text-lg shadow-md"
            >
              Generate Invoice
            </Link>
            <Link
              href="/download"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg border-2 border-[#CBD5E1] bg-white text-[#475569] hover:border-[#0F172A] hover:text-[#0F172A] transition-all px-5 md:px-7 py-2.5 md:py-3 text-sm md:text-lg font-medium gap-2 shadow-sm"
            >
              <Smartphone className="w-4 h-4 md:w-5 md:h-5" />
              Download APK
            </Link>
          </div>
          <div className="border-b text-balance text-center w-full font-semibold border-[#E2E8F0]">
            <div className="grid grid-cols-2 px-4 relative py-4 md:py-6 text-2xl md:text-7xl max-w-lg mx-auto">
              <div className="flex flex-col border-r border-[#E2E8F0]">
                <div className="flex justify-center items-center gap-1 md:gap-2">
                  <Users className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-[10px] md:text-xs">Trusted by</span>
                </div>
                <span className="text-[#4F46E5] text-3xl md:text-7xl">
                  200
                </span>
                <span className="text-[10px] md:text-xs">users</span>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-center items-center gap-1 md:gap-2">
                  <Download className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-[10px] md:text-xs">Download</span>
                </div>
                <span className="text-[#4F46E5] text-3xl md:text-7xl">
                  400
                </span>
                <span className="text-[10px] md:text-xs">Invoices</span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-2 md:px-0 mb-6 md:mb-10">
          <DemoPreview />
        </div>
        <SeoNativeAd adUnitId="ca-app-pub-6235199437488383/4973586076" />
        <p className="font-medium text-lg md:text-3xl border-t border-[#E2E8F0] border-b py-4 md:py-6 px-4 md:px-7 text-[#64748B] text-center">
          Here&apos;s why you&apos;ll love our Free Invoice Generator
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="border-b sm:border-r border-[#E2E8F0] p-5 md:p-7 flex justify-center flex-col items-center">
            <p className="border flex justify-center items-center w-9 h-9 md:w-11 md:h-11 rounded-lg text-lg md:text-2xl mb-3 md:mb-5 border-[#E2E8F0] bg-[#F1F5F9]">
              <Rocket className="w-4 h-4 md:w-6 md:h-6 text-[#4F46E5]" />
            </p>
            <p className="font-bold text-base md:text-xl text-[#0F172A]">Fast & Easy</p>
            <p className="text-[#64748B] mt-1 text-center text-xs md:text-base">
              Simply fill in the blanks and generate professional invoices in seconds
            </p>
          </div>
          <div className="border-b border-[#E2E8F0] p-5 md:p-7 flex justify-center flex-col items-center">
            <p className="border flex justify-center items-center w-9 h-9 md:w-11 md:h-11 rounded-lg text-lg md:text-2xl mb-3 md:mb-5 border-[#E2E8F0] bg-[#F1F5F9]">
              <Infinity className="w-4 h-4 md:w-6 md:h-6 text-[#4F46E5]" />
            </p>
            <p className="font-bold text-base md:text-xl text-[#0F172A]">Free for Lifetime</p>
            <p className="text-[#64748B] mt-1 text-center text-xs md:text-base">
              No credit card required, no signup needed. Create unlimited invoices free for lifetime.
            </p>
          </div>
          <div className="border-b sm:border-r border-[#E2E8F0] p-5 md:p-7 flex justify-center flex-col items-center">
            <p className="border flex justify-center items-center w-9 h-9 md:w-11 md:h-11 rounded-lg text-lg md:text-2xl mb-3 md:mb-5 border-[#E2E8F0] bg-[#F1F5F9]">
              <NotebookText className="w-4 h-4 md:w-6 md:h-6 text-[#4F46E5]" />
            </p>
            <p className="font-bold text-base md:text-xl text-[#0F172A]">Beautiful Templates</p>
            <p className="text-[#64748B] mt-1 text-center text-xs md:text-base">
              Choose from a variety of modern and customizable invoice templates.
            </p>
          </div>
          <div className="border-b border-[#E2E8F0] p-5 md:p-7 flex justify-center flex-col items-center">
            <p className="border flex justify-center items-center w-9 h-9 md:w-11 md:h-11 rounded-lg text-lg md:text-2xl mb-3 md:mb-5 border-[#E2E8F0] bg-[#F1F5F9]">
              <Receipt className="w-4 h-4 md:w-6 md:h-6 text-[#4F46E5]" />
            </p>
            <p className="font-bold text-base md:text-xl text-[#0F172A]">Get Paid Faster</p>
            <p className="text-[#64748B] mt-1 text-center text-xs md:text-base">
              Send invoices electronically with secure payment links for faster client payments.
            </p>
          </div>
          <div className="border-b sm:border-r border-[#E2E8F0] p-5 md:p-7 flex justify-center flex-col items-center">
            <p className="border flex justify-center items-center w-9 h-9 md:w-11 md:h-11 rounded-lg text-lg md:text-2xl mb-3 md:mb-5 border-[#E2E8F0] bg-[#F1F5F9]">
              <Hourglass className="w-4 h-4 md:w-6 md:h-6 text-[#4F46E5]" />
            </p>
            <p className="font-bold text-base md:text-xl text-[#0F172A]">Save Time & Money</p>
            <p className="text-[#64748B] mt-1 text-center text-xs md:text-base">
              Ditch the spreadsheets and expensive invoicing software.
            </p>
          </div>
          <div className="border-b border-[#E2E8F0] p-5 md:p-7 flex justify-center flex-col items-center">
            <p className="border flex justify-center items-center w-9 h-9 md:w-11 md:h-11 rounded-lg text-lg md:text-2xl mb-3 md:mb-5 border-[#E2E8F0] bg-[#F1F5F9]">
              <CodeXml className="w-4 h-4 md:w-6 md:h-6 text-[#4F46E5]" />
            </p>
            <p className="font-bold text-base md:text-xl text-[#0F172A]">Free for Lifetime</p>
            <p className="text-[#64748B] mt-1 text-center text-xs md:text-base">
              Free for lifetime, with no hidden charges. Use it forever at zero cost.
            </p>
          </div>
        </div>
        <RecentInvoices />
        <div className="px-4 md:px-5 py-8 md:py-11 flex justify-center items-center border-b border-[#E2E8F0]">
          <div className="flex justify-center rounded-2xl max-w-3xl items-center px-4 py-6 md:py-10 w-full flex-col gap-3 md:gap-4 bg-[#F1F5F9]">
            <p className="md:max-w-2xl text-center font-semibold text-base md:text-3xl text-[#0F172A] px-2 md:p-4 text-balance">
              Free invoice generator – no signup required, no credit card needed.
              Start creating invoices now.
            </p>
            <Link
              href="/new"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-medium disabled:pointer-events-none disabled:opacity-50 bg-[#0F172A] text-white hover:bg-[#1E293B] px-5 md:px-6 py-2 text-sm md:text-lg"
            >
              Generate Today!
            </Link>
          </div>
        </div>
        <SeoNativeAd adUnitId="ca-app-pub-6235199437488383/2648328140" />
      </div>
    </div>
  );
};

export default Home;
