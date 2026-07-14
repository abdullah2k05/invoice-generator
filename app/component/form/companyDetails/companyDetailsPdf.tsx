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
}) => (
  <View style={pdfContainers.CompanyDetails}>
    <Text style={{ ...pdfTypography.title, marginBottom: 14, color: template?.colors.title || pdfTypography.title.color }}>
      To
    </Text>
    <View style={pdfContainers.imageContainer}>
      {companyLogo && (
        <Image src={companyLogo} style={{ height: 40, borderRadius: 6 }} />
      )}
    </View>
    {companyName && (
      <Text style={{ ...pdfTypography.text2xl, flexWrap: "wrap", color: template?.colors.subtitle || "#111827" }}>
        {companyName}
      </Text>
    )}
    {email && (
      <Text style={{ ...pdfTypography.description, marginBottom: 12, color: template?.colors.description || pdfTypography.description.color }}>
        {email}
      </Text>
    )}
    <View style={{ ...pdfTypography.description, color: template?.colors.description || pdfTypography.description.color }}>
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
