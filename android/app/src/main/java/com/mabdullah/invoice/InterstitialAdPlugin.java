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
import com.google.android.gms.ads.interstitial.InterstitialAd;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;

@CapacitorPlugin(name = "InterstitialAd")
public class InterstitialAdPlugin extends Plugin {

    private InterstitialAd interstitialAd;
    private static final String TAG = "InterstitialAdPlugin";

    @PluginMethod
    public void showAd(PluginCall call) {
        Log.d(TAG, "=== showAd() called ===");

        if (getActivity() == null) {
            Log.e(TAG, "Activity is null, cannot show interstitial");
            call.reject("Activity is null");
            return;
        }

        if (interstitialAd != null) {
            Log.d(TAG, "Ad already loaded, showing on UI thread");
            getActivity().runOnUiThread(() -> showLoadedAd(call));
            return;
        }

        Log.d(TAG, "Calling MobileAds.initialize()");
        MobileAds.initialize(getContext(), status -> {
            Log.d(TAG, "MobileAds initialized, loading ad on UI thread");
            getActivity().runOnUiThread(() -> loadAndShow(call));
        });
    }

    private void loadAndShow(PluginCall call) {
        String adUnitId = call.getString("adUnitId", "ca-app-pub-6235199437488383/1783336018");
        Log.d(TAG, "Loading interstitial: " + adUnitId);

        try {
            AdRequest adRequest = new AdRequest.Builder().build();
            InterstitialAd.load(getContext(), adUnitId,
                adRequest, new InterstitialAdLoadCallback() {
                    @Override
                    public void onAdLoaded(@NonNull InterstitialAd ad) {
                        Log.d(TAG, "=== Interstitial onAdLoaded ===");
                        interstitialAd = ad;
                        getActivity().runOnUiThread(() -> showLoadedAd(call));
                    }

                    @Override
                    public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                        Log.e(TAG, "=== Interstitial onAdFailedToLoad ===");
                        Log.e(TAG, "Code: " + loadAdError.getCode());
                        Log.e(TAG, "Message: " + loadAdError.getMessage());
                        Log.e(TAG, "Domain: " + loadAdError.getDomain());
                        call.reject("Ad failed: " + loadAdError.getMessage());
                    }
                });
        } catch (Exception e) {
            Log.e(TAG, "Exception in loadAndShow", e);
            call.reject("Exception: " + e.getMessage());
        }
    }

    private void showLoadedAd(PluginCall call) {
        if (interstitialAd == null) {
            Log.e(TAG, "showLoadedAd called but ad is null");
            call.reject("No ad loaded");
            return;
        }

        if (getActivity() == null) {
            Log.e(TAG, "Activity is null, cannot show");
            call.reject("Activity is null");
            return;
        }

        Log.d(TAG, "Showing interstitial");
        try {
            interstitialAd.setFullScreenContentCallback(new FullScreenContentCallback() {
                @Override
                public void onAdDismissedFullScreenContent() {
                    Log.d(TAG, "Interstitial dismissed");
                    JSObject ret = new JSObject();
                    ret.put("shown", true);
                    call.resolve(ret);
                }

                @Override
                public void onAdFailedToShowFullScreenContent(AdError adError) {
                    Log.e(TAG, "Interstitial show failed: " + adError.getMessage());
                    call.reject("Show failed: " + adError.getMessage());
                }

                @Override
                public void onAdShowedFullScreenContent() {
                    Log.d(TAG, "Interstitial showed");
                    interstitialAd = null;
                }

                @Override
                public void onAdImpression() {
                    Log.d(TAG, "Interstitial impression");
                }
            });

            interstitialAd.show(getActivity());
        } catch (Exception e) {
            Log.e(TAG, "Exception showing interstitial", e);
            call.reject("Show exception: " + e.getMessage());
        }
    }
}
