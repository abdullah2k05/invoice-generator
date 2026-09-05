# Image & Logo Requirements — Invoice Maker

All source images should be **PNG** with transparent background (except OG image which is JPEG).
Source logo should be at least **1024x1024px** for best quality at all sizes.

---

## 1. Web Favicon & App Icons (`public/`)

| File | Size | Purpose | Status |
|------|------|---------|--------|
| `logo.png` | 500x500 | Source logo (used in navbar) | ✅ Exists |
| `favicon.ico` | 48x48 | Browser tab icon (legacy) | ✅ Exists |
| `favicon-16x16.png` | 16x16 | Browser tab icon (small) | ✅ Exists |
| `favicon-32x32.png` | 32x32 | Browser tab icon (standard) | ✅ Exists |
| `apple-touch-icon.png` | 180x180 | iOS home screen icon | ✅ Exists |
| `android-chrome-192x192.png` | 192x192 | Android/PWA icon | ✅ Exists |
| `android-chrome-512x512.png` | 512x512 | PWA splash icon | ✅ Exists |
| `mstile-150x150.png` | 150x150 | Windows tile | ✅ Exists |
| `og-image.jpeg` | 630x630 | Social sharing (Twitter/OG) | ✅ Exists |

**To regenerate all favicon sizes from a new logo:**
Use https://realfavicongenerator.net/ — upload a 512x512+ PNG and it generates everything.

---

## 2. Android App Icons (`android/app/src/main/res/`)

| Density | `ic_launcher.png` | `ic_launcher_round.png` | `ic_launcher_foreground.png` |
|---------|-------------------|------------------------|------------------------------|
| mdpi | 48x48 | 48x48 | 48x48 |
| hdpi | 72x72 | 72x72 | 72x72 |
| xhdpi | 96x96 | 96x96 | 96x96 |
| xxhdpi | 144x144 | 144x144 | 144x144 |
| xxxhdpi | 192x192 | 192x192 | 192x192 |

**Status:** ✅ All exist

**Adaptive Icon (Android 8+):**
- `mipmap-anydpi-v26/ic_launcher.xml` — references foreground + background
- `mipmap-anydpi-v26/ic_launcher_round.xml` — same for round variant

**To regenerate Android icons from a new logo:**
Use Android Studio: Right-click `res` → New → Image Asset → pick your logo → generates all sizes.

---

## 3. Android Splash Screen (`android/app/src/main/res/`)

| Folder | Files | Purpose |
|--------|-------|---------|
| `drawable/` | `splash.xml` | Splash screen background |
| `drawable-port-mdpi/` through `drawable-port-xxxhdpi/` | `splash.png` | Portrait splash images |
| `drawable-land-mdpi/` through `drawable-land-xxxhdpi/` | `splash.png` | Landscape splash images |

**Splash screen sizes:**
| Density | Portrait | Landscape |
|---------|----------|-----------|
| mdpi | 320x480 | 480x320 |
| hdpi | 480x720 | 720x480 |
| xhdpi | 640x960 | 960x640 |
| xxhdpi | 960x1440 | 1440x960 |
| xxxhdpi | 1280x1920 | 1920x1280 |

**Status:** ✅ Exist (using Capacitor splash screen plugin)

---

## 4. Social & Marketing

| File | Size | Where Used |
|------|------|------------|
| `og-image.jpeg` | 630x630 | Twitter card, Facebook share, LinkedIn |
| `logo.png` | 500x500 | Navbar on website |

**OG Image specs:**
- Format: JPEG (smaller file size)
- Min size: 600x600 (we use 630x630)
- Max file size: ~300KB recommended
- Shows when someone shares your URL on social media

---

## 5. Logo Design Guidelines

**Source file:** Keep a high-res source (SVG or 2048x2048 PNG) in this `images/` folder.

**For the app logo:**
- Square format (1:1 ratio)
- Simple, recognizable at small sizes (48x48)
- Works on light backgrounds (the app uses white/light backgrounds)
- Avoid thin lines that disappear at small sizes
- Test at 48x48 — if you can't read it, simplify

**Color scheme:**
- Primary: Emerald (#059669) — matches the app accent color
- Background: White or transparent
- Avoid gradients in the icon (they look bad at small sizes)

---

## 6. Quick Reference — What to Provide

If you're creating a new logo, provide these files:

```
images/
├── logo-source.svg          # Vector source (best quality)
├── logo-source-1024.png     # High-res PNG fallback
├── logo-500.png             # For web navbar (copy to public/)
└── README.md                # This file
```

Then run:
```bash
# Generate all web favicons
# Go to https://realfavicongenerator.net/ and upload logo-500.png

# Generate Android icons
# Open Android Studio → res → New → Image Asset → upload logo-source-1024.png
```

---

## Current Status Summary

| Category | Count | Status |
|----------|-------|--------|
| Web favicons & icons | 9 files | ✅ All present |
| Android mipmap icons | 15 files (5 densities × 3 variants) | ✅ All present |
| Android adaptive icon | 2 XML files | ✅ Present |
| Android splash screen | All densities | ✅ Present |
| OG image | 1 file (630x630) | ✅ Present |
| Source logo | 1 file (500x500) | ✅ Present |

**Everything is in place. No missing assets.**
