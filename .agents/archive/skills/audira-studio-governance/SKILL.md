---
name: audira-studio-governance
description: Use this skill when managing, generating, or verifying studio operational SOPs, MSA contracts, SOW charters, and SLA policies in AUDIRA DEV.
---

# AUDIRA Studio Governance & Operational SOP Management

This skill governs the generation, maintenance, and verification of official agency documents, client agreements, standard operating procedures (SOPs), and service level agreements (SLAs) for AUDIRA DEV.

---

## 1. Governance Architecture & Repository
All studio procedures are version-controlled in the workspace:
- Physical Markdown Files: `.agents/sop/`
- TypeScript Metadata & In-App Viewer: `lib/studio-documents-data.ts`
- Admin Console Management: `/admin` (Tab: `DOCS & SOPS`)

### Core Document Inventory:
1. **`SOP-01-ONB`** (`SOP-01-CLIENT-ONBOARDING-KICKOFF.md`): Lead ingestion, 20-min discovery call, 50% deposit settlement, private GitHub org & communication channel setup, Sprint 0 kickoff.
2. **`SOP-02-QC`** (`SOP-02-PREFLIGHT-QC-DEPLOYMENT.md`): 5-pillar pre-flight quality gate (0 TypeScript & ESLint errors, Lighthouse >= 95, Web Vitals, honeypot/rate-limiting, zero-downtime container deployment).
3. **`SOP-03-IP`** (`SOP-03-PROJECT-HANDOVER-IP-TRANSFER.md`): 100% intellectual property transfer, credentials & DNS handover checklist, 30-day post-launch bug warranty.
4. **`SOP-04-DC`** (`SOP-04-EMERGENCY-DC-REMOTE-HANDS-RUNBOOK.md`): Batam Data Center emergency remote hands runbook (< 15 min contact, < 120 min on-site arrival at NDP/Mukakuning, ESD safety, 24h incident post-mortem).
5. **`SOP-05-RET`** (`SOP-05-RETAINER-BILLING-MAINTENANCE.md`): 4-week monthly maintenance cadence, weekly database backup verification, security patching, monthly health report, Net-7 billing.
6. **`MSA-2026`** (`TEMPLATE-MASTER-SERVICE-AGREEMENT-MSA.md`): Master Service Agreement template with full IP assignment, 3-year mutual NDA, payment milestones, and BANI/Singapore arbitration.
7. **`SOW-TEMPLATE`** (`TEMPLATE-SCOPE-OF-WORK-SOW.md`): Scope of Work charter with tech stack, 4 milestone sprint breakdown, payment schedule (50-30-20), and out-of-scope clauses.
8. **`SLA-POLICY`** (`POLICY-SERVICE-LEVEL-AGREEMENT-SLA.md`): 99.9% uptime commitment, Severity 1-4 incident matrix, 2h Batam DC on-site SLA, and tiered service credits.

---

## 2. When to Trigger This Skill
- Preparing a formal commercial proposal or contract for a high-ticket enterprise client.
- Generating a customized Master Service Agreement (MSA) or Scope of Work (SOW).
- Handling an emergency on-site intervention ticket for Batam Data Center infrastructure.
- Executing final project delivery, IP transfer certification, and warranty activation.
- Updating revision versions or adding new operational SOPs.

---

## 3. Workflow for Issuing Client Contracts
1. **Extract Client Metadata**: Company Name, Authorized Representative, Jurisdiction, Currency (USD, SGD, or IDR).
2. **Populate SOW Milestones**:
   - Milestone 1: Sprint 0 & Architecture (50% upfront)
   - Milestone 2: Core Engineering & Alpha
   - Milestone 3: Beta & Staging UAT (30%)
   - Milestone 4: Production Deployment & IP Handover (20%)
3. **Generate Print-Ready PDF**:
   - Access Admin Console `/admin` -> `DOCS & SOPS`.
   - Click `PDF PRINT` to generate the official letterhead document with verification stamp.
