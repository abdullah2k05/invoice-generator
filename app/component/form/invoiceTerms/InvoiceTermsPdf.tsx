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
}) => {
  const tc = template?.colors;
  const isEditorial = template?.id === "editorial";
  const isSwiss = template?.id === "swiss";

  const titleStyle: any = {
    ...pdfTypography.title,
    color: tc?.title || pdfTypography.title.color,
    fontSize: template?.fontSizes.title ?? 10,
    fontFamily: isEditorial ? "Geist" : "Geist",
    fontWeight: isSwiss ? 800 : 600,
  };

  return (
    <View style={pdfContainers.invoiceTerms}>
      <View style={{ flex: 1 }}>
        <Text style={titleStyle}>Invoice NO</Text>
        <Text style={{ ...pdfTypography.subTitle, color: tc?.subtitle || "#111827", fontSize: template?.fontSizes.subtitle }}>
          {invoiceNumber}
        </Text>
      </View>
      <View style={{ ...pdfUtils.flexRowBetween, paddingRight: 20, paddingLeft: 100, flex: 1 }}>
        {issueDate && (
          <View>
            <Text style={titleStyle}>Issued</Text>
            <Text style={{ ...pdfTypography.subTitle, color: tc?.subtitle || "#111827", fontSize: template?.fontSizes.subtitle }}>
              {format(issueDate, "do MMM yyyy")}
            </Text>
          </View>
        )}
        {dueDate && (
          <View>
            <Text style={titleStyle}>Due Date</Text>
            <Text style={{ ...pdfTypography.subTitle, color: tc?.subtitle || "#111827", fontSize: template?.fontSizes.subtitle }}>
              {format(dueDate, "do MMM yyyy")}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
