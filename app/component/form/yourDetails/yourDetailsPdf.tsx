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
}) => (
  <View style={pdfContainers.YourDetails}>
    <Text style={{ ...pdfTypography.title, marginBottom: 14, color: template?.colors.title || pdfTypography.title.color }}>
      From
    </Text>

    <View style={pdfContainers.imageContainer}>
      {yourLogo && (
        <Image style={{ height: 40, borderRadius: 6 }} src={yourLogo} />
      )}
    </View>
    {yourName && <Text style={{ ...pdfTypography.text2xl, color: template?.colors.subtitle || "#111827" }}>{yourName}</Text>}
    {yourEmail && (
      <Text style={{ ...pdfTypography.description, marginBottom: 12, color: template?.colors.description || pdfTypography.description.color }}>
        {yourEmail}
      </Text>
    )}
    <View style={{ ...pdfTypography.description, color: template?.colors.description || pdfTypography.description.color }}>
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
