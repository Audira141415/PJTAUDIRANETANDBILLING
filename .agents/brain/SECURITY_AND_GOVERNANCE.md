# SECURITY & GOVERNANCE — AUDIRA DEV
> **Data Privacy, Input Sanitization, Anti-Spam Measures, and Workspace Governance**  
> *Standar Keamanan Aplikasi Web, Proteksi Endpoint Publik, dan Manajemen Lingkungan Kerja.*

---

## 1. Proteksi Endpoint Publik & Anti-Spam

Website portofolio memiliki beberapa titik masukan publik (`/api/contact` dan `/api/newsletter`) yang rentan terhadap bot spam dan input berbahaya:

1. **Penyaringan Input (Input Sanitization)**:
   - Bersihkan tag HTML berbahaya dan karakter spesial dari kolom masukan nama dan pesan.
   - Periksa format email dengan validasi sintaks sebelum melakukan query database.
2. **Batas Ukuran Payload (Payload Size Limitation)**:
   - Tolak request yang memiliki ukuran body JSON melebihi batas wajar (maksimal 50 KB).
3. **Pencegahan Flooding / Spam Throttling**:
   - Jika diperlukan di level produksi, tambahkan rate limiter (berdasarkan IP) atau field honeypot tersembunyi pada formulir kontak untuk memblokir bot otomatis tanpa mengganggu pengalaman pengguna manusia.

---

## 2. Tata Kelola Database & Kredensial Lingkungan

1. **Pemisahan Kredensial Lingkungan (`.env`)**:
   - Variabel `DATABASE_URL` tidak boleh pernah diunggah ke repositori GitHub. File `.gitignore` wajib mengecualikan `.env`, `.env.local`, dan `.env.production`.
2. **Keamanan Parameter Prisma**:
   - Manfaatkan metode Prisma ORM terenkapsulasi yang secara otomatis menggunakan parameterized query untuk mencegah serangan SQL Injection.
3. **Prinsip Hak Akses Minimal**:
   - Role database pengguna web hanya memerlukan izin `SELECT`, `INSERT`, dan `UPDATE` pada tabel publik aplikasi.

---

## 3. Isolasi Multi-Proyek di Workstation Lokal

Di workstation pengembang terdapat beberapa proyek ekosistem Audira yang berjalan secara paralel (`AUDIRA-TOPUPGAME`, `AUDIRA-3D-SIMULATOR`, dan `AUIDRA-PORTOFOLIO`):
- **Port Khusus**: AUDIRA DEV hanya dialokasikan pada port `3447` (frontend) dan `3448` (backend).
- **Stop Script Aman**: Skrip `stop.bat` hanya mematikan proses yang mendengarkan (*listening*) pada port 3447 dan 3448. Dilarang menjalankan perintah global `taskkill /f /im node.exe` yang akan mematikan proses proyek Audira lainnya.
