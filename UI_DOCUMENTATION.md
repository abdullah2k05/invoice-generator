# Complete UI Documentation — Invoice Generator
## For Developers, Agents, and New Team Members

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Page-by-Page Breakdown](#2-page-by-page-breakdown)
3. [Component Hierarchy](#3-component-hierarchy)
4. [Form System Deep Dive](#4-form-system-deep-dive)
5. [Template System](#5-template-system)
6. [Data Flow & Persistence](#6-data-flow--persistence)
7. [Mobile vs Desktop Behavior](#7-mobile-vs-desktop-behavior)
8. [Ad System](#8-ad-system)
9. [PDF Generation](#9-pdf-generation)
10. [File Map](#10-file-map)

---

## 1. Architecture Overview

```
Next.js 14 App Router (Static Export)
├── Web: Deployed to Vercel/Hosting
└── Android: Wrapped in Capacitor 8.4 WebView

State: React Hook Form + localStorage (web) / Capacitor Preferences (Android)
Styling: Tailwind CSS + shadcn/ui (Radix primitives)
PDF: @react-pdf/renderer (client-side)
Ads: Google AdSense (web) + Google AdMob (Android native plugins)
```

**Key Principle:** Everything runs client-side. No backend, no API calls, no server. All invoice data lives in the browser/WebView.

---

## 2. Page-by-Page Breakdown

### 2.1 Homepage (`/`)
**File:** `app/(landing)/page.tsx`

```
┌─────────────────────────────────────────┐
│  [Navbar: Logo | Create | Templates |   │
│           Examples | FAQ]                │
├─────────────────────────────────────────┤
│                                         │
│           [Logo Image]                  │
│                                         │
│   Free Invoice Generator –              │
│   No Signup Required                    │
│                                         │
│  [Generate Invoice]  [Download APK]     │
│                                         │
│     ┌──────────┬──────────┐             │
│     │ 100%     │    ∞     │             │
│     │  Free    │ Invoices │             │
│     └──────────┴──────────┘             │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │     [Demo Invoice Preview]      │    │
│  │  (interactive, template-aware)  │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌──Ad Banner (Native)──┐               │
│                                         │
│  Why you'll love our Free Invoice Gen   │
│  ┌──────┬──────┐                        │
│  │Fast &│Free  │                        │
│  │Easy  │for   │                        │
│  │      │Life  │                        │
│  ├──────┼──────┤                        │
│  │Beauti│Get   │                        │
│  │ful   │Paid  │                        │
│  │Templ.│Faster│                        │
│  ├──────┼──────┤                        │
│  │Save  │Free  │                        │
│  │Time  │for   │                        │
│  │& $   │Life  │                        │
│  └──────┴──────┘                        │
│                                         │
│  [Recent Invoices List]                 │
│  (shows if user has past invoices)      │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  "Start creating invoices now"  │    │
│  │       [Generate Today!]         │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌──Ad Banner (Native)──┐               │
│                                         │
├─────────────────────────────────────────┤
│  [Footer: 9-column link grid,          │
│   copyright, app store badges]          │
└─────────────────────────────────────────┘
```

**Interactions:**
- "Generate Invoice" → navigates to `/new`
- "Download APK" → navigates to `/download`
- Feature cards are static (no interaction)
- Recent Invoices: Copy (duplicates to form), Delete (removes from history)

---

### 2.2 Invoice Creation Page (`/new`)
**File:** `app/new/page.tsx` → `app/new/component/NewInvoiceForm.tsx`

**This is the core of the application.**

#### Desktop Layout (≥768px)
```
┌─────────────────────────────────────────────────────────┐
│ [Header: "Invoice Suite / New Invoice"    [Reset]]      │
├────────────────────┬────────────────────────────────────┤
│                    │                                    │
│  ┌── SIDEBAR ──┐   │    ┌── PREVIEW (500px) ──┐        │
│  │              │   │    │                      │        │
│  │ ▼ Invoice    │   │    │  [Invoice Preview]   │        │
│  │   Details    │   │    │  (live, interactive) │        │
│  │              │   │    │                      │        │
│  │ ▸ From       │   │    │  Clicking a section  │        │
│  │ ▸ To         │   │    │  opens its sidebar   │        │
│  │ ▸ Items &    │   │    │  section             │        │
│  │   Pricing    │   │    │                      │        │
│  │ ▸ Payment    │   │    └──────────────────────┘        │
│  │   Info       │   │                                    │
│  │ ▸ Template   │   │    [Download Invoice]              │
│  │ ▸ Download   │   │    [Print]                         │
│  │              │   │                                    │
│  └──────────────┘   │    ┌── Native Ad ──┐               │
│  (400px wide)       │                                    │
├────────────────────┴────────────────────────────────────┤
```

#### Mobile Layout (<768px)
```
┌─────────────────────────────┐
│ [Invoice] [Edit|View] [↻]  │
├─────────────────────────────┤
│                             │
│  EDIT MODE:                 │
│  ┌── SIDEBAR ──┐            │
│  │ (same as    │            │
│  │  desktop    │            │
│  │  accordion) │            │
│  └─────────────┘            │
│                             │
│  VIEW MODE:                 │
│  ┌── PREVIEW ──┐            │
│  │ [Invoice    │            │
│  │  Preview]   │            │
│  │             │            │
│  │ [Download]  │            │
│  │ [Share]     │            │
│  └─────────────┘            │
│                             │
│   ┌──────────────────┐      │
│   │ 👁 View Invoice  │      │
│   └──────────────────┘      │
│   (floating toggle button)  │
│                             │
│  ┌── Native Ad ──┐          │
└─────────────────────────────┘
```

**State Managed:**
- `isClient` — prevents SSR hydration mismatch (renders empty `<div>` on server)
- `mobileMode` — `"edit"` or `"view"` (toggles between form and preview on mobile)
- `openSection` — which accordion section is open (only one at a time)
- `invoiceTemplate` — selected template ID (default: `"stripe"`)
- 30+ `localStorage` keys for every form field

**Accordion Sections:**

| Section | Icon | Title | Content |
|---------|------|-------|---------|
| `identity` | `FileText` | Invoice Details | InvoiceTermsForm + CurrencyInput |
| `from` | `User` | From | YourDetailsForm |
| `to` | `Briefcase` | To | CompanyDetailsForm |
| `financials` | `Receipt` | Items & Pricing | InvoiceDetailsForm |
| `remittance` | `CreditCard` | Payment Info | PaymentDetailsForm |
| `template` | `LayoutTemplate` | Template | TemplateSelector (4 options) |
| `download` | `FileText` | Download | DownloadInvoiceButton + ShareInvoiceButton |

**Key Interactions:**
1. **Accordion toggle**: Clicking a section header opens it, closes others
2. **Preview → Sidebar**: Clicking a section in the live preview opens the matching sidebar section
3. **Reset button**: Clears all localStorage keys and reloads the page
4. **Print button** (desktop only): Creates hidden iframe, clones invoice DOM, triggers browser print
5. **Floating toggle** (mobile only): Toggles between edit and view modes

---

### 2.3 Download Page (`/download`)
**File:** `app/download/page.tsx`

```
┌─────────────────────────────────────────┐
│  [← Back to Home]                       │
│                                         │
│  [Smartphone Icon]                      │
│  Download Invoice Maker                 │
│  Get the mobile app on Amazon           │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  📱 Amazon Appstore             │    │
│  │  [Get it on Amazon] → external  │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  🌐 Use Online                  │    │
│  │  [Launch Web App] → /new        │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  Generate Invoice Now → /new    │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

---

## 3. Component Hierarchy

```
app/layout.tsx (Root Layout)
├── Navbar (sticky, 4 links)
├── {children} (page content)
├── Footer (9-column grid, ~40 links)
├── <AppInit /> (runs storage migration)
├── <BackButtonHandler /> (Android back button)
├── <NativeBanner /> (AdMob bottom banner on mobile)
└── Scripts (Google Analytics, AdSense)

app/(landing)/page.tsx (Homepage)
├── Logo Image
├── H1 + CTA Buttons
├── Stats Grid
├── <DemoPreview /> (static invoice demo)
├── <SeoNativeAd /> (ad slot 1)
├── Feature Grid (6 cards)
├── <RecentInvoices />
├── Bottom CTA
└── <SeoNativeAd /> (ad slot 2)

app/new/component/NewInvoiceForm.tsx (Invoice Form)
├── <ErrorBoundary>
│   └── <FormProvider> (react-hook-form)
│       ├── Header (desktop) / MobileToggleHeader
│       ├── Sidebar (accordion sections)
│       │   ├── <UserInputForm section="identity" />
│       │   │   ├── <InvoiceTermsForm compact />
│       │   │   └── <CurrencyInput />
│       │   ├── <UserInputForm section="from" />
│       │   │   └── <YourDetailsForm compact />
│       │   ├── <UserInputForm section="to" />
│       │   │   └── <CompanyDetailsForm compact />
│       │   ├── <UserInputForm section="financials" />
│       │   │   └── <InvoiceDetailsForm compact />
│       │   ├── <UserInputForm section="remittance" />
│       │   │   └── <PaymentDetailsForm compact />
│       │   ├── <UserInputForm section="template" />
│       │   │   └── <TemplateSelector />
│       │   └── Download section
│       │       ├── <DownloadInvoiceButton />
│       │       └── <ShareInvoiceButton />
│       ├── <UserDataPreview /> (live invoice preview)
│       │   └── <PreviewDetails template={...} />
│       │       ├── <InvoiceTermsPreview />
│       │       ├── <YourDetailsPreview />
│       │       ├── <CompanyDetailsPreview />
│       │       ├── <InvoiceDetailsPreview />
│       │       └── <PaymentDetailsPreview />
│       └── <SeoNativeAd /> (bottom ad)
```

---

## 4. Form System Deep Dive

### 4.1 How Forms Work

Every form field follows this pattern:

```tsx
// 1. Component imports useGetValue (reads from react-hook-form context)
const value = useGetValue("fieldName", "defaultValue");

// 2. Component renders an <Input> that reads/writes via react-hook-form
<Input
  value={value}
  onChange={(e) => {
    onChange(e.target.value);           // Update react-hook-form state
    localStorage.setItem("fieldName", e.target.value);  // Persist to localStorage
  }}
/>

// 3. Default values loaded from localStorage on mount
defaultValue={getInitialValue("fieldName")}
```

### 4.2 Form Sections

#### Section 1: Invoice Details (`identity`)
**Component:** `app/component/form/invoiceTerms/invoiceTermsForm.tsx`

| Field | Type | Placeholder | localStorage Key |
|-------|------|-------------|-----------------|
| Invoice number | TextInput | `INVOICE-01` | `invoiceNo` |
| Issue date | DateInput (desktop) / native date (mobile) | — | `issueDate` |
| Due date | DateInput (desktop) / native date (mobile) | — | `dueDate` |
| Currency | CurrencyInput (popover search) | `USD` | `currency` |

**Special features:**
- Auto-generates sequential invoice numbers (INV-001, INV-002...)
- "Next: INV-NNN" button pre-fills next number
- Dates stored as ISO strings

#### Section 2: Your Details (`from`)
**Component:** `app/component/form/yourDetails/yourDetailsForm.tsx`

| Field | Type | Placeholder | localStorage Key |
|-------|------|-------------|-----------------|
| Email | TextInput (email mode) | `e.g. you@example.pk` | `yourEmail` |
| Your Name | TextInput | `Muhammad Abdullah` | `yourName` |
| Logo | ImageInput (file upload) | — | `yourLogo` (base64) |
| Address | TextInput | `House 5, Street 12` | `yourAddress` |
| City | TextInput | `Lahore` | `yourCity` |
| State | TextInput | `Punjab` | `yourState` |
| Zip | NumberInput | `54000` | `yourZip` |
| Country | TextInput | `Pakistan` | `yourCountry` |
| Tax ID | TextInput | `NTN 1234567` | `yourTaxId` |

**Additional UI:**
- `<BusinessProfilePanel>` — loads/saves business profile, export/import JSON backup
- "Save as Profile" button — persists all fields to a saved profile

#### Section 3: Company Details (`to`)
**Component:** `app/component/form/companyDetails/companyDetailsForm.tsx`

| Field | Type | Placeholder | localStorage Key |
|-------|------|-------------|-----------------|
| Email | TextInput (email mode) | `e.g. info@company.pk` | `email` |
| Company name | TextInput | `TechSol Pakistan` | `companyName` |
| Logo | ImageInput | — | `companyLogo` |
| Address | TextInput | `Plot 12, Main Boulevard` | `companyAddress` |
| City | TextInput | `Karachi` | `companyCity` |
| State | TextInput | `Sindh` | `companyState` |
| Zip | NumberInput | `54000` | `companyZip` |
| Country | TextInput | `Pakistan` | `companyCountry` |
| Tax ID | TextInput | `NTN 1234567` | `companyTaxId` |

**Additional UI:**
- `<SavedClientsPanel>` — loads previously saved clients
- "Save as Client" button — saves current client for quick loading later

#### Section 4: Items & Pricing (`financials`)
**Component:** `app/component/form/invoiceDetails/invoiceDetailsForm.tsx`

**Line Items (dynamic array):**

| Field | Type | Placeholder | Notes |
|-------|------|-------------|-------|
| Item name | TextInput | `Item name` | Full width |
| Quantity | NumberInput | `Qty` | Regex: `/^\d*\.?\d*$/` |
| Price | NumberInput | `Price` | Regex: `/^\d*\.?\d*$/` |

**Desktop:** Horizontal row per item (name + qty + price inline)
**Mobile:** Stacked card per item (name on top, qty/price in 2-col grid)

**Additional fields:**

| Field | Type | Placeholder | localStorage Key |
|-------|------|-------------|-----------------|
| Note | TextInput | `Add a note` | `note` |
| Discount | NumberInput | `$0` (currency symbol) | `discount` |
| Taxes | NumberInput | `0%` | `tax` |

**Additional UI:**
- "Add Item" button — adds new empty line item
- `<SavedProductsPanel>` — loads previously saved products/services
- Delete button per item (red, hover-reveal on desktop)

#### Section 5: Payment Info (`remittance`)
**Component:** `app/component/form/paymentDetails/paymentDetailsForm.tsx`

| Field | Type | Placeholder | localStorage Key |
|-------|------|-------------|-----------------|
| Bank name | TextInput | `HBL` | `bankName` |
| Account number | TextInput | `1234567890` | `accountNumber` |
| Account Name | TextInput | `Muhammad Abdullah` | `accountName` |
| IFSC code | TextInput | `HBL1234567` | `ifscCode` |
| Routing number | TextInput | `123456789` | `routingCode` |
| Swift code | TextInput | `HBLPPKKA` | `swiftCode` |
| Show currency | Checkbox | — | `showPayableIn` (default: "true") |

**Mobile:** Fields hidden behind accordion toggle ("Bank Account Details")
**Desktop:** Fields always visible

#### Section 6: Template Selector
**Component:** `app/component/form/templateSelector.tsx`

4 radio button options:
1. **Stripe Minimalist** — "Ultra-clean, developer-first, SaaS style" (default)
2. **Editorial Agency** — "Elegant, high-ticket consulting, warm tones"
3. **The Modern Executive** — "High-trust corporate with deep indigo accent bar"
4. **The Tokyo Indie** — "Hyper-modern, warm sand, neon orange dashes"

#### Section 7: Download
Contains `<DownloadInvoiceButton />` and `<ShareInvoiceButton />`.

---

## 5. Template System

### Template Definitions
**File:** `lib/pdfTemplates.ts`

Each template defines:

```typescript
interface TemplateConfig {
  id: string;                    // "stripe" | "editorial" | "executive" | "tokyo"
  name: string;                  // Display name
  description: string;           // Short description
  colors: {
    title: string;               // Header text color
    subtitle: string;            // Sub-header color
    description: string;         // Body text color
    accent: string;              // Accent/highlight color
    bg: string;                  // Background color
    border: string;              // Border color
    rowBorder?: string;          // Table row border color
    totalBlockBg?: string;       // Total section background (editorial)
  };
  borderStyle: "none" | "solid" | "dashed";
  headerStyle: string;           // CSS class for headers
  fontSize: {
    title: number;
    subtitle: number;
    description: number;
    amount: number;
    sectionHeader: number;
  };
  layoutPadding: {
    horizontal: number;
    vertical: number;
    sectionGap: number;
  };
  // Feature flags
  hasLeftAccentBar: boolean;     // Executive template
  useDashedDividers: boolean;    // Tokyo template
  hasDarkTotalBlock: boolean;    // Editorial template
  compactLayout: boolean;        // Tokyo template
}
```

### Template Comparison

| Feature | Stripe | Editorial | Executive | Tokyo |
|---------|--------|-----------|-----------|-------|
| Accent color | Green (#22c55e) | Warm (#78716c) | Indigo (#312e81) | Orange (#ea580c) |
| Borders | Solid | None | Solid | Dashed |
| Total block | Light gray bg | Dark bg (#09090b) | Flat | Dashed border |
| Left accent bar | No | No | Yes (12px) | No |
| Font feel | Monospace | Serif italic | Bold corporate | Compact modern |

---

## 6. Data Flow & Persistence

### Data Flow Diagram

```
User Input → CustomInput → react-hook-form Controller → FormContext
                                                          ↓
                                                     useData() hook
                                                          ↓
                                    ┌─────────────────────┼─────────────────────┐
                                    ↓                     ↓                     ↓
                              PreviewDetails        downloadUtils          localStorage
                              (live preview)        (PDF generation)       (persistence)
```

### localStorage Keys (30+ keys)

| Key | Type | Purpose |
|-----|------|---------|
| `yourEmail`, `yourName`, `yourAddress`, `yourCity`, `yourState`, `yourCountry`, `yourLogo`, `yourTaxId`, `yourZip` | string | Seller details |
| `email`, `companyName`, `companyAddress`, `companyCity`, `companyState`, `companyCountry`, `companyLogo`, `companyTaxId`, `companyZip` | string | Client details |
| `note`, `discount`, `tax` | string | Invoice extras |
| `bankName`, `accountNumber`, `accountName`, `routingCode`, `swiftCode`, `ifscCode` | string | Payment details |
| `invoiceNo`, `issueDate`, `dueDate` | string | Invoice terms |
| `currency` | string | Selected currency (default: "USD") |
| `items` | JSON array | Line items `[{itemDescription, amount, qty}]` |
| `showPayableIn` | string ("true"/"false") | Show currency on invoice |
| `invoiceTemplate` | string | Selected template ID |
| `step` | string ("1"-"5") | Last active section |
| `saved_clients` | JSON array | Saved client list |
| `saved_products` | JSON array | Saved product list |
| `invoice_history` | JSON array | Past invoices (max 50) |
| `invoice_counter` | number | Auto-increment for invoice numbers |
| `business_profile` | JSON object | Saved business profile |
| `_lastActive` | timestamp | Last active time |
| `storageVersion` | number | Data migration version |

### Cross-Platform Storage

```
Web: localStorage
Android: Capacitor Preferences (via lib/storage.ts abstraction)
```

`lib/storage.ts` provides `getStorageItem()`, `setStorageItem()`, `removeStorageItem()` that detect platform and route to the appropriate storage mechanism.

---

## 7. Mobile vs Desktop Behavior

| Feature | Desktop (≥768px) | Mobile (<768px) |
|---------|-------------------|-----------------|
| **Layout** | Sidebar (400px) + Preview (flex) | Full-width, edit/view toggle |
| **Navigation** | Accordion sidebar always visible | Toggle between form and preview |
| **Date pickers** | Popover calendar (react-day-picker) | Native `<input type="date">` |
| **Line items** | Horizontal table row | Stacked card per item |
| **Payment details** | Fields always visible | Accordion toggle to show/hide |
| **Print** | Print button visible | Hidden (not useful on mobile) |
| **Download/Share** | In sidebar download section | In view mode + floating button |
| **Ad placement** | Banner in preview area | Banner at bottom (native) |
| **Back button** | Browser back | Capacitor back handler (double-tap to exit) |

---

## 8. Ad System

### Web (Google AdSense)
- **Component:** `components/AdBanner.tsx`
- **Loading:** IntersectionObserver with 200px rootMargin (lazy load)
- **Format:** `<ins class="adsbygoogle">` with configurable format
- **Placement:** Below invoice content on pages

### Android (Google AdMob)
5 custom Capacitor plugins:

| Plugin | File | Ad Format | Usage |
|--------|------|-----------|-------|
| `BannerAd` | `BannerAdPlugin.java` | Banner (top/bottom) | Persistent bottom banner |
| `InterstitialAd` | `InterstitialAdPlugin.java` | Full-screen interstitial | On page navigation |
| `NativeAd` | `NativeAdPlugin.java` | Native (headline+body+CTA) | In-content native ads |
| `RewardedAd` | `RewardedAdPlugin.java` | Rewarded interstitial | Before PDF download |

### Ad Placement in UI
```
Homepage:
  - Native ad after demo preview
  - Native ad after feature grid

Invoice Form (/new):
  - Native ad at bottom of page

SEO Pages:
  - Banner ad after breadcrumb
  - Native ad in content

Android:
  - Persistent bottom banner (NativeBanner component)
```

---

## 9. PDF Generation

### Flow
```
User clicks "Download" → showAdWithTimeout() → generateBlob() → saveToDevice() → saveHistory()
```

### Components Involved
1. `downloadUtils.tsx` — orchestrates the entire flow
2. `pdfDetails.tsx` — main PDF renderer component
3. `yourDetailsPdf.tsx` — seller details in PDF
4. `companyDetailsPdf.tsx` — client details in PDF
5. `invoiceDetailsPdf.tsx` — line items table in PDF
6. `invoiceTermsPdf.tsx` — invoice number and dates in PDF
7. `paymentDetailsPdf.tsx` — payment details in PDF
8. `pdfStyles.ts` — react-pdf StyleSheet definitions
9. `pdfTemplates.ts` — template configuration data
10. `svgToDataUri.ts` — converts country flag SVGs to data URIs

### PDF Output
- **Size:** A4 (210mm × 297mm)
- **Font:** Geist Sans (8 weights registered)
- **Templates:** 4 visual themes (affects colors, borders, layout)
- **Elements:** Logo, invoice number, dates, from/to details, line items table, totals (subtotal/discount/tax/total), payment details, currency indicator

---

## 10. File Map

### Pages
| File | Route | Purpose |
|------|-------|---------|
| `app/layout.tsx` | — | Root layout (navbar, footer, scripts) |
| `app/(landing)/page.tsx` | `/` | Homepage |
| `app/new/page.tsx` | `/new` | Invoice creation page |
| `app/download/page.tsx` | `/download` | App download page |
| `app/[...slug]/page.tsx` | `/*` | Dynamic SEO pages |
| `app/not-found.tsx` | 404 | Not found page |
| `app/robots.ts` | `/robots.txt` | Robots.txt generator |
| `app/sitemap.ts` | `/sitemap.xml` | Sitemap generator |

### Form Components
| File | Component | Section |
|------|-----------|---------|
| `app/component/form/userInputForm.tsx` | `UserInputForm` | Section router |
| `app/component/form/yourDetails/yourDetailsForm.tsx` | `YourDetailsForm` | From details |
| `app/component/form/yourDetails/yourDetailsPreview.tsx` | `YourDetailsPreview` | From preview |
| `app/component/form/yourDetails/yourDetailsPdf.tsx` | `YourDetailsPDF` | From PDF |
| `app/component/form/companyDetails/companyDetailsForm.tsx` | `CompanyDetailsForm` | To details |
| `app/component/form/companyDetails/companyDetailsPreview.tsx` | `CompanyDetailsPreview` | To preview |
| `app/component/form/companyDetails/companyDetailsPdf.tsx` | `CompanyDetailsPdf` | To PDF |
| `app/component/form/invoiceDetails/invoiceDetailsForm.tsx` | `InvoiceDetailsForm` | Line items |
| `app/component/form/invoiceDetails/invoiceDetailsPreview.tsx` | `InvoiceDetailsPreview` | Items preview |
| `app/component/form/invoiceDetails/invoiceDetailsPdf.tsx` | `InvoiceDetailsPdf` | Items PDF |
| `app/component/form/invoiceTerms/invoiceTermsForm.tsx` | `InvoiceTermsForm` | Invoice number/dates |
| `app/component/form/invoiceTerms/InvoiceTermsPreview.tsx` | `InvoiceTermsPreview` | Terms preview |
| `app/component/form/invoiceTerms/InvoiceTermsPdf.tsx` | `InvoiceTermsPdf` | Terms PDF |
| `app/component/form/paymentDetails/paymentDetailsForm.tsx` | `PaymentDetailsForm` | Bank details |
| `app/component/form/paymentDetails/paymentDetailsPreview.tsx` | `PaymentDetailsPreview` | Payment preview |
| `app/component/form/paymentDetails/paymentDetailsPdf.tsx` | `PaymentDetailsPdf` | Payment PDF |
| `app/component/form/previewDetails.tsx` | `PreviewDetails` | Full invoice preview |
| `app/component/form/pdfDetails.tsx` | `PdfDetails` | Full PDF renderer |
| `app/component/form/templateSelector.tsx` | `TemplateSelector` | Template picker |

### UI Components
| File | Component | Purpose |
|------|-----------|---------|
| `app/component/ui/customTextInput.tsx` | `CustomTextInput` | Text input with label |
| `app/component/ui/customNumberInput.tsx` | `CustomNumberInput` | Numeric input with label |
| `app/component/ui/currencyInput.tsx` | `CurrencyInput` | Currency selector popover |
| `app/component/ui/currencyFlag.tsx` | `CurrencyFlag` | Lazy-loaded flag icon |
| `app/component/ui/dateInput.tsx` | `DateInput` | Date picker (desktop) |
| `app/component/ui/imageInput.tsx` | `ImageInput` | File upload with preview |
| `app/component/ui/input.tsx` | `Input` | Base input component |
| `app/component/ui/stepButton.tsx` | `StepButton` | Step navigation button |
| `app/component/ui/mobilePreviewSheet.tsx` | `MobilePreviewSheet` | Bottom sheet (unused) |
| `app/component/ui/BusinessProfilePanel.tsx` | `BusinessProfilePanel` | Profile save/load |
| `app/component/ui/SavedClientsPanel.tsx` | `SavedClientsPanel` | Client list |
| `app/component/ui/SavedProductsPanel.tsx` | `SavedProductsPanel` | Product list |

### Download Components
| File | Component | Purpose |
|------|-----------|---------|
| `app/component/form/downloadInvoice/downloadInvoiceButton.tsx` | `DownloadInvoiceButton` | PDF download |
| `app/component/form/downloadInvoice/shareInvoiceButton.tsx` | `ShareInvoiceButton` | Share via native |
| `app/component/form/downloadInvoice/downloadUtils.tsx` | — | Core download logic |
| `app/component/form/downloadInvoice/fileSaverPlugin.ts` | `FileSaver` | Capacitor file saver bridge |
| `app/component/form/downloadInvoice/rewardedAdPlugin.ts` | `RewardedAd` | Capacitor rewarded ad bridge |

### Shared Components
| File | Component | Purpose |
|------|-----------|---------|
| `components/AdBanner.tsx` | `AdBanner` | Google AdSense banner |
| `components/NativeBanner.tsx` | `NativeBanner` | AdMob banner (mobile) |
| `components/SeoNativeAd.tsx` | `SeoNativeAd` | Native ad card (mobile) |
| `components/ErrorBoundary.tsx` | `ErrorBoundary` | React error boundary |
| `components/AppInit.tsx` | `AppInit` | Storage migration |
| `components/BackButtonHandler.tsx` | `BackButtonHandler` | Android back button |
| `components/AppStoreBadges.tsx` | `AppStoreBadges` | Download link |
| `components/seo/PageRenderer.tsx` | `PageRenderer` | SEO page renderer |

### Library Files
| File | Purpose |
|------|---------|
| `lib/localData.ts` | Data layer (CRUD for clients, products, invoices) |
| `lib/storage.ts` | Cross-platform storage abstraction |
| `lib/currency.tsx` | 16 currency definitions with flags |
| `lib/pdfTemplates.ts` | 4 PDF template configurations |
| `lib/pdfStyles.ts` | PDF StyleSheet definitions |
| `lib/svgToDataUri.ts` | SVG to data URI converter |
| `lib/getInitialValue.ts` | localStorage initial value helpers |
| `lib/analytics.ts` | Analytics event constants |
| `lib/seo-pages.ts` | ~40 SEO page definitions |
| `lib/utils.ts` | `cn()` utility (clsx + tailwind-merge) |

### Android Native Code
| File | Purpose |
|------|---------|
| `android/app/src/main/java/.../MainActivity.java` | Plugin registration |
| `android/app/src/main/java/.../FileSaverPlugin.java` | Save PDF to Downloads |
| `android/app/src/main/java/.../BannerAdPlugin.java` | AdMob banner |
| `android/app/src/main/java/.../InterstitialAdPlugin.java` | AdMob interstitial |
| `android/app/src/main/java/.../RewardedAdPlugin.java` | AdMob rewarded |
| `android/app/src/main/java/.../NativeAdPlugin.java` | AdMob native |

### Hooks
| File | Purpose |
|------|---------|
| `app/hooks/useData.ts` | Aggregates all form data into structured objects |
| `app/hooks/useGetValue.ts` | Reads individual form fields via `watch()` |
