/* eslint-disable @next/next/no-img-element */
import React from "react";
import type { PdfTemplate } from "@/lib/pdfTemplates";

export const YourDetailsPreview: React.FC<YourDetails & { template?: PdfTemplate }> = ({
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
  const isEditorial = template?.id === "editorial";
  const isSwiss = template?.id === "swiss";

  const headerStyle: React.CSSProperties = {
    color: tc?.title || "#a1a1aa",
    fontSize: template?.fontSizes.title ?? 10,
    fontFamily: isEditorial ? "Georgia, serif" : undefined,
    fontStyle: isEditorial ? "italic" : undefined,
    letterSpacing: isSwiss ? "-0.02em" : "0.05em",
    fontWeight: isSwiss ? 800 : 600,
    textTransform: "uppercase",
  };

  return (
    <div>
      <p style={headerStyle} className="text-xs md:text-[11px] font-semibold uppercase pb-2 md:pb-3.5 tracking-wider">
        From
      </p>
      <div className="h-8 md:h-10 mb-2 md:mb-3">
        {yourLogo ? (
          <img src={yourLogo} alt="Company Logo" width={40} height={40} className="h-8 md:h-10 w-auto rounded-md" loading="lazy" />
        ) : (
          <div className="rounded-full bg-neutral-100 h-8 md:h-10 w-8 md:w-10" />
        )}
      </div>
      {yourName ? (
        <p className="text-xl md:text-2xl font-medium truncate">{yourName}</p>
      ) : (
        <p className="text-neutral-300 text-sm italic mb-4">&mdash;</p>
      )}
      {yourEmail ? (
        <p className="text-neutral-500/90 text-sm mb-2 md:mb-3 break-all">{yourEmail}</p>
      ) : (
        <p className="text-neutral-300 text-xs italic mb-2">&mdash;</p>
      )}
      <div className="text-xs md:text-xs text-neutral-500/80 leading-relaxed">
        {yourAddress ? (
          <p>{yourAddress}</p>
        ) : (
          <p className="text-neutral-300 text-xs italic">&mdash;</p>
        )}
        {yourAddress || yourState || yourZip ? (
          <p className="mb-0.5">
            {yourCity}, {yourState} {yourZip}
          </p>
        ) : null}
        {yourCountry ? (
          <p className="mb-1">{yourCountry}</p>
        ) : null}
        {yourTaxId && <p>Tax ID: {yourTaxId}</p>}
      </div>
    </div>
  );
};
