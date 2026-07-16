package com.mabdullah.invoice;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.TextView;

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
import com.google.android.gms.ads.nativead.NativeAdView;

@CapacitorPlugin(name = "NativeAd")
public class NativeAdPlugin extends Plugin {

    private static final String TAG = "NativeAdPlugin";
    private NativeAd nativeAd;
    private View adView;

    @PluginMethod
    public void showAd(PluginCall call) {
        String adUnitId = call.getString("adUnitId", "ca-app-pub-6235199437488383/6459580646");
        Log.d(TAG, "showAd() unitId=" + adUnitId);

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
                                Log.d(TAG, "Native ad loaded");
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
                                    Log.e(TAG, "Native ad failed: " + error.getMessage());
                                    call.reject("Ad failed: " + error.getMessage());
                                }
                            })
                            .withNativeAdOptions(new NativeAdOptions.Builder().build())
                            .build();
                        adLoader.loadAd(new AdRequest.Builder().build());
                    });
                });
            } catch (Exception e) {
                Log.e(TAG, "Error loading native ad", e);
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
}
