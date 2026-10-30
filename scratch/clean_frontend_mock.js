const fs = require('fs');

// 1. Clean index.tsx
const indexPath = 'f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/index.tsx';
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Replace default state initialization
indexContent = indexContent.replace(
  'const [customers, setCustomers] = useState<any[]>(initialDemoCustomers)',
  'const [customers, setCustomers] = useState<any[]>([])'
);
indexContent = indexContent.replace(
  'const [invoices, setInvoices] = useState<any[]>(initialDemoInvoices)',
  'const [invoices, setInvoices] = useState<any[]>([])'
);

// Replace loadDashboardData conditions
indexContent = indexContent.replace(
  "if (custList.status === 'fulfilled' && Array.isArray(custList.value) && custList.value.length > 0) {",
  "if (custList.status === 'fulfilled' && Array.isArray(custList.value)) {"
);
indexContent = indexContent.replace(
  "if (invList.status === 'fulfilled' && Array.isArray(invList.value) && invList.value.length > 0) {",
  "if (invList.status === 'fulfilled' && Array.isArray(invList.value)) {"
);

// Replace onSyncCustomers in FirstTimeSetupWizard
indexContent = indexContent.replace(
  `          onSyncCustomers={async () => {
            setCustomers(initialDemoCustomers)
            showToast('8 Akun PPPoE berhasil diimpor ke CRM Billing!', 'success')
          }}`,
  `          onSyncCustomers={async () => {
            await loadDashboardData(false)
            showToast('Sinkronisasi akun PPPoE dari database/router selesai!', 'success')
          }}`
);

// Replace empty banner
const oldBanner = `{/* ─── Demo / Simulation Action Banner (When Data Empty) ─────────────── */}
        {customers.length === 0 && invoices.length === 0 && (
          <div className="p-4 rounded-xl bg-[var(--app-card)] border border-[var(--app-primary-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-600 text-white">
                <Info size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--app-text)] uppercase tracking-wider">
                  Mode Inisialisasi Sistem: Uji Coba Cepat
                </p>
                <p className="text-xs text-[var(--app-text-muted)] mt-0.5">
                  Database masih kosong. Aktifkan data simulasi pelanggan, invoice, dan router untuk menguji seluruh tombol dan filter dashboard.
                </p>
              </div>
            </div>
            <button
              onClick={handleActivateDemoData}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition cursor-pointer active:scale-95 flex items-center gap-1.5 flex-shrink-0"
            >
              <Zap size={14} />
              <span>Aktifkan Data Simulasi &amp; Uji Coba</span>
            </button>
          </div>
        )}`;

const newBanner = `{/* ─── Clean Empty State Banner (When Customer & Invoice Empty) ─── */}
        {customers.length === 0 && invoices.length === 0 && (
          <div className="p-4 rounded-xl bg-[var(--app-card)] border border-[var(--app-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                <Users size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--app-text)] uppercase tracking-wider">
                  Database Bersih &amp; Siap untuk Pelanggan Riil
                </p>
                <p className="text-xs text-[var(--app-text-muted)] mt-0.5">
                  Belum ada pelanggan terdaftar. Tambahkan pelanggan baru atau hubungkan router MikroTik untuk menarik sesi PPPoE aktif.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowQuickCustomerModal(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition cursor-pointer active:scale-95 flex items-center gap-1.5 flex-shrink-0 shadow-xs"
              >
                <Plus size={14} />
                <span>+ Tambah Pelanggan Pertama</span>
              </button>
            </div>
          </div>
        )}`;

if (indexContent.includes('Mode Inisialisasi Sistem: Uji Coba Cepat')) {
  // Replace the block
  const startIdx = indexContent.indexOf('{/* ─── Demo / Simulation Action Banner');
  const endIdx = indexContent.indexOf('{/* ─── 1B. Carrier-Grade');
  if (startIdx !== -1 && endIdx !== -1) {
    indexContent = indexContent.substring(0, startIdx) + newBanner + '\n\n        ' + indexContent.substring(endIdx);
  }
}

fs.writeFileSync(indexPath, indexContent, 'utf8');
console.log('1. Cleaned index.tsx successfully!');

// 2. Clean suspend.tsx
const suspendPath = 'f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/pelanggan/suspend.tsx';
let suspendContent = fs.readFileSync(suspendPath, 'utf8');

const demoSampleStart = suspendContent.indexOf('// Add a couple of sample demonstration items if database has only 1 or 2 items');
if (demoSampleStart !== -1) {
  const demoSampleEnd = suspendContent.indexOf('setCustomers(mappedList)', demoSampleStart);
  if (demoSampleEnd !== -1) {
    suspendContent = suspendContent.substring(0, demoSampleStart) + suspendContent.substring(demoSampleEnd);
    fs.writeFileSync(suspendPath, suspendContent, 'utf8');
    console.log('2. Cleaned suspend.tsx demo injection successfully!');
  }
}

// 3. Clean loyalty.tsx
const loyaltyPath = 'f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/pelanggan/loyalty.tsx';
let loyaltyContent = fs.readFileSync(loyaltyPath, 'utf8');

loyaltyContent = loyaltyContent.replace(
  'const [customers, setCustomers] = useState<CustomerLoyaltyItem[]>(\n    SEED_LOYALTY_CUSTOMERS\n  );',
  'const [customers, setCustomers] = useState<CustomerLoyaltyItem[]>([]);'
);
loyaltyContent = loyaltyContent.replace(
  'const [customers, setCustomers] = useState<CustomerLoyaltyItem[]>(\r\n    SEED_LOYALTY_CUSTOMERS\r\n  );',
  'const [customers, setCustomers] = useState<CustomerLoyaltyItem[]>([]);'
);

loyaltyContent = loyaltyContent.replace(
  'let mergedCustomers = SEED_LOYALTY_CUSTOMERS;',
  'let mergedCustomers: CustomerLoyaltyItem[] = [];'
);

fs.writeFileSync(loyaltyPath, loyaltyContent, 'utf8');
console.log('3. Cleaned loyalty.tsx seed mock successfully!');

console.log('ALL FRONTEND MOCK DATA CLEANED!');

