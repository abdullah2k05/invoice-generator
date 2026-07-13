"use client";

import { Button } from "@/components/ui/button";
import { Document, Font, Page } from "@react-pdf/renderer";
import { CheckCircle2, Download, LoaderIcon, Share2 } from "lucide-react";
import { PdfDetails } from "../pdfDetails";
import { useData } from "@/app/hooks/useData";
import { pdfContainers } from "@/lib/pdfStyles";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import { svgToDataUri } from "@/lib/svgToDataUri";
import { useEffect, useState } from "react";
import { currencyList } from "@/lib/currency";
import { Capacitor } from "@capacitor/core";
import { Share } from "@capacitor/share";

async function sharePdf(blob: Blob) {
  const file = new File([blob], "invoice.pdf", { type: "application/pdf" });

  if (Capacitor.isNativePlatform()) {
    const reader = new FileReader();
    const base64 = await new Promise<string>((resolve, reject) => {
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    const { Filesystem, Directory } = await import("@capacitor/filesystem");
    const saved = await Filesystem.writeFile({
      path: "invoice.pdf",
      data: base64,
      directory: Directory.Cache,
    });
    await Share.share({
      title: "Invoice",
      text: "Here is your invoice",
      url: saved.uri,
      dialogTitle: "Share Invoice",
    });
    return;
  }

  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    await navigator.share({ files: [file], title: "Invoice" });
    return;
  }

  saveAs(blob, "invoice.pdf");
}

export const DownloadInvoiceButton = () => {
  const [status, setStatus] = useState<
    "downloaded" | "downloading" | "not-downloaded"
  >("not-downloaded");
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
      setTimeout(() => {
        setStatus("not-downloaded");
      }, 2000);
    }
  }, [status]);

  return (
    <Button
      disabled={status === "downloading"}
      onClick={async () => {
        try {
          setStatus("downloading");
          const currencyDetails = currencyList.find(
            (currencyDetail) =>
              currencyDetail.value.toLowerCase() ===
              invoiceDetails.currency.toLowerCase()
          )?.details;

          const defaultCurrency = currencyList.find(
            (currencyDetail) =>
              currencyDetail.value.toLowerCase() === "USD".toLowerCase()
          )?.details;

          const data = await fetch(
            `/flag/1x1/${
              currencyDetails?.iconName || defaultCurrency?.iconName
            }.svg`
          );
          const svgFlag = await data.text();
          const countryImageUrl = await svgToDataUri(svgFlag);
          if (countryImageUrl) {
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
                  />
                </Page>
              </Document>
            ).toBlob();
            await sharePdf(blob);
            setStatus("downloaded");
            if (Capacitor.isNativePlatform()) {
              const { FirebaseAnalytics } = await import("@capacitor-firebase/analytics");
              FirebaseAnalytics.logEvent({ name: "invoice_pdf_downloaded" }).catch(() => {});
            }
          } else {
            setStatus("not-downloaded");
          }
        } catch (e) {
          console.error(e);
          setStatus("not-downloaded");
        }
      }}
      type="button"
      className="w-full h-10 text-sm"
    >
      {status === "not-downloaded" && (
        <>
          <Share2 className="mr-2 h-4 w-4" /> Download Invoice
        </>
      )}
      {status === "downloading" && (
        <>
          <LoaderIcon className="mr-2 h-4 w-4 animate-spin" /> Generating...
        </>
      )}
      {status === "downloaded" && (
        <>
          <CheckCircle2 className="mr-2 h-4 w-4" /> Done
        </>
      )}
    </Button>
  );
};

Font.register({
  family: "Geist",
  fonts: [
    {
      src: "/font/Geist-Thin.ttf",
      fontWeight: "thin",
    },
    {
      src: "/font/Geist-Ultralight.ttf",
      fontWeight: "ultralight",
    },
    {
      src: "/font/Geist-Light.ttf",
      fontWeight: "light",
    },
    {
      src: "/font/Geist-Regular.ttf",
      fontWeight: "normal",
    },
    {
      src: "/font/Geist-Medium.ttf",
      fontWeight: "medium",
    },
    {
      src: "/font/Geist-SemiBold.ttf",
      fontWeight: "semibold",
    },
    {
      src: "/font/Geist-Bold.ttf",
      fontWeight: "bold",
    },
    {
      src: "/font/Geist-UltraBlack.ttf",
      fontWeight: "ultrabold",
    },
  ],
});
