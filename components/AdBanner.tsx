"use client";
import { useEffect, useRef, useState } from "react";
import { Capacitor } from "@capacitor/core";

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
  const isNative = useRef(Capacitor.isNativePlatform());
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const adPushed = useRef(false);

  useEffect(() => {
    if (isNative.current) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isNative.current) return;
    if (isVisible && !adPushed.current) {
      const timer = setTimeout(() => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          adPushed.current = true;
        } catch (e) {
          console.error("AdSense error:", e);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (isNative.current) {
    return (
      <div
        className={className}
        style={{
          width: "100%",
          minHeight: "60px",
          backgroundColor: "#E8F0FE",
          borderTop: "1px solid #BBDEFB",
          borderBottom: "1px solid #BBDEFB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          color: "#1565C0",
          fontFamily: "sans-serif",
        }}
      >
        Native banner placeholder
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`flex justify-center items-center min-h-[90px] ${className}`}>
      {isVisible ? (
        // Real publisher ID: ca-pub-6235199437488383
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-3940256099942544"}
          data-ad-slot={adSlot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        <div className="w-full h-[90px] bg-gray-50 rounded-lg animate-pulse" />
      )}
    </div>
  );
};
