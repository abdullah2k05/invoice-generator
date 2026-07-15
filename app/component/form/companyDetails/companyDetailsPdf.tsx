import React from "react";
import { Text, View, Image } from "@react-pdf/renderer";
import { pdfContainers, pdfTypography } from "@/lib/pdfStyles";
import type { PdfTemplate } from "@/lib/pdfTemplates";

export const CompanyDetailsPdf: React.FC<CompanyDetails & { template?: PdfTemplate }> = ({
  email,
  companyName,
  companyAddress,
  companyCity,
  companyState,
  companyCountry,
  companyLogo,
  companyTaxId,
  companyZip,
  template,
}) => {
  const tc = template?.colors;
  const isExecutive = template?.id === "executive";

  const headerStyle: any = {
    ...pdfTypography.title,
    color: tc?.title || pdfTypography.title.color,
    fontSize: template?.fontSizes.title ?? 10,
    fontWeight: isExecutive ? 700 : 600,
    marginBottom: 14,
  };

  return (
    <View style={pdfContainers.CompanyDetails}>
      <Text style={headerStyle}>{isExecutive ? "Billed To" : "To"}</Text>
      <View style={pdfContainers.imageContainer}>
        {companyLogo && <Image src={companyLogo} style={{ height: 40, borderRadius: 6 }} />}
      </View>
      {companyName && (
        <Text style={{ ...pdfTypography.text2xl, flexWrap: "wrap", color: tc?.subtitle || "#111827" }}>
          {companyName}
        </Text>
      )}
      {email && (
        <Text style={{ ...pdfTypography.description, marginBottom: 12, color: tc?.description || pdfTypography.description.color }}>
          {email}
        </Text>
      )}
      <View style={{ ...pdfTypography.description, color: tc?.description || pdfTypography.description.color }}>
        {companyAddress && <Text>{companyAddress}</Text>}
        {(companyCity || companyState || companyZip) && <Text style={{ marginBottom: 2 }}>{companyCity}, {companyState} {companyZip}</Text>}
        {companyCountry && <Text style={{ marginBottom: 4 }}>{companyCountry}</Text>}
        {companyTaxId && <Text>Tax ID: {companyTaxId}</Text>}
      </View>
    </View>
  );
};
