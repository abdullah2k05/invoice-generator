package com.mabdullah.invoice;

import android.util.Log;
import android.view.Gravity;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.MobileAds;

import java.util.HashMap;
import java.util.Map;

@CapacitorPlugin(name = "BannerAd")
public class BannerAdPlugin extends Plugin {

    private final Map<String, AdView> adViews = new HashMap<>();
    private static final String TAG = "BannerAdPlugin";

    @PluginMethod
    public void showAd(PluginCall call) {
        String adUnitId = call.getString("adUnitId", "ca-app-pub-6235199437488383/3591241703");
        String position = call.getString("position", "bottom");

        Log.d(TAG, "showAd() position=" + position + " unitId=" + adUnitId);

        if (getActivity() == null) {
            call.reject("Activity is null");
            return;
        }

        AdView existing = adViews.get(position);
        if (existing != null) {
            existing.setVisibility(ViewGroup.VISIBLE);
            call.resolve();
            return;
        }

        getActivity().runOnUiThread(() -> {
            try {
                MobileAds.initialize(getContext(), status -> {
                    getActivity().runOnUiThread(() -> {
                        try {
                            AdView adView = new AdView(getContext());
                            adView.setAdUnitId(adUnitId);
                            adView.setAdSize(AdSize.SMART_BANNER);

                            int gravity = "top".equals(position) ?
                                Gravity.TOP | Gravity.CENTER_HORIZONTAL :
                                Gravity.BOTTOM | Gravity.CENTER_HORIZONTAL;

                            FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(
                                FrameLayout.LayoutParams.MATCH_PARENT,
                                FrameLayout.LayoutParams.WRAP_CONTENT
                            );
                            params.gravity = gravity;

                            FrameLayout root = getActivity().findViewById(android.R.id.content);
                            if (root != null) {
                                root.addView(adView, params);
                                adViews.put(position, adView);
                                Log.d(TAG, "AdView added for position: " + position);
                            }

                            adView.loadAd(new AdRequest.Builder().build());
                            call.resolve();
                        } catch (Exception e) {
                            Log.e(TAG, "Error creating ad", e);
                            call.reject(e.getMessage());
                        }
                    });
                });
            } catch (Exception e) {
                call.reject(e.getMessage());
            }
        });
    }

    @PluginMethod
    public void hideAd(PluginCall call) {
        String position = call.getString("position", "bottom");
        AdView av = adViews.get(position);
        if (av != null) {
            av.setVisibility(ViewGroup.GONE);
        }
        call.resolve();
    }
}
