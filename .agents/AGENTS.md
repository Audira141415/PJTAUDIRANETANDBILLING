# AGENTS Guidelines & Project Governance

## 📌 Project Overview & Ownership
- **Brand**: AUDIRA
- **Founder & Author**: Agus Dwi Rianto (AUDIRA)
- **Organization**: Audira Multimedia Digital / Audira Sukses Mandiri
- **Official Domain**: [https://audira.my.id](https://audira.my.id)
- **Official Email**: [agusdwirianto@gmail.com](mailto:agusdwirianto@gmail.com)

AUDIRA is an ecosystem of digital products, AI-powered applications, automation systems, and technology solutions developed under the AUDIRA brand.
All product names, source code, designs, and associated intellectual property are subject to proprietary ownership rights and applicable commercial licenses.

---

## ⚖️ License Policy (Proprietary & Commercial)
1. **Strictly Proprietary**: This codebase is governed by the AUDIRA Commercial & Proprietary Software License (`LICENSE`).
2. **Confidentiality & Security**: Agents must never expose or commit sensitive credentials, passwords, JWT secrets, Mikrotik passwords, WhatsApp API tokens, payment gateway secret keys, or private API keys to git or public documentation.
3. **Attribution & Copyright**: Preserve all copyright headers and notices attributing ownership to Agus Dwi Rianto / Audira Multimedia Digital / Audira Sukses Mandiri.

---

## 👥 Developer & Official Contact Directory
Any questions, bug disclosures, partnership inquiries, or commercial licensing requests should be directed to the official channels below:

| Role / Purpose | Channel / Details |
| :--- | :--- |
| **Founder & Author** | Agus Dwi Rianto (AUDIRA) |
| **Organization** | Audira Multimedia Digital / Audira Sukses Mandiri |
| **Official Production Domain** | [https://audira.my.id](https://audira.my.id) |
| **Official Email** | [agusdwirianto@gmail.com](mailto:agusdwirianto@gmail.com) |
| **Business Partnership** | Contact official email above |
| **General Support** | Contact official email above |
| **Security & Vulnerability Reports** | Contact official email above |
| **WhatsApp Hotline** | [+62 821-1200-1600](https://wa.me/6282112001600) |
| **Telegram Community** | To be announced |
| **Discord Server** | To be announced |

---

## 🔐 Security & Responsible Disclosure
For security reports:
- Always include a clear description of the vulnerability, potential impact, and reproduction steps.
- Do NOT include live credentials, passwords, API keys, or sensitive customer data in reports.

---

## 📱 Multi-Project Android Emulator Isolation Directive (STRICT)
1. **Target Emulator Name**: Proyek `AUDIRA-NET-BILLING` (klien Flutter `AUDIRA-NET`) **HANYA BOLEH** dijalankan pada Android Emulator dengan AVD bernama **`ISP`**.
2. **Isolasi Proyek Lain**: Emulator dengan AVD seperti **`MDA`** (proyek Comic Reader) atau **`DC`** (proyek Data Center OS) adalah milik proyek lain yang berjalan bersamaan di host.
3. **Aturan Mutlak**:
   - **DILARANG KERAS** menggunakan, meluncurkan aplikasi, melakukan `adb reverse`, mematikan, atau mengganggu emulator selain yang bernama **`ISP`**.
   - Skrip peluncur resmi adalah [start_app.bat](file:///f:/AUDIRA-NET-BILLING/start_app.bat) atau aliasnya [star_app.bat](file:///f:/AUDIRA-NET-BILLING/star_app.bat). Skrip ini secara otomatis memvalidasi AVD name via `adb -s <id> emu avd name` dan melewatkan (`SKIP`) emulator `MDA`, `DC`, atau emulator proyek lainnya.

