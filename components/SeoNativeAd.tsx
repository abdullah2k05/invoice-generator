"use client";

import { Capacitor } from "@capacitor/core";
import { useEffect, useState } from "react";

interface SeoNativeAdProps {
  adUnitId?: string;
}

export const SeoNativeAd = ({ adUnitId }: SeoNativeAdProps) => {
  const [ad, setAd] = useState<{
    headline?: string;
    body?: string;
    callToAction?: string;
    advertiser?: string;
  } | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    import("@/app/component/seo/nativeAdPlugin")
      .then(({ NativeAd }) =>
        NativeAd.showAd({
          adUnitId: adUnitId || "ca-app-pub-6235199437488383/6459580646",
        })
      )
      .then((result) => {
        if (result.loaded) {
          setAd({
            headline: result.headline,
            body: result.body,
            callToAction: result.callToAction,
            advertiser: result.advertiser,
          });
        }
      })
      .catch(() => setError(true));
  }, []);

  if (!Capacitor.isNativePlatform()) return null;
  if (error) return null;
  if (!ad) {
    return (
      <div className="w-full h-24 bg-gray-100 rounded-lg animate-pulse my-4" />
    );
  }

  return (
    <div className="w-full border border-[#E2E8F0] rounded-lg p-4 my-4 bg-white">
      <div className="text-xs text-[#94A3B8] uppercase tracking-wider mb-1">
        Sponsored{ad.advertiser ? ` · ${ad.advertiser}` : ""}
      </div>
      <div className="font-semibold text-[#0F172A] text-sm mb-1">
        {ad.headline}
      </div>
      {ad.body && (
        <div className="text-xs text-[#64748B] mb-3">{ad.body}</div>
      )}
      <div className="inline-flex items-center justify-center rounded-md bg-[#0F172A] text-white text-xs font-medium px-3 py-1.5">
        {ad.callToAction || "Learn More"}
      </div>
    </div>
  );
};
