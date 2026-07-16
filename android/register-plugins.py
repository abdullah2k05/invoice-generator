import json, os

path = os.path.join(os.path.dirname(__file__), "app/src/main/assets/capacitor.plugins.json")
with open(path) as f:
    plugins = json.load(f)

custom = [
    {"pkg": "FileSaver", "classpath": "com.mabdullah.invoice.FileSaverPlugin"},
    {"pkg": "RewardedAd", "classpath": "com.mabdullah.invoice.RewardedAdPlugin"},
    {"pkg": "InterstitialAd", "classpath": "com.mabdullah.invoice.InterstitialAdPlugin"},
    {"pkg": "BannerAd", "classpath": "com.mabdullah.invoice.BannerAdPlugin"},
    {"pkg": "NativeAd", "classpath": "com.mabdullah.invoice.NativeAdPlugin"},
]
existing = {p["pkg"] for p in plugins}
for c in custom:
    if c["pkg"] not in existing:
        plugins.append(c)

with open(path, "w") as f:
    json.dump(plugins, f, indent=2)

print("Custom plugins registered in capacitor.plugins.json")
