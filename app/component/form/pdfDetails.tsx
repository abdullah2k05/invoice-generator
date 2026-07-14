import { View } from "@react-pdf/renderer";
import { YourDetailsPDF } from "./yourDetails/yourDetailsPdf";
import { InvoiceTermsPdf } from "./invoiceTerms/InvoiceTermsPdf";
import { CompanyDetailsPdf } from "./companyDetails/companyDetailsPdf";
import { InvoiceDetailsPdf } from "./invoiceDetails/invoiceDetailsPdf";
import { PaymentDetailsPdf } from "./paymentDetails/paymentDetailsPdf";
import { pdfUtils } from "@/lib/pdfStyles";
import { pdfTemplates, defaultTemplateId, type PdfTemplate } from "@/lib/pdfTemplates";

export const PdfDetails = ({
  yourDetails,
  companyDetails,
  invoiceDetails,
  paymentDetails,
  invoiceTerms,
  countryImageUrl,
  showPayableIn = true,
  templateId = defaultTemplateId,
}: {
  yourDetails: YourDetails;
  companyDetails: CompanyDetails;
  invoiceDetails: InvoiceItemDetails;
  paymentDetails: PaymentDetails;
  invoiceTerms: InvoiceTerms;
  countryImageUrl: string;
  showPayableIn?: boolean;
  templateId?: string;
}) => {
  const template = pdfTemplates.find((t) => t.id === templateId) || pdfTemplates[0];
  const isSwiss = template.id === "swiss";

  const content = (
    <View>
      <InvoiceTermsPdf {...invoiceTerms} template={template} />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          borderBottom: isSwiss ? "2px solid #09090b" : (template.showSectionBorders ? `1px ${template.borderStyle} ${template.colors.border}` : "none"),
        }}
      >
        <YourDetailsPDF {...yourDetails} template={template} />
        <CompanyDetailsPdf {...companyDetails} template={template} />
      </View>
      <View>
        <InvoiceDetailsPdf {...invoiceDetails} template={template} />
        <PaymentDetailsPdf
          {...paymentDetails}
          countryImageUrl={countryImageUrl}
          showPayableIn={showPayableIn}
          template={template}
        />
      </View>
    </View>
  );

  if (isSwiss) {
    return (
      <View style={{ border: "4px solid #09090b", padding: 24 }}>
        <View style={{ border: "2px solid #09090b", padding: 0 }}>
          {content}
        </View>
      </View>
    );
  }

  return content;
};
