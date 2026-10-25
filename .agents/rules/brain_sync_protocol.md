# BRAIN & MEMORY SYNCHRONIZATION PROTOCOL
> **Rule ID**: `BRAIN-SYNC-PORTOFOLIO-01`  
> **Target**: Seluruh AI Agent, Pair Programmer, dan Pengembang di AUDIRA DEV.  
> **Level**: MANDATORY (Wajib Dipatuhi Tanpa Pengecualian).

---

## 1. Tujuan Kebijakan

Dokumen [`.agents/brain/`](file:///f:/AUIDRA-PORTOFOLIO/.agents/brain) dan [`MEMORY.md`](file:///f:/AUIDRA-PORTOFOLIO/MEMORY.md) merupakan **Single Source of Truth (SSOT)** dan **otak memori jangka panjang (Long-Term Memory / LTM)** proyek AUDIRA DEV.

Kebijakan ini dibuat agar seluruh AI Assistant:
1. **Memahami konteks platform studio & portofolio**: Mencegah amnesia arsitektur Next.js 16, breaking changes React 19, konfigurasi database Prisma, dan aturan styling Neo-Brutalism.
2. **Menjaga aktualitas memory**: Memastikan dokumentasi brain selalu diperbarui setiap kali fitur baru selesai ditambahkan atau diubah.

---

## 2. Aturan Siklus Hidup: "READ FIRST, ACT SECOND, UPDATE ON FINISH"

Setiap kali Anda (AI Agent) berinteraksi dengan proyek ini:

### A. Awal Sesi (Wajib Membaca)
1. Baca [`MEMORY.md`](file:///f:/AUIDRA-PORTOFOLIO/MEMORY.md) dan [`.agents/brain/INDEX.md`](file:///f:/AUIDRA-PORTOFOLIO/.agents/brain/INDEX.md).
2. Pahami status sprint terkini, halaman yang aktif, dan gotchas teknis sebelum menulis atau memodifikasi kode.

### B. Selama Eksekusi (Wajib Mematuhi)
1. Periksa [`.agents/brain/FEATURE_CATALOG.md`](file:///f:/AUIDRA-PORTOFOLIO/.agents/brain/FEATURE_CATALOG.md) sebelum membuat file/komponen baru untuk mencegah duplikasi kode.
2. Patuhi pemisahan Server vs Client component di [`.agents/rules/nextjs_app_router_standards.md`](file:///f:/AUIDRA-PORTOFOLIO/.agents/rules/nextjs_app_router_standards.md).
3. Patuhi aturan performa WebGL di [`.agents/rules/threejs_r3f_cyber_performance.md`](file:///f:/AUIDRA-PORTOFOLIO/.agents/rules/threejs_r3f_cyber_performance.md).
4. Patuhi aturan styling di [`.agents/rules/styling_and_neobrutalism.md`](file:///f:/AUIDRA-PORTOFOLIO/.agents/rules/styling_and_neobrutalism.md).

### C. Akhir Sesi / Milestone Selesai (Wajib Memperbarui)
1. **Jika Menambah / Mengubah Halaman atau API**: Daftarkan di [`FEATURE_CATALOG.md`](file:///f:/AUIDRA-PORTOFOLIO/.agents/brain/FEATURE_CATALOG.md).
2. **Jika Menambah / Mengubah Data Portofolio atau Blog**: Perbarui [`PORTFOLIO_AND_SERVICE_MATRIX.md`](file:///f:/AUIDRA-PORTOFOLIO/.agents/brain/PORTFOLIO_AND_SERVICE_MATRIX.md).
3. **Jika Menemukan / Memperbaiki Bug Kritis**: Tambahkan catatan ke seksi *Gotchas, Pitfalls & Solutions* di [`MEMORY.md`](file:///f:/AUIDRA-PORTOFOLIO/MEMORY.md).
4. **Catat Rilis**: Tambahkan ringkasan ke [`UPDATE_HISTORY_AND_ROADMAP.md`](file:///f:/AUIDRA-PORTOFOLIO/.agents/brain/UPDATE_HISTORY_AND_ROADMAP.md).
