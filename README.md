# AuraHR

AuraHR is the frontend foundation for an enterprise-grade Human Resource
Information System (HRIS) — a single workspace for employee records,
attendance, leave, payroll, recruitment, performance, documents, and
reporting. This repository contains the **design system, application shell,
and all module placeholder screens**, built to be expanded feature-by-feature
without re-architecting later.

No backend is wired up yet. Every screen renders from local mock data in
`src/constants/dummy-data.ts` via a service layer designed to be swapped for
real API calls with no changes to components.

---

## 1. Getting started

**Requirements:** Node.js 20+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables (optional — not required until a backend exists)
cp .env.example .env.local

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The marketing site is at
`/`, and the app shell is at `/dashboard` (no auth gate yet — `/login` and
`/register` are fully designed but not wired to a real session).

### Other scripts

| Script                 | Purpose                                            |
| ----------------------- | --------------------------------------------------- |
| `npm run dev`           | Start the local dev server with hot reload.         |
| `npm run build`         | Production build (used to verify the app compiles). |
| `npm run start`         | Serve the production build locally.                 |
| `npm run lint`          | Run ESLint.                                          |
| `npm run format`        | Format the codebase with Prettier.                  |
| `npm run format:check`  | Check formatting without writing changes.           |

---

## 2. Folder structure

```
src/
├── app/                      # Next.js App Router — routes only, no logic
│   ├── (marketing)/          # Public landing page (own layout, no sidebar)
│   ├── (auth)/                # Login, register, forgot/reset password
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   ├── (dashboard)/           # Authenticated app shell (sidebar + topbar)
│   │   ├── dashboard/
│   │   ├── employees/
│   │   ├── departments/
│   │   ├── attendance/
│   │   ├── leave/
│   │   ├── payroll/
│   │   ├── recruitment/
│   │   ├── performance/
│   │   ├── documents/
│   │   ├── reports/
│   │   └── settings/
│   ├── layout.tsx             # Root layout: fonts, providers, toaster
│   ├── not-found.tsx          # Global 404
│   └── global-error.tsx       # Global error boundary
│
├── components/
│   ├── ui/                    # Design-system primitives (button, card, table…)
│   ├── layout/                # Shell chrome, grouped by context
│   │   ├── dashboard/         # Sidebar, mobile sidebar, topbar
│   │   ├── marketing/         # Site header, site footer
│   │   └── auth/              # Split-screen auth shell
│   ├── shared/                # Cross-feature building blocks (PageHeader,
│   │                             EmptyState, ErrorState, StatCard, breadcrumb)
│   └── motion/                # Framer Motion wrappers (FadeIn, StaggerGroup)
│
├── features/                  # Feature/domain code, one folder per module
│   ├── landing/                # Hero, features, modules, testimonials, FAQ…
│   ├── auth/                   # Login/register/forgot/reset forms
│   ├── dashboard/               # widgets/ and charts/ used on the home page
│   ├── employees/               # Table, toolbar, status badge, client view
│   ├── departments/, attendance/, leave/, payroll/, recruitment/,
│   │   performance/ …           # Small per-module components (status badges,
│   │                              cards) — ready to grow as each module gains
│   │                              real functionality
│
├── hooks/                     # Reusable React hooks (useEmployees, useMediaQuery)
├── lib/
│   ├── utils.ts                # cn(), formatters (currency, date, number)
│   ├── fonts.ts                 # Self-hosted font imports
│   └── validations/             # Zod schemas (auth forms today)
├── services/                   # API-shaped functions; mock today, real later
│   ├── api-client.ts             # fetch wrapper (base URL, error handling)
│   ├── employees.service.ts
│   └── auth.service.ts
├── store/                       # Zustand stores (ui-store, auth-store)
├── providers/                   # React context providers (TanStack Query)
├── types/                        # Shared TypeScript types, one file per domain
└── constants/                    # routes.ts, navigation.ts, dummy-data.ts
```

**Why this shape:** `app/` stays thin (routing + composition only). Anything
resembling business logic, markup, or state lives in `features/` or
`components/`, grouped by what it's about rather than what it's made of. When
a module (e.g. Payroll) gets real functionality, its forms, tables, and hooks
grow inside `features/payroll/` without touching unrelated modules.

---

## 3. Design system

All tokens live in `src/app/globals.css` as CSS variables consumed by
Tailwind v4's `@theme inline` block — change a value once, and every
component picks it up.

- **Color:** Emerald primary, Slate-based neutrals/accents, plus semantic
  success (green), warning (amber), destructive (red), and info (blue) scales
  — each with a "soft" background variant for badges/alerts. Dark mode
  variables are defined but not yet wired to a toggle.
- **Typography:** *Fraunces* (an editorial serif) for headings and display
  text, *Inter* for UI/body copy, *JetBrains Mono* for IDs and tabular data.
  Fonts are self-hosted via `@fontsource` so builds never depend on fetching
  Google Fonts at build time.
- **Radius / shadows:** a small token scale (`--radius-sm` → `--radius-2xl`,
  `--shadow-xs` → `--shadow-xl`) used consistently instead of ad hoc values.
- **Motion:** `FadeIn` and `StaggerGroup`/`StaggerItem` (Framer Motion)
  standardize how content enters the page; `prefers-reduced-motion` is
  respected globally.
- **Components:** button, card, input, textarea, label, badge, alert, avatar,
  table, skeleton, dialog, sheet (mobile drawer), dropdown menu, select,
  tabs, tooltip, separator, progress, checkbox, switch, popover, breadcrumb,
  accordion, and a Sonner-based toast host — all hand-built in the shadcn/ui
  style (the shadcn CLI's registry wasn't reachable in this build
  environment, so primitives were written directly against the same Radix +
  CVA patterns it generates).

---

## 4. Dependencies explained

| Package | Why it's here |
| --- | --- |
| `next`, `react`, `react-dom` | Core framework (Next.js 15, App Router). |
| `typescript` | Static typing across the app. |
| `tailwindcss`, `@tailwindcss/postcss`, `tw-animate-css` | Utility-first styling; `tw-animate-css` adds the enter/exit + accordion animation utilities used by dialogs, sheets, dropdowns, and the FAQ accordion. |
| `class-variance-authority`, `clsx`, `tailwind-merge` | Variant-based component styling (`buttonVariants`, `badgeVariants`, etc.) and safe class merging via `cn()`. |
| `@radix-ui/*` | Unstyled, accessible primitives (dialog, dropdown menu, select, tabs, tooltip, checkbox, switch, popover, avatar, label, separator, progress, accordion, slot) underneath every interactive component. |
| `lucide-react` | Icon set used throughout the UI. |
| `framer-motion` | Page/element transitions, staggered reveals, sidebar animation, the animated hero graphic. |
| `react-hook-form`, `@hookform/resolvers`, `zod` | Form state + schema validation for all four auth forms (and future module forms). |
| `@tanstack/react-query` | Server-state fetching/caching — wraps the mock `employeesService` today, ready for real endpoints later. |
| `zustand` | Lightweight client state: sidebar/mobile-nav UI state (persisted) and a placeholder auth/session store. |
| `recharts` | Employee growth, attendance trend, and department distribution charts on the dashboard. |
| `date-fns` | Date utilities (available for future date-heavy modules like payroll/attendance). |
| `sonner` | Toast notifications (auth flows, future mutations). |
| `@fontsource/inter`, `@fontsource/fraunces`, `@fontsource/jetbrains-mono` | Self-hosted fonts — no build-time network dependency on Google Fonts. |
| `eslint`, `eslint-config-next` | Linting, including Next.js and TypeScript rule sets. |
| `prettier`, `prettier-plugin-tailwindcss` | Formatting, with automatic Tailwind class sorting. |

---

## 5. What's implemented vs. what's next

**Implemented (this milestone):**
Design system and full component library; marketing landing page (hero,
features, modules, testimonials, pricing placeholder, FAQ, footer); all four
auth screens (validated, but not connected to a real session); dashboard
shell (responsive sidebar + topbar); dashboard home with 7 KPI widgets, an
upcoming-birthdays widget, and 3 charts; a fully interactive Employees table
(search, department filter, loading/empty/error states); and placeholder
pages for Departments, Attendance, Leave, Payroll, Recruitment, Performance,
Documents, Reports, and Settings — each with a page header, breadcrumb,
summary cards, and at least one empty state.

**Prepared for, not yet built:** PostgreSQL + Prisma, real authentication and
session handling, RBAC, employee/department CRUD, leave request workflows,
payroll processing, recruitment pipelines, performance review cycles, an AI
HR assistant, notifications, file uploads, and deeper reporting/analytics.
The `services/`, `store/`, `types/`, and `hooks/` folders are structured so
each of these can be added module-by-module without restructuring the app.

---

## 6. Build verification

This project has been verified to build cleanly:

```bash
npx tsc --noEmit   # 0 type errors
npx eslint .       # 0 lint errors
npm run build      # compiles, all 19 routes prerender successfully
npm run start      # smoke-tested: every route returns its expected status
                    # code and content, with no hydration or runtime errors
```
