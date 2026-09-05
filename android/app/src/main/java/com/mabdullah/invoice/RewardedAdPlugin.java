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
import com.google.android.gms.ads.rewarded.RewardedAd;
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback;

@CapacitorPlugin(name = "RewardedAd")
public class RewardedAdPlugin extends Plugin {

    private RewardedAd rewardedAd;
    private boolean userEarnedReward = false;

    @PluginMethod
    public void showAd(PluginCall call) {
        if (getActivity() == null) {
            call.reject("Activity is null");
            return;
        }

        if (rewardedAd != null) {
            getActivity().runOnUiThread(() -> showLoadedAd(call));
            return;
        }

        MobileAds.initialize(getContext(), status -> {
            getActivity().runOnUiThread(() -> loadAndShow(call));
        });
    }

    private void loadAndShow(PluginCall call) {
        String adUnitId = call.getString("adUnitId", "ca-app-pub-6235199437488383/8731887749");

        AdRequest adRequest = new AdRequest.Builder().build();
        RewardedAd.load(getContext(), adUnitId,
            adRequest, new RewardedAdLoadCallback() {
                @Override
                public void onAdLoaded(@NonNull RewardedAd ad) {
                    rewardedAd = ad;
                    showLoadedAd(call);
                }

                @Override
                public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                    call.reject("Ad failed: " + loadAdError.getMessage());
                }
            });
    }

    private void showLoadedAd(PluginCall call) {
        if (rewardedAd == null) {
            call.reject("No ad loaded");
            return;
        }

        if (getActivity() == null) {
            call.reject("Activity is null");
            return;
        }

        userEarnedReward = false;

        rewardedAd.setFullScreenContentCallback(new FullScreenContentCallback() {
            @Override
            public void onAdDismissedFullScreenContent() {
                rewardedAd = null;
                JSObject ret = new JSObject();
                ret.put("rewarded", userEarnedReward);
                call.resolve(ret);
            }

            @Override
            public void onAdFailedToShowFullScreenContent(AdError adError) {
                rewardedAd = null;
                call.reject("Ad failed: " + adError.getMessage());
            }

            @Override
            public void onAdShowedFullScreenContent() {
                // ad showed
            }
        });

        rewardedAd.show(getActivity(), rewardItem -> {
            userEarnedReward = true;
        });
    }
}
