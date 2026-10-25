# ANALYTICS & CONVERSION STRATEGY — AUDIRA DEV
> **Knowledge Module ID**: `BRAIN-ANALYTICS-01`  
> **Status**: ACTIVE & ROADMAP  
> **Scope**: Tracking Konversi, Event Funnel, CTA WhatsApp, Profil Downloads, & Lead Form Metrics.

---

## 1. Filosofi Konversi AUDIRA DEV

Sebagai platform digital studio & agensi teknologi, setiap halaman di AUDIRA DEV memiliki satu tujuan utama: **mengonversi pengunjung menjadi klien prospektif (qualified leads)**.

### Funnel Konversi Utama:
```text
┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│  Visitor Land   │ ──> │ Explore Proof  │ ──> │ Conversion Act │
│  Hero / 3D Canvas│     │ Case Studies / │     │ WhatsApp / Form│
│  Tagline Visual│     │ Pricing Matrix │     │ Proposal DL    │
└────────────────┘     └────────────────┘     └────────────────┘
```

---

## 2. Poin-Poin Konversi Kunci (Conversion Touchpoints)

1. **Primary WhatsApp CTA**:
   * Link: `https://wa.me/6282112001600`
   * Penempatan: Header navbar, Hero section ("Konsultasi Sekarang"), Sticky mobile footer, dan Pricing cards ("Pilih Paket").
2. **Contact Form Leads**:
   * Route: `/contact` -> `POST /api/contact` -> Database model `Contact`.
   * Metrik: Jumlah formulir inquiry proyek yang berhasil terkirim.
3. **Company Profile & Media Kit Download**:
   * Endpoint: `GET /api/download-profile` -> File text/PDF profil resmi.
   * Metrik: Frekuensi unduhan oleh calon investor atau mitra korporat.
4. **Newsletter Subscriptions**:
   * Route: Footer widget -> `POST /api/newsletter` -> Database model `Newsletter`.
   * Metrik: Pertumbuhan daftar email developer & calon klien.
5. **Instant Discovery Call Bookings**:
   * Modal: `DiscoveryCallModal.tsx` -> Integrasi Cal.com / Google Meet.
   * Metrik: Jumlah slot jadwal konsultasi arsitektur 15 menit yang dipesan klien.
6. **Instant Project Quote PDF Exports**:
   * Komponen: `QuotePdfExportButton.tsx` di `ProjectEstimator.tsx`.
   * Metrik: Jumlah dokumen penawaran estimasi formal yang diunduh untuk approval internal.
7. **Emergency Batam DC Remote Hands Dispatches**:
   * Modal / Endpoint: `EmergencyDispatchModal.tsx` -> `POST /api/emergency-dispatch`.
   * Metrik: Permintaan intervensi on-site darurat fasilitas data center Batam.

---

## 3. Rencana Integrasi Event Tracking (Roadmap Analytics)

Untuk pemantauan metrik tanpa memperlambat First Contentful Paint:
* **Privacy-Friendly Web Analytics**: Mempersiapkan integrasi Umami Analytics atau Cloudflare Web Analytics (bebas cookie agresif).
* **Custom Event Dispatcher**:
  ```typescript
  // Helper dispatch event konversi aman
  export function trackConversion(eventName: string, metadata?: Record<string, any>) {
    if (typeof window !== "undefined" && (window as any).umami) {
      (window as any).umami.track(eventName, metadata);
    }
  }
  ```
* **Event Naming Convention**:
  * `cta_whatsapp_click` (dengan properti `location: 'hero' | 'pricing' | 'nav'`)
  * `contact_form_submitted` (dengan status `success | failed`)
  * `company_profile_downloaded`
  * `case_study_viewed` (dengan properti `slug: project.slug`)
  * `discovery_call_booked` (dengan properti `timezone: string, channel: 'google_meet' | 'cal'`)
  * `quote_pdf_exported` (dengan properti `total_usd: number, project_type: string`)
  * `emergency_dispatch_requested` (dengan properti `datacenter_location: string, urgency: string`)
  * `currency_switched` (dengan properti `to_currency: 'USD' | 'IDR' | 'SGD'`)

