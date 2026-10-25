# SOP-03: PROJECT HANDOVER, INTELLECTUAL PROPERTY (IP) ASSIGNMENT & POST-LAUNCH WARRANTY

> **Document Code:** AUDIRA-SOP-003  
> **Effective Date:** October 1, 2026 | Revision: 2.4  
> **Applicability:** Project Completion, Final Milestones, Source Code Ownership Transfer & Warranty  
> **Authority:** AUDIRA Legal & Engineering Governance

---

## 1. Kebijakan Transfer Hak Kekayaan Intelektual 100% (Full IP Assignment)
AUDIRA memegang prinsip **Anti-Vendor Lock-in**. Klien yang menyewa atau bermitra dengan AUDIRA berhak atas **100% kepemilikan penuh hak cipta dan kekayaan intelektual (IP)** atas seluruh kode sumber, konfigurasi arsitektur, dan aset digital yang dibuat secara kustom untuk proyek tersebut setelah seluruh kewajiban pembayaran milestone terpenuhi.

---

## 2. Prosedur Serah Terima Proyek (Handover Procedure)

### Tahap 1: User Acceptance Testing (UAT) & Sign-Off
1. Staging deployment diserahkan kepada klien untuk pengujian formal selama 5–7 hari kerja.
2. Seluruh feedback dicatat dalam dokumen *UAT Defect Tracker*.
3. Setelah seluruh kriteria penerimaan terpenuhi, klien menandatangani formulir **Final Acceptance Certificate**.

### Tahap 2: Penyelesaian Pelunasan Invoice (Final Settlement)
1. Tim Finance menerbitkan invoice pembayaran akhir (pelunasan sisa termin).
2. Klien melunasi pembayaran via transfer bank atau payment gateway resmi.
3. Tim Finance mengonfirmasi pelunasan secara tertulis (*Zero Outstanding Balance*).

### Tahap 3: Pemindahan Kepemilikan Kode & Infrastruktur
1. **GitHub Repository Transfer**:
   - Kepemilikan (*Organization Ownership* atau transfer repository) dipindahkan ke akun GitHub resmi milik klien.
2. **Cloud Infrastructure & DNS Transfer**:
   - Akses root VPS/Cloud (AWS, GCP, DigitalOcean, Hetzner, Cloudflare) diserahkan ke email teknis klien.
   - Tim AUDIRA mencabut kredensial sementara dan memastikan tidak ada backdoor.
3. **Dokumentasi Lengkap (*Handover Dossier*)**:
   - `ARCHITECTURE.md`: Diagram alur sistem dan diagram entitas database.
   - `RUNBOOK.md`: Panduan menjalankan sistem di lokal maupun server produksi.
   - `ENV_SECRETS_TEMPLATE.env`: Daftar variabel lingkungan tanpa nilai rahasia.

---

## 3. Garansi Bebas Bug 30 Hari (Post-Launch Bug Warranty)
1. **Masa Berlaku**: Berlaku selama **30 (tiga puluh) hari kalender** terhitung sejak tanggal *Go-Live* resmi.
2. **Cakupan Garansi**:
   - Perbaikan gratis atas seluruh malfungsi fungsional, broken links, crash pada runtime, atau ketidaksesuaian dengan SOW yang telah disepakati.
   - Waktu respons perbaikan bug kritis: **< 4 jam**.
3. **Pengecualian Garansi**:
   - Kerusakan yang diakibatkan oleh perubahan kode langsung yang dilakukan oleh pihak ketiga tanpa persetujuan AUDIRA.
   - Kegagalan API pihak ketiga (*third-party downtime* seperti Google, OpenAI, WhatsApp API).
   - Penambahan fitur baru di luar SOW (*Change Requests*).

---

## 4. Opsi Transisi ke Maintenance Retainer
Setelah periode garansi 30 hari berakhir, klien diberikan opsi transisi mulus ke salah satu paket **Monthly Retainer**:
- **Tier 1: Maintenance & Security SLA ($450/bln)**
- **Tier 2: Dedicated Fullstack Retainer ($1,850/bln)**
- **Tier 3: Batam DC Remote Hands Standby ($650/bln)**
