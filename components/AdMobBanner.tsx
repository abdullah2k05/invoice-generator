"use client";

import { useEffect, useRef } from "react";
import { Capacitor } from "@capacitor/core";
import {
  AdMob,
  BannerAdPosition,
  BannerAdSize,
} from "@capacitor-community/admob";

const TEST_BANNER_ID = "ca-app-pub-3940256099942544/6300978111";

export const AdMobBanner = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    if (initialized.current) return;
    initialized.current = true;

    AdMob.initialize({})
      .then(() =>
        AdMob.showBanner({
          adId: TEST_BANNER_ID,
          adSize: BannerAdSize.ADAPTIVE_BANNER,
          position: BannerAdPosition.BOTTOM_CENTER,
          isTesting: true,
          margin: 0,
        })
      )
      .catch(() => {});

    return () => {
      AdMob.removeBanner().catch(() => {});
    };
  }, []);

  return null;
};
