---
name: audira-isp-network-ops
description: SOP, arsitektur, dan panduan teknis operasional ISP AUDIRA mencakup Manajemen IPAM & Kepatuhan CGNAT UU ITE/Kominfo, Monitoring MRTG & Peringatan Peak Hour, serta Kalkulator Jarak Putus Fiber OTDR & Matriks Splicing Core TIA-598.
---

# AUDIRA ISP Network Operations & Engineering Skill

## 📌 Ringkasan & Domain Operasional
Skill ini merupakan panduan teknis dan operasional untuk Network Operations Center (NOC), Network Engineer, dan Field Splicer pada ekosistem **AUDIRA-NET-BILLING**.
Mencakup tiga pilar utama infrastruktur ISP:
1. **IPAM & Kepatuhan CGNAT (UU ITE & Permen Kominfo)**: Pelacakan port translasi publik ke pelanggan privat.
2. **Monitoring MRTG & Kapasitas Uplink (Peak Hour Management)**: Peringatan dini saturasi bandwidth upstream 95th percentile.
3. **Kalkulasi Jarak Putus Fiber OTDR & Splicing Matrix**: Penentuan presisi lokasi cut kabel optik dan tata kelola warna core TIA-598.

---

## 👥 Kepemilikan & Tata Kelola
- **Brand**: AUDIRA
- **Author & Founder**: Agus Dwi Rianto (AUDIRA)
- **Organization**: Audira Multimedia Digital / Audira Sukses Mandiri
- **Official Domain**: [https://audira.my.id](https://audira.my.id)
- **Email**: [agusdwirianto@gmail.com](mailto:agusdwirianto@gmail.com)

---

## 1. IPAM & Forensik Log CGNAT (Kepatuhan UU ITE & Kominfo)

### A. Alokasi Subnetting ISP
- **CGNAT Pool**: RFC 6598 `100.64.0.0/10` (dialokasikan ke PPPoE / Hotspot residensial via MikroTik IP Pool).
- **Public IP Pool**: Alokasi APJII / IDNIC (misal `103.189.20.0/24`) untuk NAT Overload (SRC-NAT Masquerade dengan Deterministic NAT Port Block Allocation).
- **Static Dedicated Pool**: Subnet `/29` atau `/30` untuk pelanggan korporasi/Dedicated Internet Access (DIA).

### B. Prosedur Investigasi Forensik Hukum (Law Enforcement)
Ketika ada surat resmi dari kepolisian (Bareskrim/Polda) atau Kominfo mengenai aktivitas siber:
1. Ambil 3 parameter utama dari laporan:
   - **Public IP Address** (e.g. `103.189.20.14`)
   - **Source Port / External Port** (e.g. `42189`)
   - **Timestamp Kejadian** (Tanggal, Jam, Menit, Detik WIB)
2. Buka modul `/infrastruktur/ipam` tab **Forensik CGNAT Log**.
3. Sistem mencocokkan log translasi NAT router mikroTik dan radius accounting lease history.
4. Output resmi yang dihasilkan:
   - Identitas Pelanggan (`Customer Name`, `ID Pelanggan`, `Nomor WhatsApp`, `Alamat Pemasangan`).
   - Sesi PPPoE (`Username`, `Private IP`, `MAC Address ONT`, `Router Gateway`, `Session Start/End`).
   - Unduh Berita Acara Temuan Forensik resmi bertandatangan legal ISP.

---

## 2. Monitoring MRTG & Peringatan Peak Hour (Upstream Capacity Management)

### A. Standar Kapasitas & Buffer Bandwidth
- **Normal Load**: Utilisasi < 70% dari total bandwidth upstream.
- **Siaga (Warning)**: Utilisasi 70% - 85% (Kapasitas mulai padat).
- **Kritis (Peak Hour Hazard)**: Utilisasi > 85% (Risiko tinggi bufferbloat, jitter, & packet loss).
- **Peak Hour Range**: Pukul **19:00 - 22:30 WIB** setiap hari.

### B. Formula Tagihan 95th Percentile Billing
- Uplink IP Transit Tier-1 umumnya ditagihkan berbasis *95th percentile burstable billing*.
- Sistem secara berkala mencatat interval 5-menit data Rx/Tx, membuang 5% data trafik tertinggi, dan mengambil titik ke-95 sebagai basis beban tagihan bulanan.

---

## 3. Kalkulator Jarak Putus Fiber OTDR & Splicing Matrix TIA-598

### A. Prosedur Lokasi Kabel Putus (Fiber Cut Location)
1. Tim NOC/Teknisi menembakkan Optical Time Domain Reflectometer (OTDR) dari titik OLT atau ODC pada panjang gelombang 1310nm / 1550nm.
2. Dapatkan event jarak putus kabel (misal `1.450 meter`).
3. Masukkan parameter jarak ke modul `/infrastruktur/otdr`.
4. Sistem menghitung proyeksi koordinat berdasarkan jalur polyline rute kabel di GIS Map.
5. Peta memunculkan penanda bahaya beranimasi (pulsing red) di antara dua tiang terdekat (contoh: antara Tiang T-14 dan Tiang T-15).
6. Admin menerbitkan SPK darurat untuk tim perbaikan fiber optik (splicer team) langsung dari UI.

### B. Standar Kode Warna Serat Optik TIA-598
Dalam 1 Tube (Tabung Serat) terdapat 12 Core dengan urutan warna universal:
1. **Biru** (Blue)
2. **Oranye** (Orange)
3. **Hijau** (Green)
4. **Coklat** (Brown)
5. **Abu-abu** (Slate / Grey)
6. **Putih** (White)
7. **Merah** (Red)
8. **Hitam** (Black)
9. **Kuning** (Yellow)
10. **Ungu** (Violet / Purple)
11. **Merah Muda / Pink** (Rose)
12. **Toska** (Aqua / Cyan)

Status per core:
- **ACTIVE (Hijau)**: Dialirkan sinyal optik normal (Loss < 0.3 dB/km).
- **STANDBY / SPARE (Biru)**: Core cadangan siap pakai.
- **BROKEN / HIGH LOSS (Merah)**: Redaman abnormal (> -28 dBm) atau serat terputus (macro-bend).
- **RESERVED (Kuning)**: Disiapkan untuk ekspansi ODP berikutnya.

---

## 4. Mesin Janji Bayar & Dispensasi Isolir Sementara 24/48 Jam (Grace Period Engine)

### A. Konsep & Arsitektur
Pelanggan yang terisolir akibat tunggakan tagihan jatuh tempo dapat diberikan dispensasi janji bayar sementara (24 jam, 48 jam, 72 jam, atau tanggal kustom):
1. **Persetujuan dari UI**: Operator/NOC mengklik tombol "Beri Janji Bayar" pada `/pelanggan/suspend`.
2. **Pembaruan Basis Data**: Field `isGracePeriod: true`, `promiseDate`, dan `status: 'active'` diperbarui secara atomik.
3. **Eksekusi FreeRADIUS CoA / MikroTik Kick Session**:
   - Backend memicu `RadiusService.disconnectUser(username)` dan `MikrotikService.kickActiveSession(username)`.
   - Modem / ONT pelanggan akan reconnect secara transparan dalam waktu < 2 detik langsung ke paket internet normal.
4. **Notifikasi WhatsApp**: Sistem secara otomatis mengirimkan pesan konfirmasi janji bayar ke nomor WhatsApp pelanggan berisi batas waktu komitmen.

### B. Evaluasi Kedaluwarsa Otomatis (Cron Job 30 Menit)
1. **Jadwal Eksekusi**: `*/30 * * * *` di `BillingCronService.checkExpiredGracePeriods()`.
2. **Aturan Evaluasi**:
   - Sistem mencari pelanggan dengan `isGracePeriod: true` dan `promiseDate < now()`.
   - Jika tagihan masih belum dibayar (`invoices` status UNPAID/OVERDUE/PENDING > 0), pelanggan otomatis dikembalikan ke status `suspended`.
   - Sesi PPPoE diputus seketika via CoA agar modem dialihkan kembali ke profil isolir (Walled Garden).
   - WhatsApp peringatan kedaluwarsa janji bayar dikirimkan ke pelanggan.
   - Jika tagihan telah dilunasi, flag `isGracePeriod` dinonaktifkan tanpa isolir.

### C. Tindakan Pembatalan Segera (Emergency Revocation)
Operator dapat membatalkan dispensasi sewaktu-waktu melalui UI dengan tombol "Batalkan Janji Bayar" (`POST /billing/grace-period/:customerId/cancel`), yang seketika mengisolir kembali koneksi dan memutus sesi PPPoE.

---

## 5. DNS Filtering & Internet Positif Kominfo (UU ITE & TrustPositif)

### A. Arsitektur Sinkhole & Gateway DNS
- **Local Resolvers**: CoreDNS & PowerDNS Cluster (`103.189.20.2` & `103.189.20.3`), latensi < 1.5ms.
- **Upstream TrustPositif Kominfo**: `180.131.144.144` & `180.131.145.145`.
- **Target Sinkhole Walled Garden**: `10.10.10.1`.
- **Sinkronisasi Otomatis**: Dilakukan berkala setiap 6 jam via `POST /dns/sync-trustpositif` (+2.4K domain baru per sync) dan alert otomatis ke Telegram Topic 11 (`⚙️ System & Automation`).

### B. 5 Kategori Penegakan Hukum
1. **Judi Online & Kasino Siber** (Wajib - Instruksi Menkominfo No. 1/2023)
2. **Pornografi & Konten Asusila** (Wajib - UU Pornografi No. 44/2008)
3. **Phishing Finansial & Ransomware** (Wajib - BSSN & CSIRT)
4. **Anti-Bypass DoH / DoT** (Opsional Gateway - Cegah bypass via Cloudflare/Google DoH)
5. **Streaming Bajakan & Pelanggaran HKI** (Permenkumham & Kominfo)

---

## 6. Speedtest Server Lokal & Diagnostic SLA Studio (10Gbps Core Edge)

### A. Arsitektur Benchmark Lokal
- **Core Edge Node**: IDC Duren Tiga / Cikarang Barat terhubung langsung ke OpenIXP & IIX 10Gbps.
- **Protokol**: HTML5 WebSocket multi-threaded benchmark tanpa dependensi flash/Java.
- **Rasio Simetris**: Evaluasi 1:1 Download vs Upload pada kabel fiber optik murni.

### B. AI Root-Cause Diagnostic & E-SLA Certificate
1. **AI Diagnostic Engine**: Memadukan data redaman Rx dBm ONT (via TR-069) dan utilisasi PON OLT untuk mengisolasi kendala fisik vs pembatasan profil MikroTik.
2. **E-SLA Certificate**: Menerbitkan bukti kepatuhan SLA digital berstempel resmi AUDIRA ISP untuk dibagikan ke WhatsApp pelanggan atau dicetak PDF.
3. **Telegram Dispatcher**: Otomatis mengirimkan ringkasan hasil uji lulus ke Telegram Topic 4 (`🌐 Network Monitoring`).

---

## 7. Zero-Touch Provisioning (ZTP) & Discovery Queue

### A. Alur Kerja Deteksi Otomatis (Autonomous Discovery)
1. **Colok Kabel di Lapangan**: Teknisi mencolokkan kabel dropcore fiber optik ke port PON OLT (ZTE C320 / Huawei MA5608T).
2. **Auto-Discovery Queue**: OLT mendeteksi serial number ONT (ZTEG, HWTC, VSOL) dan redaman optik Rx dBm (-15 s/d -24 dBm).
3. **Unassigned Queue**: Muncul di dashboard `/infrastruktur/ztp` dengan indikator status *PENDING_ASSIGNMENT*.

### B. Eksekusi Pipeline 3-Langkah (2.1 Detik)
1. **Step 1 (OLT)**: Alokasi otomatis ONU ID pada PON port yang bersangkutan dan binding VLAN Profil Internet (VLAN 200).
2. **Step 2 (MikroTik Core)**: Pembuatan PPPoE Secret, password unik, dan Simple Queue Rate-Limit sesuai paket pelanggan.
3. **Step 3 (GenieACS TR-069)**: Parameter push nama SSID WiFi rumah (`AUDIRA-Customer-WiFi`) dan enkripsi WPA2-PSK langsung ke chip router WiFi modem.
4. **Telegram Broadcast**: Mengirimkan notifikasi aktivasi resmi instan ke Telegram Topic 8 (`🔌 Installation & Activation`).

---

## 8. Manajemen Gangguan Massal (Mass Outage) & Proactive Broadcast SOP

### A. Klasifikasi Severity Insiden
1. **CRITICAL**: Putus kabel backbone utama, OLT padam total, atau kerusakan BRAS/Core Router. Estimasi dampak: > 50 pelanggan atau area sentral.
2. **HIGH**: Putus kabel feeder FOC ke ODC, trunk distribution cut, atau power failure ODC. Estimasi dampak: 20 - 50 pelanggan.
3. **MEDIUM**: ODP mati lokal, attenuator rusak, atau fiber macro-bend pada jalur branch. Estimasi dampak: 5 - 20 pelanggan.
4. **LOW**: Gangguan kualitas parsial, jitter temporer, atau interferensi sinyal dropcore lokal.

### B. Siklus Penanganan Insiden (Lifecycle State Machine)
- `REPORTED`: Insiden terdeteksi oleh alarm monitoring OLT/MikroTik atau tiket aduan terkelompok.
- `INVESTIGATING`: Tim NOC menembak OTDR dan mengisolasi koordinat titik putus kabel.
- `SPLICING_IN_PROGRESS`: Tim Splicer lapangan berada di tiang/manhole melakukan penyambungan core.
- `MONITORING`: Kabel telah tersambung, verifikasi redaman Rx modem pelanggan (< -24 dBm) selama 15-30 menit.
- `RESOLVED`: Seluruh sesi PPPoE online kembali, insiden ditutup secara resmi.

### C. Proactive WhatsApp Mass Broadcast Engine
1. Begitu insiden dibuat di `/noc/incidents`, sistem memetakan seluruh pelanggan yang terhubung ke ODP/OLT terdampak.
2. Operator memicu **1-Click WhatsApp Broadcast**:
   - Template Dinamis: Menyebutkan Nama Pelanggan, Nomor Insiden (`INC-YYYYMMDD-XXX`), Area/ODP terdampak, Status Terkini, dan Estimasi Waktu Selesai (ETA).
   - Menurunkan eskalasi komplain masuk ke customer service hingga **85%** karena pelanggan diinformasikan secara proaktif sebelum mereka melapor.
3. Begitu status berubah menjadi `RESOLVED`, sistem menyediakan opsi kirim notifikasi pemulihan massal (*Restoration Broadcast*).

### D. Notifikasi Otomatis ke Telegram Operations Hub
Setiap pembuatan insiden dan update status otomatis dikirimkan ke Telegram Supergroup **Topic 5: 🚨 Network Incidents** (Thread ID: 10) lengkap dengan tag severity, jumlah pelanggan terimbas, koordinat insiden, dan penanggung jawab lapangan.

---

## 9. Radar Prediksi Churn AI & Telemetri Degradasi Optik

### A. 4 Dimensi Scoring Churn Pelanggan
Sistem retensi (`/pelanggan/retensi`) menghitung skor risiko (0 - 100) berbasis 4 variabel utama:
1. **Optical Degradation Slope (35%)**:
   - Pengecekan riwayat redaman Rx dBm 30-hari terakhir via TR-069 GenieACS.
   - Peningkatan redaman > 3 dBm dalam 2 pekan (misal dari -19 dBm merayap ke -26 dBm) mengindikasikan konektor kotor, tekukan kabel dropcore, atau mikro-cracking serat optik.
2. **Frekuensi Komplain & Tiket NOC (30%)**:
   - Jumlah tiket gangguan yang diterbitkan dalam 30 hari terakhir. Pelanggan dengan >= 3 tiket dalam sebulan memiliki korelasi churn > 70%.
3. **Stabilitas Sesi PPPoE (20%)**:
   - Flapping rate sesi PPP (sering putus-nyambung > 5x per hari) di router MikroTik.
4. **Pola Keterlambatan Pembayaran (15%)**:
   - Riwayat riil pembayaran tanggal jatuh tempo (sering terisolir / janji bayar berulang).

### B. Tindakan Mitigasi Preventif (Automated Retention Actions)
- **Tingkat CRITICAL (Skor >= 80)**:
  - Tombol **Terbitkan SPK Kalibrasi Optik**: Mengirim teknisi lapangan untuk membersihkan pigtail, re-splicing fast connector, atau mengganti dropcore sebelum pelanggan memutuskan berhenti berlangganan.
  - Tombol **WhatsApp VIP Care**: Menghubungi pelanggan dengan pesan apresiasi dan voucher diskon kompensasi.
- **Tingkat HIGH (Skor 60 - 79)**:
  - Tombol **Kirim Promo Retensi WhatsApp**: Menawarkan promo potongan tagihan loyalitas atau gratis Turbo Booster 2x lipat selama 14 hari.
- **Tingkat MODERATE (Skor 35 - 59)**:
  - Menjalankan TR-069 Self-Healing remote diagnostics dan memantau fluktuasi redaman selama 48 jam ke depan.

---

## 10. Manajemen Remote ONT TR-069 Wi-Fi & Connected Client Radar

### A. Remote Wi-Fi Configuration (Dual-Band 2.4G & 5G)
Operator dapat mengubah konfigurasi Wi-Fi pelanggan langsung dari `/genieacs` tanpa harus datang ke rumah pelanggan atau meminta pelanggan mengakses IP router `192.168.1.1`:
- Parameter TR-069:
  - SSID 2.4GHz: `InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSID`
  - Password 2.4GHz: `InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.KeyPassphrase`
  - SSID 5GHz: `InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.SSID`
  - Password 5GHz: `InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.KeyPassphrase`
- Eksekusi Push: Nilai dikirim via HTTP PUT/POST ke GenieACS NBI API (`/devices/:id/tasks?connection_request`).

### B. Connected Clients Radar (Perangkat Tersambung di Rumah)
- Membaca tabel `AssociatedDevice` pada modem CPE:
  - Mengambil MAC Address, IP lokal yang dialokasikan DHCP, sinyal RSSI (dBm), dan durasi koneksi setiap smartphone/laptop/Smart TV.
  - Membantu NOC mendiagnosis apakah keluhan "internet lemot" disebabkan oleh jumlah perangkat yang berlebihan (over-connected clients) atau sinyal Wi-Fi lemah di sudut rumah pelanggan.

### C. 1-Click Remote ONT Self-Healing Diagnostics
Menyediakan aksi pemulihan otonom:
1. **Reboot Perangkat CPE**: Mengirim instruksi RPC `Reboot` TR-069.
2. **Clear ARP & NAT State**: Me-refresh alokasi tabel routing internal modem.
3. **Flush DNS Cache**: Mengosongkan cache lokal untuk menyelesaikan domain unreachable.
4. **Optical Calibration Polling**: Mengambil sampling parameter optik Rx/Tx secara instan.

---

## 11. BGP Peering & Analisis Efisiensi Biaya Upstream (Traffic Engineering)

### A. Struktur Biaya Upstream ISP
1. **IP Transit Tier-1 (Global Internet)**:
   - Dikenakan biaya per Mbps menggunakan metode **95th Percentile Burstable Billing** (Rp 35.000 - Rp 50.000 / Mbps / bulan).
   - Menghubungkan ke seluruh rute global (Full BGP Routing Table ~950.000 prefixes).
2. **Internet Exchange Point / Peering Lokal (OpenIXP, IIX, CDIX)**:
   - Dikenakan flat port fee bulanan (misal port 10Gbps Rp 5.000.000 - Rp 15.000.000 flat).
   - Biaya per Mbps efektif sangat rendah (Rp 3.500 - Rp 5.000 / Mbps).

### B. Strategi Offload Trafik & Penghematan Finansial
- Dashboard `/infrastruktur/traffic` menyediakan tab **Analisis Biaya & BGP Peering**:
  - Mengukur rasio pembagian trafik: Peering Offload % vs IP Transit %.
  - Menghitung CDR (Committed Data Rate) dan kelebihan burst tagihan 95th percentile.
  - Menyediakan **Slider Interaktif Simulasi Penghematan Peering**: Menunjukkan estimasi penghematan kas bulanan (hingga puluhan juta rupiah) jika persentase peering dinaikkan dari 60% ke 85%.
  - Memberikan rekomendasi rute BGP konkret untuk konten ber-bandwidth besar (Google CDN, Meta Facebook/Instagram, TikTok ByteDance, Netflix Open Connect) agar diutamakan lewat link peering langsung via BGP Local-Preference dan BGP Community filtering.

---

## 12. NetFlow v9/IPFIX & BGP Flowspec Mitigation SOP (RFC 5575 / RFC 8955)

### A. Arsitektur Deteksi & Sensor NetFlow
- **Sensor Exporter**: MikroTik Core Router / Linux Edge Router mengekspor flow UDP ke port `2055` (`NetflowModule`).
- **Sampling Rate**: `1:1000` paket untuk efisiensi CPU Core Router tanpa mengurangi ketajaman deteksi anomali.
- **Deteksi Vektor Serangan DDoS**:
  1. **TCP SYN Flood**: Lonjakan paket SYN tanpa kelanjutan ACK ke target port tertentu (> 50.000 pps).
  2. **UDP Amplification (DNS/NTP/CLDAP)**: Paket balasan berukuran besar dari port 53/123/389 yang diarahkan ke IP target korban.
  3. **ICMP Flood**: Saturasi bandwidth link dengan paket echo request berulang (> 15.000 pps).

### B. Prosedur Operasional Mitigasi BGP Flowspec vs RTBH
1. **Peringatan Otomatis**: Sensor mendeteksi anomali volume (> 100 Mbps atau > 30 kfps) ➔ Alert dikirim instan ke Telegram Topic 5 (`🚨 Network Incidents`).
2. **Opsi 1: BGP Flowspec Injection (Disarankan - Granular Filtering)**:
   - Menginjeksi filter Layer-3/Layer-4 dinamis via RouterOS BGP Flowspec tanpa mematikan seluruh layanan IP korban:
     - Target IP Prefix (e.g. `103.189.20.77/32`)
     - Protocol: `tcp`, `udp`, atau `icmp`
     - Action: `rate-limit` ke `50 Mbps` atau `drop`
   - Link internet pelanggan tetap menyala, hanya paket jahat yang dipangkas di border router.
3. **Opsi 2: RTBH (Remotely Triggered Blackhole - Emergency)**:
   - Digunakan saat volume serangan melampaui kapasitas pipa upstream ISP (> 80% link transit).
   - Mengumumkan prefix `/32` dengan BGP Community Blackhole (e.g. `65535:666` atau `AS:666`) ke upstream provider untuk didrop langsung di core Telco Tier-1.

---

## 13. Studio Waveform .SOR Raw Trace (Telcordia SR-4731 / GR-196)

### A. Standar File .SOR (Standard Optical Reflectometry)
Format biner terkompresi industri serat optik internasional (Telcordia Bellcore SR-4731 / GR-196) yang merekam kurva pelemahan cahaya Rayleigh Backscattering dan pantulan Fresnel Reflection.

### B. Parameter Kunci Analisis Waveform
1. **Panjang Gelombang (Wavelength)**: `1310 nm` (outdoor distribution) atau `1550 nm` (trunk / long-haul & deteksi bending).
2. **Pulse Width**: `10 ns` (resolusi tinggi jarak dekat < 2 km) s/d `1000 ns` (penetrasi jarak jauh > 20 km).
3. **Index of Refraction (IOR / G指数)**: Nilai nominal `1.4677` untuk serat Single Mode G.652D.
4. **Key Events (Katalog Titik Kejadian)**:
   - **Fresnel Reflection (Event Reflektif)**: Konektor mekanik, pigtail adapter, fast connector di ODC/ODP (Ditandai spike tajam ke atas diikuti drop). Nilai ambang Return Loss (ORL) normal: > -45 dB.
   - **Non-Reflective Event (Splice Loss)**: Titik sambungan fusion splicer (Ditandai undakan turun tanpa spike). Toleransi rugi-rugi sambungan standar: `< 0.05 dB` per titik sambung.
   - **Macro-bending**: Pelemahan signifikan yang terlihat pada lambda 1550nm tetapi tidak terlihat pada 1310nm (serat terjepit di tray atau bending radius < 30mm).
   - **Fiber End / Break (EOT - End of Transmission)**: Refleksi tinggi terakhir diikuti penurunan tajam kurva ke dasar noise level (garis dasar ~ -35 dBm). Menunjukkan jarak fisik total kabel atau titik putus fiber cut.

---

## 14. Orkestrasi Kampanye Upgrade Firmware Massal TR-069 (GenieACS)

### A. Safe Maintenance Window Policy
- **Jadwal Eksekusi**: Wajib dilaksanakan pada jam sepi trafik (**02:00 – 04:00 WIB**).
- **Batch Throttling**: Ukuran batch dibatasi **10 – 50 perangkat per interval** (delay 120 detik) untuk mencegah lonjakan trafik download image serentak ke server file / ACS dan meminimalisir kepanikan massal.

### B. Optical Safety Guard (Kunci Anti-Bricking)
Sebelum mengirim RPC `Download` firmware ke modem ONT pelanggan:
1. Sistem mengecek status online & redaman optik terakhir (`Rx Power`).
2. **Aturan Mutlak**: ONT dengan sinyal optik **lebih buruk dari -26.5 dBm** (e.g. -28.0 dBm) atau berstatus unconfirmed **WAJIB DILEWATKAN (SKIP)** secara otomatis.
3. *Alasan Teknis*: Fluktuasi paket data saat flashing firmware pada redaman kritis berisiko 90% menyebabkan firmware corrupt dan modem mengalami gagal boot (bricked/mati total).

### C. Protokol Auto-Rollback
- Jika dalam satu batch persentase kegagalan aktivasi melampaui **15% (Error Threshold)**:
  1. Kampanye seketika di-pause secara otomatis oleh sistem.
  2. Perangkat yang gagal dikirimi RPC rollback ke versi firmware stabil sebelumnya.
  3. Notifikasi darurat dikirim ke Telegram Topic 11 (`⚙️ System & Automation`) agar NOC segera mengevaluasi image binary.

---

## 15. Multi-NAS MikroTik Centralized Balancing & Anycast BNG

### A. Topologi Klaster Multi-Router BNG
- Mengelompokkan router BRAS/BNG (`Core-01`, `Core-02`, `BRAS-East`, `BRAS-West`) ke dalam satu klaster terpusat di `/mikrotik/cluster`.
- **Anycast Default Gateway & VRRP Virtual IP**: `103.189.20.1` aktif dengan sinkronisasi session state.
- **Load Balancing Sesi PPPoE**:
  - Distribusi dinamis berbasis utilisasi CPU router dan ketersediaan IP pool.
  - Sesi diseimbangkan otomatis agar tidak ada router yang melampaui 75% CPU load saat peak hour.

### B. SOP Graceful Session Drain (Pemeliharaan Tanpa Downtime)
Ketika salah satu router BNG harus di-reboot atau diganti modul hardware:
1. Operator menekan tombol **"Graceful Drain Sesi"** pada router target di `/mikrotik/cluster`.
2. Router menaikkan bobot OSPF/BGP metric (cost) ke `65535` agar lalu lintas baru dialihkan ke router partner.
3. Sistem secara bertahap menginstruksikan terminasi sesi PPPoE berulang (maksimal 20 sesi per detik) dengan atribut RADIUS `Session-Timeout=1`, sehingga modem ONT pelanggan otomatis mendial-up ulang dan tersambung ke router BNG partner tanpa merasakan downtime internet.

---

## 16. Studio e-Pelaporan Ditjen PPI Kominfo Regulatory SOP

### A. Dasar Hukum & Kewajiban Penyelenggara Jasa Internet (ISP)
1. **UU No. 11 Tahun 2008 & UU No. 1 Tahun 2024 (UU ITE)**: Kewajiban penyimpanan rekam jejak log komunikasi dan translasi data minimum 3 bulan.
2. **Permen Kominfo No. 5 Tahun 2021**: Standar Kualitas Pelayanan (QoS) Jasa Telekomunikasi dan Kepatuhan Filtering Konten Negatif (TrustPositif).
3. **Surat Edaran Ditjen PPI Kominfo**: Penyampaian Laporan Kinerja Operasi ISP Tahunan dan Semesteran.

### B. 5 Borang Kepatuhan Resmi
- **Borang 1 (IPAM & CGNAT)**: Laporan pemetaan IPv4 Public CIDR, deterministic NAT mapping, RFC 6598 carrier pool, dan retensi log forensik hukum.
- **Borang 2 (Kapasitas Uplink & Transit)**: Ringkasan total bandwidth upstream (IP Transit Tier-1) vs lokal Peering IXP beserta rasio offload data.
- **Borang 3 (Cakupan Wilayah FTTH & Penetrasi)**: Sebaran infrastruktur kabel fiber optik, jumlah ODC/ODP terpasang, port kapasitas versus port terisi per wilayah Kabupaten/Kota.
- **Borang 4 (DNS Filtering Internet Positif)**: Statistik query per detik (QPS), log pengalihan akses domain terlarang ke IP Walled Garden `10.10.10.1`, dan sinkronisasi database TrustPositif Kominfo.
- **Borang 5 (SLA & Standar Kualitas QoS)**: Kinerja ketersediaan jaringan tahunan (Minimum SLA 99.85%), rata-rata kecepatan penanganan gangguan (MTTR < 2.5 jam), rata-rata packet loss (< 0.5%), dan latensi domestik (< 15 ms).
- **Pengesahan & Ekspor**: Tombol cetak PDF resmi pada `/infrastruktur/kominfo` menghasilkan dokumen legal lengkap dengan nomor izin ISP, stempel digital AUDIRA, dan tanda tangan digital Direktur Utama / Author: **Agus Dwi Rianto**.
