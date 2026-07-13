"use client";

import { InvoiceDetailsForm } from "@/app/component/form/invoiceDetails/invoiceDetailsForm";
import { InvoiceTermsForm } from "@/app/component/form/invoiceTerms/invoiceTermsForm";
import { PaymentDetailsForm } from "@/app/component/form/paymentDetails/paymentDetailsForm";
import { CompanyDetailsForm } from "@/app/component/form/companyDetails/companyDetailsForm";
import { YourDetailsForm } from "@/app/component/form/yourDetails/yourDetailsForm";
import CurrencyInput from "@/app/component/ui/currencyInput";
import { AdBanner } from "@/components/AdBanner";

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

  if (section === "from") {
    return <YourDetailsForm compact />;
  }

  if (section === "to") {
    return <CompanyDetailsForm compact />;
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
        <AdBanner adSlot="0000000000" format="horizontal" className="mt-6" />
      </div>
    );
  }

  return null;
};
