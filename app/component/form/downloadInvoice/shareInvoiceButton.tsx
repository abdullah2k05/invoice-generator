"use client";

import { Button } from "@/components/ui/button";
import { Document, Page } from "@react-pdf/renderer";
import { CheckCircle2, LoaderIcon, Share2 } from "lucide-react";
import { PdfDetails } from "../pdfDetails";
import { useData } from "@/app/hooks/useData";
import { pdfContainers } from "@/lib/pdfStyles";
import { pdf } from "@react-pdf/renderer";
import { svgToDataUri } from "@/lib/svgToDataUri";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { currencyList } from "@/lib/currency";
import { Capacitor } from "@capacitor/core";

export const ShareInvoiceButton = () => {
  const [status, setStatus] = useState<
    "shared" | "sharing" | "not-shared"
  >("not-shared");
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

  return (
    <Button
      disabled={status === "sharing"}
      onClick={async () => {
        try {
          setStatus("sharing");

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

            const { Filesystem, Directory } = await import(
              "@capacitor/filesystem"
            );
            const saved = await Filesystem.writeFile({
              path: "invoice.pdf",
              data: base64,
              directory: Directory.Cache,
            });

            const { Share } = await import("@capacitor/share");
            await Share.share({
              title: "Invoice",
              text: "Here is your invoice",
              files: [saved.uri],
              dialogTitle: "Share Invoice",
            });
          } else if (navigator.share) {
            const file = new File([blob], "invoice.pdf", {
              type: "application/pdf",
            });
            if (navigator.canShare?.({ files: [file] })) {
              await navigator.share({ files: [file], title: "Invoice" });
            } else {
              const { saveAs } = await import("file-saver");
              saveAs(blob, "invoice.pdf");
            }
          } else {
            const { saveAs } = await import("file-saver");
            saveAs(blob, "invoice.pdf");
          }

          setStatus("shared");
        } catch (e) {
          console.error("Share failed:", e);
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
          <CheckCircle2 className="mr-2 h-4 w-4" /> Shared
        </>
      )}
    </Button>
  );
};
