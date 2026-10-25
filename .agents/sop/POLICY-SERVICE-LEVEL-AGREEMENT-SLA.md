# POLICY: SERVICE LEVEL AGREEMENT (SLA) & UPTIME COMMITMENT

> **Document Code:** AUDIRA-POLICY-SLA-2026  
> **Status:** Published & Enforceable  
> **Applies to:** Enterprise Hosting, Retainer Subscriptions, and Batam Remote Hands Contracts  
> **Target Availability:** 99.9% Uptime Guarantee

---

## 1. Komitmen Ketersediaan Sistem (Uptime Commitment)
AUDIRA berkomitmen untuk menjaga ketersediaan layanan produksi yang dikelola sekurang-kurangnya **99.9% uptime** per bulan kalender, tidak termasuk jendela pemeliharaan terjadwal (*Scheduled Maintenance Windows* yang diumumkan sekurang-kurangnya 48 jam sebelumnya).

---

## 2. Klasifikasi Insiden & Waktu Respons (Incident Response Matrix)

| Tingkat Keparahan | Deskripsi Insiden | Waktu Respon Awal | Target Pemulihan Solusi |
| :--- | :--- | :--- | :--- |
| **Severity 1 (Kritis)** | Layanan down total, database corrupt, kegagalan transaksi inti bagi seluruh pengguna. | **< 15 Menit** | **< 2 Jam** |
| **Severity 2 (Tinggi)** | Fitur utama mengalami degradasi performa berat, namun sistem dasar tetap bisa diakses. | **< 30 Menit** | **< 6 Jam** |
| **Severity 3 (Sedang)** | Isu visual minor, ketidaknyamanan non-kritis, atau permintaan konfigurasi ringan. | **< 2 Jam** | **< 24 Jam** |
| **Severity 4 (Rendah)** | Pertanyaan konsultasi teknis umum atau usulan fitur masa depan. | **< 4 Jam** | Terjadwal di Sprint Berikutnya |

---

## 3. Komitmen Khusus Batam DC Remote Hands
Untuk pelanggan paket siaga Data Center di Batam (Nongsa Digital Park, Mukakuning, Kabil, Batam Center):
- **Hotline 24/7**: Akses langsung ke Lead Systems Engineer.
- **On-site ETA**: Maksimal **< 120 menit (2 Jam)** teknisi telah tiba di fasilitas data center terhitung sejak tiket darurat dikonfirmasi.
- **Incident Post-Mortem**: Dokumen investigasi penyebab insiden dan tindakan mitigasi diterbitkan dalam waktu **24 jam kerja**.

---

## 4. Kompensasi Service Credits
Apabila AUDIRA gagal memenuhi persentase uptime bulanan yang dijamin, Klien berhak atas kredit tagihan pemotongan biaya retainer bulan berikutnya:
- Uptime 99.0% – 99.8%: Kredit tagihan sebesar **10%** dari biaya retainer bulanan.
- Uptime 95.0% – 98.9%: Kredit tagihan sebesar **25%** dari biaya retainer bulanan.
- Uptime < 95.0%: Kredit tagihan sebesar **50%** dari biaya retainer bulanan.
