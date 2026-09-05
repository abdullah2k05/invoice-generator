package com.mabdullah.invoice;

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
import com.google.android.gms.ads.interstitial.InterstitialAd;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;

@CapacitorPlugin(name = "InterstitialAd")
public class InterstitialAdPlugin extends Plugin {

    private InterstitialAd interstitialAd;

    @PluginMethod
    public void showAd(PluginCall call) {
        if (getActivity() == null) {
            call.reject("Activity is null");
            return;
        }

        if (interstitialAd != null) {
            getActivity().runOnUiThread(() -> showLoadedAd(call));
            return;
        }

        MobileAds.initialize(getContext(), status -> {
            getActivity().runOnUiThread(() -> loadAndShow(call));
        });
    }

    private void loadAndShow(PluginCall call) {
        String adUnitId = call.getString("adUnitId", "ca-app-pub-6235199437488383/1783336018");

        try {
            AdRequest adRequest = new AdRequest.Builder().build();
            InterstitialAd.load(getContext(), adUnitId,
                adRequest, new InterstitialAdLoadCallback() {
                    @Override
                    public void onAdLoaded(@NonNull InterstitialAd ad) {
                        interstitialAd = ad;
                        getActivity().runOnUiThread(() -> showLoadedAd(call));
                    }

                    @Override
                    public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                        call.reject("Ad failed: " + loadAdError.getMessage());
                    }
                });
        } catch (Exception e) {
            call.reject("Exception: " + e.getMessage());
        }
    }

    private void showLoadedAd(PluginCall call) {
        if (interstitialAd == null) {
            call.reject("No ad loaded");
            return;
        }

        if (getActivity() == null) {
            call.reject("Activity is null");
            return;
        }

        try {
            interstitialAd.setFullScreenContentCallback(new FullScreenContentCallback() {
                @Override
                public void onAdDismissedFullScreenContent() {
                    JSObject ret = new JSObject();
                    ret.put("shown", true);
                    call.resolve(ret);
                }

                @Override
                public void onAdFailedToShowFullScreenContent(AdError adError) {
                    call.reject("Show failed: " + adError.getMessage());
                }

                @Override
                public void onAdShowedFullScreenContent() {
                    interstitialAd = null;
                }

                @Override
                public void onAdImpression() {
                    // ad impression recorded
                }
            });

            interstitialAd.show(getActivity());
        } catch (Exception e) {
            call.reject("Show exception: " + e.getMessage());
        }
    }
}
