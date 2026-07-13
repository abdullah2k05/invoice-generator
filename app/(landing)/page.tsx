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
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DemoPreview from "./components/demoPreview";
import { AdBanner } from "@/components/AdBanner";

const Home = () => {
  return (
    <div className="bg-[#F8F9FA] flex justify-center items-center overflow-x-hidden">
      <div className="border-l border-r max-w-4xl w-full mx-auto h-full flex justify-center flex-col border-[#E2E8F0]">
        <div className="justify-center items-center h-full flex flex-col my-6 md:my-10">
          <div className="border-t border-[#E2E8F0] w-full mx-auto py-6 md:py-10 flex justify-center items-center relative">
            <Image
              src="/android-chrome-512x512.png"
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
          <div className="pt-6 pb-7 md:pt-10 md:pb-11 flex gap-3 items-center mx-auto border-[#E2E8F0] border-b w-full justify-center relative">
            <Link
              href="/new"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-medium disabled:pointer-events-none disabled:opacity-50 bg-[#0F172A] text-white hover:bg-[#1E293B] px-4 md:px-6 py-2 text-sm md:text-lg"
            >
              Generate Invoice
            </Link>
            <a
              target="_blank"
              href="https://github.com/abdullah2k05/invoice-generator"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border bg-transparent hover:bg-[#F1F5F9] px-4 md:px-6 py-1.5 text-sm md:text-lg gap-2 border-[#E2E8F0]"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 md:w-4 md:h-4"
              >
                <path
                  d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
              Github
            </a>
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
              Free for lifetime, open source, and no hidden charges. Use it forever at zero cost.
            </p>
          </div>
        </div>
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
        <AdBanner adSlot="0000000000" format="horizontal" className="py-4 md:py-6 border-b border-[#E2E8F0]" />
      </div>
    </div>
  );
};

export default Home;
