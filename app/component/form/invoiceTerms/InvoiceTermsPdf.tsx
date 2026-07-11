import React from "react";
import { Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";
import { pdfTypography, pdfContainers, pdfUtils } from "@/lib/pdfStyles";

export const InvoiceTermsPdf: React.FC<InvoiceTerms> = ({
  invoiceNumber,
  issueDate,
  dueDate,
}) => (
  <View style={pdfContainers.invoiceTerms}>
    <View style={{ flex: 1 }}>
      <Text style={pdfTypography.title}>Invoice NO</Text>
      <Text style={pdfTypography.subTitle}>{invoiceNumber}</Text>
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
          <Text style={pdfTypography.title}>Issued</Text>
          <Text style={pdfTypography.subTitle}>
            {format(issueDate, "do MMM yyyy")}
          </Text>
        </View>
      )}
      {dueDate && (
        <View>
          <Text style={pdfTypography.title}>Due Date</Text>
          <Text style={pdfTypography.subTitle}>
            {format(dueDate, "do MMM yyyy")}
          </Text>
        </View>
      )}
    </View>
  </View>
);
