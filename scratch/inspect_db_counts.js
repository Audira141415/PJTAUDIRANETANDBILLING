const { PrismaClient } = require('f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/backend/node_modules/@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: { url: 'postgresql://audira:audirapassword@localhost:5455/sebilling?schema=public' }
  }
});

async function main() {
  const custCount = await prisma.customer.count();
  const invCount = await prisma.invoice.count();
  const txCount = await prisma.transaction.count();
  const pkgCount = await prisma.package.count({ where: { customerId: { not: null } } });
  const srvCount = await prisma.service.count();
  const tktCount = await prisma.ticket.count();
  const woCount = await prisma.workOrder.count();
  
  console.log('--- DATABASE STATUS ---');
  console.log('Customer Count:', custCount);
  console.log('Invoice Count:', invCount);
  console.log('Transaction Count:', txCount);
  console.log('Customer Packages Count:', pkgCount);
  console.log('Services Count:', srvCount);
  console.log('Tickets Count:', tktCount);
  console.log('WorkOrders Count:', woCount);
}

main().catch(console.error).finally(() => prisma.$disconnect());

