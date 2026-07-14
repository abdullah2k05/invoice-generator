/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Image, Text, View, pdf } from "@react-pdf/renderer";
import { pdfContainers, pdfTypography } from "@/lib/pdfStyles";
import type { PdfTemplate } from "@/lib/pdfTemplates";

export const YourDetailsPDF: React.FC<YourDetails & { template?: PdfTemplate }> = ({
  yourEmail,
  yourName,
  yourAddress,
  yourCity,
  yourState,
  yourCountry,
  yourLogo,
  yourTaxId,
  yourZip,
  template,
}) => {
  const tc = template?.colors;
  const sp = template?.layout.sectionPadding ?? 16;
  const titleColor = tc?.title || pdfTypography.title.color;

  const sectionStyle = { ...pdfContainers.YourDetails, paddingVertical: sp } as any;
  if (template?.sectionHeaderStyle === "accent-left-bar") {
    sectionStyle.borderLeft = `4 solid ${tc?.accent || "#635bff"}`;
    sectionStyle.paddingLeft = 44;
  }

  const headerBg = template?.sectionHeaderStyle === "background-block"
    ? { backgroundColor: tc?.accent || "#dc2626", paddingVertical: 4, paddingHorizontal: 8, marginBottom: 12 }
    : { marginBottom: 14 };

  return (
    <View style={sectionStyle}>
      <View style={{ backgroundColor: template?.sectionHeaderStyle === "background-block" ? (tc?.accent || "#dc2626") : "transparent", paddingVertical: template?.sectionHeaderStyle === "background-block" ? 4 : 0, paddingHorizontal: template?.sectionHeaderStyle === "background-block" ? 8 : 0, marginBottom: template?.sectionHeaderStyle === "background-block" ? 12 : 14, alignSelf: template?.sectionHeaderStyle === "background-block" ? "flex-start" : "auto", borderRadius: 2 }}>
        <Text style={{ ...pdfTypography.title, color: template?.sectionHeaderStyle === "background-block" ? "#ffffff" : titleColor, fontSize: template?.fontSizes.title }}>
          From
        </Text>
      </View>

      <View style={pdfContainers.imageContainer}>
        {yourLogo && (
          <Image style={{ height: 40, borderRadius: 6 }} src={yourLogo} />
        )}
      </View>
      {yourName && <Text style={{ ...pdfTypography.text2xl, color: tc?.subtitle || "#111827" }}>{yourName}</Text>}
      {yourEmail && (
        <Text style={{ ...pdfTypography.description, marginBottom: 12, color: tc?.description || pdfTypography.description.color }}>
          {yourEmail}
        </Text>
      )}
      <View style={{ ...pdfTypography.description, color: tc?.description || pdfTypography.description.color }}>
        {yourAddress && <Text>{yourAddress}</Text>}
        {(yourCity || yourState || yourZip) && (
          <Text style={{ marginBottom: 2 }}>
            {yourCity}, {yourState} {yourZip}
          </Text>
        )}
        {yourCountry && <Text style={{ marginBottom: 4 }}>{yourCountry}</Text>}
        {yourTaxId && <Text>Tax ID:{yourTaxId}</Text>}
      </View>
    </View>
  );
};
