"use client";

import { Button } from "@/components/ui/button";
import { Document, Font, Page } from "@react-pdf/renderer";
import { CheckCircle2, Download, LoaderIcon } from "lucide-react";
import { PdfDetails } from "../pdfDetails";
import { useData } from "@/app/hooks/useData";
import { pdfContainers } from "@/lib/pdfStyles";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import { svgToDataUri } from "@/lib/svgToDataUri";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { currencyList } from "@/lib/currency";
import { Capacitor } from "@capacitor/core";
import { saveInvoice, incrementInvoiceCounter } from "@/lib/localData";

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

            const currencyDetails = currencyList.find(
              (cd) =>
                cd.value.toLowerCase() === invoiceDetails.currency.toLowerCase()
            )?.details;
            const defaultCurrency = currencyList.find(
              (cd) => cd.value.toLowerCase() === "USD".toLowerCase()
            )?.details;

            let countryImageUrl = "";
            try {
              const res = await fetch(
                `/flag/1x1/${
                  currencyDetails?.iconName || defaultCurrency?.iconName
                }.svg`
              );
              const svgFlag = await res.text();
              countryImageUrl = svgToDataUri(svgFlag);
            } catch {
              // flag optional, continue
            }

            const blob = await pdf(
              <Document>
                <Page size="A4" style={pdfContainers.page}>
                  <PdfDetails
                    companyDetails={companyDetails}
                    invoiceDetails={invoiceDetails}
                    invoiceTerms={invoiceTerms}
                    paymentDetails={paymentDetails}
                    yourDetails={yourDetails}
                    countryImageUrl={countryImageUrl}
                    showPayableIn={showPayableIn}
                    templateId={templateId}
                  />
                </Page>
              </Document>
            ).toBlob();

            if (Capacitor.isNativePlatform()) {
              const reader = new FileReader();
              const base64 = await new Promise<string>((resolve, reject) => {
                reader.onload = () => {
                  const result = reader.result as string;
                  resolve(result.split(",")[1]);
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
              });

              const { FileSaver } = await import(
                "@/app/component/form/downloadInvoice/fileSaverPlugin"
              );
              const result = await FileSaver.saveToDownloads({
                data: base64,
                fileName: "Invoice.pdf",
              });
              if (!result.success) {
                throw new Error("Save failed");
              }
            } else {
              saveAs(blob, "invoice.pdf");
            }

            setStatus("downloaded");
            setToast("Invoice.pdf downloaded successfully");
            saveInvoice({
              id: Date.now().toString(),
              invoiceNumber: invoiceTerms.invoiceNumber || "INV-000",
              date: invoiceTerms.issueDate || new Date().toISOString(),
              client: companyDetails.companyName || "Unknown",
              total: (() => {
                const items = invoiceDetails.items || [];
                const subtotal = items.reduce((t: number, i: Item) => t + ((i.qty || 1) * (i.amount || 0)), 0);
                const discount = invoiceDetails.discount ? +invoiceDetails.discount : 0;
                const taxRate = invoiceDetails.taxRate ? +invoiceDetails.taxRate : 0;
                const afterDiscount = subtotal - discount;
                return afterDiscount + (afterDiscount * taxRate / 100);
              })(),
              currency: invoiceDetails.currency || "USD",
              data: Object.fromEntries(
                Object.entries({
                  ...yourDetails,
                  ...companyDetails,
                  ...paymentDetails,
                  ...invoiceTerms,
                }).filter(([_, v]) => typeof v === "string")
              ),
              items: invoiceDetails.items || [],
              templateId,
            });
            incrementInvoiceCounter();
          } catch (e) {
            console.error("Download failed:", e);
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
