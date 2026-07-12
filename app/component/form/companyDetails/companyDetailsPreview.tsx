/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

export const CompanyDetailsPreview: React.FC<CompanyDetails> = ({
  email,
  companyName,
  companyAddress,
  companyCity,
  companyState,
  companyCountry,
  companyLogo,
  companyTaxId,
  companyZip,
}) => (
  <div>
    <p className="text-xs md:text-[11px] text-neutral-400 font-semibold uppercase pb-2 md:pb-3.5">
      To
    </p>
    <div className="h-8 md:h-10 mb-2 md:mb-3">
      {companyLogo ? (
        <img src={companyLogo} alt="Company Logo" width={40} height={40} className="h-8 md:h-10 w-auto rounded-md" loading="lazy" />
      ) : (
        <div className="rounded-full bg-neutral-100 h-8 md:h-10 w-8 md:w-10" />
      )}
    </div>
    {companyName ? (
      <p className="text-xl md:text-2xl font-medium truncate">{companyName}</p>
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
