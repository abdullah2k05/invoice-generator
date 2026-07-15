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
  const isEditorial = template?.id === "editorial";
  const isExecutive = template?.id === "executive";
  const isTokyo = template?.id === "tokyo";
  const isStripe = template?.id === "stripe";

  const headerStyle: any = {
    ...pdfTypography.title,
    color: isExecutive ? "#ffffff" : (tc?.title || pdfTypography.title.color),
    fontSize: template?.fontSizes.title ?? 10,
    fontWeight: 600,
  };

  const itemDescStyle: any = {
    ...pdfTypography.itemDescription,
    color: tc?.itemDescription || pdfTypography.itemDescription.color,
    fontSize: template?.fontSizes.itemText ?? 11,
  };

  const amountStyle: any = {
    ...pdfTypography.amount,
    color: isStripe ? "#10b981" : isTokyo ? (tc?.accent || "#ea580c") : (tc?.amount || "#111827"),
    fontSize: template?.fontSizes.amount ?? 16,
  };

  const irp = template?.layout.itemRowPadding ?? 12;
  const borderColor = tc?.border || (isStripe ? "#f4f4f5" : "#e4e4e7");
  const rowBorderStr = `1px solid ${borderColor}`;
  const execHeaderBg = isExecutive ? (tc?.accent || "#312e81") : undefined;

  const headerRowStyle: any = isTokyo
    ? { display: "flex", flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderBottomStyle: "dashed", borderBottomColor: borderColor }
    : { ...pdfUtils.flexRowItemCenter, borderBottom: rowBorderStr };

  const itemRowStyle: any = isTokyo
    ? { marginHorizontal: 40, paddingVertical: irp, display: "flex", flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderBottomStyle: "dashed", borderBottomColor: borderColor }
    : { marginHorizontal: 40, paddingVertical: irp, ...pdfUtils.flexRowItemCenter, borderBottom: rowBorderStr };

  return (
    <View>
      {/* Header Row */}
      {isExecutive ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 40,
            paddingVertical: irp,
            paddingHorizontal: 16,
            backgroundColor: execHeaderBg,
            borderRadius: 4,
          }}
        >
          <Text style={{ flex: 1, ...headerStyle, color: "#ffffff" }}>Description</Text>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Text style={{ flex: 1, ...headerStyle, color: "#ffffff", textAlign: "right" }}>Qty</Text>
            <Text style={{ flex: 1, ...headerStyle, color: "#ffffff", textAlign: "right" }}>Price</Text>
            <Text style={{ flex: 1, ...headerStyle, color: "#ffffff", textAlign: "right" }}>Total</Text>
          </View>
        </View>
      ) : (
        <View style={headerRowStyle}>
          <View style={{ flex: 1, paddingHorizontal: 40, paddingVertical: irp + 2 }}>
            <Text style={headerStyle}>Description</Text>
          </View>
          <View style={{ flex: 1, ...pdfUtils.flexRowItemCenter, paddingHorizontal: 40, paddingVertical: irp + 2 }}>
            <View style={{ flex: 1 }}><Text style={headerStyle}>QTY</Text></View>
            <View style={{ flex: 1 }}><Text style={headerStyle}>Price</Text></View>
            <View style={{ flex: 1, textAlign: "right" }}><Text style={headerStyle}>Amount</Text></View>
          </View>
        </View>
      )}
      {/* Item Rows */}
      {items.map(({ itemDescription, amount, qty }, index) => (
        <View key={index} style={itemRowStyle}>
          <Text style={{ flex: 1, ...itemDescStyle, ...(isExecutive ? { fontWeight: 500 } : {}) }}>
            {itemDescription}
          </Text>
          <View style={{ flex: 1, ...pdfUtils.flexRowItemCenter, paddingLeft: 80 }}>
            <Text style={{ flex: 1, ...itemDescStyle }}>{qty ? qty : "-"}</Text>
            <Text style={{ flex: 1, ...itemDescStyle }}>{amount ? addCommasToNumber(amount) : ""}</Text>
            <Text style={{ flex: 1, ...itemDescStyle, textAlign: "right", ...(isExecutive ? { fontWeight: 600 } : {}), ...(isTokyo ? { color: tc?.accent || "#ea580c", fontWeight: "bold" } : {}) }}>
              {currencyDetails?.currencySymbol}{amount ? addCommasToNumber((qty ? qty : 1) * amount) : ""}
            </Text>
          </View>
        </View>
      ))}
      {/* Totals */}
      <View style={pdfUtils.flexRowItemCenter}>
        <View style={{ flex: 1, paddingTop: 24 }}>
          {note && (
            <View style={{ paddingHorizontal: 40 }}>
              <Text style={headerStyle}>Note</Text>
              <Text style={itemDescStyle}>{note}</Text>
            </View>
          )}
        </View>
        {isEditorial ? (
          <View style={{ flex: 1, marginHorizontal: 40, marginVertical: 16, padding: 24, backgroundColor: "#09090b", borderRadius: 8 }}>
            <View style={{ ...pdfUtils.flexRowBetween, paddingVertical: 4 }}>
              <Text style={{ color: "#a1a1aa", fontSize: 10 }}>Subtotal</Text>
              <Text style={{ color: "#ffffff", fontSize: 11 }}>{currencyDetails?.currencySymbol}{addCommasToNumber(subtotal)}</Text>
            </View>
            {discount && (
              <View style={{ ...pdfUtils.flexRowBetween, paddingVertical: 4 }}>
                <Text style={{ color: "#a1a1aa", fontSize: 10 }}>Discount</Text>
                <Text style={{ color: "#ffffff", fontSize: 11 }}>{currencyDetails?.currencySymbol}{addCommasToNumber(+discount)}</Text>
              </View>
            )}
            {taxRate && (
              <View style={{ ...pdfUtils.flexRowBetween, paddingVertical: 4 }}>
                <Text style={{ color: "#a1a1aa", fontSize: 10 }}>Tax ({taxRate}%)</Text>
                <Text style={{ color: "#ffffff", fontSize: 11 }}>{currencyDetails?.currencySymbol}{addCommasToNumber(+taxAmount.toFixed(2))}</Text>
              </View>
            )}
            <View style={{ borderTop: "1px solid #3f3f46", marginTop: 8, paddingTop: 12, ...pdfUtils.flexRowBetween }}>
              <Text style={{ color: "#ffffff", fontSize: 13, fontWeight: "bold" }}>Amount Due</Text>
              <Text style={{ color: "#ffffff", fontSize: 15, fontWeight: "bold" }}>{currencyDetails?.currencySymbol}{addCommasToNumber(totalAmount)}</Text>
            </View>
          </View>
        ) : isExecutive ? (
          <View style={{ flex: 1, marginHorizontal: 40, marginVertical: 16 }}>
            <View style={{ ...pdfUtils.flexRowBetween, paddingVertical: 4, borderBottomWidth: 1, borderBottomColor: tc?.secondary || "#e0e7ff", borderBottomStyle: "solid" }}>
              <Text style={{ color: tc?.description || "#64748b", fontSize: 10 }}>Subtotal</Text>
              <Text style={{ fontSize: 11, fontWeight: "bold" }}>{currencyDetails?.currencySymbol}{addCommasToNumber(subtotal)}</Text>
            </View>
            {discount && (
              <View style={{ ...pdfUtils.flexRowBetween, paddingVertical: 4 }}>
                <Text style={{ color: tc?.description || "#64748b", fontSize: 10 }}>Discount</Text>
                <Text style={{ fontSize: 11, fontWeight: "bold" }}>{currencyDetails?.currencySymbol}{addCommasToNumber(+discount)}</Text>
              </View>
            )}
            {taxRate && (
              <View style={{ ...pdfUtils.flexRowBetween, paddingVertical: 4 }}>
                <Text style={{ color: tc?.description || "#64748b", fontSize: 10 }}>Tax ({taxRate}%)</Text>
                <Text style={{ fontSize: 11, fontWeight: "bold" }}>{currencyDetails?.currencySymbol}{addCommasToNumber(+taxAmount.toFixed(2))}</Text>
              </View>
            )}
            <View style={{ ...pdfUtils.flexRowBetween, paddingTop: 12 }}>
              <Text style={{ fontSize: 13, fontWeight: "bold", color: tc?.subtitle || "#0f172a" }}>Total Due</Text>
              <Text style={{ fontSize: 15, fontWeight: "bold", color: tc?.accent || "#312e81" }}>{currencyDetails?.currencySymbol}{addCommasToNumber(totalAmount)}</Text>
            </View>
          </View>
        ) : isTokyo ? (
          <View style={{ flex: 1, marginHorizontal: 40, marginVertical: 16 }}>
            <View style={{ ...pdfUtils.flexRowBetween, paddingVertical: 4 }}>
              <Text style={{ color: "#78716c", fontSize: 10 }}>Subtotal</Text>
              <Text style={{ fontSize: 11, fontWeight: "bold" }}>{currencyDetails?.currencySymbol}{addCommasToNumber(subtotal)}</Text>
            </View>
            {discount && (
              <View style={{ ...pdfUtils.flexRowBetween, paddingVertical: 4 }}>
                <Text style={{ color: "#78716c", fontSize: 10 }}>Discount</Text>
                <Text style={{ fontSize: 11, fontWeight: "bold" }}>{currencyDetails?.currencySymbol}{addCommasToNumber(+discount)}</Text>
              </View>
            )}
            {taxRate && (
              <View style={{ ...pdfUtils.flexRowBetween, paddingVertical: 4 }}>
                <Text style={{ color: "#78716c", fontSize: 10 }}>Tax ({taxRate}%)</Text>
                <Text style={{ fontSize: 11, fontWeight: "bold" }}>{currencyDetails?.currencySymbol}{addCommasToNumber(+taxAmount.toFixed(2))}</Text>
              </View>
            )}
            <View style={{ borderTopWidth: 1.5, borderTopStyle: "dashed", borderTopColor: tc?.border || "#e7e5e4", marginTop: 8, paddingTop: 12, ...pdfUtils.flexRowBetween }}>
              <Text style={{ fontSize: 13, fontWeight: "black", color: tc?.subtitle || "#1c1917" }}>NET AMOUNT</Text>
              <Text style={{ fontSize: 15, fontWeight: "black", color: tc?.accent || "#ea580c" }}>{currencyDetails?.currencySymbol}{addCommasToNumber(totalAmount)}</Text>
            </View>
          </View>
        ) : (
          <View style={{ flex: 1, borderTop: `1px solid ${borderColor}` }}>
            <View style={{ marginHorizontal: 40, paddingVertical: irp, ...pdfUtils.flexRowItemCenter, borderBottom: `1px solid ${borderColor}` }}>
              <Text style={{ ...itemDescStyle, flex: 1 }}>Subtotal</Text>
              <Text style={{ ...itemDescStyle, flex: 1, textAlign: "right" }}>{currencyDetails?.currencySymbol}{addCommasToNumber(subtotal)}</Text>
            </View>
            {discount && (
              <View style={{ marginHorizontal: 40, paddingVertical: irp, ...pdfUtils.flexRowItemCenter, borderBottom: `1px solid ${borderColor}` }}>
                <Text style={{ ...itemDescStyle, flex: 1 }}>Discount</Text>
                <Text style={{ ...itemDescStyle, flex: 1, textAlign: "right" }}>{currencyDetails?.currencySymbol}{addCommasToNumber(+discount)}</Text>
              </View>
            )}
            {taxRate && (
              <View style={{ marginHorizontal: 40, paddingVertical: irp, ...pdfUtils.flexRowItemCenter, borderBottom: `1px solid ${borderColor}` }}>
                <Text style={{ ...itemDescStyle, flex: 1 }}>Tax ({taxRate})%</Text>
                <Text style={{ ...itemDescStyle, flex: 1, textAlign: "right" }}>{currencyDetails?.currencySymbol}{addCommasToNumber(+taxAmount.toFixed(2))}</Text>
              </View>
            )}
            <View style={{ marginHorizontal: 40, paddingVertical: irp, ...pdfUtils.flexRowItemCenter }}>
              <Text style={{ ...itemDescStyle, flex: 1, fontWeight: "bold" }}>Amount Due</Text>
              <Text style={{ ...amountStyle, textAlign: "right", flex: 1 }}>{currencyDetails?.currencySymbol}{addCommasToNumber(totalAmount)}</Text>
            </View>
          </View>
        )}
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
