/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import type { PdfTemplate } from "@/lib/pdfTemplates";

export const CompanyDetailsPreview: React.FC<CompanyDetails & { template?: PdfTemplate }> = ({
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
}) => {
  const tc = template?.colors;
  const isEditorial = template?.id === "editorial";
  const isExecutive = template?.id === "executive";
  const isTokyo = template?.id === "tokyo";

  const headerStyle: React.CSSProperties = {
    color: tc?.title || "#a1a1aa",
    fontSize: template?.fontSizes.title ?? 10,
    fontFamily: isEditorial ? "Georgia, serif" : undefined,
    fontStyle: isEditorial ? "italic" : undefined,
    letterSpacing: isExecutive ? "0.02em" : "0.05em",
    fontWeight: isExecutive ? 700 : 600,
    textTransform: "uppercase",
  };

  const titleColor = tc?.subtitle || "#111827";

  return (
    <div>
      <p style={headerStyle} className="text-xs md:text-[11px] font-semibold uppercase pb-2 md:pb-3.5 tracking-wider">
        {isExecutive ? "Billed To" : "To"}
      </p>
      <div className="h-8 md:h-10 mb-2 md:mb-3">
        {companyLogo ? (
          <img src={companyLogo} alt="Company Logo" width={40} height={40} className="h-8 md:h-10 w-auto rounded-md" loading="lazy" />
        ) : (
          <div className="rounded-full bg-neutral-100 h-8 md:h-10 w-8 md:w-10" />
        )}
      </div>
      {companyName ? (
        <p className="text-xl md:text-2xl font-medium truncate" style={{ color: titleColor }}>{companyName}</p>
      ) : (
        <p className="text-neutral-300 text-sm italic mb-4">&mdash;</p>
      )}
      {email ? (
        <p className="text-neutral-500/90 text-sm mb-2 md:mb-3 break-all">{email}</p>
      ) : (
        <p className="text-neutral-300 text-xs italic mb-2">&mdash;</p>
      )}
      <div className="text-xs md:text-xs text-neutral-500/80 leading-relaxed">
        {companyAddress ? (
          <p>{companyAddress}</p>
        ) : (
          <p className="text-neutral-300 text-xs italic">&mdash;</p>
        )}
        {companyAddress || companyState || companyZip ? (
          <p className="mb-0.5">
            {companyCity}, {companyState} {companyZip}
          </p>
        ) : null}
        {companyCountry ? (
          <p className="mb-1">{companyCountry}</p>
        ) : null}
        {companyTaxId && <p>Tax ID: {companyTaxId}</p>}
      </div>
    </div>
  );
};
