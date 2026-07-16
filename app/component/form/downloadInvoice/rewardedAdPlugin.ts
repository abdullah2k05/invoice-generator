import { registerPlugin, type Plugin } from "@capacitor/core";

export interface RewardedAdPlugin extends Plugin {
  showAd(): Promise<{ rewarded: boolean }>;
}

export const RewardedAd = registerPlugin<RewardedAdPlugin>("RewardedAd", {
  web: () =>
    import("@capacitor/core").then(() => ({
      showAd: async () => {
        // On web, rewarded interstitial isn't available via simple AdSense.
        // For now, resolve immediately so download proceeds.
        return { rewarded: true };
      },
    })),
});
