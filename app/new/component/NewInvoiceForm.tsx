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
  <div className="border-b border-[#E2E8F0] last:border-b-0">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-3 px-5 hover:bg-[#F1F5F9] transition-colors duration-150"
    >
      <div className="flex items-center gap-2">
        {icon && <span className="text-[#64748B]">{icon}</span>}
        <span className="text-sm font-semibold text-[#0F172A]">{title}</span>
      </div>
      <ChevronDown
        className={cn(
          "w-4 h-4 text-[#94A3B8] transition-transform duration-200",
          isOpen && "rotate-180"
        )}
      />
    </button>
    <div
      className={cn(
        "overflow-hidden transition-all duration-200",
        isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
      )}
    >
      <div className="px-5 pb-5 pt-1 space-y-3">
        {children}
      </div>
    </div>
  </div>
);

const Header = ({ onReset }: { onReset: () => void }) => (
  <header className="h-12 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-5 shrink-0">
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <FileText className="w-4 h-4 text-[#0F172A]" />
        <span className="text-sm font-semibold text-[#0F172A]">Invoice Suite</span>
      </div>
      <span className="text-[#94A3B8] text-sm">/</span>
      <span className="text-sm text-[#64748B]">New Invoice</span>
    </div>
    <button
      onClick={onReset}
      className="flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-[#0F172A] transition-colors"
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
    <aside className="w-full md:w-[400px] bg-[#F8F9FA] border-r border-[#E2E8F0] overflow-y-auto">
      <AccordionSection
        title="Invoice Details"
        icon={<FileText className="w-3.5 h-3.5" />}
        isOpen={openSection === "identity"}
        onToggle={() => onOpenSection(openSection === "identity" ? "" : "identity")}
      >
        <UserInputForm section="identity" />
      </AccordionSection>
      <AccordionSection
        title="From"
        icon={<User className="w-3.5 h-3.5" />}
        isOpen={openSection === "from"}
        onToggle={() => onOpenSection(openSection === "from" ? "" : "from")}
      >
        <UserInputForm section="from" />
      </AccordionSection>
      <AccordionSection
        title="To"
        icon={<Briefcase className="w-3.5 h-3.5" />}
        isOpen={openSection === "to"}
        onToggle={() => onOpenSection(openSection === "to" ? "" : "to")}
      >
        <UserInputForm section="to" />
      </AccordionSection>
      <AccordionSection
        title="Items & Pricing"
        icon={<Receipt className="w-3.5 h-3.5" />}
        isOpen={openSection === "financials"}
        onToggle={() => onOpenSection(openSection === "financials" ? "" : "financials")}
      >
        <UserInputForm section="financials" />
      </AccordionSection>
      <AccordionSection
        title="Payment Info"
        icon={<CreditCard className="w-3.5 h-3.5" />}
        isOpen={openSection === "remittance"}
        onToggle={() => onOpenSection(openSection === "remittance" ? "" : "remittance")}
      >
        <UserInputForm section="remittance" />
      </AccordionSection>
      <AccordionSection
        title="Template"
        icon={<LayoutTemplate className="w-3.5 h-3.5" />}
        isOpen={openSection === "template"}
        onToggle={() => onOpenSection(openSection === "template" ? "" : "template")}
      >
        <TemplateSelector />
      </AccordionSection>
      <AccordionSection
        title="Download"
        icon={<FileText className="w-3.5 h-3.5" />}
        isOpen={openSection === "download"}
        onToggle={() => onOpenSection(openSection === "download" ? "" : "download")}
      >
          <div className="text-center py-2">
            <p className="text-sm font-semibold text-[#0F172A]">Your invoice is ready</p>
            <p className="text-xs text-[#64748B] mt-1 mb-4">Please review the details carefully before downloading or sharing your invoice.</p>
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
  <div className="h-12 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-4 shrink-0">
    <div className="flex items-center gap-2">
      <FileText className="w-4 h-4 text-[#0F172A]" />
      <span className="text-sm font-semibold text-[#0F172A]">Invoice</span>
    </div>
    <div className="flex items-center gap-3">
      <div className="bg-[#F1F5F9] rounded-lg p-0.5 flex">
        <button
          onClick={() => onModeChange("edit")}
          className={cn(
            "px-3 py-1 text-xs font-medium rounded-md transition-all duration-150",
            mode === "edit" ? "bg-white text-[#0F172A] shadow-sm" : "text-[#64748B]"
          )}
        >
          Edit
        </button>
        <button
          onClick={() => onModeChange("view")}
          className={cn(
            "px-3 py-1 text-xs font-medium rounded-md transition-all duration-150",
            mode === "view" ? "bg-white text-[#0F172A] shadow-sm" : "text-[#64748B]"
          )}
        >
          View
        </button>
      </div>
      <button
        onClick={onReset}
        className="flex items-center gap-1 text-xs text-[#94A3B8] hover:text-[#0F172A] transition-colors"
      >
        <RotateCcw className="w-3 h-3" />
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
        if (!(s && typeof +s === "number")) localStorage.setItem("step", "1");
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
      <div className="w-full min-h-dvh bg-[#F8F9FA] flex flex-col">
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
          <div className={cn("md:hidden flex-1 overflow-y-auto bg-[#F4F5F6] p-4 pb-40", mobileMode === "edit" && "hidden")}>
            <div className="max-w-[500px] mx-auto space-y-4">
              <UserDataPreview onSectionChange={handleSectionFromPreview} />
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

          {/* Desktop Artboard */}
          <div className="hidden md:flex flex-1 bg-[#F4F5F6] items-start justify-center p-8 pb-40 overflow-y-auto">
            <div className="w-full max-w-[500px]">
              <UserDataPreview onSectionChange={handleSectionFromPreview} />
              <div className="flex flex-col gap-2 mt-6">
                <DownloadInvoiceButton />
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F1F5F9] px-4 py-2.5 text-sm font-medium transition-colors gap-2"
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
            className="bg-[#0F172A] text-white text-sm font-medium px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg active:scale-95 transition-all duration-150"
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
