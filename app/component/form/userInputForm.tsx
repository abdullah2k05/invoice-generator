"use client";

import dynamic from "next/dynamic";
import { InvoiceDetailsForm } from "@/app/component/form/invoiceDetails/invoiceDetailsForm";
import { InvoiceTermsForm } from "@/app/component/form/invoiceTerms/invoiceTermsForm";
import { PaymentDetailsForm } from "@/app/component/form/paymentDetails/paymentDetailsForm";
import { CompanyDetailsForm } from "@/app/component/form/companyDetails/companyDetailsForm";
import { YourDetailsForm } from "@/app/component/form/yourDetails/yourDetailsForm";
import { useGetValue } from "@/app/hooks/useGetValue";
import { getInitialValue } from "@/lib/getInitialValue";
import { AdBanner } from "@/components/AdBanner";

const DownloadInvoiceButton = dynamic(
  () => import("@/app/component/form/downloadInvoice/downloadInvoiceButton").then((mod) => mod.DownloadInvoiceButton),
  { ssr: false }
);

const AD_STEPS = ["3", "5"];

export const UserInputForm = () => {
  const step = useGetValue("step", getInitialValue("step", "1"));

  return (
    <div>
      <div className={step === "1" ? "block" : "hidden"}>
        <YourDetailsForm />
      </div>
      <div className={step === "2" ? "block" : "hidden"}>
        <CompanyDetailsForm />
      </div>
      <div className={step === "3" ? "block" : "hidden"}>
        <InvoiceDetailsForm />
        {AD_STEPS.includes(step) && <AdBanner adSlot="0000000000" format="horizontal" className="mt-6" />}
      </div>
      <div className={step === "4" ? "block" : "hidden"}>
        <PaymentDetailsForm />
      </div>
      <div className={step === "5" ? "block" : "hidden"}>
        <InvoiceTermsForm />
        {AD_STEPS.includes(step) && <AdBanner adSlot="0000000000" format="horizontal" className="mt-6" />}
      </div>
      {step === "6" && <DownloadInvoiceButton />}
    </div>
  );
};
