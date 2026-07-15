import { View, Text, Link } from "@react-pdf/renderer";
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
  const isExecutive = template.id === "executive";
  const isTokyo = template.id === "tokyo";

  const content = (
    <View>
      <InvoiceTermsPdf {...invoiceTerms} template={template} />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          borderBottom: template.showSectionBorders
            ? `1px ${template.borderStyle} ${template.colors.border}`
            : "none",
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
      <View
        style={{
          borderTop: `1px solid ${template.colors.border || "#e5e7eb"}`,
          marginHorizontal: 40,
          paddingTop: 6,
          paddingBottom: 10,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 8,
            color: "#9ca3af",
            textAlign: "center",
          }}
        >
          Generated with{" "}
          <Link
            src="https://invoice-generator.mabdullah.top"
            style={{ color: "#9ca3af", textDecoration: "none" }}
          >
            Invoice Maker
          </Link>{" "}
          • invoice-generator.mabdullah.top
        </Text>
      </View>
    </View>
  );

  if (isExecutive) {
    return (
      <View style={{ position: "relative", paddingLeft: 32 }}>
        <View
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 12,
            backgroundColor: template.colors.accent,
          }}
        />
        <View style={{ paddingLeft: 20 }}>
          {content}
        </View>
      </View>
    );
  }

  if (isTokyo) {
    return (
      <View style={{ backgroundColor: template.colors.bg || "#fafaf9" }}>
        {content}
      </View>
    );
  }

  return content;
};
