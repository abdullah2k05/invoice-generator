import React from "react";
import { Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";
import { pdfTypography, pdfContainers, pdfUtils } from "@/lib/pdfStyles";
import type { PdfTemplate } from "@/lib/pdfTemplates";

export const InvoiceTermsPdf: React.FC<InvoiceTerms & { template?: PdfTemplate }> = ({
  invoiceNumber,
  issueDate,
  dueDate,
  template,
}) => (
  <View style={pdfContainers.invoiceTerms}>
    <View style={{ flex: 1 }}>
      <Text style={{ ...pdfTypography.title, color: template?.colors.title || pdfTypography.title.color }}>
        Invoice NO
      </Text>
      <Text style={{ ...pdfTypography.subTitle, color: template?.colors.subtitle || "#111827" }}>
        {invoiceNumber}
      </Text>
    </View>
    <View
      style={{
        ...pdfUtils.flexRowBetween,
        paddingRight: 20,
        paddingLeft: 100,
        flex: 1,
      }}
    >
      {issueDate && (
        <View>
          <Text style={{ ...pdfTypography.title, color: template?.colors.title || pdfTypography.title.color }}>
            Issued
          </Text>
          <Text style={{ ...pdfTypography.subTitle, color: template?.colors.subtitle || "#111827" }}>
            {format(issueDate, "do MMM yyyy")}
          </Text>
        </View>
      )}
      {dueDate && (
        <View>
          <Text style={{ ...pdfTypography.title, color: template?.colors.title || pdfTypography.title.color }}>
            Due Date
          </Text>
          <Text style={{ ...pdfTypography.subTitle, color: template?.colors.subtitle || "#111827" }}>
            {format(dueDate, "do MMM yyyy")}
          </Text>
        </View>
      )}
    </View>
  </View>
);
