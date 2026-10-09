# Development Plan — Invoice Maker

**Owner:** senior engineering (agent-led) under product-owner approval
**Created:** 2026-10-09
**Baseline commit:** `056416a` ("Add image assets documentation and rebuild APK")
**Status:** PLAN — awaiting product-owner approval before any application-code change

> Single source of truth for **task status** is [`TASKS.md`](./TASKS.md).
> Single source of truth for **chronological work history** is [`DEVELOPMENT_LOG.md`](./DEVELOPMENT_LOG.md).
> This document holds: baseline, architecture decisions, phase boundaries, dependencies, release criteria, progress rollup, and decisions pending approval.

---

## 1. Current State (Baseline — verified 2026-10-09)

### 1.1 Repository

| Item | Value |
|---|---|
| Remote | `git@github.com:abdullah2k05/invoice-generator.git` (**public**) |
| Branch / tree | `main`, **clean**, no stashes, `0 0` vs `origin/main` |
| HEAD | `056416a` (2026-09-05) |
| Tracked files | 442 · ~9,100 LOC TS/TSX/JS + 559 LOC Java |
| Node / npm | v22.23.1 / 10.9.8 |

No uncommitted work exists. **No baseline work was overwritten.**

### 1.2 Commands executed (baseline evidence)

| Command | Exit | Result |
|---|---:|---|
| `npx tsc --noEmit` | **0** | No errors |
| `npm run lint` | **0** | 3 warnings — `companyDetailsPdf.tsx:33:25` (alt), `yourDetailsPdf.tsx:33:22` (alt), `SeoNativeAd.tsx:39:6` (exhaustive-deps); plus `⚠ Specified "headers" will not automatically work with "output: export"` |
| `npm run build` | **0** | 56/56 static pages; `⚠ rewrites, redirects, and headers are not applied when exporting your application, detected (headers)` |
| `npm audit --registry=https://registry.npmjs.org` | — | **27 vulnerabilities (2 critical, 20 high, 5 moderate)** |
| Test discovery (`*.test.*`, `*.spec.*`, `__tests__`) | — | **0 files**; no `test` script; **no `.github/`** |
| `curl` both production URLs | — | `invoice-generator-abdullah2k05.vercel.app` → **302 Vercel SSO**; `invoice-generator.mabdullah.top` → **404 DEPLOYMENT_NOT_FOUND** |

Baseline is recorded in `DEVELOPMENT_LOG.md` §Baseline.

### 1.3 Architecture (as found — to be preserved)

- Next.js App Router with `output: "export"` → fully static, **no server runtime**.
- Domain-shaped components: `Form` / `Preview` / `PDF` triples per invoice section.
- `react-hook-form` + `Controller`; values mirrored into `localStorage` on change.
- Two persistence layers: raw `localStorage` (34 direct `setItem` calls, form fields) vs `lib/storage.ts` (Capacitor `Preferences` on native, used only by `lib/localData.ts`).
- PDF via `@react-pdf/renderer`; fonts registered from `/public/font/Geist-*.ttf`.
- Capacitor 8 Android shell (`webDir: "out"`), custom native plugins (file save, ads, share).
- SEO content generated from `lib/seo-pages.ts` through the `[...slug]` catch-all.

### 1.4 Revalidation verdict — old audit vs current code

Every finding below was **re-derived from current source at `056416a`**, not copied from prior audit documents. Numerical defects were **reproduced by executing the exact production formulas** in Node.

| Old claim | Revalidated? | Current verdict |
|---|---|---|
| Float artifacts in totals | Yes — reproduced | `1.1 + 2.2 → 3.3000000000000003` in preview |
| `NaN` on non-numeric discount | Yes — reproduced | `Amount Due NaN` |
| Negative totals allowed | Yes — reproduced | subtotal 100, discount 500, tax 10% → `-440` |
| Preview ≠ history amounts | Yes — reproduced | `5,255.775` vs `5255.78` for one invoice |
| Tax row vs total don't reconcile | **New finding** | Tax row uses `.toFixed(2)`, total does not |
| Reset broken | Yes — code-confirmed | `handleReset → clearFormOnly()` only; `clearAllData()` (which reloads) is dead code |
| Template not persisted | Yes — code-confirmed | `defaultValues: { invoiceTemplate: "stripe" }`; storage never read |
| `INV-INV-042` double prefix | Yes — 4 sites | `InvoiceTermsPdf.tsx:33,62`, `InvoiceTermsPreview.tsx:58,140` |
| Invoice numbers skip | Yes — code-confirmed | increments on generate **and** on save |
| Share reports false success | Yes — code-confirmed | `downloadAndShare` returns `false`; caller never checks it |
| Tracked Firebase config | Yes | still tracked (`git ls-files`), added `708e428`, `.gitignore` entry came later (`67abb5a`) |
| Security headers inert | Yes | verbatim Next build warning; **no `vercel.json`** anywhere (also none in git history) |
| 27 vulns / 2 critical | Yes | `next` (14.2.35) and `@capacitor/android` (8.4.1, range `<8.4.3`) |
| Deployment URLs dead | Yes | re-probed 2026-10-09, both still not serving the app |
| False SEO format claims | Yes | `lib/seo-pages.ts:44–83`, 4 routes present in `out/sitemap.xml` |
| FAQ claims CAD/AUD | Yes | `seo-pages.ts:383`; `lib/currency.tsx` has **neither** |
| Missing PDF glyphs ₨ ₩ ₫ | Yes | `fontTools` cmap: absent from all 3 Geist fonts used |
| No tests / no CI | Yes | confirmed empty |

**Findings the old audit got wrong or overstated (corrected here):**

1. `npm audit` "criticals affect the product" needs qualification — nearly all `next` advisories target server features (Image Optimizer, Server Actions, middleware, RSC cache) that **do not exist in a static export**. Severity for *this deployment* is materially lower than the raw count implies. See decision **D3**.
2. Several files previously flagged as dead are route-convention files (`layout.tsx`, `robots.ts`, `sitemap.ts`, `page.tsx`) — **not dead code**.
3. `tailwindcss-animate` was flagged as unused; it **is** referenced in `tailwind.config.ts`. Not dead.
4. `downloadInvoiceButton` correctly checks the boolean result — only the **share** button does not.

---

## 2. Verified Issue Inventory (index)

Full detail, acceptance criteria and evidence live in **[`TASKS.md`](./TASKS.md)**. IDs are stable.

| Domain | IDs | Phase | Count |
|---|---|---|---:|
| Financial calculation | `CALC-001` … `CALC-006` | A | 6 |
| Input validation | `VAL-001`, `VAL-002` | A | 2 |
| Security | `SEC-001` … `SEC-006` | A / B / C | 6 |
| Dependencies | `DEP-001` … `DEP-003`, `MNT-003` | A / B | 4 |
| Core workflow | `WF-001` … `WF-006` | A / B | 6 |
| PDF & print | `PDF-001` … `PDF-004` | B / C | 4 |
| Persistence | `STR-001` … `STR-003` | B / C | 3 |
| Content / SEO | `SEO-001` … `SEO-003` | B / C | 3 |
| Accessibility | `A11Y-001`, `A11Y-002` | B / C | 2 |
| Deployment | `DPL-001`, `DPL-002` | A / C | 2 |
| Testing / CI | `TEST-001` … `TEST-004` | A / C | 4 |
| Maintenance | `MNT-001`, `MNT-002` (`MNT-003` → B) | C | 2 |
| Product (Phase D) | `PROD-001` … `PROD-006` | D (proposed) | 6 |
| **Total** | | | **50** |

Severity mapping: **P0** = release-blocking financial/security/data-loss · **P1** = broken core workflow or essential production requirement · **P2** = quality/accessibility/maintainability · **P3** = optional.

---

## 3. Architecture Decisions

These decisions constrain implementation. Changing one requires updating this section with evidence.

### AD-1 — Introduce one shared money module (`lib/money.ts`)
All four current money implementations (preview, PDF, `saveHistory`, `RecentInvoices`) collapse into a single module. Components may render differently but must not re-derive arithmetic.

Rationale: `CALC-006` root cause. Four divergent copies are what produced preview/history disagreement.

### AD-2 — Keep `output: "export"` and the static architecture
No server, no backend, no auth, no cloud sync. Header delivery moves to the hosting platform (`vercel.json`) rather than changing the render mode.

### AD-3 — Persistence: one adapter, two backends
`lib/storage.ts` is the only permitted storage API. Raw `localStorage.*` outside that file becomes a lint-detectable violation. Web stays `localStorage`, native stays Capacitor `Preferences`.

### AD-4 — Minimal-diff fixes; no component rewrites
Fix the defect in place. Replacing a working implementation for stylistic reasons is out of scope.

### AD-5 — Test stack
- **Vitest** + **jsdom** + **@testing-library/react** for unit/integration (fast, TS-native, no Next-specific runner needed).
- **Playwright** for a browser smoke path (create → preview → PDF → history → reset).
- Rationale: project has no test infrastructure; these are the least invasive additions compatible with Next 14 and React 18. Revisit if `TEST-001` proves incompatible.

### AD-6 — Rounding policy (pending approval, see D1)
Store and compute money in **integer minor units**, round **half away from zero** at defined boundaries, and expose **per-currency minor-unit digits** (`currency.tsx`) instead of hard-coding 2 decimals. See decision **D1**.

### AD-7 — No new product features until Phase A gate passes
Phase D is explicitly deferred.

---

## 4. Phase Plan, Boundaries & Dependencies

```
Phase A ──needs──> Phase B ──needs──> Phase C ──needs──> (release gate) ──> Phase D
  │                   │                   │
  └ financial         └ workflow           └ reliability
    correctness         + hardening          + verification
```

### Phase A — Release blockers & financial correctness
*Gate to Phase B.*

| | |
|---|---|
| **Goal** | Invoice numbers are arithmetically correct and consistent across preview, PDF and history; no NaN/negative output; secret no longer tracked; headers effective at hosting boundary; a reachable deployment; Reset works; tests + CI exist to prevent regression. |
| **Tasks** | `CALC-001..006`, `VAL-001..002`, `SEC-001`, `SEC-002`, `DEP-002`, `WF-001`, `DPL-001`, `TEST-001`, `TEST-002` — **15 tasks** |
| **Depends on** | Decisions D1, D2, D4, D5 (see §6) |
| **Exit criteria** | See §5 Phase A gate |

### Phase B — Core workflow correctness & security hardening
*Depends on Phase A gate.*

| | |
|---|---|
| **Goal** | Numbering, template persistence, share correctness, currency/glyph coverage, one storage path, dependency remediation, truthful content, baseline a11y. |
| **Tasks** | `WF-002..006`, `PDF-001`, `STR-001`, `DEP-001`, `DEP-003`, `MNT-003`, `SEO-001..002`, `A11Y-001`, `SEC-003` — **14 tasks** |
| **Depends on** | Decision D3 (Next upgrade) |
| **Exit criteria** | See §5 Phase B gate |

### Phase C — Reliability, quality & release verification
*Depends on Phase B gate.*

| | |
|---|---|
| **Goal** | Print/PDF polish, backup & quota safety, error handling, dead-code removal, regression coverage, browser/Android verification, final security + a11y + deployment review. |
| **Tasks** | `PDF-002..004`, `STR-002..003`, `MNT-001`, `MNT-002`, `TEST-003..004`, `SEO-003`, `A11Y-002`, `SEC-004..006`, `DPL-002` — **15 tasks** |
| **Depends on** | Phase B gate; Android build environment for `SEC-006`/Android verification |
| **Exit criteria** | See §5 Phase C gate → **Release readiness review** |

### Phase D — Product expansion (proposed, NOT committed)
Invoice status / paid / overdue, dashboard statistics, cloud backup, localization, recurring invoices, advanced tax. **Requires product-owner scope approval (D6).** Must not delay Phases A–C.

---

## 5. Release Criteria & Phase Gates

A phase is complete only when **all** of its criteria hold. Code changes alone do not close a phase.

### Phase A gate
- [ ] `CALC-001..006` accepted: preview, generated PDF, and history show **identical** amounts for the same invoice, under test.
- [ ] No reachable input produces `NaN`, `Infinity`, or a negative total.
- [ ] `SEC-001`: `google-services.json` untracked + gitignore-verified + **no new commits contain it**.
- [ ] `SEC-002`: deployed HTTP responses (not config files) carry the intended headers.
- [ ] `DPL-001`: intended public URL serves the app; `/`, `/new`, a template route, `robots.txt`, `sitemap.xml` all return 200 with expected content.
- [ ] `WF-001`: Reset clears form, preview, and persistent state in one action.
- [ ] `TEST-001`: money/validation regression suite exists and passes.
- [ ] `TEST-002`: CI runs typecheck + lint + tests + build on every push.
- [ ] `npx tsc --noEmit`, `npm run lint`, `npm test`, `npm run build` all exit 0.
- [ ] Diff reviewed; no unrelated changes.
- [ ] `DEVELOPMENT_LOG.md` and `TASKS.md` reflect reality.

### Phase B gate
- [ ] `WF-002..006` accepted: no `INV-INV-`, no skipped numbers, template survives reload, share reports failures truthfully, all 16 currencies format correctly in history.
- [ ] `PDF-001`: PKR/KRW/VND render correct currency glyphs in generated PDF.
- [ ] `STR-001`: no raw `localStorage.*` outside `lib/storage.ts`.
- [ ] `DEP-001..003` + `MNT-003`: unused deps removed; `@capacitor/android` ≥ 8.4.3; Next decision executed **or** risk formally accepted with evidence.
- [ ] `SEO-001..002`: no content claims formats/currencies the product lacks.
- [ ] `A11Y-001`: `/new` has an `h1`, every input has an accessible name, no unnamed buttons.
- [ ] Full check suite green; audit shows no unresolved **critical** without documented acceptance.

### Phase C gate → release readiness
- [ ] `PDF-002..004`, `STR-002..003`, `MNT-001`, `MNT-002`, `SEO-003`, `A11Y-002` accepted or explicitly excluded with reason.
- [ ] `TEST-003`: Playwright smoke passes against the production build.
- [ ] `TEST-004`: lint warnings reduced to 0 (or documented waivers).
- [ ] `SEC-004`: CSP verified **at the deployed boundary**, tightened where the platform allows.
- [ ] `SEC-005`: Firebase key restricted/rotated **by the account owner**, evidence recorded (or `WONT_FIX` with documented reason).
- [ ] `SEC-006` / Android verification: built where the environment permits, otherwise recorded **BLOCKED** with the missing prerequisite.
- [ ] Every remaining vulnerability is either resolved or listed with an accepted-risk note.
- [ ] Final review performed against §7 Definition of Production-Ready.

### Definition of Production-Ready (final)
Not asserted from a percentage or a green build. All of §7 in the final report must be evidenced.

---

## 6. Decisions Requiring Product-Owner Approval

**Nothing in application code changes until these are answered** (blocks `Phase A` start).

| ID | Decision | Options | Recommendation |
|---|---|---|---|
| **D1** | **Rounding / minor-unit policy** | (a) 2 decimals for every currency; (b) per-currency minor units (JPY/KRW/VND/IDR → 0 decimals), integer-cent math, half-away-from-zero | **(b)** — correct for the currencies we already advertise; document in `lib/money.ts` |
| **D2** | **Discount > subtotal** | (a) clamp to subtotal → total `0`; (b) allow negative and show it; (c) block save with validation error | **(a) or (c)** — a paid invoice must never be negative. (c) is stricter UX |
| **D3** | **Next.js `next` critical CVEs** | (a) upgrade `14.2.35 → 15.5.27` (React 18 peer-compatible, clears all current advisories); (b) stay on `14.2.35` with documented risk acceptance (server-side CVEs are not reachable on a static export); (c) jump to `16.4.0` (requires React 19) | **(a) in Phase B**, with (b) as the interim documented position in Phase A |
| **D4** | **Deployment target & who deploys** | Vercel project exists but is SSO-protected / not bound to the custom domain. Options: (a) you enable public deployment + provide/confirm domain binding; (b) I produce the artifact + exact config and you deploy; (c) different host | **DECIDED 2026-10-10: Vercel, option (b)** — agent produces `vercel.json` + exact deploy commands; owner deploys and binds `invoice-generator.mabdullah.top` (Netlify remains a fallback via an equivalent `netlify.toml`) |
| **D5** | **Firebase config file** | (a) untrack file **and** delete it (Firebase is unused — `firebase` never imported, google-services plugin never applied); (b) untrack only, keep the file locally; also decide whether to **restrict** the exposed API key in Google Cloud Console (owner-only action) | **(a)** + key restriction — the file is inert today |
| **D6** | **Phase D scope** | Defer entirely / pick a subset | **Defer** until Phase C gate passes |

Assumptions I will proceed under if you approve the plan without commenting on a row: **D1=(b), D2=(c), D3=(a), D5=(a)**, **D6=defer**. ~~D4 requires your explicit input~~ — **D4 answered 2026-10-10: Vercel, option (b)** (see §6).

---

## 7. Progress Rollup

Updated as tasks close. Source of truth for individual status: `TASKS.md`.

| Phase | Tasks | DONE | IN_PROGRESS | BLOCKED | OPEN | Gate |
|---|---:|---:|---:|---:|---:|---|
| A | 15 | 13 | 0 | 0 | 2 | not met (2 open: live-deploy evidence) |
| B | 14 | 0 | 0 | 0 | 14 | not met |
| C | 15 | 0 | 0 | 4 | 11 | not met |
| D | 6 | 0 | 0 | 0 | 6 | not started (pending D6) |
| **Total** | **50** | **13** | **0** | **4** | **33** | — |

Blocked now: `SEC-004`, `SEC-005`, `SEC-006`, `DPL-002` (Phase C; need owner action / Android environment). Phase A has **no blocked rows left** — `SEC-002` and `DPL-001` are OPEN awaiting the owner's Vercel deploy (D4=(b)).

**Current phase:** `A` (in progress — remaining: `SEC-002`, `DPL-001`, both pending owner deploy)
**Last completed task:** `TEST-002` (2026-10-10; batch: `TEST-001`, `CALC-001..006`, `VAL-001..002`, `WF-001`, `DEP-002`, `SEC-001`, `TEST-002`; D4 decided = Vercel (b))
**Active task:** — (code-side Phase A complete; waiting on owner deploy for `DPL-001` + `SEC-002` live evidence)
**Next command to run:** owner-side — `npx vercel --prod` from the repo root (or connect the GitHub repo in the Vercel dashboard), then bind the custom domain; agent then runs `curl -sI <url>` for `SEC-002`/`DPL-001` evidence.

---

## 8. Guardrails

- Never force-push or rewrite shared history; `google-services.json` stays in history until you explicitly approve history rewriting (separate, destructive decision).
- Never print secrets. The Firebase key is referenced by path and SHA only.
- No auth, backend, cloud sync, payments, or real user data.
- No feature work while a Phase A P0 remains open.
- `WONT_FIX` requires a written reason in `TASKS.md`.
- Update `TASKS.md` + `DEVELOPMENT_LOG.md` immediately after each verified task.
