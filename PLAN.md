# Mobile App Development Plan — Invoice Generator

**Target:** Android APK/AAB on Google Play Store  
**Approach:** Capacitor wrapping static Next.js export  
**Status:** Approved — ready to implement

---

## Architecture

```
Current:  Next.js 14 (keep, no rewrite)
Output:   Static export (output: 'export')
Mobile:   Capacitor Android shell
Plugins:  Filesystem, Share, StatusBar, SplashScreen, Preferences
Monitoring: Firebase Crashlytics + Analytics (no Remote Config yet)
Ads:      Web → AdSense | Android → AdMob (banner only, no interstitial)
```

**Decision:** Keep Next.js. Already invested, website exists, code sharing works.

---

## Structure (single repo)

```
invoice-generator/
├── app/            (Next.js — existing, unchanged)
├── components/     (existing)
├── lib/            (existing)
├── public/         (existing)
├── android/        (Capacitor — new)
├── next.config.js  (add output: 'export')
└── package.json    (add capacitor deps)
```

---

## Development Phases

### Phase 0 — Config Changes (~1 hour)

1. `next.config.js`: add `output: 'export'`, `images.unoptimized: true`
2. `npm run build` → verify static export produces `out/` folder
3. Verify all existing functionality still works on web

### Phase 1 — Capacitor Setup (~2 hours)

1. `npm install @capacitor/core @capacitor/cli`
2. `npx cap init invoice-generator com.mabdullah.invoice`
3. `npx cap add android`
4. `npx cap copy` (copies `out/` into Android assets)
5. Verify APK builds: `cd android && ./gradlew assembleDebug`

### Phase 2 — Native Shell Polish (~2 hours)

| Item | Plugin | Detail |
|---|---|---|
| Splash screen | `@capacitor/splash-screen` | Orange bg (#f97316), auto-hide |
| Status bar | `@capacitor/status-bar` | Orange theme, light text |
| App icon | — | Use existing `android-chrome-512x512.png` |
| Back button | — | `if canGoBack() → goBack else minimize` (double-tap to exit) |
| App lifecycle | — | Test foreground/background, draft persists |

### Phase 3 — Native File Handling (~1.5 hours)

Replace browser download with native share sheet:

```
Generate PDF
    ↓
navigator.share() / Capacitor Share
    ↓
User chooses: WhatsApp, Gmail, Drive, Save, etc.
```

**Not:** "Save PDF" button → Filesystem. Users expect the share sheet.

### Phase 4 — Firebase (~2 hours)

1. Create Firebase project, download `google-services.json`
2. Place in `android/app/`
3. Add Crashlytics + Analytics SDKs
4. Add React Error Boundary wrapper:

```
<ErrorBoundary>
  fallback: "Something went wrong. Please restart."
  logged to: Crashlytics
  visible to user: simple retry button
</ErrorBoundary>
```

5. Define tracked events (minimal set):

| Event | Trigger |
|---|---|
| `invoice_created` | Form completed → step 6 reached |
| `invoice_shared` | Share used |
| `invoice_pdf_downloaded` | PDF generated |
| `currency_changed` | Currency dropdown changed |
| `app_crash` | Caught by ErrorBoundary |

Don't log every button press — only meaningful events.

### Phase 5 — AdMob Integration (~1.5 hours)

- **Plugin:** `@capacitor-community/admob`
- **Format:** Banner only (320x50)
- **Location:** Fixed bottom of form screens, non-overlapping with nav
- **No interstitial** — especially not on download. Disruptive UX hurts retention and AdMob policy.

### Phase 6 — Storage Strategy (~30 min)

```
Form drafts       → localStorage (current, keep)
Settings/Defaults → Capacitor Preferences (migrate: last currency, theme)
Invoice History   → Not yet (future: SQLite)
```

Add a `storageVersion` key to localStorage for future migrations:

```
key: "storageVersion" = 1
onAppStart:
  if storedVersion < currentVersion → migrate
```

### Phase 7 — Android Manifest & Permissions (~30 min)

**Permissions declared:**
- `INTERNET` — AdMob, Firebase
- `ACCESS_NETWORK_STATE` — connectivity checks

**No storage permissions needed** — share sheet handles export.

### Phase 8 — Error Boundaries (~1 hour)

Wrap the entire form + preview in a React Error Boundary:

```
<ErrorBoundary fallback={<CrashScreen />}>
  <FormProvider ...>
    ...
  </FormProvider>
</ErrorBoundary>
```

On crash:
- Log to Crashlytics
- Show simple UI: "Something went wrong — tap to retry"
- Never white-screen

### Phase 9 — User Feedback (~30 min)

Add "Send Feedback" link in the app:
- Opens email to your address
- Or opens a Google Form
- No backend needed

### Phase 10 — Play Store Assets (~2 hours)

| Asset | Requirement |
|---|---|
| App icon | 512×512 PNG |
| Feature graphic | 1024×500 PNG |
| Phone screenshots | 2–8 screenshots |
| Tablet screenshots | Optional but recommended |
| Privacy policy | Disclose AdMob, Firebase Analytics, Crashlytics |
| App description | Short + full description |
| Data Safety form | Must match implementation |

**Privacy policy must explicitly state:**
> This app uses Google AdMob for advertising, Firebase Analytics for usage analysis, and Firebase Crashlytics for crash reporting. Diagnostic and analytics data may be collected by these services.

### Phase 11 — Testing Checklist (~5 hours)

| Test | Condition |
|---|---|
| Android 11, 12, 13, 14, 15 | All must pass |
| Screen sizes: 5" phone → 7" tablet | Layout responsive |
| Keyboard open on form | Scrollable, no overlap |
| PDF generation + native share | Works end to end |
| Offline mode (airplane) | App fully functional |
| Back button | goBack or minimize (double-tap to exit) |
| Foreground → Background → Foreground | Draft persists |
| Splash → app load | Smooth |
| AdMob banner loads | Visible, non-overlapping |
| Clear app data | Fresh start, no crash |
| ErrorBoundary triggered | Logged, shows fallback UI |

### Phase 12 — Performance Budget

| Metric | Target |
|---|---|
| Cold launch | < 2s |
| PDF generation | < 1s |
| JS bundle | < 1.5 MB |
| Memory | < 150 MB |
| APK size | < 15 MB |
| Crash-free sessions | 99.5%+ |
| ANR rate | < 0.5% |

---

## What's Postponed (Phase 2+)

| Feature | Reason |
|---|---|
| SQLite / invoice history | Not needed for v1 |
| In-app purchases / premium tier | Future monetization |
| Cloud sync / Firebase Auth | Future feature |
| Remote Config | Not needed for first release |
| App Update plugin | Over-engineering for v1 |
| Haptics | No benefit for invoice app |
| CI/CD automation | Start manual, automate later |

---

## Timeline

| Phase | Hours |
|---|---|
| 0: Config changes | 1 |
| 1: Capacitor init | 2 |
| 2: Native shell | 2 |
| 3: File/Share | 1.5 |
| 4: Firebase | 2 |
| 5: AdMob | 1.5 |
| 6: Storage migration | 0.5 |
| 7: Manifest/permissions | 0.5 |
| 8: Error boundaries | 1 |
| 9: User feedback | 0.5 |
| 10: Play Store assets | 2 |
| 11: Testing | 5 |
| 12: Bug fixes from testing | 3 |
| **Total** | **~22-24 hours** |
