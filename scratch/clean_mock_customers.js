const { PrismaClient } = require('f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/backend/node_modules/@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: { url: 'postgresql://audira:audirapassword@localhost:5455/sebilling?schema=public' }
  }
});

async function cleanMockCustomers() {
  console.log('--- STARTING SAFE MOCK CUSTOMER CLEANUP ---');
  
  // 1. Delete dependent customer relations in topological order
  const delBoosters = await prisma.customerBooster.deleteMany({});
  console.log(`Deleted ${delBoosters.count} customer boosters`);

  const delPayments = await prisma.payment.deleteMany({});
  console.log(`Deleted ${delPayments.count} invoice payments`);

  const delInvoices = await prisma.invoice.deleteMany({});
  console.log(`Deleted ${delInvoices.count} invoices`);

  const delTx = await prisma.transaction.deleteMany({
    where: { customerId: { not: null } }
  });
  console.log(`Deleted ${delTx.count} customer transactions`);

  const delServices = await prisma.service.deleteMany({});
  console.log(`Deleted ${delServices.count} customer services`);

  const delTickets = await prisma.ticket.deleteMany({});
  console.log(`Deleted ${delTickets.count} tickets`);

  const delWorkOrders = await prisma.workOrder.deleteMany({});
  console.log(`Deleted ${delWorkOrders.count} work orders`);

  const delLoyalty = await prisma.loyaltyPoint.deleteMany({});
  console.log(`Deleted ${delLoyalty.count} loyalty points`);

  const delGenie = await prisma.genieAcsDevice.deleteMany({});
  console.log(`Deleted ${delGenie.count} genieacs device associations`);

  const delEquip = await prisma.equipment.deleteMany({
    where: { customerId: { not: null } }
  });
  console.log(`Deleted ${delEquip.count} assigned equipments`);

  const delPackages = await prisma.package.deleteMany({
    where: { customerId: { not: null } }
  });
  console.log(`Deleted ${delPackages.count} customer-assigned packages`);

  const delReferrals = await prisma.referral.deleteMany({});
  console.log(`Deleted ${delReferrals.count} customer referrals`);

  // 2. Delete all mock customers
  const delCustomers = await prisma.customer.deleteMany({});
  console.log(`Deleted ${delCustomers.count} mock customers`);

  console.log('--- MOCK CUSTOMER CLEANUP COMPLETED SUCCESSFULLY ---');
}

if (require.main === module) {
  cleanMockCustomers().catch(console.error).finally(() => prisma.$disconnect());
}

module.exports = { cleanMockCustomers };
