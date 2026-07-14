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

export const DownloadInvoiceButton = () => {
  const [status, setStatus] = useState<
    "downloaded" | "downloading" | "not-downloaded"
  >("not-downloaded");
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

  return (
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

          const res = await fetch(
            `/flag/1x1/${
              currencyDetails?.iconName || defaultCurrency?.iconName
            }.svg`
          );
          const svgFlag = await res.text();
          const countryImageUrl = await svgToDataUri(svgFlag);
          if (!countryImageUrl) {
            setStatus("not-downloaded");
            return;
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
            const { Share } = await import("@capacitor/share");

            try {
              await Filesystem.writeFile({
                path: "Invoice.pdf",
                data: base64,
                directory: Directory.Documents,
              });
            } catch {
              try {
                await Filesystem.writeFile({
                  path: "Download/Invoice.pdf",
                  data: base64,
                  directory: Directory.ExternalStorage,
                });
              } catch {
                const saved = await Filesystem.writeFile({
                  path: "invoice.pdf",
                  data: base64,
                  directory: Directory.Cache,
                });
                await Share.share({
                  title: "Invoice",
                  files: [saved.uri],
                  dialogTitle: "Save Invoice",
                });
              }
            }
          } else {
            saveAs(blob, "invoice.pdf");
          }

          setStatus("downloaded");
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
