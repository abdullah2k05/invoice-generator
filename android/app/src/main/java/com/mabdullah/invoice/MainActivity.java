package com.mabdullah.invoice;

import android.os.Bundle;
import android.util.Log;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    private static final String TAG = "MainActivity";

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "=== Plugin Registration ===");
        try {
            registerPlugin(FileSaverPlugin.class);
            Log.d(TAG, "FileSaverPlugin registered successfully");
        } catch (Exception e) {
            Log.e(TAG, "FileSaverPlugin registration failed", e);
        }
        try {
            registerPlugin(RewardedAdPlugin.class);
            Log.d(TAG, "RewardedAdPlugin registered successfully");
        } catch (Exception e) {
            Log.e(TAG, "RewardedAdPlugin registration failed", e);
        }
        try {
            registerPlugin(InterstitialAdPlugin.class);
            Log.d(TAG, "InterstitialAdPlugin registered successfully");
        } catch (Exception e) {
            Log.e(TAG, "InterstitialAdPlugin registration failed", e);
        }
        try {
        registerPlugin(BannerAdPlugin.class);
        Log.d(TAG, "BannerAdPlugin registered successfully");
        try {
            registerPlugin(NativeAdPlugin.class);
            Log.d(TAG, "NativeAdPlugin registered successfully");
        } catch (Exception e) {
            Log.e(TAG, "NativeAdPlugin registration failed", e);
        }
        } catch (Exception e) {
            Log.e(TAG, "BannerAdPlugin registration failed", e);
        }
        Log.d(TAG, "=== Plugin Registration Complete ===");
    }
}
