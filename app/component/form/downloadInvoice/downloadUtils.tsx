import { Capacitor } from "@capacitor/core";

interface GeneratePdfParams {
  companyDetails: CompanyDetails;
  invoiceDetails: InvoiceItemDetails;
  invoiceTerms: InvoiceTerms;
  paymentDetails: PaymentDetails;
  yourDetails: YourDetails;
  showPayableIn: boolean;
  templateId: string;
}

async function showAdWithTimeout(timeoutMs = 4000): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  try {
    const mod = await import(
      "@/app/component/form/downloadInvoice/rewardedAdPlugin"
    ).catch(() => null);
    if (!mod) return;
    await Promise.race([
      mod.RewardedAd.showAd(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), timeoutMs)
      ),
    ]);
  } catch {
    // ad failed — proceed without it
  }
}

async function generateBlob(params: GeneratePdfParams) {
  const { pdf, Document, Page } = await import("@react-pdf/renderer");
  const { pdfContainers } = await import("@/lib/pdfStyles");
  const { PdfDetails } = await import("../pdfDetails");
  const { svgToDataUri } = await import("@/lib/svgToDataUri");
  const { currencyList } = await import("@/lib/currency");

  const currency = params.invoiceDetails.currency || "USD";
  const currencyDetails = (currencyList as Array<{value: string; details?: {iconName?: string}}>).find(
    (cd) => cd.value.toLowerCase() === currency.toLowerCase()
  )?.details;
  const defaultCurrency = (currencyList as Array<{value: string; details?: {iconName?: string}}>).find(
    (cd) => cd.value.toLowerCase() === "USD".toLowerCase()
  )?.details;

  let countryImageUrl = "";
  try {
    const res = await fetch(
      `/flag/1x1/${currencyDetails?.iconName || defaultCurrency?.iconName}.svg`
    );
    countryImageUrl = svgToDataUri(await res.text());
  } catch {}

  const blob = await pdf(
    <Document>
      <Page size="A4" style={pdfContainers.page}>
        <PdfDetails
          companyDetails={params.companyDetails}
          invoiceDetails={params.invoiceDetails}
          invoiceTerms={params.invoiceTerms}
          paymentDetails={params.paymentDetails}
          yourDetails={params.yourDetails}
          countryImageUrl={countryImageUrl}
          showPayableIn={params.showPayableIn}
          templateId={params.templateId}
        />
      </Page>
    </Document>
  ).toBlob();

  return blob;
}

async function saveToDevice(blob: Blob): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) {
    const { saveAs } = await import("file-saver");
    saveAs(blob, "invoice.pdf");
    return true;
  }

  try {
    const reader = new FileReader();
    const base64 = await new Promise<string>((resolve, reject) => {
      reader.onload = () => {
        const r = reader.result as string;
        resolve(r.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    const mod = await import(
      "@/app/component/form/downloadInvoice/fileSaverPlugin"
    ).catch(() => null);
    if (!mod) return false;

    const result = await mod.FileSaver.saveToDownloads({
      data: base64,
      fileName: "Invoice.pdf",
    });
    return result.success === true;
  } catch {
    return false;
  }
}

async function saveHistory(params: GeneratePdfParams) {
  try {
    const { saveInvoice, incrementInvoiceCounter } = await import(
      "@/lib/localData"
    );
    const items = params.invoiceDetails.items || [];
    const subtotal = items.reduce(
      (t: number, i: Item) => t + (i.qty || 1) * (i.amount || 0),
      0
    );
    const discount = params.invoiceDetails.discount
      ? +params.invoiceDetails.discount
      : 0;
    const taxRate = params.invoiceDetails.taxRate
      ? +params.invoiceDetails.taxRate
      : 0;
    const afterDiscount = subtotal - discount;

    const data: Record<string, string> = {};
    Object.entries({
      ...params.yourDetails,
      ...params.companyDetails,
      ...params.paymentDetails,
      ...params.invoiceTerms,
    }).forEach(([k, v]) => {
      if (typeof v === "string") data[k] = v;
    });

    saveInvoice({
      id: Date.now().toString(),
      invoiceNumber: params.invoiceTerms.invoiceNumber || "INV-000",
      date: params.invoiceTerms.issueDate || new Date().toISOString(),
      client: params.companyDetails.companyName || "Unknown",
      total: afterDiscount + (afterDiscount * taxRate) / 100,
      currency: params.invoiceDetails.currency || "USD",
      data,
      items,
      templateId: params.templateId,
    });
    incrementInvoiceCounter();
  } catch {}
}

export async function downloadInvoice(
  params: GeneratePdfParams
): Promise<boolean> {
  try {
    await showAdWithTimeout();
    const blob = await generateBlob(params);
    const saved = await saveToDevice(blob);
    if (saved) saveHistory(params);
    return saved;
  } catch {
    return false;
  }
}

export async function downloadAndShare(
  params: GeneratePdfParams
): Promise<boolean> {
  try {
    await showAdWithTimeout();
    const blob = await generateBlob(params);
    await saveToDevice(blob).catch(() => {});

    if (Capacitor.isNativePlatform()) {
      const { Filesystem, Directory } = await import("@capacitor/filesystem");
      const { Share } = await import("@capacitor/share");
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const r = reader.result as string;
          resolve(r.split(",")[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
      const saved = await Filesystem.writeFile({
        path: "invoice-share.pdf",
        data: base64,
        directory: Directory.Cache,
      });
      await Share.share({
        title: "Invoice",
        files: [saved.uri],
        dialogTitle: "Share Invoice",
      });
    } else if (navigator.share) {
      const file = new File([blob], "invoice.pdf", { type: "application/pdf" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: "Invoice" });
      }
    } else {
      const { saveAs } = await import("file-saver");
      saveAs(blob, "invoice.pdf");
    }

    saveHistory(params);
    return true;
  } catch {
    return false;
  }
}
