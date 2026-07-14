/* eslint-disable jsx-a11y/alt-text */
"use client";
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
  const sp = template?.layout.sectionPadding ?? 16;
  const titleColor = tc?.title || pdfTypography.title.color;

  const sectionStyle = { ...pdfContainers.CompanyDetails, paddingVertical: sp } as any;
  if (template?.sectionHeaderStyle === "accent-left-bar") {
    sectionStyle.borderLeft = `4 solid ${tc?.accent || "#635bff"}`;
    sectionStyle.paddingLeft = 44;
  }

  return (
    <View style={sectionStyle}>
      <View style={{ backgroundColor: template?.sectionHeaderStyle === "background-block" ? (tc?.accent || "#dc2626") : "transparent", paddingVertical: template?.sectionHeaderStyle === "background-block" ? 4 : 0, paddingHorizontal: template?.sectionHeaderStyle === "background-block" ? 8 : 0, marginBottom: template?.sectionHeaderStyle === "background-block" ? 12 : 14, alignSelf: template?.sectionHeaderStyle === "background-block" ? "flex-start" : "auto", borderRadius: 2 }}>
        <Text style={{ ...pdfTypography.title, color: template?.sectionHeaderStyle === "background-block" ? "#ffffff" : titleColor, fontSize: template?.fontSizes.title }}>
          To
        </Text>
      </View>
      <View style={pdfContainers.imageContainer}>
        {companyLogo && (
          <Image src={companyLogo} style={{ height: 40, borderRadius: 6 }} />
        )}
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
        {(companyCity || companyState || companyZip) && (
          <Text style={{ marginBottom: 2 }}>
            {companyCity}, {companyState} {companyZip}
          </Text>
        )}
        {companyCountry && (
          <Text style={{ marginBottom: 4 }}>{companyCountry}</Text>
        )}
        {companyTaxId && <Text>Tax ID: {companyTaxId}</Text>}
      </View>
    </View>
  );
};
