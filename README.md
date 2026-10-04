# 🛒 Retail SuperApp (Operational & Point of Sale System)

A modern, high-performance **Retail SuperApp** designed to streamline all-in-one business operations. This platform integrates an advanced Point of Sale (POS) system, a full-featured E-commerce engine, daily operational management, and a robust Human Resources (HRD) suite into a single unified dashboard.

Built with a modern, lightning-fast edge-native architecture ensuring offline-first resilience for physical stores and seamless real-time cloud synchronization.

---

## ✨ Core Modules

- **Point of Sale (POS):** Offline-first cashier system with real-time barcode scanning, dynamic cart operations, and split-payment management.
- **E-Commerce Platform:** Customer-facing storefront with automated inventory sync, checkout pipeline, and order tracking.
- **Business Operations:** Inventory tracking, multi-warehouse supply chain management, purchasing, and comprehensive profit/loss reporting.
- **Human Resources (HRD):** Employee shift scheduling, digital attendance tracking, payroll processing, and performance analytics.

---

## 🛠️ Tech Stack & Architecture

This repository leverages an edge-optimized ecosystem for extreme performance, minimal cold starts, and offline capabilities.

### Core Framework & Runtime

- **Runtime:** 🧅 [Bun](https://bun.sh) — Fast all-in-one JavaScript/TypeScript runtime.
- **Framework:** 🧡 [SvelteKit](https://svelte.dev) — Full-stack framework for highly reactive, lightweight UIs.
- **Language:** 📘 TypeScript — Type-safe development across the entire stack.
- **PWA Capability:** 📱 `@vite-pwa/sveltekit` — Progressive Web App for offline installation and native-like desktop/mobile experiences.

### Database & Synchronization

- **ORM:** 🌧️ [Drizzle ORM](https://drizzle.team) — TypeScript ORM with full type safety and SQL-like flexibility.
- **Production Database:** 🌀 [Turso](https://turso.tech) — LibSQL/SQLite cloud database with embedded replicas for zero-latency local queries.
- **Local Development DB:** 🗄️ SQLite — Lightweight local file database matching production runtime behavior.
- **Database Driver:** `@libsql/client` — Native LibSQL client for edge environment compatibility.

### Infrastructure & Cloud Services (Cloudflare Ecosystem)

- **Hosting & Compute:** ⚡ [Cloudflare Pages](https://cloudflare.com) — Global edge-network application delivery.
- **Object Storage:** 📦 Cloudflare R2 — S3-compatible, zero-egress fee object storage for product images and digital receipts.
- **DNS & Domain:** Cloudflare Registrar — Secure and optimized domain management.

### UI & Styling

- **Styling:** 🎨 [Tailwind CSS](https://tailwindcss.com) — Utility-first CSS framework for rapid UI design.
- **UI Components:** 🧩 [shadcn-svelte](https://shadcn-svelte.com) — Accessible, customizable, and beautifully designed component primitives.

### Auth & Communication

- **Authentication:** 🔐 [Better Auth](https://better-auth.com) — Modern, secure, and flexible authentication library for TypeScript frameworks.
- **Email Delivery:** ✉️ [Resend](https://resend.com) — Developer-first email API for transactional alerts, invoices, and automated notifications.

### Development Environment

- **IDE Workflow:** Google Antigravity — Next-generation collaborative web-based development environment.

---

## 🚀 Key Features Built-In

1. **Hybrid Offline-First (Embedded Replicas):** The POS module functions completely offline inside physical stores using local SQLite replicas and auto-syncs with Turso Cloud once a connection is re-established.
2. **Edge-Computed Performance:** Heavy database querying and routing happen at the closest Cloudflare edge location, ensuring lightning-fast load times globally.
3. **Unified Identity:** Single sign-on (SSO) infrastructure powered by Better Auth, allowing employees to access operational dashboards while customers access their shopping profiles securely.
4. **App-Like Experience:** Installable via desktop and mobile devices with asset caching mechanisms driven by Vite PWA.

---

## ⚙️ Development Setup

_(Optional: Fill this out later when you start coding)_

1. Clone this repository:
   ```bash
   git clone https://github.com
   cd REPOS_NAME
   ```
2. Install dependencies using Bun:
   ```bash
   bun install
   ```
3. Set up your environment variables:
   ```bash
   cp .env.example .env
   ```
4. Run database migrations:
   ```bash
   bunx drizzle-kit push
   ```
5. Start the development server:
   ```bash
   bun --dev run dev
   ```
