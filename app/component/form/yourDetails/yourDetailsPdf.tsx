import React from "react";
import { Image, Text, View } from "@react-pdf/renderer";
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
  const isSwiss = template?.id === "swiss";

  const headerStyle: any = {
    ...pdfTypography.title,
    color: tc?.title || pdfTypography.title.color,
    fontSize: template?.fontSizes.title ?? 10,
    fontWeight: isSwiss ? 800 : 600,
    marginBottom: 14,
  };

  return (
    <View style={pdfContainers.YourDetails}>
      <Text style={headerStyle}>From</Text>
      <View style={pdfContainers.imageContainer}>
        {yourLogo && <Image style={{ height: 40, borderRadius: 6 }} src={yourLogo} />}
      </View>
      {yourName && <Text style={{ ...pdfTypography.text2xl, color: tc?.subtitle || "#111827" }}>{yourName}</Text>}
      {yourEmail && (
        <Text style={{ ...pdfTypography.description, marginBottom: 12, color: tc?.description || pdfTypography.description.color }}>
          {yourEmail}
        </Text>
      )}
      <View style={{ ...pdfTypography.description, color: tc?.description || pdfTypography.description.color }}>
        {yourAddress && <Text>{yourAddress}</Text>}
        {(yourCity || yourState || yourZip) && <Text style={{ marginBottom: 2 }}>{yourCity}, {yourState} {yourZip}</Text>}
        {yourCountry && <Text style={{ marginBottom: 4 }}>{yourCountry}</Text>}
        {yourTaxId && <Text>Tax ID:{yourTaxId}</Text>}
      </View>
    </View>
  );
};
