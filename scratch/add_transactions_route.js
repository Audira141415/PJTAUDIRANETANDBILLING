const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../AUDIRA-BILLING/apps/backend/src/billing/billing.controller.ts');
let code = fs.readFileSync(file, 'utf-8');

const addition = `

  /**
   * 📊 Seluruh Transaksi Keuangan & Penerimaan Real-time
   * Dipakai oleh halaman Web Admin Keuangan (/finance/pendapatan)
   */
  @Get('transactions-all')
  async getAllTransactions() {
    return this.prisma.transaction.findMany({
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
            internetNumber: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 100,
    });
  }
`;

if (!code.includes("transactions-all")) {
  code = code.replace(/(@Get\('invoices-all'\)[\s\S]*?take:\s*100,[\s\r\n]*\}\);[\s\r\n]*\})/, '$1' + addition);
  fs.writeFileSync(file, code, 'utf-8');
  console.log('Successfully inserted transactions-all into billing.controller.ts');
} else {
  console.log('Already contains transactions-all');
}

