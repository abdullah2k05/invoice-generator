/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Image, Text, View } from "@react-pdf/renderer";
import { currencyList } from "@/lib/currency";
import { pdfTypography, pdfUtils } from "@/lib/pdfStyles";
import type { PdfTemplate } from "@/lib/pdfTemplates";

interface PaymentDetailsPdfProps extends PaymentDetails {
  countryImageUrl: string;
  showPayableIn?: boolean;
}

export const PaymentDetailsPdf: React.FC<PaymentDetailsPdfProps & { template?: PdfTemplate }> = ({
  bankName,
  accountNumber,
  accountName,
  routingCode,
  swiftCode,
  ifscCode,
  currency = "USD",
  countryImageUrl,
  showPayableIn = true,
  template,
}) => {
  const currencyDetails = currencyList.find(
    (currencyDetail) =>
      currencyDetail.value.toLowerCase() === currency.toLowerCase()
  )?.details;

  const hasBankDetails = bankName || accountNumber || accountName || swiftCode || routingCode || ifscCode;
  const tc = template?.colors;
  const titleStyle: any = { ...pdfTypography.title, color: tc?.title || pdfTypography.title.color, fontSize: template?.fontSizes.title ?? 11 };
  const paymentTitleStyle: any = { ...pdfTypography.paymentTitle, color: tc?.paymentTitle || pdfTypography.paymentTitle.color, fontSize: template?.fontSizes.title ?? 11 };
  const itemDescStyle: any = { ...pdfTypography.itemDescription, color: tc?.itemDescription || pdfTypography.itemDescription.color, fontSize: template?.fontSizes.itemText ?? 12 };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {hasBankDetails && (
        <View
          style={{
            flex: 1,
            paddingLeft: 40,
            paddingRight: 12,
            paddingVertical: 16,
            flexDirection: "column",
          }}
        >
          <Text style={{ paddingBottom: 12, ...titleStyle }}>
            Bank Details
          </Text>
          <View style={{ flexDirection: "column", gap: 5 }}>
            {bankName && (
              <View style={pdfUtils.flexRowItemCenter}>
                <Text style={paymentTitleStyle}>Bank Name</Text>
                <Text
                  style={{
                    flex: 1,
                    ...itemDescStyle,
                    paddingLeft: 44.5,
                  }}
                >
                  {bankName}
                </Text>
              </View>
            )}
            {accountNumber && (
              <View style={pdfUtils.flexRowItemCenter}>
                <Text style={paymentTitleStyle}>Account Number</Text>
                <Text
                  style={{
                    flex: 1,
                    ...itemDescStyle,
                    paddingLeft: 14,
                  }}
                >
                  {accountNumber}
                </Text>
              </View>
            )}
            {accountName && (
              <View style={pdfUtils.flexRowItemCenter}>
                <Text style={paymentTitleStyle}>Account Name</Text>
                <Text
                  style={{
                    flex: 1,
                    ...itemDescStyle,
                    paddingLeft: 26,
                  }}
                >
                  {accountName}
                </Text>
              </View>
            )}
            {swiftCode && (
              <View style={pdfUtils.flexRowItemCenter}>
                <Text style={paymentTitleStyle}>Swift Code</Text>
                <Text
                  style={{
                    flex: 1,
                    ...itemDescStyle,
                    paddingLeft: 45,
                  }}
                >
                  {swiftCode}
                </Text>
              </View>
            )}
            {ifscCode && (
              <View style={pdfUtils.flexRowItemCenter}>
                <Text style={paymentTitleStyle}>IFSC Code</Text>
                <Text
                  style={{
                    flex: 1,
                    ...itemDescStyle,
                    paddingLeft: 48,
                  }}
                >
                  {ifscCode}
                </Text>
              </View>
            )}
            {routingCode && (
              <View style={pdfUtils.flexRowItemCenter}>
                <Text style={paymentTitleStyle}>Routing Code</Text>
                <Text
                  style={{
                    flex: 1,
                    ...itemDescStyle,
                    paddingLeft: 32,
                  }}
                >
                  {routingCode}
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
      {showPayableIn && (
        <View
          style={{
            flex: 1,
            paddingLeft: 40,
            paddingRight: 12,
            paddingVertical: 16,
            flexDirection: "column",
          }}
        >
          <Text style={{ ...titleStyle, paddingBottom: 12 }}>
            Payable in
          </Text>
          {currencyDetails && (
            <View style={{ ...pdfUtils.flexRowItemCenter, gap: 8 }}>
              <Image
                src={countryImageUrl}
                style={{
                  width: 30,
                  height: 30,
                  flexShrink: 0,
                  borderRadius: "100%",
                  objectFit: "cover",
                }}
              />
              <View>
                <Text style={{ fontSize: 14, fontWeight: "medium" }}>
                  {currencyDetails.currencyName}
                </Text>
                <Text style={titleStyle}>
                  {currencyDetails.currencySymbol}{" "}
                  {currencyDetails.currencyShortForm}
                </Text>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};
