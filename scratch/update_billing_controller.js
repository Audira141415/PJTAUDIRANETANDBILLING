const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../AUDIRA-BILLING/apps/backend/src/billing/billing.controller.ts');
let code = fs.readFileSync(file, 'utf-8');

const target = `  @Get('invoices-all')
  async getAllInvoices() {
    return this.prisma.invoice.findMany({
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
            internetNumber: true,
            status: true,
          },
        },
        payments: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 100,
    });
  }`;

const replacement = `  @Get('invoices-all')
  async getAllInvoices() {
    return this.prisma.invoice.findMany({
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
            internetNumber: true,
            status: true,
          },
        },
        payments: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 100,
    });
  }

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
  }`;

if (code.includes("@Get('invoices-all')") && !code.includes("@Get('transactions-all')")) {
  code = code.replace(target, replacement);
  fs.writeFileSync(file, code, 'utf-8');
  console.log('Successfully added @Get(transactions-all) to billing.controller.ts!');
} else {
  console.log('Already present or target mismatch.');
}

