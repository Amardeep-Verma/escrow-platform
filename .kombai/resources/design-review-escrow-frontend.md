# Design Review Results: Escrow Frontend

**Review Date**: 2026-03-08  
**Routes Reviewed**: `/login`, `/register`, `/dashboard`, `/admin`  
**Focus Areas**: Visual Design, UX/Usability, Accessibility, Code Quality, Performance, Consistency

---

## Summary

The frontend has a solid dark/glassmorphism foundation and the Admin panel looks notably polished. However, there are significant consistency gaps between pages (Login vs Register styling), UX regressions from using `alert()` / `window.location.reload()` everywhere, accessibility holes, and several dead-code / logic issues that will cause friction as the app grows.

---

## Issues

| # | Issue | Criticality | Category | Location |
|---|-------|-------------|----------|----------|
| 1 | **Hardcoded seller wallet address** `"0x18e28f17..."` in create-escrow handler — should come from the backend or form input | 🔴 Critical | Code Quality | `src/pages/Dashboard.jsx:102` |
| 2 | **`alert()` used for all feedback** (success, error, validation) — blocks UI, uncustomizable, poor UX | 🔴 Critical | UX | `src/pages/Dashboard.jsx:89,133,145`, `src/components/EscrowCard.jsx:18,53,88,94` |
| 3 | **`window.location.reload()`** called after deposit and confirm-delivery instead of updating local state — causes full network refetch and flicker | 🔴 Critical | UX | `src/components/EscrowCard.jsx:54,91` |
| 4 | **Debug `console.log("TOKEN SENT:", token)`** left in production axios interceptor — leaks JWT to console | 🔴 Critical | Code Quality | `src/api/api.js:13` |
| 5 | **Register page is missing `ParticleBackground`** — Login has animated particle effect, Register is static; jarring inconsistency when navigating between them | 🟠 High | Consistency | `src/pages/Register.jsx` |
| 6 | **Register page form has no `<label>` elements** — only uses placeholders; Login has labels but Register doesn't | 🟠 High | Accessibility | `src/pages/Register.jsx:53-87` |
| 7 | **Register page form inputs not wrapped in a glass card** — Login wraps form in `bg-white/5 backdrop-blur-xl rounded-2xl p-10`; Register uses raw left-padded layout — visually inconsistent | 🟠 High | Visual Design | `src/pages/Register.jsx:44-105` |
| 8 | **`DashboardLayout.jsx` is completely unused dead code** — `Dashboard.jsx` reimplements its own header instead of using this component | 🟠 High | Code Quality | `src/components/DashboardLayout.jsx` |
| 9 | **Double padding on dashboard background** — `.dashboard-bg` in CSS adds `padding: 40px 60px`, and the wrapper div also adds `py-6 px-4` via Tailwind — stacked padding breaks layout | 🟠 High | Visual Design | `src/styles/dashboard.css:6`, `src/pages/Dashboard.jsx:176` |
| 10 | **Conflicting hover animations on EscrowCard** — `.card:hover` in CSS applies `translateY(-6px)` AND framer-motion `whileHover={{ scale: 1.02 }}` fire simultaneously — jittery effect | 🟠 High | Micro-interactions | `src/styles/dashboard.css:19-22`, `src/components/EscrowCard.jsx:105` |
| 11 | **Admin sidebar uses emoji icons** (📊👤💰📈) — inconsistent with the polished glass design; should use Lucide icons per the stack preference | 🟠 High | Visual Design | `src/components/AdminLayout.jsx:8-11` |
| 12 | **Admin sidebar has no mobile/responsive layout** — full `w-72` sidebar is always rendered; page is unusable on tablets and phones | 🟠 High | Responsive | `src/components/AdminLayout.jsx:42` |
| 13 | **`LineChart` in AdminDashboard missing `XAxis` / `YAxis`** — chart shows with no axis labels, making values unreadable | 🟠 High | UX | `src/pages/AdminDashboard.jsx:101-118` |
| 14 | **No empty-state UI** for Active/Completed Escrow sections — blank white space when arrays are empty | 🟡 Medium | UX | `src/pages/Dashboard.jsx:247-270` |
| 15 | **`AdminDisputes.jsx` uses hardcoded `bg-[#111827]`** instead of the `glass-pro` utility class used everywhere else in admin | 🟡 Medium | Consistency | `src/pages/admin/AdminDisputes.jsx:52` |
| 16 | **`NotificationBell` button is emoji-only** (`🔔`) with no `aria-label` — screen readers and keyboard users get no context | 🟡 Medium | Accessibility | `src/components/NotificationBell.jsx:44` |
| 17 | **`.section-title` CSS class defined but never used** — Dashboard.jsx uses inline Tailwind classes instead | 🟡 Medium | Code Quality | `src/styles/dashboard.css:24-31`, `src/pages/Dashboard.jsx:241,263` |
| 18 | **Dashboard header card uses inline `text-blue-400`** for h1, `text-3xl font-bold` — ignores the design token scale (`heading-xl`, `heading-lg`) defined in `index.css` | 🟡 Medium | Consistency | `src/pages/Dashboard.jsx:181` |
| 19 | **Login page background is `#0B1726`, Admin uses `#020617`** — two different base background colors with no shared token | 🟡 Medium | Consistency | `src/pages/Login.jsx:62`, `src/components/AdminLayout.jsx:36` |
| 20 | **`EscrowProgress` step labels misaligned** — `flex justify-between` on labels doesn't match actual dot positions at small widths | 🟡 Medium | Visual Design | `src/components/EscrowProgress.jsx:35-39` |
| 21 | **Create Escrow form inputs have no `<label>` elements** — only placeholder text; fails WCAG 1.3.1 | 🟡 Medium | Accessibility | `src/pages/Dashboard.jsx:209-231` |
| 22 | **`AdminDashboard` charts grid uses `grid-cols-3`** — breaks at medium viewport widths between sidebar and chart panel | 🟡 Medium | Responsive | `src/pages/AdminDashboard.jsx:98` |
| 23 | **Login page `pageSize` is 5.6 MB** — tsparticles being loaded on auth pages is expensive; consider lazy-loading or a CSS-only background | ⚪ Low | Performance | `src/components/ParticleBackground.jsx`, `src/pages/Login.jsx:59` |
| 24 | **Right-panel image loaded from Unsplash without `loading="lazy"`** and no explicit `width`/`height` — causes layout shift | ⚪ Low | Performance | `src/pages/Login.jsx:122`, `src/pages/Register.jsx:110` |
| 25 | **`logout()` is duplicated** — implemented inline in both `Dashboard.jsx:165-168` and `AdminLayout.jsx:14-17`; should use the shared `logout()` from `src/utils/auth.js` | ⚪ Low | Code Quality | `src/pages/Dashboard.jsx:165`, `src/components/AdminLayout.jsx:14` |
| 26 | **`EscrowCard` accepts `onRelease` and `onFund` props but never uses them** — passed from Dashboard but not wired in the component | ⚪ Low | Code Quality | `src/components/EscrowCard.jsx:11`, `src/pages/Dashboard.jsx:254-257` |

---

## Criticality Legend
- 🔴 **Critical**: Breaks functionality, security risk, or severely degrades UX
- 🟠 **High**: Significantly impacts usability, design quality, or responsiveness  
- 🟡 **Medium**: Noticeable issue that should be addressed before launch
- ⚪ **Low**: Nice-to-have improvement or minor cleanup

---

## Next Steps (Suggested Priority Order)

1. **Immediate** — Fix #1 (hardcoded wallet), #3 (reload → state update), #4 (remove debug log)
2. **Before demo** — Replace `alert()` (#2) with a toast library (e.g. react-hot-toast), add empty states (#14)
3. **Polish pass** — Unify Register ↔ Login styling (#5, #7), replace emoji icons with Lucide (#11), add mobile sidebar (#12)
4. **Cleanup** — Delete `DashboardLayout.jsx` (#8), wire up `onRelease`/`onFund` props (#26), use shared `logout()` (#25)
