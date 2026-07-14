import React from "react";
import { Text, View } from "@react-pdf/renderer";
import { currencyList } from "@/lib/currency";
import { pdfTypography, pdfUtils } from "@/lib/pdfStyles";
import type { PdfTemplate } from "@/lib/pdfTemplates";

export const InvoiceDetailsPdf: React.FC<InvoiceItemDetails & { template?: PdfTemplate }> = ({
  note,
  discount,
  taxRate,
  items,
  currency = "INR",
  template,
}) => {
  const currencyType = currency;
  const currencyDetails = currencyList.find(
    (currency) => currency.value.toLowerCase() === currencyType.toLowerCase()
  )?.details;
  const subtotal = calculateTotalAmount(items);
  const discountAmount = subtotal - (discount ? +discount : 0);
  const taxAmount = discountAmount * ((taxRate ? +taxRate : 0) / 100);
  const totalAmount = discountAmount + taxAmount;
  const tc = template?.colors;

  const titleStyle: any = { ...pdfTypography.title, color: tc?.title || pdfTypography.title.color, fontSize: template?.fontSizes.title ?? 11 };
  const itemDescStyle: any = { ...pdfTypography.itemDescription, color: tc?.itemDescription || pdfTypography.itemDescription.color, fontSize: template?.fontSizes.itemText ?? 12 };
  const amountStyle: any = { ...pdfTypography.amount, color: tc?.amount || "#111827", fontSize: template?.fontSizes.amount ?? 16 };
  const borderColor = tc?.border || "#e5e7eb";

  const borderBottom = { borderBottom: `1px ${template?.borderStyle || "dashed"} ${borderColor}` };
  const borderTop = { borderTop: `1px ${template?.borderStyle || "dashed"} ${borderColor}` };
  const irp = template?.layout.itemRowPadding ?? 14;

  return (
    <View>
      <View style={pdfUtils.flexRowItemCenter}>
        <View style={{ flex: 1, paddingHorizontal: 40, paddingVertical: irp + 2 }}>
          <Text style={titleStyle}>Description</Text>
        </View>
        <View
          style={{
            flex: 1,
            ...pdfUtils.flexRowItemCenter,
            paddingHorizontal: 40,
            paddingVertical: irp + 2,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={titleStyle}>QTY</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={titleStyle}>Price</Text>
          </View>
          <View style={{ flex: 1, textAlign: "right" }}>
            <Text style={titleStyle}>Amount</Text>
          </View>
        </View>
      </View>
      {items.map(({ itemDescription, amount, qty }, index) => {
        const containerStyle = {
          marginHorizontal: 40,
          paddingVertical: irp,
          ...borderBottom,
          ...pdfUtils.flexRowItemCenter,
        };
        const borderTopStyle = index === 0 ? borderTop : {};

        return (
          <View
            key={index}
            style={{
              ...containerStyle,
              ...borderTopStyle,
            }}
          >
            <Text style={{ flex: 1, ...itemDescStyle }}>
              {itemDescription}
            </Text>
            <View
              style={{
                flex: 1,
                ...pdfUtils.flexRowItemCenter,
                paddingLeft: 80,
              }}
            >
              <Text style={{ flex: 1, ...itemDescStyle }}>
                {qty ? qty : "-"}
              </Text>
              <Text style={{ flex: 1, ...itemDescStyle }}>
                {amount ? addCommasToNumber(amount) : ""}
              </Text>
              <Text
                style={{
                  flex: 1,
                  ...itemDescStyle,
                  textAlign: "right",
                }}
              >
                {currencyDetails?.currencySymbol}
                {amount ? addCommasToNumber((qty ? qty : 1) * amount) : ""}
              </Text>
            </View>
          </View>
        );
      })}
      <View style={pdfUtils.flexRowItemCenter}>
        <View style={{ flex: 1, paddingTop: 24 }}>
          {note && (
            <View style={{ paddingHorizontal: 40 }}>
              <Text style={titleStyle}>Note</Text>
              <Text style={itemDescStyle}>{note}</Text>
            </View>
          )}
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              marginHorizontal: 40,
              paddingVertical: irp,
              ...pdfUtils.flexRowItemCenter,
              ...borderBottom,
            }}
          >
            <Text style={{ ...itemDescStyle, flex: 1 }}>
              Subtotal
            </Text>
            <Text
              style={{
                ...itemDescStyle,
                flex: 1,
                textAlign: "right",
              }}
            >
              {currencyDetails?.currencySymbol}
              {addCommasToNumber(subtotal)}
            </Text>
          </View>
          {discount && (
            <View
              style={{
                marginHorizontal: 40,
                paddingVertical: irp,
                ...pdfUtils.flexRowItemCenter,
                ...borderBottom,
              }}
            >
              <Text style={{ ...itemDescStyle, flex: 1 }}>
                Discount
              </Text>
              <Text
                style={{
                  ...itemDescStyle,
                  flex: 1,
                  textAlign: "right",
                }}
              >
                {currencyDetails?.currencySymbol}
                {discount ? addCommasToNumber(+discount) : ""}
              </Text>
            </View>
          )}
          {taxRate && (
            <View
              style={{
                marginHorizontal: 40,
                paddingVertical: irp,
                ...pdfUtils.flexRowItemCenter,
                ...borderBottom,
              }}
            >
              <Text style={{ ...itemDescStyle, flex: 1 }}>
                Tax ({taxRate})%
              </Text>
              <Text
                style={{
                  ...itemDescStyle,
                  flex: 1,
                  textAlign: "right",
                }}
              >
                {currencyDetails?.currencySymbol}
                {addCommasToNumber(+taxAmount.toFixed(2))}
              </Text>
            </View>
          )}
          <View
            style={{
              marginHorizontal: 40,
              paddingVertical: irp,
              ...pdfUtils.flexRowItemCenter,
            }}
          >
            <Text style={{ ...itemDescStyle, flex: 1 }}>
              Amount
            </Text>
            <Text
              style={{ ...amountStyle, textAlign: "right", flex: 1 }}
            >
              {currencyDetails?.currencySymbol}
              {addCommasToNumber(totalAmount)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const calculateTotalAmount = (items: Item[]): number =>
  items.reduce((total, item) => {
    const quantity = item.qty ? +item.qty : 1;
    const amount = item.amount ? +item.amount : 0;
    return total + quantity * amount;
  }, 0);

const addCommasToNumber = (number: number): string => {
  let numberString = number.toString();
  const parts = numberString.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};
