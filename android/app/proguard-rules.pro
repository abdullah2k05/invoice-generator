# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Preserve Capacitor plugin classes
-keep class com.getcapacitor.** { *; }
-keep class com.getcapacitor.plugins.** { *; }
-keep class com.mabdullah.invoice.** { *; }

# Keep Capacitor JavaScript interface
-keepclassmembers class * {
    @com.getcapacitor.annotation.CapacitorPlugin *;
    @com.getcapacitor.annotation.CapacitorMethod *;
}

# Google Play Services Ads
-keep class com.google.android.gms.ads.** { *; }
-dontwarn com.google.android.gms.ads.**

# Preserve source file name and line numbers for crash reporting
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile

# Keep WebView JS interface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface *;
}
