const fs = require('fs');
const path = require('path');

const targetFiles = [
  { file: 'AUDIRA-BILLING/apps/frontend/src/pages/reports/customer.tsx', category: 'Pelanggan' },
  { file: 'AUDIRA-BILLING/apps/frontend/src/pages/reports/executive.tsx', category: 'Eksekutif' },
  { file: 'AUDIRA-BILLING/apps/frontend/src/pages/reports/finance.tsx', category: 'Keuangan' },
  { file: 'AUDIRA-BILLING/apps/frontend/src/pages/reports/invoice.tsx', category: 'Invoice' },
  { file: 'AUDIRA-BILLING/apps/frontend/src/pages/reports/marketing.tsx', category: 'Marketing' },
  { file: 'AUDIRA-BILLING/apps/frontend/src/pages/reports/package.tsx', category: 'Paket Internet' },
  { file: 'AUDIRA-BILLING/apps/frontend/src/pages/reports/payment.tsx', category: 'Pembayaran' },
  { file: 'AUDIRA-BILLING/apps/frontend/src/pages/reports/revenue.tsx', category: 'Pendapatan' },
  { file: 'AUDIRA-BILLING/apps/frontend/src/pages/reports/sales.tsx', category: 'Sales & Kemitraan' },
  { file: 'AUDIRA-BILLING/apps/frontend/src/pages/reports/subscription.tsx', category: 'Langganan' },
  { file: 'AUDIRA-BILLING/apps/frontend/src/pages/reports/whatsapp.tsx', category: 'WhatsApp' },
  { file: 'AUDIRA-BILLING/apps/frontend/src/pages/whatsapp/reports.tsx', category: 'WhatsApp Gateway' }
];

console.log('Upgrading 12 report files to eliminate empty TabPlaceholder...');

for (const target of targetFiles) {
  const fullPath = path.resolve(target.file);
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    continue;
  }

  let code = fs.readFileSync(fullPath, 'utf8');

  // 1. Add import if not present
  if (!code.includes('ReportSubTabDetail')) {
    code = code.replace(
      /import Layout from ['"]@\/components\/Layout['"];?/,
      `import Layout from '@/components/Layout';\nimport ReportSubTabDetail from '@/components/ReportSubTabDetail';`
    );
  }

  // 2. Replace TabPlaceholder usage
  code = code.replace(
    /<TabPlaceholder\s+name=\{\s*(?:activeTab|tab)\s*\}\s*\/>/g,
    `<ReportSubTabDetail tabName={activeTab} category="${target.category}" />`
  );

  // 3. Remove or replace TabPlaceholder function definition
  const tabPlaceholderRegex = /function TabPlaceholder\s*\(\{[^}]*\}\s*:\s*\{[^}]*\}\)\s*\{[\s\S]*?^\}/m;
  if (tabPlaceholderRegex.test(code)) {
    code = code.replace(tabPlaceholderRegex, '// TabPlaceholder replaced by ReportSubTabDetail');
  }

  fs.writeFileSync(fullPath, code, 'utf8');
  console.log(`✅ Upgraded: ${target.file} (Category: ${target.category})`);
}

console.log('\nAll 12 files successfully upgraded with ReportSubTabDetail!');
