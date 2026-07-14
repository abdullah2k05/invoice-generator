import { CompanyDetailsPreview } from "@/app/component/form/companyDetails/companyDetailsPreview";
import { InvoiceDetailsPreview } from "@/app/component/form/invoiceDetails/invoiceDetailsPreview";
import { InvoiceTermsPreview } from "@/app/component/form/invoiceTerms/InvoiceTermsPreview";
import { PaymentDetailsPreview } from "@/app/component/form/paymentDetails/paymentDetailsPreview";
import { YourDetailsPreview } from "@/app/component/form/yourDetails/yourDetailsPreview";
import { ChevronDown } from "lucide-react";
import type { PdfTemplate } from "@/lib/pdfTemplates";

export const PreviewDetails = ({
  yourDetails,
  companyDetails,
  invoiceDetails,
  paymentDetails,
  invoiceTerms,
  onClick,
  showPayableIn = true,
  template,
}: {
  yourDetails: YourDetails;
  companyDetails: CompanyDetails;
  invoiceDetails: InvoiceItemDetails;
  paymentDetails: PaymentDetails;
  invoiceTerms: InvoiceTerms;
  onClick?: (step: string) => void;
  showPayableIn?: boolean;
  template?: PdfTemplate;
}) => {
  const t = template;
  const tc = t?.colors;
  const isEditorial = t?.id === "editorial";
  const isSwiss = t?.id === "swiss";
  const isStripe = t?.id === "stripe";

  const outerStyle: React.CSSProperties = {
    backgroundColor: tc?.bg || "#ffffff",
    border: isSwiss ? "4px solid #09090b" : `1px solid ${tc?.border || "#e4e4e7"}`,
    padding: isSwiss ? 32 : 0,
  };

  const innerStyle: React.CSSProperties = isSwiss
    ? { border: "2px solid #09090b", padding: 0 }
    : {};

  const borderColor = tc?.border || "#e4e4e7";

  return (
    <div className="w-full flex justify-center">
      <div
        id="invoice-preview"
        className="w-full max-w-[595px] bg-white shadow-sm mx-2 md:mx-0 overflow-hidden"
        style={outerStyle}
      >
        {isSwiss ? (
          <div style={innerStyle}>
            <InnerPreview
              yourDetails={yourDetails}
              companyDetails={companyDetails}
              invoiceDetails={invoiceDetails}
              paymentDetails={paymentDetails}
              invoiceTerms={invoiceTerms}
              onClick={onClick}
              showPayableIn={showPayableIn}
              template={t}
              borderColor={borderColor}
            />
          </div>
        ) : (
          <InnerPreview
            yourDetails={yourDetails}
            companyDetails={companyDetails}
            invoiceDetails={invoiceDetails}
            paymentDetails={paymentDetails}
            invoiceTerms={invoiceTerms}
            onClick={onClick}
            showPayableIn={showPayableIn}
            template={t}
            borderColor={borderColor}
          />
        )}
      </div>
    </div>
  );
};

const InnerPreview = ({
  yourDetails,
  companyDetails,
  invoiceDetails,
  paymentDetails,
  invoiceTerms,
  onClick,
  showPayableIn,
  template,
  borderColor,
}: {
  yourDetails: YourDetails;
  companyDetails: CompanyDetails;
  invoiceDetails: InvoiceItemDetails;
  paymentDetails: PaymentDetails;
  invoiceTerms: InvoiceTerms;
  onClick?: (step: string) => void;
  showPayableIn: boolean;
  template?: PdfTemplate;
  borderColor: string;
}) => {
  const t = template;
  const tc = t?.colors;
  const isSwiss = t?.id === "swiss";

  return (
    <div>
      <InvoiceTermsPreview {...invoiceTerms} onClick={onClick} template={t} />
      {isSwiss ? (
        <div className="grid grid-cols-2">
          <div className="py-3 px-4 md:py-4 md:px-10 cursor-pointer relative group" onClick={() => onClick && onClick("1")}>
            {!!onClick && chevrons}
            <YourDetailsPreview {...yourDetails} template={t} />
          </div>
          <div
            className="py-3 px-4 md:py-4 md:px-10 cursor-pointer relative group"
            style={{ borderLeft: "2px solid #09090b" }}
            onClick={() => onClick && onClick("2")}
          >
            {!!onClick && chevrons}
            <CompanyDetailsPreview {...companyDetails} template={t} />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2">
          <div className="py-3 px-4 md:py-4 md:px-10 cursor-pointer relative group" onClick={() => onClick && onClick("1")}>
            {!!onClick && chevrons}
            <YourDetailsPreview {...yourDetails} template={t} />
          </div>
          <div className="py-3 px-4 md:py-4 md:px-10 cursor-pointer relative group" onClick={() => onClick && onClick("2")}>
            {!!onClick && chevrons}
            <CompanyDetailsPreview {...companyDetails} template={t} />
          </div>
        </div>
      )}
      <div className="flex flex-col">
        <div>
          <InvoiceDetailsPreview {...invoiceDetails} onClick={onClick} template={t} />
        </div>
        <div>
          <PaymentDetailsPreview {...paymentDetails} onClick={onClick} showPayableIn={showPayableIn} template={t} />
        </div>
      </div>
    </div>
  );
};

const chevrons = (
  <>
    <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
    <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
    <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
    <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] -rotate-45 group-hover:block hidden absolute bottom-0 right-0" />
  </>
);
