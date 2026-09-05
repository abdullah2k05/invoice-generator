package com.mabdullah.invoice;

import android.view.View;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.AdLoader;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.nativead.NativeAd;
import com.google.android.gms.ads.nativead.NativeAdOptions;

@CapacitorPlugin(name = "NativeAd")
public class NativeAdPlugin extends Plugin {

    private NativeAd nativeAd;

    @PluginMethod
    public void showAd(PluginCall call) {
        String adUnitId = call.getString("adUnitId", "ca-app-pub-6235199437488383/6459580646");

        if (getActivity() == null) {
            call.reject("Activity is null");
            return;
        }

        if (nativeAd != null) {
            JSObject result = new JSObject();
            result.put("loaded", true);
            call.resolve(result);
            return;
        }

        getActivity().runOnUiThread(() -> {
            try {
                MobileAds.initialize(getContext(), status -> {
                    getActivity().runOnUiThread(() -> {
                        AdLoader adLoader = new AdLoader.Builder(getContext(), adUnitId)
                            .forNativeAd(nativeAd -> {
                                this.nativeAd = nativeAd;
                                JSObject result = new JSObject();
                                result.put("loaded", true);
                                result.put("headline", nativeAd.getHeadline());
                                result.put("body", nativeAd.getBody());
                                result.put("callToAction", nativeAd.getCallToAction());
                                if (nativeAd.getStarRating() != null) {
                                    result.put("starRating", nativeAd.getStarRating());
                                }
                                if (nativeAd.getPrice() != null) {
                                    result.put("price", nativeAd.getPrice());
                                }
                                if (nativeAd.getAdvertiser() != null) {
                                    result.put("advertiser", nativeAd.getAdvertiser());
                                }
                                call.resolve(result);
                            })
                            .withAdListener(new AdListener() {
                                @Override
                                public void onAdFailedToLoad(LoadAdError error) {
                                    call.reject("Ad failed: " + error.getMessage());
                                }
                            })
                            .withNativeAdOptions(new NativeAdOptions.Builder().build())
                            .build();
                        adLoader.loadAd(new AdRequest.Builder().build());
                    });
                });
            } catch (Exception e) {
                call.reject(e.getMessage());
            }
        });
    }

    @PluginMethod
    public void hideAd(PluginCall call) {
        if (nativeAd != null) {
            nativeAd.destroy();
            nativeAd = null;
        }
        call.resolve();
    }

    @Override
    protected void handleOnDestroy() {
        if (nativeAd != null) {
            nativeAd.destroy();
            nativeAd = null;
        }
        super.handleOnDestroy();
    }
}
