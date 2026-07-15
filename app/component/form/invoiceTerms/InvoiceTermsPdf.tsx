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
  const isExecutive = template?.id === "executive";
  const isTokyo = template?.id === "tokyo";

  const titleStyle: any = {
    ...pdfTypography.title,
    color: tc?.title || pdfTypography.title.color,
    fontSize: template?.fontSizes.title ?? 10,
    fontWeight: 600,
  };

  if (isExecutive) {
    return (
      <View style={{ ...pdfContainers.invoiceTerms, borderBottom: `1px solid ${tc?.secondary || "#e0e7ff"}`, paddingBottom: 20 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: tc?.accent || "#312e81" }}>
            {invoiceNumber || "Executive Advisory Group"}
          </Text>
          <Text style={{ fontSize: 10, color: tc?.description || "#64748b", marginTop: 2 }}>
            INV-{invoiceNumber || "001"}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Text style={{ fontSize: 28, fontWeight: 300, letterSpacing: "-0.02em", color: tc?.subtitle || "#0f172a" }}>
            Invoice
          </Text>
          <Text style={{ fontSize: 10, color: tc?.description || "#64748b", marginTop: 2 }}>
            {issueDate ? format(issueDate, "do MMM yyyy") : "—"}
          </Text>
        </View>
      </View>
    );
  }

  if (isTokyo) {
    return (
      <View style={{ ...pdfContainers.invoiceTerms, flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 24, fontWeight: "black", letterSpacing: "-0.04em", marginTop: 8, color: tc?.subtitle || "#1c1917" }}>
            {invoiceNumber || "Tokyo Digital Lab"}
          </Text>
          <Text style={{ fontSize: 10, color: "#57534e" }}>
            INV-{invoiceNumber || "001"}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Text style={{ fontSize: 9, fontWeight: "bold", color: "#78716c", marginBottom: 2 }}>
            INVOICE ID
          </Text>
          <Text style={{ fontSize: 11, fontWeight: "bold", color: tc?.subtitle || "#1c1917" }}>
            {invoiceNumber || "—"}
          </Text>
        </View>
      </View>
    );
  }

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
