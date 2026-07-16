"use client";

import { Capacitor } from "@capacitor/core";
import { useEffect } from "react";

export const TopBanner = () => {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    import("@/app/component/seo/bannerAdPlugin").then(({ BannerAd }) => {
      BannerAd.showAd({ position: "top" }).catch(() => {});
    });
  }, []);
  return null;
};
