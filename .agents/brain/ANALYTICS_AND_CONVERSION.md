# ANALYTICS & OPERATIONAL TELEMETRY — AUDIRA-NET & BILLING

> **Master Guide for ISP Operational Metrics, Telemetry KPIs, Financial Health, and SLA Performance**  
> *Standar Evaluasi Kinerja Bisnis ISP, Kesehatan Sinyal Optik, dan Efektivitas Penagihan.*  
> **Author & Maintainer:** Agus Dwi Rianto (AUDIRA)  

---

## 1. Indikator Kinerja Finansial & Bisnis ISP (Business KPIs)

Dashboard Utama (`/` atau `/dashboard/billing`) memantau metrik finansial secara real-time:

| Metrik | Definisi & Formula | Target Standar | Makna Operasional |
| :--- | :--- | :--- | :--- |
| **MRR** (Monthly Recurring Revenue) | $\sum (\text{Harga Paket} \times \text{Pelanggan Aktif})$ | Pertumbuhan > 5% / bulan | Total pendapatan berulang bulanan dari langganan internet. |
| **ARPU** (Average Revenue Per User) | $\frac{\text{Total MRR}}{\text{Total Pelanggan Aktif}}$ | > Rp 250.000 / user | Rata-rata belanja bulanan tiap pelanggan. |
| **Collection Rate** (Tingkat Ketagihan)| $\frac{\text{Invoice Terbayar (Paid)}}{\text{Total Invoice Terbit}} \times 100\%$ | > 92% per tanggal 15 | Efektivitas penagihan sebelum jatuh tempo isolir. |
| **Churn Rate** | $\frac{\text{Pelanggan Berhenti}}{\text{Total Pelanggan Awal Bulan}} \times 100\%$ | < 1.5% / bulan | Tingkat retensi dan kepuasan pelanggan terhadap layanan. |
| **PSB Conversion** | $\frac{\text{Pemasangan Selesai}}{\text{Calon Pelanggan Mendaftar}} \times 100\%$ | > 85% | Kecepatan survei dan penarikan kabel dropcore teknisi. |

---

## 2. Telemetri Jaringan & Kualitas Sinyal Optik (Network Telemetry)

Modul NOC dan integrasi TR-069 GenieACS memantau parameter fisik jaringan:

| Parameter Fisik | Rentang Normal / Optimal | Ambang Batas Waspada (Warning) | Tindakan Operasional |
| :--- | :--- | :--- | :--- |
| **Optical RX Power (ONT)** | `-15.0 dBm` s/d `-24.0 dBm` | `> -27.0 dBm` (Redaman Tinggi) | Alarm otomatis ke NOC, terbitkan tiket inspeksi kabel/splicing ODP. |
| **Optical TX Power (ONT)** | `+1.5 dBm` s/d `+5.0 dBm` | `< +1.0 dBm` (Laser Lemah) | Jadwalkan penggantian unit ONT modem. |
| **Ping Latency (Gateway)**| `< 15 ms` (Koneksi Lokal) | `> 40 ms` (Jitter / Latency Spike) | Periksa bottleneck bandwidth interface MikroTik atau link OLT. |
| **Packet Loss** | `0.0%` | `> 1.0%` | Investigasi kabel optik bengkok (*microbending*) atau konektor kotor. |
| **OLT Uplink Load** | `< 75%` Kapasitas Port | `> 85%` Utilisasi Puncak | Rencanakan upgrade bandwidth backbone (*LACP / 10G link*). |

---

## 3. Metrik SLA Layanan Lapangan & Tiket (Field Service SLA)

| Metrik SLA | Standar Target | Penanggung Jawab |
| :--- | :--- | :--- |
| **Waktu Respons Tiket (Initial Response)** | < 15 Menit | Helpdesk & Customer Service (CS) |
| **MTTR (Mean Time To Resolve Gangguan)** | < 4 Jam (Pelanggan Bisnis: < 2 Jam) | Tim Teknisi Jaringan & Splicer |
| **Durasi Pemasangan Baru (PSB Lead Time)** | < 24 Jam sejak pembayaran registrasi | Koordinator Teknisi Lapangan |
| **Tingkat Penyelesaian Pertama (FCR)** | > 80% tanpa kunjungan ulang teknisi | Teknisi Lapangan & NOC Support |

---

## 4. Efektivitas Notifikasi Otomatis WhatsApp (Gateway Metrics)

- **Delivery Rate**: Persentase pesan notifikasi WhatsApp Fonnte yang berhasil terkirim ke ponsel pelanggan (Target: > 98%).
- **Reminder to Payment Velocity**: Rata-rata jam/hari antara penerimaan pesan WA tagihan hingga invoice berstatus `PAID` (Target: < 48 jam).
- **Auto-Reply Containment**: Jumlah pertanyaan umum (cek tagihan, nomor rekening, info isolir) yang diselesaikan oleh chatbot WhatsApp tanpa campur tangan staf CS.
