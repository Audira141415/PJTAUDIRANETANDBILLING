const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../AUDIRA-BILLING/apps/frontend/src/pages/landing.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const targetFooter = `{/* ─── 10. Comprehensive Corporate & Operational Footer ─────────── */}
      <footer className="bg-[#f0f6fa] dark:bg-[#080d19] text-slate-600 dark:text-gray-400 text-xs py-14 border-t border-[#d8e5ef] dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Column 1: Brand & Author (Spans 2 columns) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center text-white shadow-sm">
                  <Wifi className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                    AUDIRANET
                  </span>
                  <span className="block text-[9px] font-mono tracking-widest text-slate-500 dark:text-gray-400 uppercase">
                    AUDIRA MULTIMEDIA DIGITAL
                  </span>
                </div>
              </div>

              <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-xs max-w-sm">
                AUDIRA-NET adalah platform BSS/OSS manajemen ISP terpadu, otomatisasi isolir MikroTik RADIUS CoA RFC 3576, peta spasial ODP FTTH, dan billing payment gateway 24 jam di bawah naungan Audira Multimedia Digital / Audira Sukses Mandiri.
              </p>

              <div className="font-mono text-[11px] text-slate-600 dark:text-gray-400 space-y-1 pt-1">
                <p>
                  Founder &amp; Author: <strong className="text-slate-900 dark:text-white font-bold">Agus Dwi Rianto (AUDIRA)</strong>
                </p>
                <p>
                  Official Website:{' '}
                  <a
                    href="https://audira.my.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-600 dark:text-cyan-400 hover:underline"
                  >
                    https://audira.my.id
                  </a>
                </p>
                <p>
                  Email:{' '}
                  <a
                    href="mailto:agusdwirianto@gmail.com"
                    className="text-cyan-600 dark:text-cyan-400 hover:underline"
                  >
                    agusdwirianto@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* Column 2: SOLUSI & PAKET LISENSI ISP */}
            <div className="space-y-3">
              <h4 className="text-slate-900 dark:text-white font-mono font-bold uppercase tracking-wider text-xs">
                PAKET LISENSI ISP
              </h4>
              <ul className="space-y-2.5 font-medium">
                <li>
                  <button
                    type="button"
                    onClick={() => openAuthModal('REGISTER', 'starter')}
                    className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors text-left cursor-pointer"
                  >
                    Paket Starter (100 Pelanggan)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => openAuthModal('REGISTER', 'pro')}
                    className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors text-left cursor-pointer"
                  >
                    Paket Pro (500 Pelanggan + GIS)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => openAuthModal('REGISTER', 'enterprise')}
                    className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors text-left cursor-pointer"
                  >
                    Paket Enterprise (Unlimited)
                  </button>
                </li>
                <li>
                  <a
                    href="#arsitektur"
                    className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors block"
                  >
                    Cloud RADIUS CoA &amp; WireGuard
                  </a>
                </li>
                <li>
                  <a
                    href="#ekosistem"
                    className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors block"
                  >
                    Peta Spasial ODP FTTH &amp; OTDR
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: AKSES SISTEM & PORTAL */}
            <div className="space-y-3">
              <h4 className="text-slate-900 dark:text-white font-mono font-bold uppercase tracking-wider text-xs">
                AKSES SISTEM &amp; PORTAL
              </h4>
              <ul className="space-y-2.5 font-medium">
                <li>
                  <a
                    href="http://localhost:3219"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1"
                  >
                    <span>Portal Pelanggan FTTH</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 dark:text-gray-500" />
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => openAuthModal('LOGIN')}
                    className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer text-left"
                  >
                    <span>Dashboard Admin ISP Cockpit</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 dark:text-gray-500" />
                  </button>
                </li>
                <li>
                  <a
                    href="#kalkulator"
                    className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors block"
                  >
                    Kalkulator ROI &amp; Efisiensi
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors block"
                  >
                    Pusat Bantuan &amp; Runbook ISP
                  </a>
                </li>
                <li>
                  <a
                    href="#ekosistem"
                    className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors block"
                  >
                    Aplikasi Mobile Teknisi &amp; Kasir
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: KONTAK OPERASIONAL */}
            <div className="space-y-3">
              <h4 className="text-slate-900 dark:text-white font-mono font-bold uppercase tracking-wider text-xs">
                KONTAK OPERASIONAL
              </h4>
              <div className="space-y-2.5 font-mono text-[11px] text-slate-600 dark:text-gray-400">
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>Jakarta &amp; Bekasi, Indonesia</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>
                    Hotline WA:{' '}
                    <a
                      href="https://wa.me/6282112001600"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-600 dark:text-cyan-400 hover:underline font-bold"
                    >
                      +62 821-1200-1600
                    </a>
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>Layanan NOC: 24 Jam / 7 Hari</span>
                </p>
                <p className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5 pt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Network Status: All POP Online</span>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Compliance Bar */}
          <div className="mt-12 pt-8 border-t border-[#d8e5ef] dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-slate-600 dark:text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} AUDIRA. All rights reserved. Proprietary Commercial Software.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/terms" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition">
                Syarat &amp; Ketentuan
              </Link>
              <span>|</span>
              <Link href="/privacy" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition">
                Kebijakan Privasi
              </Link>
              <span>|</span>
              <a
                href="https://audira.my.id"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-600 dark:hover:text-cyan-400 transition"
              >
                audira.my.id
              </a>
            </div>
          </div>
        </div>
      </footer>`;

const footerStart = content.indexOf('{/* ─── 10. Comprehensive Corporate & Operational Footer ─────────── */}');
const footerEnd = content.indexOf('</footer>', footerStart) + '</footer>'.length;

if (footerStart !== -1 && footerEnd !== -1) {
  content = content.substring(0, footerStart) + targetFooter + content.substring(footerEnd);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated landing.tsx footer to adapted SaaS spec!');
} else {
  console.error('Could not find footer boundaries:', { footerStart, footerEnd });
}

