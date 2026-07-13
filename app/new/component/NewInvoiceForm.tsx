"use client";
import Image from "next/image";
import { UserInputForm } from "@/app/component/form/userInputForm";
import { FormSteps } from "@/app/component/form/step/fromSteps";
import { UserDataPreview } from "@/app/new/component/userDataPreview";
import { useForm, useFormContext, FormProvider } from "react-hook-form";
import { useEffect, useState, useCallback } from "react";
import { MobilePreviewSheet } from "@/app/component/ui/mobilePreviewSheet";
import { useData } from "@/app/hooks/useData";
import { useGetValue } from "@/app/hooks/useGetValue";
import { getInitialValue } from "@/lib/getInitialValue";
import { currencyList } from "@/lib/currency";
import { RotateCcw, Eye, ChevronLeft, ChevronRight } from "lucide-react";

const STORAGE_KEYS = [
  "yourEmail", "yourName", "yourAddress", "yourCity", "yourState",
  "yourCountry", "yourLogo", "yourTaxId", "yourZip",
  "email", "companyName", "companyAddress", "companyCity", "companyState",
  "companyCountry", "companyLogo", "companyTaxId", "companyZip",
  "note", "discount", "tax",
  "bankName", "accountNumber", "accountName", "routingCode", "swiftCode", "ifscCode",
  "invoiceNo", "issueDate", "dueDate", "currency", "step", "items", "showPayableIn",
];

const stepTitles: Record<string, string> = {
  "1": "Your Details",
  "2": "Company Details",
  "3": "Invoice Items",
  "4": "Payment",
  "5": "Terms",
  "6": "Review",
};

const stepNav: Record<string, { prev: string | null; next: string | null }> = {
  "1": { prev: null, next: "2" },
  "2": { prev: "1", next: "3" },
  "3": { prev: "2", next: "4" },
  "4": { prev: "3", next: "5" },
  "5": { prev: "4", next: "6" },
  "6": { prev: "5", next: null },
};

const clearAllData = () => {
  STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  localStorage.removeItem(STORAGE_ACTIVITY_KEY);
  localStorage.setItem("step", "1");
  window.location.reload();
};

const STORAGE_ACTIVITY_KEY = "_lastActive";
const AUTO_CLEAR_MS = 5 * 60 * 1000;

const useAutoClear = () => {
  useEffect(() => {
    const now = Date.now();
    const lastActive = localStorage.getItem(STORAGE_ACTIVITY_KEY);
    if (lastActive && now - Number(lastActive) > AUTO_CLEAR_MS) {
      clearAllData();
      return;
    }

    const onActivity = () => {
      localStorage.setItem(STORAGE_ACTIVITY_KEY, String(Date.now()));
    };
    window.addEventListener("keydown", onActivity, { passive: true });
    window.addEventListener("touchstart", onActivity, { passive: true });
    window.addEventListener("click", onActivity, { passive: true });

    onActivity();

    const interval = setInterval(() => {
      const active = localStorage.getItem(STORAGE_ACTIVITY_KEY);
      if (active && Date.now() - Number(active) > AUTO_CLEAR_MS) {
        clearAllData();
      }
    }, 30_000);

    return () => {
      window.removeEventListener("keydown", onActivity);
      window.removeEventListener("touchstart", onActivity);
      window.removeEventListener("click", onActivity);
      clearInterval(interval);
    };
  }, []);
};

const MobileLayout = ({ onPreviewOpen }: { onPreviewOpen: () => void }) => {
  const { setValue } = useFormContext();
  const step = useGetValue("step", getInitialValue("step", "1")) || "1";
  const { invoiceDetails } = useData();

  const subtotal = invoiceDetails.items.reduce((t, item) => t + (item.qty || 1) * (item.amount || 0), 0);
  const discountAmt = invoiceDetails.discount ? +invoiceDetails.discount : 0;
  const discountBase = subtotal - discountAmt;
  const taxAmt = discountBase * ((invoiceDetails.taxRate ? +invoiceDetails.taxRate : 0) / 100);
  const totalAmount = discountBase + taxAmt;

  const curDetails = currencyList.find(
    (c) => c.value.toLowerCase() === (invoiceDetails.currency || "USD").toLowerCase()
  )?.details;

  const nav = stepNav[step] || { prev: null, next: null };
  const isLastStep = step === "6";

  const goToStep = (s: string) => {
    localStorage.setItem("step", s);
    setValue("step", s);
  };

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-gray-50 md:hidden">
      <header className="h-14 flex items-center justify-between px-4 bg-white border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-2">
          <Image src="/android-chrome-512x512.png" width={28} height={28} className="rounded-lg" alt="" />
          <span className="text-sm font-semibold text-gray-900">Invoice Generator</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full whitespace-nowrap">
            Step {step} of 6
          </span>
          <button
            onClick={clearAllData}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-orange-500 transition-colors bg-gray-100 hover:bg-orange-50 px-3 py-1.5 rounded-lg border border-gray-200"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-5">
        <UserInputForm />
      </main>

      {!isLastStep && (
        <button
          onClick={onPreviewOpen}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40
            bg-gradient-to-br from-orange-500 to-pink-400 text-white font-medium text-sm
            px-5 py-3 rounded-full flex items-center gap-2
            shadow-lg active:scale-95 transition-all duration-150"
        >
          <Eye className="w-4 h-4 text-white/80" />
          <span>
            View Live Preview{" "}
            {curDetails ? `${curDetails.currencySymbol}${totalAmount.toLocaleString()}` : ""}
          </span>
        </button>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-xl border-t border-gray-200 px-4 py-3 safe-area-bottom">
        <div className="grid grid-cols-12 gap-3">
          {nav.prev ? (
            <button
              onClick={() => goToStep(nav.prev!)}
              className="col-span-3 flex items-center justify-center gap-1 h-12 border border-gray-200 rounded-xl active:scale-95 transition-all duration-150"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
          ) : (
            <div className="col-span-3" />
          )}
          <button
            onClick={() => nav.next && goToStep(nav.next)}
            className={`col-span-9 h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 transition-all duration-150 active:scale-[0.97]
              ${isLastStep
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-br from-orange-500 to-pink-400 text-white shadow-sm active:opacity-90"
              }`}
            disabled={isLastStep}
          >
            {isLastStep ? "All Done" : `Next: ${stepTitles[nav.next || ""] || ""}`}
            {!isLastStep && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </nav>
    </div>
  );
};

export const NewInvoiceForm = () => {
  const methods = useForm();
  const [isClient, setIsClient] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  useAutoClear();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
      try {
        const s = localStorage.getItem("step");
        if (!(s && typeof +s === "number")) localStorage.setItem("step", "1");
      } catch {
        localStorage.setItem("step", "1");
      }
    }
  }, []);

  const handleReset = useCallback(() => {
    clearAllData();
  }, []);

  return (
    <FormProvider {...methods}>
      {!isClient ? <div /> : (
        <>
          {/* Mobile */}
          <MobileLayout onPreviewOpen={() => setPreviewOpen(true)} />
          <MobilePreviewSheet open={previewOpen} onClose={() => setPreviewOpen(false)}>
            <UserDataPreview />
          </MobilePreviewSheet>

          {/* Desktop — 7:5 asymmetric split */}
          <div className="max-md:hidden w-7/12 min-h-dvh bg-[#F9FAFB] p-4 md:p-12 md:border-r border-gray-200 flex flex-col md:justify-between">
            <div>
              <div className="flex gap-2 items-center justify-between mb-8">
                <div className="flex gap-2 items-center">
                  <Image
                    src="/android-chrome-512x512.png"
                    width={36}
                    height={36}
                    className="rounded-lg"
                    alt="logo"
                  />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">Invoice Generator</p>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  title="Reset all fields"
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>
              <UserInputForm />
            </div>
            <FormSteps />
          </div>

          <div className="max-md:hidden relative w-5/12 min-h-dvh bg-[#F9FAFB] flex justify-center items-start md:items-center p-6">
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="relative w-full max-w-[450px]">
              <UserDataPreview />
            </div>
          </div>
        </>
      )}
    </FormProvider>
  );
};
