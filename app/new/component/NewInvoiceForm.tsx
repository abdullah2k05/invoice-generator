"use client";
import Image from "next/image";
import { UserInputForm } from "@/app/component/form/userInputForm";
import { FormSteps } from "@/app/component/form/step/fromSteps";
import { UserDataPreview } from "@/app/new/component/userDataPreview";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState, useCallback } from "react";
import { AdBanner } from "@/components/AdBanner";
import { RotateCcw } from "lucide-react";

const STORAGE_KEYS = [
  "yourEmail", "yourName", "yourAddress", "yourCity", "yourState",
  "yourCountry", "yourLogo", "yourTaxId", "yourZip",
  "email", "companyName", "companyAddress", "companyCity", "companyState",
  "companyCountry", "companyLogo", "companyTaxId", "companyZip",
  "note", "discount", "tax",
  "bankName", "accountNumber", "accountName", "routingCode", "swiftCode", "ifscCode",
  "invoiceNo", "issueDate", "dueDate", "currency", "step", "items", "showPayableIn",
];

export const NewInvoiceForm = () => {
  const methods = useForm();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
      try {
        const step = localStorage.getItem("step");
        if (!(step && typeof +step === "number"))
          localStorage.setItem("step", "1");
      } catch (e) {
        localStorage.setItem("step", "1");
      }
    }
  }, []);

  const handleReset = useCallback(() => {
    STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
    localStorage.setItem("step", "1");
    window.location.reload();
  }, []);

  return (
    <>
      {isClient ? (
        <FormProvider {...methods}>
          <div className="md:max-w-lg w-full md:min-h-dvh p-4 md:p-12 md:border-r border-dashed flex flex-col md:justify-between order-2 md:order-none">
            <div>
              <div className="flex gap-2 items-center justify-between">
                <div className="flex gap-2 items-center">
                  <Image
                    src="/android-chrome-512x512.png"
                    width={40}
                    height={40}
                    className="rounded-lg"
                    alt="logo"
                  />
                  <div>
                    <p className="font-semibold text-sm md:text-base">Invoice Generator</p>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  title="Reset all fields"
                  className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-orange-500 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>
              <UserInputForm />
              <AdBanner adSlot="0000000000" format="horizontal" className="mt-6" />
            </div>
            <FormSteps />
          </div>
          <div className="relative md:min-h-dvh w-full flex justify-center items-start md:items-center p-2 md:p-0 order-1 md:order-none">
            <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <UserDataPreview />
          </div>
        </FormProvider>
      ) : (
        <div />
      )}
    </>
  );
};
