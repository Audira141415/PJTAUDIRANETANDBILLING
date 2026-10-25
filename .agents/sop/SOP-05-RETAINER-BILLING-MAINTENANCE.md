# SOP-05: MONTHLY RETAINER MANAGEMENT, HEALTH AUDIT & BILLING

> **Document Code:** AUDIRA-SOP-005  
> **Effective Date:** October 1, 2026 | Revision: 2.4  
> **Applicability:** Active Monthly Retainers, Infrastructure Maintenance & Dev-as-a-Service  
> **Target Audience:** Internal Operations, Lead Engineers & Retainer Subscribers

---

## 1. Definisi Paket Retainer & Cakupan Layanan

| Paket Retainer | Biaya Bulanan | Komitmen Jam / SLA | Cakupan Utama |
| :--- | :--- | :--- | :--- |
| **Tier 1: Maintenance & Security** | $450 USD / Rp 7.200.000 | 10 Jam Engineering / bln | Security patching bulanan, backup database, audit log, perbaikan bug minor |
| **Tier 2: Dedicated Fullstack Dev** | $1,850 USD / Rp 29.500.000 | 40 Jam Sprint Dev / bln | Pengembangan fitur baru, optimasi UI/UX, integrasi API, prioritas kanal privat |
| **Tier 3: Batam DC Standby** | $650 USD / Rp 10.400.000 | 2x Kunjungan On-Site + 24/7 Hotline | Siaga darurat < 2 jam ke NDP/Mukakuning, audit rack berkala, pergantian hardware |

---

## 2. Siklus Kerja Pemeliharaan Bulanan (Monthly Maintenance Cadence)

### Minggu 1: Audit Keamanan & Update Dependensi
- Jalankan audit dependensi via `npm audit` atau Snyk.
- Update security patch minor pada runtime (Node.js, Docker Base Image, Linux Kernel).
- Tinjau log autentikasi dan upaya serangan brute-force pada endpoint admin/API.

### Minggu 2: Health Check Database & Integritas Cadangan (Backup)
- Uji integritas backup mingguan PostgreSQL.
- Lakukan dry-run restore database ke environment isolasi untuk memastikan file backup tidak corrupt.
- Optimasi query slow logs dan pembersihan storage sisa log yang kadaluwarsa.

### Minggu 3: Performance Benchmark & SEO Refresh
- Jalankan audit performa Lighthouse pada seluruh route publik.
- Pastikan metrik Web Vitals tetap berada di zona hijau (LCP < 1.2s).
- Validasi sitemap XML dan pengecekan broken links via crawler internal.

### Minggu 4: Laporan Kinerja Bulanan & Rekomendasi
- Lead Engineer menyusun **Monthly Executive Health Report** dalam format PDF yang berisi:
  - Uptime server (persentase rata-rata bulanan).
  - Ringkasan tiket/pekerjaan yang diselesaikan.
  - Sisa alokasi jam retainer bulan berjalan.
  - Rekomendasi peningkatan teknis untuk bulan berikutnya.

---

## 3. Siklus Tagihan & Ketentuan Pembayaran (Billing Cycle)
1. **Penerbitan Invoice**: Invoice diterbitkan secara otomatis setiap tanggal **25 setiap bulan** untuk periode bulan berikutnya (Advance Billing).
2. **Jatuh Tempo (Due Date)**: Pembayaran jatuh tempo pada tanggal **1 setiap bulan** (Net-7 days).
3. **Masa Tenggang (Grace Period)**:
   - Diberikan masa tenggang 5 hari kerja hingga tanggal 6.
   - Jika pembayaran belum diterima per tanggal 7, status SLA darurat ditangguhkan sementara secara otomatis hingga konfirmasi pembayaran diterima.
4. **Mata Uang & Pajak**: Klien dapat memilih faktur dalam USD, SGD, atau IDR dengan faktur pajak standar jika diperlukan.
