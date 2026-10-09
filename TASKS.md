# Task Registry

**Single source of truth for task status.** Update this file immediately after a task's acceptance criteria are verified — never later, never optimistically.

- Statuses: `OPEN` · `IN_PROGRESS` · `BLOCKED` · `IN_REVIEW` · `DONE` · `WONT_FIX` (requires reason)
- Priorities: **P0** release-blocking · **P1** high · **P2** medium · **P3** low
- Baseline: `056416a` · Plan: [`DEVELOPMENT_PLAN.md`](./DEVELOPMENT_PLAN.md) · Log: [`DEVELOPMENT_LOG.md`](./DEVELOPMENT_LOG.md)

---

## Status board

| ID | Title | Pri | Phase | Status | Verification |
|---|---|---|---|---|---|
| `CALC-001` | Single shared money module (compute + format) | P0 | A | `DONE` | unit tests |
| `CALC-002` | Round totals consistently across preview / PDF / history | P0 | A | `DONE` | unit + component tests |
| `CALC-003` | Tax row and total must reconcile | P0 | A | `DONE` | unit test |
| `CALC-004` | Currency-aware minor-unit digits | P1 | A | `DONE` | unit test |
| `CALC-005` | Remove duplicated calculation helpers | P1 | A | `DONE` | grep + tests |
| `CALC-006` | Quantity/amount coercion fixes (`0` handling) | P2 | A | `DONE` | unit test |
| `VAL-001` | Numeric validation for discount / tax / qty / price | P0 | A | `DONE` | unit + component tests |
| `VAL-002` | Reject `NaN` / `Infinity` / negative totals | P0 | A | `DONE` | unit tests |
| `SEC-001` | Untrack `google-services.json` | P0 | A | `DONE` | git evidence |
| `SEC-002` | Security headers effective at hosting boundary | P0 | A | `OPEN` | live HTTP response (config done, deploy pending) |
| `SEC-003` | Dependency vulnerability remediation plan | P1 | B | `OPEN` | `npm audit` |
| `SEC-004` | Verify & tighten CSP on deployed site | P2 | C | `BLOCKED` | live HTTP response |
| `SEC-005` | Restrict/rotate exposed Firebase API key (owner action) | P1 | C | `BLOCKED` | Google Cloud Console evidence |
| `SEC-006` | Android build + native workflow verification | P1 | C | `BLOCKED` | Gradle build output |
| `DEP-001` | Remove unused dependencies | P1 | B | `OPEN` | bundle + `npm ls` |
| `DEP-002` | Upgrade `@capacitor/android` ≥ 8.4.3 (CVSS 9.3) | P0 | A | `DONE` | `npm audit` |
| `DEP-003` | Execute Next.js upgrade decision (D3) | P1 | B | `OPEN` | build + tests + `npm audit` |
| `WF-001` | Fix Reset behaviour | P0 | A | `DONE` | e2e test |
| `WF-002` | Remove duplicate `INV-` prefix | P1 | B | `OPEN` | component test |
| `WF-003` | Single invoice-counter increment | P1 | B | `OPEN` | unit + e2e test |
| `WF-004` | Persist template selection | P1 | B | `OPEN` | e2e test |
| `WF-005` | Share button must report failures | P1 | B | `OPEN` | unit test |
| `WF-006` | Correct currency formatting in history | P1 | B | `OPEN` | unit test |
| `PDF-001` | Currency glyph coverage (₨ ₩ ₫) in PDF fonts | P1 | B | `OPEN` | cmap + rendered PDF |
| `PDF-002` | Currency flag SVG in PDF (or drop it) | P3 | C | `OPEN` | `pdfimages` on output |
| `PDF-003` | Print stylesheet + iframe parity | P2 | C | `OPEN` | Playwright print check |
| `PDF-004` | PDF regression suite (validity + text) | P2 | C | `OPEN` | unit test |
| `STR-001` | Unify persistence behind `lib/storage.ts` | P1 | B | `OPEN` | grep rule + tests |
| `STR-002` | Canonical date storage format | P2 | C | `OPEN` | unit test |
| `STR-003` | Logo/backup storage quota handling | P2 | C | `OPEN` | unit test |
| `SEO-001` | Remove false Word/Excel/Google format claims | P1 | B | `OPEN` | content assertion |
| `SEO-002` | Remove false CAD/AUD currency claim | P1 | B | `OPEN` | content assertion |
| `SEO-003` | Fix misleading UI copy | P3 | C | `OPEN` | manual/UI test |
| `A11Y-001` | Heading, labels, button names on `/new` | P1 | B | `OPEN` | axe snapshot |
| `A11Y-002` | Full a11y pass (contrast, focus, landmarks) | P2 | C | `OPEN` | axe report |
| `DPL-001` | Reachable, verified production deployment | P0 | A | `OPEN` | live HTTP (D4 answered; owner deploys) |
| `DPL-002` | Deployment & release verification checklist | P2 | C | `BLOCKED` | live HTTP |
| `TEST-001` | Test infrastructure (Vitest + RTL) | P0 | A | `DONE` | `npm test` |
| `TEST-002` | CI pipeline (typecheck, lint, test, build) | P0 | A | `DONE` | green CI run |
| `TEST-003` | Playwright end-to-end smoke | P2 | C | `OPEN` | `npm run test:e2e` |
| `TEST-004` | Clear all lint warnings | P2 | C | `OPEN` | `npm run lint` |
| `MNT-001` | Replace `alert()` dialogs | P2 | C | `OPEN` | manual/UI test |
| `MNT-002` | Remove confirmed dead code | P2 | C | `OPEN` | grep + build |
| `MNT-003` | Remove unused `firebase` + related deps | P1 | B | `OPEN` | `npm audit` delta |
| `PROD-001` | Invoice status (draft/sent/paid/overdue) | P3 | D | `OPEN` | scope decision D6 |
| `PROD-002` | Dashboard statistics | P3 | D | `OPEN` | scope decision D6 |
| `PROD-003` | Cloud backup | P3 | D | `OPEN` | scope decision D6 |
| `PROD-004` | Localization (i18n) | P3 | D | `OPEN` | scope decision D6 |
| `PROD-005` | Recurring invoices | P3 | D | `OPEN` | scope decision D6 |
| `PROD-006` | Advanced tax (VAT/GST regimes, reverse charge) | P3 | D | `OPEN` | scope decision D6 |

> `MNT-003` is listed under Phase B because removing `firebase` directly reduces the vulnerability count required by the Phase B gate.

---

## Phase A — Release blockers & financial correctness

### `CALC-001` — Single shared money module
- **Status** `DONE` (2026-10-10) · **Priority** P0 · **Depends on** D1
- **Evidence:** four divergent implementations — `invoiceDetailsPreview.tsx` (`calculateTotalAmount`, `addCommasToNumber`, no rounding), `invoiceDetailsPdf.tsx` (identical duplicate), `downloadUtils.tsx:149` (`Math.round(x*100)/100`), `RecentInvoices.tsx:45` (6-symbol map + `toFixed(2)`).
- **Root cause:** arithmetic was copy-pasted per surface instead of shared.
- **Required outcome:** `lib/money.ts` becomes the only place money is computed or formatted; it takes an explicit currency and applies that currency's minor units.
- **Acceptance criteria:**
  1. `lib/money.ts` exports computation (`computeInvoiceTotals` / `invoiceTotals`, `toMinorUnits`, `minorToNumber`) and presentation (`formatMoney`, `formatMinorUnits`, `formatMinorWithSymbol`) APIs.
  2. Internals use integer minor units; no float artifact can survive (`1.1 + 2.2` → `3.30`, never `3.3000000000000003`).
  3. Unit tests cover: float-accumulating line items, 0 qty, 0 amount, missing fields, decimal qty (1.5 × 10), and all four of the above production scenarios reproduced in baseline.
  4. Preview, PDF and history import the module; none re-implements totals.
- **Verification:** `npm test` green; grep proves no local copies remain (`CALC-005`).

### `CALC-002` — Consistent rounding across preview / PDF / history
- **Status** `DONE` (2026-10-10) · **Priority** P0
- **Evidence (reproduced 2026-10-09):** one invoice shows `Amount Due ₨5,255.775` in preview and `₨5255.78` in Recent Invoices.
- **Root cause:** preview/PDF never round; history rounds at the last step only.
- **Required outcome:** identical displayed amount on all three surfaces for identical inputs.
- **Acceptance criteria:** property-style test asserting `formatPreviewTotal(input) === formatHistoryTotal(input) === formatPdfTotal(input)` for a table of ≥12 inputs including the baseline repro cases; all green.
- **Verification:** `npm test`.

### `CALC-003` — Tax row and total must reconcile
- **Status** `DONE` (2026-10-10) · **Priority** P0
- **Evidence:** tax row uses `+taxAmount.toFixed(2)` while total uses the unrounded value → rows do not sum to the displayed total (`107.50` shown vs `107.505375` computed).
- **Required outcome:** subtotal − discount + tax === amount due, exactly as displayed.
- **Acceptance criteria:** unit test asserts displayed rows sum to displayed total for ≥10 tax/discount combinations, including half-cent cases.
- **Verification:** `npm test`.

### `CALC-004` — Currency-aware minor-unit digits
- **Status** `DONE` (2026-10-10) · **Priority** P1 · **Depends on** D1
- **Evidence:** `RecentInvoices` always `.toFixed(2)`; product advertises JPY/KRW/VND/IDR which have 0 minor units.
- **Acceptance criteria:** `currency.tsx` (or `money.ts`) declares `minorUnitDigits` per currency; JPY/KRW/VND/IDR format with 0 decimals, others with 2; unit test covers ≥4 currencies of both kinds.
- **Verification:** `npm test`.

### `CALC-005` — Remove duplicated calculation helpers
- **Status** `DONE` (2026-10-10) · **Priority** P1 · **Depends on** `CALC-001`
- **Acceptance criteria:** `grep -rn "const calculateTotalAmount\|const addCommasToNumber"` returns 0 in `app/`; preview and PDF still render correctly (component tests pass).
- **Verification:** grep + `npm test`.

### `CALC-006` — Quantity/amount coercion
- **Status** `DONE` (2026-10-10) · **Priority** P2
- **Evidence:** `qty ? qty : 1` coerces an explicit `0` to `1`; `amount ? … : ""` renders an empty cell for `0`.
- **Required outcome:** explicit `0` behaves as `0` in arithmetic and renders as `0` when the user typed it; empty remains empty.
- **Acceptance criteria:** unit tests for qty `0`, amount `0`, `""`, `undefined`, and string `"3"`; no silent `0 → 1` promotion.
- **Verification:** `npm test`.

### `VAL-001` — Numeric validation for discount / tax / qty / price
- **Status** `DONE` (2026-10-10) · **Priority** P0
- **Evidence:** `customNumberInput.tsx` writes `e.target.value` straight to storage and the form; `pattern="[0-9]*"` is never enforced. Typing `abc` produces `Discount $NaN`.
- **Root cause:** no parsing layer between the text input and the money pipeline.
- **Required outcome:** discount/tax/qty/price accept only well-formed numerics; free text cannot reach arithmetic.
- **Acceptance criteria:**
  1. Invalid keystrokes/values do not propagate (input filters or restores previous valid value).
  2. Empty input is treated as `0`, not `NaN`.
  3. Component tests cover `abc`, `1.2.3`, `-`, ``, `0`, `1e5`, very large numbers, and pasted content.
- **Verification:** `npm test`.

### `VAL-002` — Reject `NaN` / `Infinity` / negative totals
- **Status** `DONE` (2026-10-10) · **Priority** P0 · **Depends on** D2
- **Evidence (reproduced):** subtotal 100, discount 500, tax 10% → `Amount Due -440`; non-numeric discount → `NaN` in both preview and history.
- **Required outcome:** the invoice can never render or persist `NaN`, `Infinity`, or a negative amount due.
- **Acceptance criteria:** enforced inside `lib/money.ts` (not only in the UI); tests prove the invariant for the baseline repro inputs and a fuzz-style table; history storage never receives a non-finite total.
- **Verification:** `npm test` + a storage-write assertion.

### `SEC-001` — Untrack `google-services.json`
- **Status** `DONE` (2026-10-10) · **Priority** P0 · **Depends on** D5
- **Evidence:** `git ls-files` → `google-services.json`; added `708e428` (2026-07-13); `.gitignore` entry added later in `67abb5a` (2026-09-05), which does not untrack; repo is **public**; file contains a Firebase Android `api_key`.
- **Required outcome:** file is no longer tracked and cannot be re-added accidentally; no secret material appears in any report, log, or commit.
- **Acceptance criteria:**
  1. `git ls-files | grep google-services` returns nothing.
  2. `.gitignore` retains the entry; `git status` clean after `git add -A`.
  3. Removal commit message contains **no** secret values (path only).
  4. History impact documented: the blob remains in history — removal from HEAD does **not** erase it; history rewriting is explicitly **out of scope** pending separate approval.
- **Verification:** git commands recorded in `DEVELOPMENT_LOG.md`.
- **Completed (2026-10-10):** removed in commit `9e7410c` (`git rm google-services.json`); `git ls-files | grep google-services` → empty; `.gitignore:47` entry retained; commit message contains path only; AC4 — blob still reachable in history (added `708e428`); history rewrite remains out of scope pending separate approval. Note: key restriction/rotation is `SEC-005` (owner-only).

### `SEC-002` — Security headers effective at hosting boundary
- **Status** `OPEN` (D4 answered; config committed — live evidence pending deploy) · **Priority** P0 · **Depends on** D4 ✓
- **Evidence:** `next.config.js` declares CSP/HSTS/XFO/etc., but `next build` warns *"headers are not applied when exporting your application"*; no `vercel.json` exists in the tree or in git history.
- **Required outcome:** the headers are present in real HTTP responses from the deployed site.
- **Acceptance criteria:** `curl -sI <prod-url>` shows `content-security-policy`, `strict-transport-security`, `x-content-type-options`, `x-frame-options`, `referrer-policy`, `permissions-policy`; evidence pasted into the log. Config-file edits alone do **not** satisfy this.
- **Verification:** live HTTP response.
- **Note:** `output: "export"` cannot deliver headers itself — fix is hosting-level.
- **Progress (2026-10-10):** D4 decided (Vercel); `vercel.json` committed (`41d38f4`) with CSP/HSTS/XFO/XCTO/referrer/permissions headers + immutable cache rules. AC still unmet until a deploy exists — final `curl -sI` evidence captured after `DPL-001` deploy.

### `DEP-002` — Upgrade `@capacitor/android`
- **Status** `DONE` (2026-10-10) · **Priority** P0
- **Evidence:** installed `8.4.1`; advisory GHSA-rvm3-566m-v7fv, **CVSS 9.3**, range `>=8.3.5 <8.4.3`; `8.4.3` published; `fixAvailable: true` (non-breaking).
- **Acceptance criteria:** `@capacitor/android` (with matching `@capacitor/cli`/`core`) at ≥ `8.4.3`; `npm run build` and `npx cap sync`/Android build still work; audit no longer lists this advisory; Capacitor plugins keep loading.
- **Verification:** `npm audit` + `npm run build` (+ Android build if environment available).

### `WF-001` — Fix Reset behaviour
- **Status** `DONE` (2026-10-10) · **Priority** P0
- **Evidence:** `NewInvoiceForm.tsx:291` `handleReset` → `clearFormOnly()` only (removes keys, sets `step=1`); `clearAllData()` at `:33` — which also calls `window.location.reload()` — is never invoked. React-hook-form state and the preview are not reset.
- **Root cause:** the state-clearing helper that reloads was superseded by a storage-only helper without updating the caller.
- **Required outcome:** one Reset action clears form state, preview, and all persisted invoice fields.
- **Acceptance criteria:** after Reset — inputs empty, preview shows the empty/default state, `localStorage` free of invoice fields, step back at 1; verified by an e2e test; `clearAllData` either used or removed (no dead duplicate).
- **Verification:** `npm run test:e2e` (or, until Playwright exists in Phase A, an automated jsdom/RTL test of the handler plus a documented manual browser check).

### `DPL-001` — Reachable, verified production deployment
- **Status** `OPEN` (D4 answered — owner deploys per D4=(b)) · **Priority** P0 · **Depends on** D4 ✓, `SEC-002`
- **Evidence (probed 2026-10-09):** `invoice-generator-abdullah2k05.vercel.app` → `302` to Vercel SSO; `invoice-generator.mabdullah.top` → `404 DEPLOYMENT_NOT_FOUND`.
- **Required outcome:** the intended public URL serves this application.
- **Acceptance criteria:** `200` for `/`, `/new`, `/download`, one SEO route (e.g. `/invoice-template`), `/robots.txt`, `/sitemap.xml`; page title matches expectations; JS bundle loads; documented final URL. **Not** satisfied by a local `next build`.
- **Verification:** `curl` + recorded responses in the log.
- **Progress (2026-10-10):** D4 decided — Vercel, option (b): agent produces config + exact deploy commands; owner deploys and binds the custom domain. Waiting on owner action; `vercel.json` and CI are in place.

### `TEST-001` — Test infrastructure
- **Status** `DONE` (2026-10-10) · **Priority** P0 · **Depends on** AD-5
- **Evidence:** zero test files; no `test` script; no jest/vitest/playwright in `node_modules`.
- **Required outcome:** `npm test` runs a real suite and fails when money logic regresses.
- **Acceptance criteria:**
  1. Vitest + jsdom + `@testing-library/react` wired with `npm test` and `npm run test:watch`.
  2. Coverage of `CALC-001..004` and `VAL-001..002` acceptance criteria.
  3. A deliberately broken assertion is caught (proved by a temporary failing run, reverted).
  4. Test-only devDependencies; production bundle unchanged (`next build` size within tolerance).
- **Verification:** `npm test` exit 0; `npm run build` exit 0.

### `TEST-002` — CI pipeline
- **Status** `DONE` (2026-10-10) · **Priority** P0 · **Depends on** `TEST-001`
- **Evidence:** no `.github/` directory (at creation).
- **Required outcome:** every push runs the full static gate and blocks regressions.
- **Acceptance criteria:** workflow runs typecheck, lint, tests, and production build; required checks enabled on `main`; workflow file committed; at least one **green** run observed (or documented blocker if Actions are unavailable).
- **Verification:** CI run URL recorded in the log.
- **Completed (2026-10-10):** `.github/workflows/ci.yml` committed (`006f988`); green run <https://github.com/abdullah2k05/invoice-generator/actions/runs/37980800914> (Typecheck ✓ Lint ✓ Test ✓ Build ✓); required status check `Static gate (typecheck, lint, test, build)` enabled on `main` (`enforce_admins` off so the owner can push directly).

---

## Phase B — Core workflow correctness & security hardening

### `WF-002` — Remove duplicate `INV-` prefix
- **Status** `OPEN` · **Priority** P1
- **Evidence:** `InvoiceTermsPdf.tsx:33,62` and `InvoiceTermsPreview.tsx:58,140` render `INV-{invoiceNumber || "001"}` while `invoiceNumber` is stored as `INV-042` → `INV-INV-042`.
- **Acceptance criteria:** stored value and rendered value agree for every template; tests for stored `INV-042`, empty, and bare `042`; no literal `INV-` concatenation remains outside the number generator.
- **Verification:** component tests over all 4 templates.

### `WF-003` — Single invoice-counter increment
- **Status** `OPEN` · **Priority** P1
- **Evidence:** increments at generation (`invoiceTermsForm.tsx:50`, `:65`) **and** at save (`downloadUtils.tsx:162`) → observed `INV-001 → INV-003`.
- **Root cause:** two independent call sites own the same counter.
- **Required outcome:** exactly one increment per *committed* invoice; numbers never skip or repeat.
- **Acceptance criteria:** documented ownership (increment on save only, or on generation only with reuse semantics); unit test simulating create → download → create → download yields consecutive numbers; duplicate-from-history does not corrupt the sequence.
- **Verification:** unit + e2e.

### `WF-004` — Persist template selection
- **Status** `OPEN` · **Priority** P1
- **Evidence:** `NewInvoiceForm.tsx:256` hard-codes `defaultValues: { invoiceTemplate: "stripe" }`; nothing ever reads `invoiceTemplate` from storage. `RecentInvoices.tsx:25` writes it, so duplication appears to work until reload.
- **Acceptance criteria:** selected template survives reload and duplicate; default still applies only for first-time users; e2e covers select → reload → still selected, and duplicate → correct template.
- **Verification:** e2e.

### `WF-005` — Share button must report failures
- **Status** `OPEN` · **Priority** P1
- **Evidence:** `downloadAndShare` catches internally and `return false` (`downloadUtils.tsx:221-226`); `shareInvoiceButton.tsx:49-59` awaits it and **never checks the value**, so it always shows "Invoice saved & ready to share". `downloadInvoiceButton` checks correctly — the asymmetry proves the omission. Also `navigator.canShare` false → silent no-op yet success.
- **Acceptance criteria:** false return → error toast + `not-shared` state; unit tests for `false`, thrown error, and success; success toast only on genuine success.
- **Verification:** unit tests.

### `WF-006` — Correct currency formatting in history
- **Status** `OPEN` · **Priority** P1 · **Depends on** `CALC-001`
- **Evidence:** `RecentInvoices.tsx:46-49` map holds only USD/PKR/EUR/GBP/CAD/AUD → INR and 9 others display `$`. `SavedProductsPanel.tsx:72` hard-codes `$`.
- **Acceptance criteria:** every one of the 16 currencies in `lib/currency.tsx` renders its own symbol/format in history and saved products; table-driven test over all 16; no hard-coded `$` in money display paths.
- **Verification:** unit test (table of 16).

### `PDF-001` — Currency glyph coverage in PDF fonts
- **Status** `OPEN` · **Priority** P1
- **Evidence:** `fontTools` cmap over `Geist-Regular/Medium/Bold.ttf`: **missing** U+20A8 ₨ (PKR), U+20A9 ₩ (KRW), U+20AB ₫ (VND); present: `$ € £ ₹ ¥ ₽`.
- **Required outcome:** every currency we advertise renders correctly in the generated PDF.
- **Acceptance criteria:** either (a) a glyph-complete font is registered for those code points, or (b) unsupported currencies are rejected with a clear message — **and** a test asserts every symbol in `currency.tsx` is covered by the registered font; rendered PDF for PKR/KRW/VND inspected (`pdftotext`) with no `.notdef`.
- **Verification:** cmap test + `pdftotext` on generated PDFs.

### `STR-001` — Unify persistence behind `lib/storage.ts`
- **Status** `OPEN` · **Priority** P1 · **Depends on** AD-3
- **Evidence:** 34 raw `localStorage.setItem` calls across `app/`, plus `localStorage.getItem` in `getInitialValue.ts`; `lib/localData.ts` uses `lib/storage.ts` → `Preferences` on native. On Android, form fields and history write to **different stores**; `clearFormOnly` only clears one of them.
- **Required outcome:** one adapter; web `localStorage`, native `Preferences`.
- **Acceptance criteria:**
  1. `grep -rn "localStorage\." app components lib` matches only `lib/storage.ts`.
  2. Existing user data on web is not lost (read path unchanged for `localStorage`).
  3. Reset/backup clear **both** logical stores on native.
  4. Migration documented if any key changes.
- **Verification:** grep rule added to lint/CI + tests.

### `DEP-001` — Remove unused dependencies
- **Status** `OPEN` · **Priority** P1
- **Evidence:** 0 source references for `jspdf`, `html2canvas`, `canvg`; `firebase` unused (see `MNT-003`); PDF uses `@react-pdf/renderer`.
- **Acceptance criteria:** package removed after a repo-wide reference check including config files and scripts; `npm run build` and `npm test` pass; first-load JS does not increase.
- **Verification:** `npm ls`, `npm run build`, bundle size comparison.

### `DEP-003` — Execute Next.js decision D3
- **Status** `OPEN` · **Priority** P1 · **Depends on** D3
- **Evidence:** `next@14.2.35` = latest 14.x; audit reports 2 criticals among advisories, all targeting **server-side** features (Image Optimizer, Server Actions, middleware, RSC cache, request smuggling) which do not exist in `output: "export"`. `next@15.5.27` peer-depends on `react ^18.2.0` → compatible with installed `react@18.3.1`; `eslint-config-next@15.5.27` exists; all listed advisories have ranges `<15.5.24`.
- **Acceptance criteria (if upgrade chosen):** `next` and `eslint-config-next` at `15.5.27`, `npm run build` 56/56 static pages, lint/typecheck/tests green, audit no longer reports `next` criticals, static export output unchanged in structure.
- **Acceptance criteria (if risk accepted):** written acceptance note in `DEVELOPMENT_LOG.md` stating the advisories are server-only and therefore unreachable for this deployment, with the residual `npm audit` numbers recorded.
- **Verification:** `npm audit` + build + tests.

### `SEO-001` — Remove false Word/Excel/Google format claims
- **Status** `OPEN` · **Priority** P1
- **Evidence:** `lib/seo-pages.ts:44-48, 59-83` advertise Microsoft Word `.docx`, Excel `.xlsx`, Google Docs and Google Sheets templates with "Word formulas"; 4 corresponding routes appear in `out/sitemap.xml`. The product exports **PDF only**. Commit `67d3a84` claimed to remove misleading claims — these remain.
- **Acceptance criteria:** no claim of a format the app does not produce; affected routes either rewritten to describe the real PDF product or removed with their sitemap entries; content test asserts no `.docx`/`.xlsx`/Google-export promise; sitemap regenerated accordingly.
- **Verification:** content test + `npm run build` sitemap inspection.

### `SEO-002` — Remove false CAD/AUD currency claim
- **Status** `OPEN` · **Priority** P1
- **Evidence:** `seo-pages.ts:383` claims "USD, EUR, GBP, PKR, INR, CAD, AUD, and many more"; `lib/currency.tsx` contains **no CAD or AUD** (16 currencies: INR USD EUR GBP JPY KRW ILS VND BDT RUB BRL UAH KZT TWD IDR PKR).
- **Acceptance criteria:** copy matches the actual currency list (or the currencies are added — a product decision); test asserts every currency named in copy exists in `currency.tsx`.
- **Verification:** content test.

### `A11Y-001` — Heading, labels, button names on `/new`
- **Status** `OPEN` · **Priority** P1
- **Evidence:** accessibility snapshot of `/new`: **0 `<h1>`**, 22 of 84 inputs without accessible names, 3 buttons with no accessible name.
- **Acceptance criteria:** exactly one `h1` per route; every input associated with a label; no button without accessible name; axe scan of `/`, `/new`, `/download` reports **0** critical/serious issues.
- **Verification:** axe report captured in CI (`TEST-003`) or scripted snapshot.

### `SEC-003` — Dependency vulnerability remediation plan
- **Status** `OPEN` · **Priority** P1 · **Depends on** `DEP-001`, `DEP-002`, `DEP-003`
- **Evidence:** 27 vulnerabilities (2 critical, 20 high, 5 moderate). Of these, the largest cluster comes from **unused** `firebase`, and the two criticals are `next` and `@capacitor/android`.
- **Required outcome:** no unresolved **critical** without written acceptance; highs triaged individually.
- **Acceptance criteria:** after `MNT-003` + `DEP-001..003`, `npm audit` output recorded; each remaining advisory listed as resolved / accepted-with-reason / dev-only; **no** use of `--force` to paper over incompatibilities.
- **Verification:** `npm audit` before/after delta in the log.

---

## Phase C — Reliability, quality & release verification

### `PDF-002` — Currency flag in PDF
- **Status** `OPEN` · **Priority** P3
- **Evidence:** `lib/svgToDataUri.ts` emits `data:image/svg+xml;base64,…`; `@react-pdf/renderer` rejects it ("Not valid image extension"); `pdfimages -list` on generated PDFs shows only the logo.
- **Acceptance criteria:** either the flag renders (rasterised or PNG) or the flag is intentionally dropped from the PDF design with a note; no renderer warning in logs.
- **Verification:** `pdfimages -list` + log inspection.

### `PDF-003` — Print stylesheet & iframe parity
- **Status** `OPEN` · **Priority** P2
- **Evidence:** `app/globals.css` (202 lines) contains **no** `@media print`; `NewInvoiceForm.tsx:346-371` copies only `<link>` stylesheets into the print iframe → unstyled in dev, and output layout never verified.
- **Acceptance criteria:** print output is invoice-only, correctly paginated, and identical to the on-screen invoice for both Stripe and Tokyo templates; verified against the **production build**; documented viewport/paper assumptions.
- **Verification:** Playwright (`TEST-003`) or a recorded manual print-to-PDF comparison.

### `PDF-004` — PDF regression suite
- **Status** `OPEN` · **Priority** P2 · **Depends on** `CALC-001`
- **Acceptance criteria:** tests generate PDFs for all 4 templates × ≥3 currency scenarios, assert PDF magic bytes, non-zero size, page count, and presence of expected amounts (via text extraction or react-pdf tree assertions); failures are actionable.
- **Verification:** `npm test`.

### `STR-002` — Canonical date storage format
- **Status** `OPEN` · **Priority** P2 · **Depends on** `STR-001`
- **Evidence:** `dateInput.tsx:40` stores `day.toString()` (`Date.toString()`), other paths store ISO (`invoiceTermsForm.tsx:22` → `toISOString()`).
- **Acceptance criteria:** one canonical format (ISO 8601) everywhere; migration tolerates legacy `Date.toString()` values on read; tests for both inputs; no `Invalid time value` exceptions for garbage input.
- **Verification:** unit tests.

### `STR-003` — Storage quota handling
- **Status** `OPEN` · **Priority** P2
- **Evidence:** logos are stored as base64 in `localStorage`; no `QuotaExceededError` handling anywhere; `localData.set()` silently swallows failures.
- **Acceptance criteria:** oversized/unwritable data produces a user-visible message rather than silent loss; import of a large backup is validated before write; tests simulate a throwing storage.
- **Verification:** unit tests with a throwing mock.

### `MNT-001` — Replace `alert()` dialogs
- **Status** `OPEN` · **Priority** P2
- **Evidence:** `BusinessProfilePanel.tsx:56-57` uses `alert()`.
- **Acceptance criteria:** no `alert(`/`confirm(` in `app/` or `components/`; success/failure surfaced through the existing toast pattern; behaviour covered by a test.
- **Verification:** grep + test.

### `MNT-002` — Remove confirmed dead code
- **Status** `OPEN` · **Priority** P2
- **Evidence (re-verified, excluding route-convention files):** `lib/analytics.ts`, `components/ui/select.tsx`, `app/component/ui/mobilePreviewSheet.tsx`, `app/component/form/step/fromSteps.tsx`, and transitively `app/component/ui/stepButton.tsx` are unreferenced. `clearAllData` is dead (superseded by `WF-001`). `lib/analytics.ts` is a disabled stub.
- **Acceptance criteria:** each file removed **or** documented as intentionally retained; `npm run build` and tests pass; no feature loss; removal list recorded in the log.
- **Verification:** grep + build.

### `MNT-003` — Remove unused `firebase`
- **Status** `OPEN` · **Priority** P1 · **Depends on** D5
- **Evidence:** 0 imports of `firebase`/`@firebase` anywhere; `android/app/google-services.json` absent so `android/app/build.gradle` skips the google-services plugin → no Firebase on Android; package carries several HIGH advisories.
- **Acceptance criteria:** dependency removed; `npm audit` delta shows the Firebase-family advisories gone; Android build unaffected; no code references remain.
- **Verification:** `npm audit` + `npm run build` (+ Android build if available).

### `TEST-003` — Playwright end-to-end smoke
- **Status** `OPEN` · **Priority** P2 · **Depends on** `TEST-001`, `WF-001`, `WF-004`
- **Acceptance criteria:** scripted flow against the production build: load `/`, navigate to `/new`, fill an invoice, assert preview totals, select a template and reload, download PDF, verify history entry, duplicate, reset; runs headless in CI; passing run recorded.
- **Verification:** `npm run test:e2e` exit 0.

### `TEST-004` — Clear all lint warnings
- **Status** `OPEN` · **Priority** P2
- **Evidence:** 3 warnings — missing `alt` in `companyDetailsPdf.tsx:33` and `yourDetailsPdf.tsx:33`; `react-hooks/exhaustive-deps` in `SeoNativeAd.tsx:39`.
- **Acceptance criteria:** `npm run lint` exits 0 with **0** warnings; any unavoidable warning documented as a waiver with reason.
- **Verification:** `npm run lint`.

### `SEO-003` — Fix misleading UI copy
- **Status** `OPEN` · **Priority** P3
- **Evidence:** `currencyInput.tsx:55` renders `No framework found.` (shadcn placeholder) for an empty currency search.
- **Acceptance criteria:** copy describes the domain; no placeholder text from examples remains; UI test asserts the empty-search message.
- **Verification:** test + manual check.

### `A11Y-002` — Full accessibility pass
- **Status** `OPEN` · **Priority** P2 · **Depends on** `A11Y-001`
- **Acceptance criteria:** axe scan across `/`, `/new`, `/download`, and one SEO route at desktop + mobile widths reports 0 critical/serious; visible focus states; colour contrast ≥ 4.5:1 for body text; report archived in the log.
- **Verification:** axe report.

### `SEC-004` — Verify & tighten CSP on deployed site
- **Status** `BLOCKED` (needs D4) · **Priority** P2 · **Depends on** `SEC-002`, `DPL-001`
- **Evidence:** current declared CSP allows `script-src 'self' 'unsafe-inline' 'unsafe-eval'`, which substantially weakens it; and it is not delivered at all today.
- **Acceptance criteria:** CSP present at the boundary; `'unsafe-eval'` removed if the app functions without it; each third-party origin justified (AdSense, GA); page loads with zero CSP violations in console for the main flows.
- **Verification:** live header capture + browser console during e2e.

### `SEC-005` — Restrict / rotate exposed Firebase API key
- **Status** `BLOCKED` (owner action) · **Priority** P1 · **Depends on** D5, `SEC-001`
- **Evidence:** key is readable in a **public** repository. Note: Firebase Android API keys are designed to be public identifiers, but must carry **application restrictions** (Android package + SHA-1) and API restrictions; neither is verifiable from the repository.
- **Required outcome:** exposure assessed and mitigated by the account owner.
- **Acceptance criteria:** owner confirms key restrictions applied (or a documented `WONT_FIX` with reasoning, e.g. Firebase project unused and slated for deletion); evidence recorded **without printing the key**.
- **Verification:** owner-provided confirmation in `DEVELOPMENT_LOG.md`.

### `SEC-006` — Android build & native workflow verification
- **Status** `BLOCKED` (needs Android SDK/Gradle environment) · **Priority** P1 · **Depends on** `DEP-002`
- **Evidence:** `build:apk` / `build:apk-dev` scripts exist; never executed in this environment. Native plugins (file save, share, ads) untested.
- **Acceptance criteria:** `./gradlew assembleRelease` succeeds, APK installs, core flow (create → download → share → ad timeout path) works on a device/emulator; **or** the task stays `BLOCKED` with the missing prerequisite stated.
- **Verification:** Gradle output + device log.

### `DPL-002` — Deployment & release verification checklist
- **Status** `BLOCKED` (needs D4) · **Priority** P2 · **Depends on** `DPL-001`, `SEC-002`, `SEC-004`
- **Acceptance criteria:** executed checklist recorded in the log covering: URL reachability, header assertions, core routes, `robots.txt`/`sitemap.xml`, HTTPS, cache headers for `_next/static`, 404 handling, and a mobile-viewport smoke.
- **Verification:** scripted `curl` suite output.

---

## Phase D — Product expansion (proposed, gated on D6)

| ID | Title | Priority | Status |
|---|---|---|---|
| `PROD-001` | Invoice status: draft / sent / paid / overdue | P3 | `OPEN` (scope TBD) |
| `PROD-002` | Dashboard statistics | P3 | `OPEN` (scope TBD) |
| `PROD-003` | Cloud backup | P3 | `OPEN` (scope TBD) |
| `PROD-004` | Localization (i18n) | P3 | `OPEN` (scope TBD) |
| `PROD-005` | Recurring invoices | P3 | `OPEN` (scope TBD) |
| `PROD-006` | Advanced tax (VAT/GST regimes, reverse charge) | P3 | `OPEN` (scope TBD) |

None may start before the Phase C gate passes. Each needs an approved acceptance-criteria write-up before it moves to `IN_PROGRESS`.

---

## `WONT_FIX` log

No entries. Any `WONT_FIX` must record: task ID, date, reason, and the residual risk accepted.
