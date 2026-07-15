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
  const isExecutive = t?.id === "executive";
  const isTokyo = t?.id === "tokyo";

  const accentBarColor = tc?.accent || "#312e81";

  const outerBg = tc?.bg || "#ffffff";

  return (
    <div className="w-full flex justify-center">
      <div
        id="invoice-preview"
        className="w-full max-w-[595px] shadow-sm mx-2 md:mx-0 overflow-hidden"
        style={{
          backgroundColor: outerBg,
          border: `1px solid ${tc?.border || "#e4e4e7"}`,
          position: "relative",
        }}
      >
        {isExecutive && (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 12,
              backgroundColor: accentBarColor,
            }}
          />
        )}
        <div style={isExecutive ? { paddingLeft: 60 } : undefined}>
          <InnerPreview
            yourDetails={yourDetails}
            companyDetails={companyDetails}
            invoiceDetails={invoiceDetails}
            paymentDetails={paymentDetails}
            invoiceTerms={invoiceTerms}
            onClick={onClick}
            showPayableIn={showPayableIn}
            template={t}
          />
        </div>
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
}: {
  yourDetails: YourDetails;
  companyDetails: CompanyDetails;
  invoiceDetails: InvoiceItemDetails;
  paymentDetails: PaymentDetails;
  invoiceTerms: InvoiceTerms;
  onClick?: (step: string) => void;
  showPayableIn: boolean;
  template?: PdfTemplate;
}) => {
  const t = template;
  const tc = t?.colors;
  const isTokyo = t?.id === "tokyo";
  const isExecutive = t?.id === "executive";

  const dashedDivider: React.CSSProperties = isTokyo
    ? { borderBottom: `2px dashed ${tc?.border || "#e7e5e4"}`, margin: "0 0" }
    : {};

  return (
    <div>
      <div style={isTokyo ? { ...dashedDivider, margin: 0 } : undefined}>
        <InvoiceTermsPreview {...invoiceTerms} onClick={onClick} template={t} />
      </div>
      {isExecutive ? (
        <div
          className="grid grid-cols-2"
          style={{ borderBottom: `1px solid ${tc?.border || "#e4e4e7"}` }}
        >
          <div
            className="py-3 px-4 md:py-4 md:px-10 cursor-pointer relative group"
            onClick={() => onClick && onClick("1")}
          >
            {!!onClick && chevrons}
            <YourDetailsPreview {...yourDetails} template={t} />
          </div>
          <div
            className="py-3 px-4 md:py-4 md:px-10 cursor-pointer relative group"
            onClick={() => onClick && onClick("2")}
          >
            {!!onClick && chevrons}
            <CompanyDetailsPreview {...companyDetails} template={t} />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2">
          <div
            className="py-3 px-4 md:py-4 md:px-10 cursor-pointer relative group"
            onClick={() => onClick && onClick("1")}
          >
            {!!onClick && chevrons}
            <YourDetailsPreview {...yourDetails} template={t} />
          </div>
          <div
            className="py-3 px-4 md:py-4 md:px-10 cursor-pointer relative group"
            onClick={() => onClick && onClick("2")}
          >
            {!!onClick && chevrons}
            <CompanyDetailsPreview {...companyDetails} template={t} />
          </div>
        </div>
      )}
      <div style={isTokyo ? dashedDivider : undefined}>
        <div className="flex flex-col">
          <div>
            <InvoiceDetailsPreview
              {...invoiceDetails}
              onClick={onClick}
              template={t}
            />
          </div>
          <div>
            <PaymentDetailsPreview
              {...paymentDetails}
              onClick={onClick}
              showPayableIn={showPayableIn}
              template={t}
            />
          </div>
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
