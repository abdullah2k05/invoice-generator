import { registerPlugin, type Plugin } from "@capacitor/core";

export interface InterstitialAdPlugin extends Plugin {
  showAd(options?: { adUnitId?: string }): Promise<{ shown: boolean }>;
}

export const InterstitialAd = registerPlugin<InterstitialAdPlugin>("InterstitialAd", {
  web: () =>
    import("@capacitor/core").then(() => ({
      showAd: async () => ({ shown: true }),
    })),
});
