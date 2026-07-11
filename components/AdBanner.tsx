"use client";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdBannerProps {
  adSlot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}

export const AdBanner = ({ adSlot, format = "auto", className = "" }: AdBannerProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const isAdReady = useRef(false);

  useEffect(() => {
    if (adRef.current && !isAdReady.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdReady.current = true;
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, []);

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div ref={adRef}>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-0000000000000000"}
          data-ad-slot={adSlot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};
