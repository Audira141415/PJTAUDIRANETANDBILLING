# .agents — AUDIRA-NET & BILLING AI Agent Hub

> Central configuration, behavioral rules, Next.js 14 Web Admin standards, NestJS 10 backend architecture, Flutter & Expo Mobile ecosystem, MikroTik & FreeRADIUS integration, and operational SOPs for AI Agents (Antigravity, Copilot, Cursor, Windsurf) working on **AUDIRA-NET & BILLING**.

---

## 0. Maintainer & Official Contact Information

### 👥 Developer & Official Contact
- **Author & Founder**: Agus Dwi Rianto (AUDIRA)
- **Organization**: Audira Multimedia Digital / Audira Sukses Mandiri
- **Official Production Domain**: [https://audira.my.id](https://audira.my.id)
- **Official GitHub Repository**: `https://github.com/Audira141415/PJTAUDIRANETANDBILLING.git`

### 📧 Official Contact Suite
- **Official Email**: [agusdwirianto@gmail.com](mailto:agusdwirianto@gmail.com)
- **Business Partnership**: Contact the official email above.
- **General Support**: Contact the official email above.
- **Security & Vulnerability Reports**: Contact the official email above.
- **WhatsApp Hotline**: [+62 821-1200-1600](https://wa.me/6282112001600)
- **Telegram Community**: To be announced
- **Discord Server**: To be announced

### 🔐 Security & Responsible Disclosure
For business inquiries, technical support, partnership opportunities, and security vulnerability reports, please use the official email address listed above.
For security reports, include a clear description of the vulnerability, its potential impact, and reproduction steps where applicable. Do not include live passwords, MikroTik credentials, API keys, or sensitive customer PII.

### © Project Ownership & Attribution
AUDIRA is an ecosystem of digital products, AI-powered applications, automation systems, and technology solutions developed under the AUDIRA brand.
All product names, source code, designs, and associated intellectual property are subject to proprietary ownership rights and the AUDIRA Commercial & Proprietary Software License (`LICENSE`).

---

## 1. Directory Structure

```text
.agents/
├── README.md                          # Master directory guide & AI agent hub
├── AGENTS.md                          # Project governance, licensing & rules
├── ARCHITECTURE.md                    # NestJS 10, Next.js 14, PostgreSQL, Redis, MikroTik & RADIUS
├── ROADMAP.md                         # SINGLE SOURCE OF TRUTH: Matriks status fitur & panduan Go-Live
├── DEPLOYMENT.md                      # Multi-port launcher (3217/3218), Docker compose, start.bat, save.bat
├── DESIGN.md                          # AUDIRA Design System, Multi-Theme (Bento + Sci-Fi NOC)
├── RULES.md                           # Strict coding directives: NestJS, Next.js, Prisma, TypeScript
├── SECURITY.md                        # RBAC, MikroTik encryption, Midtrans webhook verification, JWT hygiene
├── TASK_INSTRUCTION.md                # Standard Operating Procedures for feature development & migrations
├── TESTING.md                         # End-to-end testing, API validation & simulator testing
├── hooks.json                         # Antigravity agent lifecycle hooks (PreToolUse safety gate)
├── scripts/
│   └── safety-guard.js                # Safety guard script to block destructive commands & force pushes
│
├── archive/                           # Arsip dokumen plan lama & diagram riwayat
│   ├── plans/                         # PLAN-5-CORE, PLAN-NEXT-5, PLAN-SALES, PRD, INTEGRATION_ROADMAP
│   └── skills/                        # Non-ISP skills (3D scene, blog publishing, company profile)
│
├── brain/                             # Deep Knowledge Repository & Long-Term Memory (LTM)
│   ├── INDEX.md                       # Brain Manifest, Memory Philosophy & Knowledge Map
│   ├── SYSTEM_ARCHITECTURE.md         # Multi-app architecture, database schema, data flow
│   ├── FEATURE_CATALOG.md             # Master catalog of modules, endpoints & pages
│   ├── DATABASE_AND_DATA_FLOW.md      # PostgreSQL, Prisma ORM, Redis caching & queues
│   ├── SECURITY_AND_GOVERNANCE.md     # RBAC, secrets hygiene & audit logging
│   └── ENV_AND_SECRETS_REFERENCE.md   # Multi-port allocation (3217/3218/3001/5455/6379)
│
├── rules/                             # Behavioral constraints & standards
│   ├── contact-and-license.md         # Official author attribution & license terms
│   ├── api_security_and_ratelimit.md  # Rate limiting, validation pipes & CORS rules
│   ├── git_and_workspace_hygiene.md   # Git commit standards & clean rules
│   └── styling_and_neobrutalism.md    # UI tokens, color palettes & component standards
│
├── skills/                            # Specialized Agent Skills (workflow automation)
│   ├── audira-prisma-database/        # Schema migrations, Prisma Client & DB ops
│   ├── audira-safe-deployment/        # Builds, port checks (3217/3218), save.bat
│   ├── audira-component-creator/      # Scaffolding new UI components with theme tokens
│   ├── audira-performance-benchmark/  # Next.js bundle & performance optimization
│   ├── audira-seo-audit/              # SEO metadata & sitemaps
│   └── ui-ux-pro-max/                 # Comprehensive UI/UX design and review skill
│
└── sop/                               # Operational Procedures & Templates
    ├── INDEX.md                       # Master index of operational SOPs
    ├── SOP-01-CLIENT-ONBOARDING-KICKOFF.md
    ├── SOP-02-PREFLIGHT-QC-DEPLOYMENT.md
    ├── SOP-03-PROJECT-HANDOVER-IP-TRANSFER.md
    ├── SOP-04-EMERGENCY-DC-REMOTE-HANDS-RUNBOOK.md
    ├── SOP-05-RETAINER-BILLING-MAINTENANCE.md
    └── ... (Templates & Contracts)
```

---

## 2. Project Sub-Systems

The `AUDIRA-NET-BILLING` workspace consists of two primary applications:

### 1. `AUDIRA-BILLING/`
- **Backend (`apps/backend/`)**: NestJS 10, Prisma ORM, PostgreSQL (Port 5455), Redis (Port 6379), JWT auth, MikroTik RouterOS API, FreeRADIUS integration, Midtrans payment gateway, Fonnte WhatsApp API. Runs on **Port 3218**.
- **Web Admin Frontend (`apps/frontend/`)**: Next.js 14 Web Admin Portal for ISP management (Billing, Invoicing, Customers, Packages, Network, Mikrotik, HR, Reports). Runs on **Port 3217**.
- **Customer Portal (`apps/customer-portal/`)**: Next.js 14 Self-Service portal for internet subscribers (View bills, QRIS payments, speed tests, trouble tickets). Runs on **Port 3001**.
- **Mobile Expo (`apps/mobile/`)**: React Native (Expo SDK 50) app for technicians and customers.

### 2. `AUDIRA-NET/`
- **Flutter Mobile App (`com.example.AudiraNET_app`)**: Android application for ISP field operations, technicians, NOC, and customer service. Integrates with Firebase, QR scanner, GPS navigation, and camera. Runs on Android Emulator (`emulator-5554` / `ISP.avd`).

---

## 3. Quick Start & Execution

```powershell
# 1. Start all Billing services (Docker, Backend, Frontend)
cd f:\AUDIRA-NET-BILLING\AUDIRA-BILLING
.\start.bat

# 2. Run Flutter Mobile App on Android Emulator
cd f:\AUDIRA-NET-BILLING\AUDIRA-NET
flutter run -d emulator-5554

# 3. Stop all background servers
cd f:\AUDIRA-NET-BILLING\AUDIRA-BILLING
.\stop-servers.bat

# 4. Save & sync code with Git
.\save.bat
```
