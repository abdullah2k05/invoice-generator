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
  const hp = template?.layout.headerPadding ?? 20;
  const titleColor = tc?.title || pdfTypography.title.color;

  const topBar = template?.headerAccent === "top-bar" ? (
    <View style={{ height: 6, backgroundColor: tc?.accent || "#dc2626" }} />
  ) : null;

  const fullBg = template?.headerAccent === "full-background" ? (
    { backgroundColor: tc?.accent || "#2563eb", paddingHorizontal: 40, paddingVertical: hp, marginHorizontal: 0, marginVertical: 0 }
  ) : null;

  const baseStyle: any = { ...pdfContainers.invoiceTerms };
  if (fullBg) Object.assign(baseStyle, fullBg);

  return (
    <View>
      {topBar}
      <View style={baseStyle}>
        <View style={{ flex: 1 }}>
          <Text style={{ ...pdfTypography.title, color: template?.headerAccent === "full-background" ? "#ffffff" : titleColor, fontSize: template?.fontSizes.title }}>
            Invoice NO
          </Text>
          <Text style={{ ...pdfTypography.subTitle, color: template?.headerAccent === "full-background" ? "#ffffff" : (tc?.subtitle || "#111827"), fontSize: template?.fontSizes.subtitle }}>
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
              <Text style={{ ...pdfTypography.title, color: template?.headerAccent === "full-background" ? "#ffffff" : titleColor, fontSize: template?.fontSizes.title }}>
                Issued
              </Text>
              <Text style={{ ...pdfTypography.subTitle, color: template?.headerAccent === "full-background" ? "#ffffff" : (tc?.subtitle || "#111827"), fontSize: template?.fontSizes.subtitle }}>
                {format(issueDate, "do MMM yyyy")}
              </Text>
            </View>
          )}
          {dueDate && (
            <View>
              <Text style={{ ...pdfTypography.title, color: template?.headerAccent === "full-background" ? "#ffffff" : titleColor, fontSize: template?.fontSizes.title }}>
                Due Date
              </Text>
              <Text style={{ ...pdfTypography.subTitle, color: template?.headerAccent === "full-background" ? "#ffffff" : (tc?.subtitle || "#111827"), fontSize: template?.fontSizes.subtitle }}>
                {format(dueDate, "do MMM yyyy")}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
