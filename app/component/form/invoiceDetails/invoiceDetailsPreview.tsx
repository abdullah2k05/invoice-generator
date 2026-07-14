/* eslint-disable @next/next/no-img-element */
import React from "react";
import { currencyList } from "@/lib/currency";
import { ChevronDown } from "lucide-react";
import type { PdfTemplate } from "@/lib/pdfTemplates";

export const InvoiceDetailsPreview: React.FC<
  InvoiceItemDetails & { onClick?: (step: string) => void; template?: PdfTemplate }
> = ({ note, discount, taxRate, items, currency = "INR", onClick, template }) => {
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
  const isSwiss = template?.id === "swiss";
  const isStripe = template?.id === "stripe";

  const headerStyle: React.CSSProperties = {
    color: tc?.title || "#a1a1aa",
    fontSize: template?.fontSizes.title ?? 10,
    fontFamily: isEditorial ? "Georgia, serif" : undefined,
    fontStyle: isEditorial ? "italic" : undefined,
    letterSpacing: isSwiss ? "-0.02em" : "0.05em",
    fontWeight: isSwiss ? 800 : 600,
  };

  const borderColor = tc?.border || (isStripe ? "#f4f4f5" : "#e4e4e7");
  const borderStyle = isSwiss ? "2px solid" : "1px solid";
  const monospaceStyle: React.CSSProperties = isStripe || isSwiss ? { fontFamily: "ui-monospace, SFMono-Regular, monospace" } : {};

  return (
    <div
      className="group cursor-pointer relative"
      onClick={() => onClick && onClick("3")}
    >
      {!!onClick && (
        <>
          <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
          <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
          <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
          <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] -rotate-45 group-hover:block hidden absolute bottom-0 right-0 " />
        </>
      )}
      {/* Header Row */}
      {isSwiss ? (
        <div className="grid grid-cols-2 items-center" style={{ borderBottom: `2px solid ${borderColor}` }}>
          <div className="py-2 md:py-4 px-4 md:px-10">
            <p style={{ ...headerStyle, fontWeight: 800, color: "#09090b" }} className="text-xs md:text-[11px] uppercase tracking-tighter">
              Description
            </p>
          </div>
          <div className="py-2 md:py-4 px-4 md:px-10 grid grid-cols-3 items-center">
            <div><p style={{ ...headerStyle, fontWeight: 800, color: "#09090b" }} className="text-xs md:text-[11px] uppercase tracking-tighter">QTY</p></div>
            <div><p style={{ ...headerStyle, fontWeight: 800, color: "#09090b" }} className="text-xs md:text-[11px] uppercase tracking-tighter">Price</p></div>
            <div><p style={{ ...headerStyle, fontWeight: 800, color: "#09090b" }} className="text-xs md:text-[11px] uppercase tracking-tighter text-right">Amount</p></div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 items-center" style={{ borderBottom: `${isStripe ? "1px solid #f4f4f5" : "1px solid #e4e4e7"}` }}>
          <div className="py-2 md:py-4 px-4 md:px-10">
            <p style={headerStyle} className="text-xs md:text-[11px] uppercase tracking-wider">
              Description
            </p>
          </div>
          <div className="py-2 md:py-4 px-4 md:px-10 grid grid-cols-3 items-center">
            <div><p style={headerStyle} className="text-xs md:text-[11px] uppercase tracking-wider">QTY</p></div>
            <div><p style={headerStyle} className="text-xs md:text-[11px] uppercase tracking-wider">Price</p></div>
            <div><p style={headerStyle} className="text-xs md:text-[11px] uppercase tracking-wider text-right">Amount</p></div>
          </div>
        </div>
      )}
      {/* Item Rows */}
      {items.map(({ itemDescription, amount, qty }, index) => (
        <div
          key={index}
          className="grid grid-cols-2 items-center mx-4 md:mx-10 py-2 md:py-3"
          style={{
            borderBottom: `${isStripe ? "1px solid #f4f4f5" : "1px solid #e4e4e7"}`,
            borderTop: index === 0 && isSwiss ? "2px solid #09090b" : "none",
          }}
        >
          <p className="flex truncate text-xs md:text-xs font-medium text-gray-700 pr-2">
            {itemDescription}
          </p>
          <div className={`pl-4 md:pl-10 grid grid-cols-3 items-center ${isSwiss ? "border-l-2 border-zinc-900/10" : ""}`}>
            <p className="flex truncate text-xs md:text-xs font-medium text-gray-700" style={monospaceStyle}>
              {qty || "-"}
            </p>
            <p className="flex truncate text-xs md:text-xs font-medium text-gray-700" style={monospaceStyle}>
              {amount ? addCommasToNumber(amount) : ""}
            </p>
            <p className={`flex items-end w-full text-xs md:text-xs font-medium text-gray-700 text-right justify-end ${isStripe ? "text-emerald-600" : ""}`} style={monospaceStyle}>
              {currencyDetails?.currencySymbol}
              {amount ? addCommasToNumber((qty ? qty : 1) * amount) : ""}
            </p>
          </div>
        </div>
      ))}
      {/* Totals Section */}
      <div className="grid grid-cols-2">
        {note ? (
          <div className="pt-4 md:pt-6 pb-2 md:pb-4">
            <p style={headerStyle} className="flex truncate text-xs font-semibold pb-1 px-4 md:px-10 uppercase tracking-wider">
              Note
            </p>
            <p className="text-xs font-medium text-neutral-500 px-4 md:px-10 break-words">
              {note}
            </p>
          </div>
        ) : <div />}
        {/* Editorial Dark Total Block */}
        {isEditorial ? (
          <div className="mx-4 md:mx-10 my-4 p-6 rounded-lg" style={{ backgroundColor: "#09090b", color: "#ffffff" }}>
            <div className="flex justify-between items-center py-1">
              <p className="text-xs text-zinc-400">Subtotal</p>
              <p className="text-xs font-medium" style={monospaceStyle}>
                {currencyDetails?.currencySymbol}{addCommasToNumber(subtotal)}
              </p>
            </div>
            {discount && (
              <div className="flex justify-between items-center py-1">
                <p className="text-xs text-zinc-400">Discount</p>
                <p className="text-xs font-medium" style={monospaceStyle}>
                  {currencyDetails?.currencySymbol}{addCommasToNumber(+discount)}
                </p>
              </div>
            )}
            {taxRate && (
              <div className="flex justify-between items-center py-1">
                <p className="text-xs text-zinc-400">Tax ({taxRate}%)</p>
                <p className="text-xs font-medium" style={monospaceStyle}>
                  {currencyDetails?.currencySymbol}{addCommasToNumber(+taxAmount.toFixed(2))}
                </p>
              </div>
            )}
            <div className="border-t border-zinc-700 mt-2 pt-3 flex justify-between items-center">
              <p className="text-sm font-semibold">Amount Due</p>
              <p className="text-base font-bold" style={monospaceStyle}>
                {currencyDetails?.currencySymbol}{addCommasToNumber(totalAmount)}
              </p>
            </div>
          </div>
        ) : (
          <div style={{ borderTop: `${borderStyle} ${borderColor}` }}>
            <div className="flex justify-between items-center mx-4 md:mx-10 py-2 md:py-3" style={{ borderBottom: `${isStripe ? "1px solid #f4f4f5" : "1px solid #e4e4e7"}` }}>
              <p className="flex truncate text-xs font-medium text-gray-600">Subtotal</p>
              <p className="flex truncate text-xs font-medium text-gray-700" style={monospaceStyle}>
                {currencyDetails?.currencySymbol}{addCommasToNumber(subtotal)}
              </p>
            </div>
            {discount && (
              <div className="flex justify-between items-center mx-4 md:mx-10 py-2 md:py-3" style={{ borderBottom: `${isStripe ? "1px solid #f4f4f5" : "1px solid #e4e4e7"}` }}>
                <p className="flex truncate text-xs font-medium text-gray-600">Discount</p>
                <p className="flex truncate text-xs font-medium text-gray-700" style={monospaceStyle}>
                  {currencyDetails?.currencySymbol}{discount ? addCommasToNumber(+discount) : ""}
                </p>
              </div>
            )}
            {taxRate && (
              <div className="flex justify-between items-center mx-4 md:mx-10 py-2 md:py-3" style={{ borderBottom: `${isStripe ? "1px solid #f4f4f5" : "1px solid #e4e4e7"}` }}>
                <p className="flex truncate text-xs font-medium text-gray-600">Tax ({taxRate})%</p>
                <p className="flex truncate text-xs font-medium text-gray-700" style={monospaceStyle}>
                  {currencyDetails?.currencySymbol}{addCommasToNumber(+taxAmount.toFixed(2))}
                </p>
              </div>
            )}
            <div className={`flex justify-between items-center px-4 md:px-10 py-2 md:py-3 ${isStripe ? "" : "bg-gray-50"} rounded-b-2xl`}>
              <div>
                <p className="flex truncate text-xs md:text-sm font-semibold text-gray-800">Amount Due</p>
              </div>
              <p className={`flex truncate text-sm md:text-base font-bold text-gray-900 ${isStripe ? "text-emerald-600" : ""}`} style={monospaceStyle}>
                {currencyDetails?.currencySymbol}{addCommasToNumber(totalAmount)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
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
