import { CompanyDetailsPreview } from "@/app/component/form/companyDetails/companyDetailsPreview";
import { InvoiceDetailsPreview } from "@/app/component/form/invoiceDetails/invoiceDetailsPreview";
import { InvoiceTermsPreview } from "@/app/component/form/invoiceTerms/InvoiceTermsPreview";
import { PaymentDetailsPreview } from "@/app/component/form/paymentDetails/paymentDetailsPreview";
import { YourDetailsPreview } from "@/app/component/form/yourDetails/yourDetailsPreview";
import { ChevronDown } from "lucide-react";

export const PreviewDetails = ({
  yourDetails,
  companyDetails,
  invoiceDetails,
  paymentDetails,
  invoiceTerms,
  onClick,
  showPayableIn = true,
  templateColors,
}: {
  yourDetails: YourDetails;
  companyDetails: CompanyDetails;
  invoiceDetails: InvoiceItemDetails;
  paymentDetails: PaymentDetails;
  invoiceTerms: InvoiceTerms;
  onClick?: (step: string) => void;
  showPayableIn?: boolean;
  templateColors?: {
    title: string;
    accent: string;
    border: string;
    borderStyle: string;
  };
}) => {
  const tc = templateColors;
  const borderCls = tc?.border || "#E2E8F0";
  const borderSty = tc?.borderStyle || "solid";

  return (
  <div className="w-full flex justify-center">
    <div
      id="invoice-preview"
      className="w-full max-w-[595px] bg-white shadow-sm mx-2 md:mx-0"
      style={{
        border: `1px ${borderSty} ${borderCls}`,
      }}
    >
      <InvoiceTermsPreview {...invoiceTerms} onClick={onClick} />
      <div
        className="grid grid-cols-2"
        style={{ borderBottom: `1px ${borderSty} ${borderCls}` }}
      >
        <div
          className="py-3 px-4 md:py-4 md:px-10 cursor-pointer relative group"
          style={{ borderRight: `1px ${borderSty} ${borderCls}` }}
          onClick={() => onClick && onClick("1")}
        >
          {!!onClick && (
            <>
              <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
              <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
              <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
              <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] -rotate-45 group-hover:block hidden absolute bottom-0 right-0 " />
            </>
          )}
          <YourDetailsPreview {...yourDetails} />
        </div>
        <div
          className="py-3 px-4 md:py-4 md:px-10 cursor-pointer relative group"
          onClick={() => onClick && onClick("2")}
        >
          {!!onClick && (
            <>
              <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
              <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
              <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
              <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] -rotate-45 group-hover:block hidden absolute bottom-0 right-0 " />
            </>
          )}
          <CompanyDetailsPreview {...companyDetails} />
        </div>
      </div>
      <div className="flex flex-col">
        <div style={{ borderBottom: `1px ${borderSty} ${borderCls}` }}>
          <InvoiceDetailsPreview {...invoiceDetails} onClick={onClick} />
        </div>
        <div>
          <PaymentDetailsPreview {...paymentDetails} onClick={onClick} showPayableIn={showPayableIn} />
        </div>
      </div>
    </div>
  </div>
);
};
