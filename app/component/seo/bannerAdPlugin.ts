import { registerPlugin, type Plugin } from "@capacitor/core";

export interface BannerAdPlugin extends Plugin {
  showAd(options?: { adUnitId?: string; position?: string }): Promise<void>;
  hideAd(options?: { position?: string }): Promise<void>;
}

export const BannerAd = registerPlugin<BannerAdPlugin>("BannerAd");
