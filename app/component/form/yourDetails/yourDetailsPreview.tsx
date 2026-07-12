/* eslint-disable @next/next/no-img-element */
import React from "react";

export const YourDetailsPreview: React.FC<YourDetails> = ({
  yourEmail,
  yourName,
  yourAddress,
  yourCity,
  yourState,
  yourCountry,
  yourLogo,
  yourTaxId,
  yourZip,
}) => (
  <div>
    <p className="text-xs md:text-[11px] text-neutral-400 font-semibold uppercase pb-2 md:pb-3.5">
      From
    </p>
    <div className="h-8 md:h-10 mb-2 md:mb-3">
      {yourLogo ? (
        <img src={yourLogo} alt="Company Logo" className="h-8 md:h-10 rounded-md" />
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
