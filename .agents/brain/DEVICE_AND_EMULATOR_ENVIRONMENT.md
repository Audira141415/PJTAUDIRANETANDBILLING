# DEVICE & EMULATOR ENVIRONMENT — MULTI-PROJECT ISOLATION

> **Status:** ACTIVE & PERMANENT DIRECTIVE  
> **Author & Maintainer:** Agus Dwi Rianto (AUDIRA)  
> **Official Domain:** https://audira.my.id  

---

## 📌 1. Workstation Multi-Project Emulator Mapping

Pada workstation pengembang, terdapat beberapa emulator Android yang dapat berjalan secara simultan untuk proyek-proyek berbeda:

| AVD Name | Target Proyek | Repositori / Folder | Kebijakan Akses untuk AUDIRA-NET-BILLING |
| :--- | :--- | :--- | :--- |
| **`ISP`** | **AUDIRA-NET-BILLING** | `f:\AUDIRA-NET-BILLING\AUDIRA-NET` | **EMULATOR RESMI PROYEK INI**. Seluruh pengujian Flutter wajib ke sini. |
| **`MDA`** | AUDIRA-KOMIK-MDA | `f:\AUDIRA-KOMIK-MDA` | **DILARANG KERAS DISENTUH / DIGUNAKAN**. Milik proyek Comic Reader. |
| **`DC`** | AUDIRA-DCOS | Proyek Data Center OS | **DILARANG KERAS DISENTUH / DIGUNAKAN**. Milik proyek Data Center. |

---

## ⚠️ 2. Aturan Isolasi Mutlak (Non-Negotiable)

1. **Jangan Pernah Menggunakan Port / Device ID Statis**:
   - Device ID Android Emulator (`emulator-5554`, `emulator-5556`, `emulator-5558`) dialokasikan secara dinamis oleh Android SDK tergantung urutan booting.
   - Misalnya: jika emulator `MDA` dinyalakan lebih dulu, ia mendapat `emulator-5554`. Jika `DC` menyusul, ia mendapat `emulator-5556`. Emulator `ISP` kemudian mendapat `emulator-5558`.
   - **TIDAK BOLEH** berasumsi bahwa `emulator-5554` adalah `ISP`!
2. **Validasi Berdasarkan Nama AVD**:
   - Target emulator WAJIB diverifikasi dengan perintah:
     ```cmd
     adb -s <device_id> emu avd name | findstr /V /I "^OK"
     ```
   - Hanya device yang mengembalikan nilai **`ISP`** yang boleh dihubungkan, dikonfigurasi reverse port, atau dideploy aplikasi Flutter.
3. **Pencegahan Gangguan Proyek Lain**:
   - Jika mendeteksi emulator `MDA` atau `DC`, skrip atau agen otomatis harus mencetak log `[SKIP]` dan sama sekali tidak mengirim perintah `adb reverse`, `install`, atau `flutter run`.

---

## 🚀 3. Skrip Peluncur Terverifikasi

Skrip peluncur resmi yang sudah mengimplementasikan aturan isolasi ini secara otomatis:
- `f:\AUDIRA-NET-BILLING\start_app.bat` (Root Launcher)
- `f:\AUDIRA-NET-BILLING\star_app.bat` (Root Alias)
- `f:\AUDIRA-NET-BILLING\AUDIRA-NET\start_app.bat` (Mobile Sub-directory Launcher)
- `f:\AUDIRA-NET-BILLING\AUDIRA-NET\star_app.bat` (Mobile Sub-directory Alias)

Semua skrip di atas secara otomatis:
1. Mendeteksi seluruh emulator yang aktif.
2. Memeriksa nama AVD masing-masing emulator.
3. Melewatkan emulator proyek lain (`MDA`, `DC`).
4. Mengunci target ke emulator dengan AVD bernama **`ISP`**.
5. Mengatur reverse port `3218` (NestJS API), `3217` (Admin Portal), dan `3219` (Customer Portal).
6. Membuka layar emulator ISP dan meluncurkan `flutter run -d <TARGET_EMU_ISP>`.
