const path = require('path');
const { PrismaClient } = require(path.join(__dirname, '..', 'AUDIRA-BILLING', 'apps', 'backend', 'node_modules', '@prisma', 'client'));

const prisma = new PrismaClient();

async function main() {
  const tickets = await prisma.ticket.findMany({
    include: {
      customer: { select: { id: true, name: true, phone: true } },
      technician: { select: { id: true, name: true, phone: true } }
    },
    orderBy: { createdAt: 'desc' }
  });
  console.log(`TOTAL_TICKETS: ${tickets.length}`);
  console.log(JSON.stringify(tickets, null, 2));

  const technicians = await prisma.technician.findMany({
    select: { id: true, name: true, phone: true, status: true }
  });
  console.log(`TOTAL_TECHNICIANS: ${technicians.length}`);
  console.log(JSON.stringify(technicians, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
