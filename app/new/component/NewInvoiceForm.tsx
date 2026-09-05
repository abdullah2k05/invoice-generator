"use client";
import { UserInputForm } from "@/app/component/form/userInputForm";
import { UserDataPreview } from "@/app/new/component/userDataPreview";
import { useForm, FormProvider } from "react-hook-form";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useEffect, useState, useCallback } from "react";
import { RotateCcw, ChevronDown, Eye, FileText, User, Briefcase, Receipt, CreditCard, LayoutTemplate, Printer } from "lucide-react";
import dynamic from "next/dynamic";
import { SeoNativeAd } from "@/components/SeoNativeAd";
import { Capacitor } from "@capacitor/core";

const DownloadInvoiceButton = dynamic(
  () => import("@/app/component/form/downloadInvoice/downloadInvoiceButton").then((mod) => mod.DownloadInvoiceButton),
  { ssr: false }
);
const ShareInvoiceButton = dynamic(
  () => import("@/app/component/form/downloadInvoice/shareInvoiceButton").then((mod) => mod.ShareInvoiceButton),
  { ssr: false }
);
import { TemplateSelector } from "@/app/component/form/templateSelector";
import { cn } from "@/lib/utils";

const STORAGE_KEYS = [
  "yourEmail", "yourName", "yourAddress", "yourCity", "yourState",
  "yourCountry", "yourLogo", "yourTaxId", "yourZip",
  "email", "companyName", "companyAddress", "companyCity", "companyState",
  "companyCountry", "companyLogo", "companyTaxId", "companyZip",
  "note", "discount", "tax",
  "bankName", "accountNumber", "accountName", "routingCode", "swiftCode", "ifscCode",
  "invoiceNo", "issueDate", "dueDate", "currency", "step", "items", "showPayableIn", "invoiceTemplate",
];

const clearAllData = () => {
  STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  localStorage.removeItem("_lastActive");
  localStorage.setItem("step", "1");
  window.location.reload();
};

const clearFormOnly = () => {
  STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  localStorage.setItem("step", "1");
};

const AccordionSection = ({
  title,
  icon,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => (
  <div className="border-b border-border last:border-b-0">
    <button
      onClick={onToggle}
      className={cn(
        "w-full flex items-center justify-between py-3.5 px-5 transition-all duration-150",
        isOpen ? "bg-surface-muted" : "hover:bg-surface-muted/50"
      )}
    >
      <div className="flex items-center gap-2.5">
        <span className={cn(
          "transition-colors duration-150",
          isOpen ? "text-accent" : "text-text-muted"
        )}>
          {icon}
        </span>
        <span className={cn(
          "text-[13px] font-medium transition-colors duration-150",
          isOpen ? "text-text-primary" : "text-text-secondary"
        )}>
          {title}
        </span>
      </div>
      <ChevronDown
        className={cn(
          "w-4 h-4 text-text-muted transition-transform duration-200",
          isOpen && "rotate-180"
        )}
      />
    </button>
    <div
      className={cn(
        "accordion-content",
        isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
      )}
    >
      <div className="px-5 pb-5 pt-2 space-y-4">
        {children}
      </div>
    </div>
  </div>
);

const Header = ({ onReset }: { onReset: () => void }) => (
  <header className="h-14 bg-white border-b border-border flex items-center justify-between px-5 shrink-0">
    <div className="flex items-center gap-2.5">
      <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">
        <FileText className="w-3.5 h-3.5 text-accent" />
      </div>
      <div className="flex items-center gap-1.5 text-[13px]">
        <span className="text-text-primary font-medium">Invoice Suite</span>
        <span className="text-text-muted">/</span>
        <span className="text-text-secondary">New Invoice</span>
      </div>
    </div>
    <button
      onClick={onReset}
      className="btn-ghost text-[13px] text-text-muted hover:text-destructive"
    >
      <RotateCcw className="w-3.5 h-3.5" />
      Reset
    </button>
  </header>
);

const stepToSection: Record<string, string> = {
  "1": "identity",
  "2": "from",
  "3": "to",
  "4": "financials",
  "5": "remittance",
};

const Sidebar = ({
  openSection,
  onOpenSection,
}: {
  openSection: string;
  onOpenSection: (s: string) => void;
}) => {
  return (
    <aside className="w-full md:w-[380px] bg-white border-r border-border overflow-y-auto custom-scrollbar">
      <AccordionSection
        title="Invoice Details"
        icon={<FileText className="w-4 h-4" />}
        isOpen={openSection === "identity"}
        onToggle={() => onOpenSection(openSection === "identity" ? "" : "identity")}
      >
        <UserInputForm section="identity" />
      </AccordionSection>
      <AccordionSection
        title="From"
        icon={<User className="w-4 h-4" />}
        isOpen={openSection === "from"}
        onToggle={() => onOpenSection(openSection === "from" ? "" : "from")}
      >
        <UserInputForm section="from" />
      </AccordionSection>
      <AccordionSection
        title="To"
        icon={<Briefcase className="w-4 h-4" />}
        isOpen={openSection === "to"}
        onToggle={() => onOpenSection(openSection === "to" ? "" : "to")}
      >
        <UserInputForm section="to" />
      </AccordionSection>
      <AccordionSection
        title="Items & Pricing"
        icon={<Receipt className="w-4 h-4" />}
        isOpen={openSection === "financials"}
        onToggle={() => onOpenSection(openSection === "financials" ? "" : "financials")}
      >
        <UserInputForm section="financials" />
      </AccordionSection>
      <AccordionSection
        title="Payment Info"
        icon={<CreditCard className="w-4 h-4" />}
        isOpen={openSection === "remittance"}
        onToggle={() => onOpenSection(openSection === "remittance" ? "" : "remittance")}
      >
        <UserInputForm section="remittance" />
      </AccordionSection>
      <AccordionSection
        title="Template"
        icon={<LayoutTemplate className="w-4 h-4" />}
        isOpen={openSection === "template"}
        onToggle={() => onOpenSection(openSection === "template" ? "" : "template")}
      >
        <TemplateSelector />
      </AccordionSection>
      <AccordionSection
        title="Download"
        icon={<FileText className="w-4 h-4" />}
        isOpen={openSection === "download"}
        onToggle={() => onOpenSection(openSection === "download" ? "" : "download")}
      >
        <div className="space-y-3">
          <p className="text-body-sm text-text-secondary">
            Review your invoice carefully before downloading or sharing.
          </p>
          <div className="flex flex-col gap-2">
            <DownloadInvoiceButton />
            <ShareInvoiceButton />
          </div>
        </div>
      </AccordionSection>
    </aside>
  );
};

const MobileToggleHeader = ({
  mode,
  onModeChange,
  onReset,
}: {
  mode: "edit" | "view";
  onModeChange: (m: "edit" | "view") => void;
  onReset: () => void;
}) => (
  <div className="h-14 bg-white border-b border-border flex items-center justify-between px-4 shrink-0">
    <div className="flex items-center gap-2.5">
      <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">
        <FileText className="w-3.5 h-3.5 text-accent" />
      </div>
      <span className="text-[13px] font-medium text-text-primary">Invoice</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="bg-surface-muted rounded-button p-0.5 flex">
        <button
          onClick={() => onModeChange("edit")}
          className={cn(
            "px-3 py-1.5 text-[12px] font-medium rounded-[6px] transition-all duration-150",
            mode === "edit" ? "bg-white text-text-primary shadow-soft" : "text-text-secondary"
          )}
        >
          Edit
        </button>
        <button
          onClick={() => onModeChange("view")}
          className={cn(
            "px-3 py-1.5 text-[12px] font-medium rounded-[6px] transition-all duration-150",
            mode === "view" ? "bg-white text-text-primary shadow-soft" : "text-text-secondary"
          )}
        >
          View
        </button>
      </div>
      <button
        onClick={onReset}
        className="btn-ghost p-2 text-text-muted"
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
);

export const NewInvoiceForm = () => {
  const methods = useForm({
    defaultValues: { invoiceTemplate: "stripe" },
  });
  const [isClient, setIsClient] = useState(false);
  const [mobileMode, setMobileMode] = useState<"edit" | "view">("edit");
  const [openSection, setOpenSection] = useState<string>("identity");

  const handleSectionFromPreview = useCallback((step: string) => {
    const section = stepToSection[step];
    if (section) {
      setOpenSection(section);
      if (mobileMode === "view") setMobileMode("edit");
    }
  }, [mobileMode]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
      try {
        const s = localStorage.getItem("step");
        if (!(s && !isNaN(+s) && +s >= 1 && +s <= 5)) localStorage.setItem("step", "1");
      } catch {
        localStorage.setItem("step", "1");
      }
    }
  }, []);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    import("@/app/component/seo/interstitialAdPlugin").then(
      ({ InterstitialAd }) => {
        InterstitialAd.showAd({ adUnitId: "ca-app-pub-6235199437488383/4966415437" }).catch(() => {});
      }
    ).catch(() => {});
  }, []);

  const handleReset = useCallback(() => {
    clearFormOnly();
  }, []);

  if (!isClient) return <div />;

  return (
    <ErrorBoundary>
      <FormProvider {...methods}>
      <div className="w-full min-h-dvh bg-surface flex flex-col">
        {/* Desktop Header */}
        <div className="hidden md:block">
          <Header onReset={handleReset} />
        </div>

        {/* Mobile Header */}
        <div className="md:hidden">
          <MobileToggleHeader mode={mobileMode} onModeChange={setMobileMode} onReset={handleReset} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Mobile: Edit mode */}
          <div className={cn("md:hidden flex-1 overflow-y-auto", mobileMode === "view" && "hidden")}>
            <Sidebar openSection={openSection} onOpenSection={setOpenSection} />
          </div>

          {/* Mobile: View mode */}
          <div className={cn("md:hidden flex-1 overflow-y-auto bg-surface-muted p-4 pb-40", mobileMode === "edit" && "hidden")}>
            <div className="max-w-[500px] mx-auto space-y-4">
              <div className="invoice-paper rounded-card shadow-soft-lg border border-border overflow-hidden">
                <UserDataPreview onSectionChange={handleSectionFromPreview} />
              </div>
              <div className="flex flex-col gap-2">
                <DownloadInvoiceButton />
                <ShareInvoiceButton />
              </div>
            </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden md:block flex-shrink-0">
            <Sidebar openSection={openSection} onOpenSection={setOpenSection} />
          </div>

          {/* Desktop Preview */}
          <div className="hidden md:flex flex-1 bg-surface-muted items-start justify-center p-8 pb-40 overflow-y-auto custom-scrollbar">
            <div className="w-full max-w-[500px]">
              <div className="invoice-paper rounded-card shadow-soft-lg border border-border overflow-hidden" id="invoice-print-area">
                <UserDataPreview onSectionChange={handleSectionFromPreview} />
              </div>
              <div className="flex items-center gap-2 mt-4">
                <DownloadInvoiceButton />
                <button
                  onClick={() => {
                    const el = document.getElementById("invoice-print-area");
                    if (!el) return;
                    const iframe = document.createElement("iframe");
                    iframe.style.position = "fixed";
                    iframe.style.top = "-9999px";
                    iframe.style.width = "800px";
                    iframe.style.height = "1100px";
                    document.body.appendChild(iframe);
                    const doc = iframe.contentWindow?.document;
                    if (!doc) { document.body.removeChild(iframe); return; }
                    doc.open();
                    doc.write(`<html><head><title>Invoice</title>`);
                    Array.from(document.styleSheets).forEach((sheet) => {
                      if (sheet.href) {
                        doc.write(`<link rel="stylesheet" href="${sheet.href}">`);
                      }
                    });
                    doc.write(`<style>body { padding: 40px; } @page { margin: 15mm; }</style>`);
                    doc.write(`</head><body></body></html>`);
                    const trusted = doc.importNode(el, true);
                    doc.body.appendChild(trusted);
                    doc.close();
                    setTimeout(() => {
                      iframe.contentWindow?.print();
                      setTimeout(() => document.body.removeChild(iframe), 1000);
                    }, 500);
                  }}
                  className="btn-secondary text-[13px]"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Native ad placement */}
        <div className="px-4 pb-4 md:px-8">
          <SeoNativeAd adUnitId="ca-app-pub-6235199437488383/1410313801" />
        </div>

        {/* Mobile: Floating View button in edit mode */}
        <div className="md:hidden fixed bottom-28 left-1/2 -translate-x-1/2 z-40">
          <button
            onClick={() => setMobileMode(mobileMode === "edit" ? "view" : "edit")}
            className="bg-text-primary text-white text-[13px] font-medium px-5 py-3 rounded-pill flex items-center gap-2 shadow-soft-lg active:scale-[0.96] transition-all duration-150"
          >
            {mobileMode === "edit" ? (
              <>
                <Eye className="w-4 h-4" />
                View Invoice
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                Edit Details
              </>
            )}
          </button>
        </div>
      </div>
    </FormProvider>
    </ErrorBoundary>
  );
};
