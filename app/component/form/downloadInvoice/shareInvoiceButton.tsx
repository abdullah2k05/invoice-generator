"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, LoaderIcon, Share2 } from "lucide-react";
import { useData } from "@/app/hooks/useData";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { downloadAndShare } from "./downloadUtils";

export const ShareInvoiceButton = () => {
  const [status, setStatus] = useState<
    "shared" | "sharing" | "not-shared"
  >("not-shared");
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
    if (status === "shared") {
      setTimeout(() => setStatus("not-shared"), 2000);
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
        disabled={status === "sharing"}
        onClick={async () => {
          try {
            setStatus("sharing");
            await downloadAndShare({
              companyDetails,
              invoiceDetails,
              invoiceTerms,
              paymentDetails,
              yourDetails,
              showPayableIn,
              templateId,
            });
            setStatus("shared");
            setToast("Invoice saved & ready to share");
          } catch {
            setToast("Something went wrong — try again");
            setStatus("not-shared");
          }
        }}
        type="button"
        className="w-full h-10 text-sm"
      >
        {status === "not-shared" && (
          <>
            <Share2 className="mr-2 h-4 w-4" /> Share Invoice
          </>
        )}
        {status === "sharing" && (
          <>
            <LoaderIcon className="mr-2 h-4 w-4 animate-spin" /> Sharing...
          </>
        )}
        {status === "shared" && (
          <>
            <CheckCircle2 className="mr-2 h-4 w-4" /> Saved & Shared ✓
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
