import { registerPlugin, type Plugin } from "@capacitor/core";

export interface NativeAdPlugin extends Plugin {
  showAd(options?: { adUnitId?: string }): Promise<{
    loaded: boolean;
    headline?: string;
    body?: string;
    callToAction?: string;
    starRating?: number;
    price?: string;
    advertiser?: string;
  }>;
  hideAd(): Promise<void>;
}

export const NativeAd = registerPlugin<NativeAdPlugin>("NativeAd");
