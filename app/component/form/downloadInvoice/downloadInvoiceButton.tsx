"use client";

import { Button } from "@/components/ui/button";
import { Font } from "@react-pdf/renderer";
import { CheckCircle2, Download, LoaderIcon } from "lucide-react";
import { useData } from "@/app/hooks/useData";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { downloadInvoice } from "./downloadUtils";

export const DownloadInvoiceButton = () => {
  const [status, setStatus] = useState<
    "downloaded" | "downloading" | "not-downloaded"
  >("not-downloaded");
  const [toast, setToast] = useState<string | null>(null);
  const { watch } = useFormContext();
  const templateId = watch("invoiceTemplate", "classic");
  const {
    companyDetails,
    invoiceDetails,
    invoiceTerms,
    paymentDetails,
    yourDetails,
    showPayableIn,
  } = useData();

  useEffect(() => {
    if (status === "downloaded") {
      setTimeout(() => setStatus("not-downloaded"), 2000);
    }
  }, [status]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  return (
    <>
      <Button
        disabled={status === "downloading"}
        onClick={async () => {
          try {
            setStatus("downloading");
            const ok = await downloadInvoice({
              companyDetails,
              invoiceDetails,
              invoiceTerms,
              paymentDetails,
              yourDetails,
              showPayableIn,
              templateId,
            });
            if (ok) {
              setStatus("downloaded");
              setToast("Invoice.pdf downloaded successfully");
            } else {
              setToast("Download failed — please try again");
              setStatus("not-downloaded");
            }
          } catch {
            setToast("Something went wrong — try again");
            setStatus("not-downloaded");
          }
        }}
        type="button"
        className="w-full h-10 text-sm"
      >
        {status === "not-downloaded" && (
          <>
            <Download className="mr-2 h-4 w-4" /> Download Invoice
          </>
        )}
        {status === "downloading" && (
          <>
            <LoaderIcon className="mr-2 h-4 w-4 animate-spin" /> Generating...
          </>
        )}
        {status === "downloaded" && (
          <>
            <CheckCircle2 className="mr-2 h-4 w-4" /> Downloaded Successfully ✓
          </>
        )}
      </Button>
      {toast && (
        <div className="fixed top-4 right-4 z-50 max-w-xs animate-in slide-in-from-right-2 fade-in">
          <div className="bg-[#0F172A] text-white text-sm px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toast}</span>
          </div>
        </div>
      )}
    </>
  );
};

Font.register({
  family: "Geist",
  fonts: [
    { src: "/font/Geist-Thin.ttf", fontWeight: "thin" },
    { src: "/font/Geist-Ultralight.ttf", fontWeight: "ultralight" },
    { src: "/font/Geist-Light.ttf", fontWeight: "light" },
    { src: "/font/Geist-Regular.ttf", fontWeight: "normal" },
    { src: "/font/Geist-Medium.ttf", fontWeight: "medium" },
    { src: "/font/Geist-SemiBold.ttf", fontWeight: "semibold" },
    { src: "/font/Geist-Bold.ttf", fontWeight: "bold" },
    { src: "/font/Geist-UltraBlack.ttf", fontWeight: "ultrabold" },
  ],
});
