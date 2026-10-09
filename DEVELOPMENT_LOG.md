# Development Log

Chronological record of implementation, verification, and decisions.
Newest entry at the bottom of each section. Keep entries short — detail belongs in [`TASKS.md`](./TASKS.md).

---

## 2026-10-09 — Stage One: Baseline established

**Environment:** Node v22.23.1, npm 10.9.8, Linux, working dir `/home/abdullah/3-Projects/invoice-generator`.

### Git state
```
branch: main | status: clean | stash: none
HEAD: 056416a "Add image assets documentation and rebuild APK"
origin/main: 0 0 (in sync, no unpushed commits)
remote: git@github.com:abdullah2k05/invoice-generator.git (public)
tracked files: 442
```
No uncommitted work existed; nothing was overwritten or discarded.

### Commands run and results

| Command | Exit | Notes |
|---|---:|---|
| `npx tsc --noEmit` | 0 | no errors |
| `npm run lint` | 0 | 3 warnings; `⚠ headers will not work with output: export` |
| `npm run build` | 0 | 56/56 static pages; `⚠ headers are not applied when exporting` |
| `npm audit --registry=https://registry.npmjs.org` | — | 27 vulns: **2 critical, 20 high, 5 moderate** |
| test discovery | — | 0 test files, no `test` script, no `.github/` |

Lint warnings (baseline, unchanged):
- `app/component/form/companyDetails/companyDetailsPdf.tsx:33:25` jsx-a11y/alt-text
- `app/component/form/yourDetails/yourDetailsPdf.tsx:33:22` jsx-a11y/alt-text
- `components/SeoNativeAd.tsx:39:6` react-hooks/exhaustive-deps

### Baseline defect reproduction

Executed the **exact production formulas** from `invoiceDetailsPreview.tsx` / `invoiceDetailsPdf.tsx` and `downloadUtils.tsx` in Node:

| Scenario | Preview | History | Verdict |
|---|---|---|---|
| items `1.1 + 2.2` | `3.3000000000000003` | `3.30` | float artifact confirmed |
| discount `abc` | `NaN` | `NaN` | unvalidated input confirmed |
| subtotal 100, discount 500, tax 10% | `-440` | `-440.00` | negative total confirmed |
| subtotal `5255.775` | `5,255.775` | `5255.78` | surfaces disagree confirmed |
| tax 7.5% on `100.005` | row `7.50`, total `107.505375` | — | rows don't reconcile (**new**) |

### Static revalidation (all confirmed against `056416a`)
- `google-services.json` tracked; added `708e428` (2026-07-13); `.gitignore` entry added later in `67abb5a` (2026-09-05) → does not untrack. Repo is public.
- No `vercel.json` in tree or history → declared security headers never delivered.
- `handleReset` → `clearFormOnly()` only; `clearAllData()` (with reload) dead.
- `defaultValues: { invoiceTemplate: "stripe" }`; storage never read → persistence broken.
- `INV-{invoiceNumber || "001"}` at `InvoiceTermsPdf.tsx:33,62`, `InvoiceTermsPreview.tsx:58,140`.
- Counter incremented at `invoiceTermsForm.tsx:50,65` **and** `downloadUtils.tsx:162`.
- `downloadAndShare` returns `false` on failure; `shareInvoiceButton.tsx` never checks it.
- `RecentInvoices` `formatCurrency` covers 6 of 16 currencies; `SavedProductsPanel.tsx:72` hard-codes `$`.
- Font cmap: `Geist-{Regular,Medium,Bold}.ttf` lack U+20A8 ₨, U+20A9 ₩, U+20AB ₫; cover `$ € £ ₹ ¥ ₽`.
- `lib/seo-pages.ts:44-83` claims Word/Excel/Google formats; `:383` claims CAD/AUD (absent from `lib/currency.tsx`); 4 false routes present in `out/sitemap.xml`.
- 34 raw `localStorage.setItem` calls outside `lib/storage.ts`.
- `/new` a11y: 0 `<h1>`, 22/84 unlabeled inputs, 3 unnamed buttons.
- Deployment: `invoice-generator-abdullah2k05.vercel.app` → 302 Vercel SSO; `invoice-generator.mabdullah.top` → 404 `DEPLOYMENT_NOT_FOUND`.
- Unused deps (0 source refs): `firebase`, `jspdf`, `html2canvas`, `canvg`. `tailwindcss-animate` **is** used (`tailwind.config.ts`) — not dead.

### Corrections to the previous audit
1. `next` critical advisories target **server-side** features (Image Optimizer, Server Actions, middleware, RSC cache, request smuggling) that do not exist under `output: "export"` — raw count overstates deployment risk. See decision **D3**.
2. Route-convention files (`layout.tsx`, `page.tsx`, `robots.ts`, `sitemap.ts`, `not-found.tsx`) are **not** dead code.
3. `downloadInvoiceButton` correctly checks the boolean result; only the share button does not.
4. `tailwindcss-animate` is referenced in config and is not unused.

### Dependency facts recorded for planning
- `next@14.2.35` is the newest 14.x (`next-14` dist-tag).
- `next@15.5.27` (`backport` tag) peer-deps allow `react ^18.2.0` → compatible with installed `react@18.3.1`; `eslint-config-next@15.5.27` exists; all reported `next` advisories have ranges `<15.5.24`.
- `next@16.4.0` is `latest` (would require React 19).
- `@capacitor/android@8.4.3` available and fixes GHSA-rvm3-566m-v7fv (CVSS 9.3) affecting installed 8.4.1.

### Outcome
Stage One complete. No application code modified. Created `DEVELOPMENT_PLAN.md` and `TASKS.md`.

### Plan normalization
While writing the registry, `MNT-004` ("Replace placeholder UI copy") was found to duplicate `SEO-003` ("Fix misleading UI copy") — same defect, same file (`currencyInput.tsx:55`). `MNT-004` was removed before the plan was published; **no task was ever started or closed**. Final inventory: **50 tasks** (A 15, B 14, C 15, D 6; 44 `OPEN`, 6 `BLOCKED`, 0 started).

**Status: awaiting product-owner approval of the plan (decisions D1–D6, especially D4).**

---

## 2026-10-10 — Phase A: test infra + financial correctness batch (`TEST-001`, `CALC-001..006`, `VAL-002`)

**Approval:** plan approved without row comments → defaults taken per §6: D1=(b) per-currency minor units, D2=(c) block save, D5=(a) untrack+delete, D6=defer. D4 still unanswered (blocks `SEC-002`, `DPL-001`).

### What changed
- **`TEST-001`:** installed Vitest 5 + RTL + jsdom (`package.json` scripts `test`/`test:watch`); created `vitest.config.mts`, `vitest.setup.ts`, `tests/infra.test.ts`. `@types/node` `^20`→`^22.20.5` to satisfy vitest peer range. Config renamed `.ts`→`.mts` (ESM warning) and `__dirname`→`import.meta.dirname`.
- **`CALC-001`/`CALC-004`/`VAL-002`:** created `lib/money.ts` — BigInt integer minor units, half-away-from-zero, per-currency `minorUnitDigits` (added to all 16 entries in `lib/currency.tsx`; JPY/KRW/VND/IDR → 0), `computeInvoiceTotals` returning `{valid, reason, subtotal/discount/taxable/tax/totalMinor, lines}` with clamping so totals can never be negative and malformed inputs never produce `NaN`. Added `"target": "ES2020"` to `tsconfig.json` (required for BigInt literals; no behavioural change for the app).
- **`CALC-002`/`CALC-003`/`CALC-005`:** rewired `invoiceDetailsPreview.tsx`, `invoiceDetailsPdf.tsx`, `downloadUtils.tsx` (`saveHistory`), `RecentInvoices.tsx` to the module; deleted both copies of `calculateTotalAmount`/`addCommasToNumber`, the `Math.round(x*100)/100` total, and the 6-symbol `formatCurrency` map.
- **`CALC-006`:** form now stores `undefined` (not `0`) for cleared qty/price on desktop and mobile (`invoiceDetailsForm.tsx`); `getInitialValue.ts:getItems` normalises legacy `qty === 0 → undefined` so historical blanks keep billing one unit; preview/PDF render typed `0` as `0.00` instead of an empty cell.
- **`VAL-002` save guard (D2):** `saveHistory` computes via the module and refuses to persist when `totals.valid === false` (invalid discount/tax/amount, discount > subtotal, negative lines); stored total is `minorToNumber(totalMinor, digits)` — always finite. `saveHistory` exported for testability.

### Bugs found & fixed during implementation
1. Negative tax **rate** was flagged but still applied to the math (fuzz case `amount -50 / rate -5` → total `-4750`); rates and negative line amounts are now clamped to 0 before computation and flagged invalid.
2. Test-expectation error caught by review: `10.01 @ 7.5% = 0.75075 → 0.75` (module was correct; added a true half-cent case `0.10 @ 5% → 0.01`).

### Commands executed
| Command | Exit | Result |
|---|---:|---|
| `npx tsc --noEmit` | 0 | clean after each edit round |
| `npm test` | 0 | **87 passed** (4 files: infra, money, legacyItems, saveHistory) |
| `npm run lint` | 0 | 3 warnings — unchanged baseline |
| `npm run build` | 0 | static export intact |
| `grep -rn "const calculateTotalAmount\|const addCommasToNumber" app/ lib/` | 1 | 0 matches ✓ |

### Acceptance criteria met
- `CALC-001`: module + 87-test suite; `1.1 + 2.2 → 3.30`, baseline repros all green. (AC1 API names amended in `TASKS.md` to the shipped exports.)
- `CALC-002`: 13-input table asserts preview === PDF === history strings (incl. `5255.775` baseline).
- `CALC-003`: 12 discount/tax combos assert rows sum to total; true half-cent rounding case.
- `CALC-004`: ≥4 currencies of both kinds covered.
- `CALC-005`: grep 0 in `app/`.
- `CALC-006`: qty/amount `0`, `""`, `undefined`, string `"3"` unit-tested; no silent `0 → 1`.
- `VAL-002`: fuzz table never negative/non-finite + **storage-write assertion** (`saveHistory` test: writes once with finite `110`, never writes on `abc`/`500>100`/negative).
- `TEST-001`: `npm test` green.

### Follow-ups / limitations
- Legacy stored `amount: 0` (old blank) now displays as `0.00` instead of an empty cell — cosmetic, totals unchanged, aligned with CALC-006 intent.
- `SavedProductsPanel.tsx:72` still hard-codes `p.price.toFixed(2)` — product list, not invoice money; left out of CALC scope.
- Negative line amounts are treated as invalid (flag + clamp) rather than credits — matches VAL-002 "never negative amount due"; revisit only if credit notes become a requirement.
- `grep` still shows 27 audit vulns (fixes start with `DEP-002` in this phase).

### Next task
`VAL-001` (numeric mode on `CustomNumberInput` for discount/tax), then `WF-001`, `SEC-001`, `DEP-002`, `TEST-002`.

---

## 2026-10-10 — Phase A: `VAL-001` + `WF-001`

### What changed
- **`VAL-001`:** `CustomNumberInput` gained an optional `numeric` prop that rejects any value failing `isAcceptableNumericInput` (invalid keystrokes/pastes never propagate — previous valid value is kept). Discount and Taxes pass `numeric`; zip fields stay permissive (loose mode covered by test). All four qty/price onChange guards in `invoiceDetailsForm.tsx` now use `isAcceptableNumericInput` instead of the raw regex — the old check accepted a lone `"."`, and `+"."` produced `NaN`.
- **`WF-001`:** extracted reset logic to `lib/resetInvoiceForm.ts` (`INVOICE_STORAGE_KEYS`, `INVOICE_FORM_DEFAULTS`, `resetInvoiceStorage`, `resetInvoiceForm`). `NewInvoiceForm.handleReset` now clears storage **and** calls `methods.reset(...)` so RHF state and the preview (via `watch`) clear together, and restores UI state (`openSection`, `mobileMode`). Dead `clearAllData` (never called, did `window.location.reload()`) **removed** per acceptance ("used or removed").

### Bugs / traps found
1. **Test-authoring trap (documented for future tests):** `useGetValue`/`useFormContext` must be called from a component *inside* `<FormProvider>` — a component that itself renders the provider sees `ctx === null` and returns `""` forever. The first harness called it in the provider component and appeared to show "reset broken"; the app itself is unaffected (preview is always a child subtree).
2. A lone `"."` in qty/price previously became `NaN` via `+inputValue`; rejected now.

### Commands executed
| Command | Exit | Result |
|---|---:|---|
| `npm test` | 0 | **104 passed** (6 files; +`customNumberInput`, `resetForm`) |
| `npx tsc --noEmit` | 0 | clean |
| `npm run lint` | 0 | 3 warnings — unchanged baseline |
| `npm run build` | 0 | static export intact |

### Acceptance criteria met
- `VAL-001`: component tests cover `abc`, `1.2.3` (second dot blocked), `-`, ``, `0`, `1e5`, very large (24-digit), pasted `1,000`/`$5` rejected, pasted decimals accepted; empty → `""` (module treats as 0); loose mode preserves zip behaviour.
- `WF-001`: jsdom/RTL test proves one Reset action → inputs empty, preview empty, invoice keys removed, `step=1`, history untouched, form re-usable afterwards; source assertion proves `clearAllData`/`window.location.reload` are gone. **Manual browser check still pending** (documented limitation per task note until Playwright in Phase C).

### Follow-ups / limitations
- Manual browser verification of Reset (visual) deferred to `TEST-003` Playwright smoke (Phase C), as allowed by the task's verification note.

### Next task
`SEC-001` (untrack `google-services.json` — staging only until a commit is approved), then `DEP-002`, `TEST-002`.

---

## 2026-10-10 — Phase A: `DEP-002`

### What changed
- Upgraded `@capacitor/android`, `@capacitor/core`, `@capacitor/cli` from `8.4.1` → `8.4.3` (advisory `GHSA-rvm3-566m-v7fv`, CVSS 9.3, range `>=8.3.5 <8.4.3`). Lockfile updated; other `@capacitor/*` plugins unchanged (all `>=8.0.0` peer satisfied by `core@8.4.3`).

### Commands executed
| Command | Exit | Result |
|---|---:|---|
| `npm install @capacitor/android@8.4.3 @capacitor/core@8.4.3 @capacitor/cli@8.4.3` | 0 | all three at 8.4.3, deduped |
| `npm audit --registry=…` | 1 | **27 → 24** vulns (critical 2 → 1, high 20 → 18, moderate 5); `@capacitor/android` no longer listed; remaining critical = `next` (Phase B `DEC-001`, server-only) |
| `npm run build` | 0 | static export intact |
| `npx cap sync android` | 0 | 7 plugins updated, sync finished; no tracked `android/` files dirtied |
| `npm test` / `npx tsc --noEmit` / `npm run lint` | 0 | 104 passed; clean; 3 baseline warnings |

### Acceptance criteria met
- ✅ `@capacitor/android` (with matching `core`/`cli`) at `8.4.3`
- ✅ `npm run build` and `npx cap sync` still work
- ✅ audit no longer lists this advisory
- ✅ Capacitor plugins keep loading (sync reports all 7)

### Follow-ups / limitations
- Android *build* (`./gradlew assembleRelease`) not run — no SDK in this environment (same limitation as `SEC-006`); `cap sync` is the available verification. Re-run when an Android environment exists.
- Remaining `next` criticals accepted as risk until `DEC-001` (Phase B).

### Next task
`TEST-002` (CI), then `SEC-001` (needs commit approval).

---

## 2026-10-10 — Phase A: `SEC-001`, `TEST-002`, `SEC-002` config, **D4 decided**

### Decisions
- **D4 = Vercel, option (b):** the agent produces config + exact deploy commands; the owner deploys and binds `invoice-generator.mabdullah.top`. Chosen because an existing (SSO-protected) Vercel project was probed in the audit. Netlify remains a documented fallback.

### What changed
- **`SEC-001`:** `git rm google-services.json` (untracked **and** deleted per D5=(a); `firebase` never imported, google-services plugin never applied). `.gitignore:47` entry retained. Commit `9e7410c`.
- **`TEST-002`:** `.github/workflows/ci.yml` (`006f988`) — on push/PR to `main`: `npm ci` → `tsc --noEmit` → `npm run lint` → `npm test` → `npm run build` (Node 22, npm cache). Required status check **`Static gate (typecheck, lint, test, build)`** enabled on `main` via API (`strict:false`, `enforce_admins:false` so owner direct pushes bypass).
- **`SEC-002` (config part):** `vercel.json` (`41d38f4`) ports the inert `next.config.js` headers to the hosting boundary: CSP, HSTS (63072000, includeSubDomains, preload), XFO DENY, XCTO nosniff, Referrer-Policy, Permissions-Policy on `/(.*)` + immutable cache for `/_next/static` and font/image extensions. **Live-response evidence still pending deploy.**

### Commits pushed (this batch, in order)
| SHA | Message |
|---|---|
| `0e24f23` | test: add vitest + RTL harness; bump capacitor to 8.4.3 (TEST-001, DEP-002) |
| `cdcd7a4` | feat(money): BigInt minor-unit module; rewire invoice maths and validation (CALC-001..006, VAL-001..002) |
| `1305805` | fix(reset): single reset path via lib/resetInvoiceForm, remove dead clearAllData (WF-001) |
| `9e7410c` | chore(security): stop tracking google-services.json (SEC-001) |
| `006f988` | ci: static gate workflow - typecheck, lint, test, build (TEST-002) |
| `41d38f4` | fix(security): define security headers at Vercel boundary (SEC-002 config) |

(First attempt bundled the `git rm` staging into the deps commit; since nothing had been pushed, the two local commits were reset and re-created cleanly before pushing. No published history was rewritten.)

### Commands executed / results
| Command | Exit | Result |
|---|---:|---|
| `git push origin main` | 0 | `056416a..41d38f4` pushed to public repo |
| `gh run watch 37980800914` | 0 | **GREEN** — Typecheck ✓ Lint ✓ Test ✓ Production build ✓ |
| `gh api PUT .../branches/main/protection` | 0 | required check enabled (admin bypass off for protection) |
| local gate pre-push | 0 | 104 tests / tsc clean / lint 3 baseline warnings / build green |

### Acceptance criteria met
- **SEC-001:** ✅1 `git ls-files \| grep google-services` empty · ✅2 `.gitignore` retained, status clean after commit · ✅3 commit message path-only, no secret values · ✅4 history impact documented — blob still in history (added `708e428`); **history rewrite remains out of scope, pending separate approval**.
- **TEST-002:** ✅ workflow runs typecheck+lint+test+build · ✅ required check enabled on `main` · ✅ file committed · ✅ green run observed — <https://github.com/abdullah2k05/invoice-generator/actions/runs/37980800914>.
- **SEC-002:** config only — AC explicitly requires live `curl -sI`; pending `DPL-001` deploy.

### Follow-ups / limitations
- **Owner action needed (D4=(b)):** deploy to Vercel and bind the custom domain; exact commands: `npx vercel --prod` (or import the GitHub repo in the Vercel dashboard — build command `next build`, output `out/`), then attach `invoice-generator.mabdullah.top`.
- After deploy: capture `curl -sI` evidence for `SEC-002` and the route table (`/`, `/new`, `/download`, `/invoice-template`, `/robots.txt`, `/sitemap.xml`) for `DPL-001`.
- CI annotations note `actions/*@v4` Node-20 deprecation and `ubuntu-latest` → 26.10 migration notice (non-blocking; revisit when pinning runners).
- Key restriction/rotation (`SEC-005`) remains an owner-only task in Google Cloud Console.

### Next task
Owner deploy → agent collects `SEC-002`/`DPL-001` live evidence; Phase A gate evaluation.

---

## Log template for future entries

```
### <date> — <TASK-ID or phase>
What changed:
Why:
Files affected:
Commands executed:
Observed results:
Acceptance criteria met / not met:
Follow-ups / limitations:
Next task:
```
