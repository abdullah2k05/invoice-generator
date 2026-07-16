package com.mabdullah.invoice;

import android.util.Log;

import androidx.annotation.NonNull;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.rewardedinterstitial.RewardedInterstitialAd;
import com.google.android.gms.ads.rewardedinterstitial.RewardedInterstitialAdLoadCallback;

@CapacitorPlugin(name = "RewardedAd")
public class RewardedAdPlugin extends Plugin {

    private static final String TAG = "RewardedAdPlugin";

    @PluginMethod
    public void showAd(PluginCall call) {
        Log.d(TAG, "=== showAd() called ===");
        Log.d(TAG, "Activity: " + (getActivity() != null ? "present" : "NULL"));

        Log.d(TAG, "Calling MobileAds.initialize()");
        MobileAds.initialize(getContext(), status -> {
            Log.d(TAG, "MobileAds initialized. Adapter status map size: " +
                status.getAdapterStatusMap().size());
            status.getAdapterStatusMap().forEach((key, val) -> {
                Log.d(TAG, "  Adapter " + key + ": " + val.getInitializationState());
            });
            loadAndShow(call);
        });
    }

    private void loadAndShow(PluginCall call) {
        String adUnitId = "ca-app-pub-6235199437488383/8731887749";
        Log.d(TAG, "Loading rewarded ad. Unit ID: " + adUnitId);

        AdRequest adRequest = new AdRequest.Builder().build();
        RewardedInterstitialAd.load(getContext(), adUnitId,
            adRequest, new RewardedInterstitialAdLoadCallback() {
                @Override
                public void onAdLoaded(@NonNull RewardedInterstitialAd ad) {
                    Log.d(TAG, "=== Rewarded onAdLoaded ===");
                    showLoadedAd(call, ad);
                }

                @Override
                public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                    Log.e(TAG, "=== Rewarded onAdFailedToLoad ===");
                    Log.e(TAG, "Code: " + loadAdError.getCode());
                    Log.e(TAG, "Message: " + loadAdError.getMessage());
                    Log.e(TAG, "Domain: " + loadAdError.getDomain());
                    if (loadAdError.getResponseInfo() != null) {
                        Log.e(TAG, "Response info: " + loadAdError.getResponseInfo().toString());
                    }
                    call.reject("Ad failed: " + loadAdError.getMessage());
                }
            });
    }

    private void showLoadedAd(PluginCall call, RewardedInterstitialAd ad) {
        Log.d(TAG, "Showing rewarded ad");
        ad.setFullScreenContentCallback(new FullScreenContentCallback() {
            @Override
            public void onAdDismissedFullScreenContent() {
                Log.d(TAG, "Rewarded ad dismissed");
                JSObject ret = new JSObject();
                ret.put("rewarded", true);
                call.resolve(ret);
            }

            @Override
            public void onAdFailedToShowFullScreenContent(AdError adError) {
                Log.e(TAG, "Rewarded failed to show: " + adError.getMessage());
                call.reject("Ad failed: " + adError.getMessage());
            }

            @Override
            public void onAdShowedFullScreenContent() {
                Log.d(TAG, "Rewarded ad showed full screen");
            }

            @Override
            public void onAdImpression() {
                Log.d(TAG, "Rewarded ad impression");
            }
        });

        ad.show(getActivity(), rewardItem -> {
            Log.d(TAG, "Rewarded: " + rewardItem.getAmount() + " " + rewardItem.getType());
        });
    }
}
