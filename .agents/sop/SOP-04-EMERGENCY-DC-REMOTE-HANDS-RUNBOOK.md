# SOP-04: BATAM DATA CENTER EMERGENCY REMOTE HANDS RUNBOOK

> **Document Code:** AUDIRA-SOP-004  
> **Effective Date:** October 1, 2026 | Revision: 2.4  
> **Applicability:** Critical Mission Interventions, Physical Rack Interventions & Server Outages in Batam  
> **Coverage Areas:** Nongsa Digital Park (NDP), Mukakuning Industrial Estate, Kabil, Batam Center IDC

---

## 1. Komitmen Service Level Agreement (SLA Tiers)

| Tingkat Keparahan | Definisi Insiden | SLA Respons Kontak | SLA Tiba di Lokasi On-Site |
| :--- | :--- | :--- | :--- |
| **SEV-1 (CRITICAL)** | Server down total, power failure, RAID failure, DC network isolation | **< 15 Menit** | **< 120 Menit (2 Jam)** |
| **SEV-2 (MAJOR)** | Degradasi hardware, link fiber optik flapping, drive failure di RAID array | **< 30 Menit** | **< 4 Jam** |
| **SEV-3 (STANDARD)** | Pemasangan rack baru, audit kabel patch, penggantian RAM berjadwal | **< 2 Jam** | **Terjadwal (Next Business Day)** |

---

## 2. Saluran Dispatch Darurat (Emergency Trigger)
- **Hotline Darurat**: `+62 851-8314-1415` (Panggilan telepon langsung / WhatsApp prioritas)
- **Web Dispatch**: Endpoint API `/api/emergency-dispatch` pada portal `audira.my.id`
- **Email Alert**: `ops@audira.my.id` (dengan format subject `[EMERGENCY SEV-1] [DC Name] [Rack ID]`)

---

## 3. Protokol Operasional Kunjungan Lapangan (Field Runbook)

### Fase 1: Pra-Kedatangan (Preparation & Security Clearance)
1. **Verifikasi Otoritas**: Pastikan tiket intervensi memuat nama fasilitas, nomor rack, serial number server, dan *Letter of Authority (LoA)* resmi dari pemilik aset.
2. **Perlengkapan Wajib**:
   - Tanda pengenal resmi (KTP / Paspor) dan badge teknisi AUDIRA.
   - Toolkit antistatik (Gelang ESD, Sarung tangan antistatik).
   - Crash cart laptop dengan terminal RS-232 / USB console cable dan adapter multi-display.
   - Patch cord Cat6A, modul transreceiver SFP+ 10G/40G, drive caddy spare.

### Fase 2: Akses Fasilitas & Check-in Data Center
1. Laporkan kedatangan di pos security & resepsionis data center (misal: NDP Data Center atau IDC Batam Center).
2. Lakukan registrasi buku tamu, serahkan LoA, dan lewati pintu akses biometrik/mantrap.
3. Hubungi NOC Klien via telepon/WhatsApp untuk memberi tahu bahwa teknisi telah memasuki *White Space / Server Room*.

### Fase 3: Intervensi Rack & Server
1. **Identifikasi Visual**: Temukan nomor rack dan unit server sesuai instruksi tiket. Lakukan verifikasi nomor seri hardware sebelum menyentuh perangkat.
2. **Dokumentasi Pra-Intervensi**: Ambil foto kondisi lampu indikator LED (Power, HDD, Fault LED) sebelum intervensi dilakukan.
3. **Pencegahan Pelepasan Statis**: Wajib mengenakan gelang antistatik (ESD strap) yang terhubung ke grounding grounding rack.
4. **Eksekusi Tugas Lapangan**:
   - Hard power cycle / Cold reboot tombol power server.
   - Pemasangan kabel console untuk investigasi boot error / kernel panic.
   - Penggantian hot-swap Hard Disk / SSD yang degraded.
   - Loopback test kabel fiber optic atau re-seating kabel patch data center.
5. **Konfirmasi NOC**: Minta konfirmasi teknis dari tim pusat klien bahwa perangkat telah kembali online dan responsif melalui jaringan.

### Fase 4: Post-Intervention & Pelaporan (Post-Mortem Incident Report)
1. Foto kondisi akhir rack setelah perangkat dirapikan dan pintu rack terkunci.
2. Check-out dari fasilitas data center.
3. Dalam waktu maksimal **24 jam kerja**, Lead Technician wajib menerbitkan dokumen **Incident Post-Mortem Report** yang memuat:
   - Garis waktu kejadian (Timestamp akurat per kejadian).
   - Root Cause Analysis (Penyebab utama kegagalan).
   - Tindakan perbaikan yang telah dieksekusi di lapangan.
   - Rekomendasi mitigasi pencegahan insiden serupa di masa depan.
