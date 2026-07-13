"use client";

import dynamic from "next/dynamic";
import { InvoiceDetailsForm } from "@/app/component/form/invoiceDetails/invoiceDetailsForm";
import { InvoiceTermsForm } from "@/app/component/form/invoiceTerms/invoiceTermsForm";
import { PaymentDetailsForm } from "@/app/component/form/paymentDetails/paymentDetailsForm";
import { CompanyDetailsForm } from "@/app/component/form/companyDetails/companyDetailsForm";
import { YourDetailsForm } from "@/app/component/form/yourDetails/yourDetailsForm";
import CurrencyInput from "@/app/component/ui/currencyInput";
import { AdBanner } from "@/components/AdBanner";

const DownloadInvoiceButton = dynamic(
  () => import("@/app/component/form/downloadInvoice/downloadInvoiceButton").then((mod) => mod.DownloadInvoiceButton),
  { ssr: false }
);

export const UserInputForm = ({ section }: { section?: string }) => {
  if (section === "identity") {
    return (
      <div>
        <InvoiceTermsForm compact />
        <div className="mt-4">
          <CurrencyInput />
        </div>
      </div>
    );
  }

  if (section === "stakeholders") {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">From</p>
          <YourDetailsForm compact />
        </div>
        <div>
          <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">To</p>
          <CompanyDetailsForm compact />
        </div>
      </div>
    );
  }

  if (section === "financials") {
    return (
      <div>
        <InvoiceDetailsForm compact />
        <AdBanner adSlot="0000000000" format="horizontal" className="mt-6" />
      </div>
    );
  }

  if (section === "remittance") {
    return (
      <div>
        <PaymentDetailsForm compact />
        <div className="mt-8">
          <DownloadInvoiceButton />
        </div>
        <AdBanner adSlot="0000000000" format="horizontal" className="mt-6" />
      </div>
    );
  }

  return null;
};
