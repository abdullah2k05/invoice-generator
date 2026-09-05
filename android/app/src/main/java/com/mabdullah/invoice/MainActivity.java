package com.mabdullah.invoice;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        try {
            registerPlugin(FileSaverPlugin.class);
        } catch (Exception e) {
            // plugin registration failed
        }
        try {
            registerPlugin(RewardedAdPlugin.class);
        } catch (Exception e) {
            // plugin registration failed
        }
        try {
            registerPlugin(InterstitialAdPlugin.class);
        } catch (Exception e) {
            // plugin registration failed
        }
        try {
            registerPlugin(BannerAdPlugin.class);
        } catch (Exception e) {
            // plugin registration failed
        }
        try {
            registerPlugin(NativeAdPlugin.class);
        } catch (Exception e) {
            // plugin registration failed
        }
    }
}
