# SOP-01: CLIENT ONBOARDING & SPRINT KICKOFF PROTOCOL

> **Document Code:** AUDIRA-SOP-001  
> **Effective Date:** October 1, 2026 | Revision: 2.4  
> **Applicability:** All New Software Engineering, Digital Studio, and Architectural Projects  
> **Issuing Authority:** Agus Dwi Rianto (Founder & Lead Architect, AUDIRA)

---

## 1. Tujuan & Sasaran (Purpose & Scope)
SOP ini menetapkan alur kerja baku sejak prospek (*lead*) pertama kali diterima melalui formulir kontak, kalender *Discovery Call*, atau estimasi kalkulator harga, hingga proyek resmi dimulai dalam Sprint 0. Prosedur ini menjamin kepastian ruang lingkup, keamanan pembayaran di awal (*upfront commitment*), kepatuhan timeline, dan pembentukan jalur komunikasi profesional.

---

## 2. Diagram Alur Onboarding (Lifecycle Workflow)

```
[ Lead Diterima ] ──▶ [ 20-Min Discovery Call ] ──▶ [ Penyusunan SOW & Arsitektur ]
                             │
                             ▼
[ Kickoff Sprint 0 ] ◀── [ DP 50% Settled ] ◀── [ Tanda Tangan MSA & SOW ]
```

---

## 3. Langkah Operasional (Step-by-Step Procedure)

### Tahap 1: Ingestion & Discovery Call
1. **Verifikasi Lead**: Lead yang masuk melalui `/contact` atau `/pricing` wajib direspons via WhatsApp/Email maksimal dalam **< 4 jam kerja** (SLA < 24 jam).
2. **Jadwalkan Discovery Call (20 Menit)**:
   - Gunakan kalender otomatis Google Meet / WhatsApp Call.
   - Deteksi zona waktu klien secara presisi (WIB, SGT, UTC).
   - Agenda: Menggali objektif bisnis klien, target audiens, deadline peluncuran, dan perkiraan budget.

### Tahap 2: Penyusunan Scope of Work (SOW) & Arsitektur Solusi
1. Lead Architect menyusun dokumen penawaran teknis menggunakan format **SOW-01**:
   - Spesifikasi stack (Next.js 16, Three.js, PostgreSQL/Prisma, Tailwind v4).
   - Daftar modul/fitur fungsional (Milestone Breakdown).
   - Estimasi biaya transparan dengan opsi mata uang (USD, SGD, IDR).
2. Lampirkan dokumen **Master Service Agreement (MSA)** resmi AUDIRA.

### Tahap 3: Pembayaran Komitmen Awal (Deposit)
1. Klien membayar **Deposit 50% Upfront** via metode resmi:
   - Klien Domestik: Bank BCA, Mandiri, atau QRIS Bisnis.
   - Klien Internasional (Singapura/Global): DBS PayLah!, Wise, atau Stripe Escrow.
2. Tim Administrasi menerbitkan *Official Invoiced Receipt* dengan nomor transaksi unik.

### Tahap 4: Provisioning Lingkungan Kerja Proyek (Workspace Setup)
1. **GitHub Organization**: Buat privat repository di bawah `https://github.com/Audira141415/[client-project-name]`.
2. **Undang Klien**: Berikan akses *read/collaborator* kepada CTO atau perwakilan teknis klien.
3. **Komunikasi Khusus**: Buat grup koordinasi di WhatsApp Business atau Slack/Telegram dengan format penamaan: `[AUDIRA-CLIENT] Project Name`.
4. **Project Tracker**: Buat papan Kanban (Linear / Notion / GitHub Project) dengan 4 kolom: *Backlog*, *In Progress*, *Staging/QC*, *Completed*.

### Tahap 5: Kickoff Meeting & Sprint 0
1. Lakukan pertemuan pembukaan 30 menit untuk:
   - Menyepakati kanal konfirmasi mingguan (Weekly Demo setiap Jumat sore).
   - Konfirmasi aset awal (Logo, Brand Book, Akses Domain DNS, Akun Cloud).
   - Menandatangani persetujuan mulai kerja resmi (Sprint 0 Start).

---

## 4. Checklist Kelulusan Onboarding
- [ ] Klien telah menandatangani persetujuan SOW & MSA.
- [ ] Bukti transfer DP 50% telah diverifikasi dan masuk rekening resmi.
- [ ] Private repository GitHub telah dibuat dan terproteksi.
- [ ] Grup komunikasi instan telah aktif dengan kehadiran lead engineer.
- [ ] Jadwal Weekly Review telah tercatat di Google Calendar kedua belah pihak.
