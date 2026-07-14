import { View } from "@react-pdf/renderer";
import { YourDetailsPDF } from "./yourDetails/yourDetailsPdf";
import { InvoiceTermsPdf } from "./invoiceTerms/InvoiceTermsPdf";
import { CompanyDetailsPdf } from "./companyDetails/companyDetailsPdf";
import { InvoiceDetailsPdf } from "./invoiceDetails/invoiceDetailsPdf";
import { PaymentDetailsPdf } from "./paymentDetails/paymentDetailsPdf";
import { pdfUtils } from "@/lib/pdfStyles";
import { pdfTemplates, defaultTemplateId, type PdfTemplate } from "@/lib/pdfTemplates";

function getTemplateStyle(template: PdfTemplate, baseStyle: Record<string, string>, colorKey?: keyof typeof template.colors): Record<string, string> {
  const style = { ...baseStyle };
  if (colorKey && template.colors[colorKey]) {
    style.color = template.colors[colorKey];
  }
  const borderKeys = ["borderTop", "borderBottom", "borderLeft", "borderRight"];
  for (const key of borderKeys) {
    if (style[key] !== undefined) {
      const borderStr = style[key] as string;
      const [width] = borderStr.split(" ");
      style[key] = `${width} ${template.borderStyle} ${template.colors.border}`;
    }
  }
  return style;
}

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
  const borderTop = getTemplateStyle(template, pdfUtils.borderTop);
  const borderBottom = getTemplateStyle(template, pdfUtils.borderBottom);

  return (
    <View>
      <InvoiceTermsPdf {...invoiceTerms} template={template} />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          ...(template.showSectionBorders ? borderTop : {}),
          ...(template.showSectionBorders ? borderBottom : {}),
        }}
      >
        <YourDetailsPDF {...yourDetails} template={template} />
        <CompanyDetailsPdf {...companyDetails} template={template} />
      </View>
      <View>
        <View style={template.showSectionBorders ? borderBottom : {}}>
          <InvoiceDetailsPdf {...invoiceDetails} template={template} />
        </View>
        <View>
          <PaymentDetailsPdf
            {...paymentDetails}
            countryImageUrl={countryImageUrl}
            showPayableIn={showPayableIn}
            template={template}
          />
        </View>
      </View>
    </View>
  );
};
