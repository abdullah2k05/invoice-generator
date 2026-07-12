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
}: {
  yourDetails: YourDetails;
  companyDetails: CompanyDetails;
  invoiceDetails: InvoiceItemDetails;
  paymentDetails: PaymentDetails;
  invoiceTerms: InvoiceTerms;
  onClick?: (step: string) => void;
  showPayableIn?: boolean;
}) => (
  <div className="w-full flex justify-center">
    <div className="w-full max-w-[595px] bg-white rounded-2xl border-2 border-gray-200 shadow-sm mx-2 md:mx-0">
      <InvoiceTermsPreview {...invoiceTerms} onClick={onClick} />
      <div className="border-b border-gray-200 grid grid-cols-2">
        <div
          className="py-3 px-4 md:py-4 md:px-10 border-r border-gray-200 cursor-pointer relative group"
          onClick={() => onClick && onClick("1")}
        >
          {!!onClick && (
            <>
              <ChevronDown className="animate-pulse w-4 h-4 text-orange-500 rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
              <ChevronDown className="animate-pulse w-4 h-4 text-orange-500 -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
              <ChevronDown className="animate-pulse w-4 h-4 text-orange-500 rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
              <ChevronDown className="animate-pulse w-4 h-4 text-orange-500 -rotate-45 group-hover:block hidden absolute bottom-0 right-0 " />
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
              <ChevronDown className="animate-pulse w-4 h-4 text-orange-500 rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
              <ChevronDown className="animate-pulse w-4 h-4 text-orange-500 -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
              <ChevronDown className="animate-pulse w-4 h-4 text-orange-500 rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
              <ChevronDown className="animate-pulse w-4 h-4 text-orange-500 -rotate-45 group-hover:block hidden absolute bottom-0 right-0 " />
            </>
          )}
          <CompanyDetailsPreview {...companyDetails} />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="border-b border-gray-200">
          <InvoiceDetailsPreview {...invoiceDetails} onClick={onClick} />
        </div>
        <div>
          <PaymentDetailsPreview {...paymentDetails} onClick={onClick} showPayableIn={showPayableIn} />
        </div>
      </div>
    </div>
  </div>
);
