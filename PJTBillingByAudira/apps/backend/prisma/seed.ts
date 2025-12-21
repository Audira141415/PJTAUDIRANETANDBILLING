import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // 1. Create Users
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin AudiraBilling',
      email: 'admin@audira.net',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin',
    },
  });

  console.log('✅ Users created');

  // 2. Create Technicians
  const technician1 = await prisma.technician.create({
    data: {
      name: 'Budi Teknisi',
      phone: '081234567890',
      email: 'budi@audira.net',
      rating: 4.8,
      completedTickets: 150,
      locations: {
        create: {
          latitude: -6.2088,
          longitude: 106.8456,
          accuracy: 10.5,
        },
      },
    },
  });

  const technician2 = await prisma.technician.create({
    data: {
      name: 'Andi Jaringan',
      phone: '081234567891',
      email: 'andi@audira.net',
      rating: 4.9,
      completedTickets: 200,
      locations: {
        create: {
          latitude: -6.1751,
          longitude: 106.8650,
          accuracy: 8.0,
        },
      },
    },
  });

  console.log('✅ Technicians created');

  // 3. Create Packages
  const package10M = await prisma.package.create({
    data: {
      name: 'Home 10 Mbps',
      bandwidth: 10,
      price: 200000,
      description: 'Paket rumahan 10 Mbps unlimited',
      isActive: true,
    },
  });

  const package20M = await prisma.package.create({
    data: {
      name: 'Home 20 Mbps',
      bandwidth: 20,
      price: 350000,
      description: 'Paket rumahan 20 Mbps unlimited',
      isActive: true,
    },
  });

  const package50M = await prisma.package.create({
    data: {
      name: 'Business 50 Mbps',
      bandwidth: 50,
      price: 750000,
      description: 'Paket bisnis 50 Mbps dengan SLA 99.9%',
      isActive: true,
    },
  });

  const package100M = await prisma.package.create({
    data: {
      name: 'Business 100 Mbps',
      bandwidth: 100,
      price: 1500000,
      description: 'Paket bisnis 100 Mbps dengan SLA 99.9%',
      isActive: true,
    },
  });

  console.log('✅ Packages created');

  // 4. Create MikroTik Devices
  const mikrotik1 = await prisma.mikrotik.create({
    data: {
      name: 'Core-Router-JKT01',
      ipAddress: '192.168.1.1',
      username: 'admin',
      password: 'password123',
      port: 8728,
      location: 'Jakarta Pusat',
      isActive: true,
    },
  });

  const mikrotik2 = await prisma.mikrotik.create({
    data: {
      name: 'Distribution-JKT02',
      ipAddress: '192.168.1.2',
      username: 'admin',
      password: 'password123',
      port: 8728,
      location: 'Jakarta Selatan',
      isActive: true,
    },
  });

  console.log('✅ MikroTik devices created');

  // 5. Create ODPs (Optical Distribution Points)
  const odp1 = await prisma.oDP.create({
    data: {
      name: 'ODP-JKT-001',
      location: 'Jl. Sudirman No. 123',
      latitude: -6.2088,
      longitude: 106.8456,
      capacity: 16,
      usedPorts: 12,
      status: 'active',
    },
  });

  const odp2 = await prisma.oDP.create({
    data: {
      name: 'ODP-JKT-002',
      location: 'Jl. Thamrin No. 456',
      latitude: -6.1751,
      longitude: 106.8650,
      capacity: 16,
      usedPorts: 8,
      status: 'active',
    },
  });

  console.log('✅ ODPs created');

  // 6. Create Customers
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        name: 'PT. Maju Jaya',
        email: 'admin@majujaya.com',
        phone: '021-1234567',
        address: 'Jl. Sudirman No. 100, Jakarta',
        virtualAccount: '8001234567890001',
        qrisUrl: 'https://qris.id/majujaya',
        customerType: 'corporate',
        customerSegment: 'vip',
        status: 'active',
        odpId: odp1.id,
        portalAccess: {
          create: {
            username: 'majujaya',
            password: await bcrypt.hash('customer123', 10),
            isActive: true,
            lastLogin: new Date(),
            loginCount: 45,
          },
        },
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Bapak Andi Susanto',
        email: 'andi.susanto@gmail.com',
        phone: '081234567890',
        address: 'Jl. Gatot Subroto No. 25, Jakarta',
        virtualAccount: '8001234567890002',
        qrisUrl: 'https://qris.id/andi',
        customerType: 'residential',
        customerSegment: 'regular',
        status: 'active',
        odpId: odp1.id,
        portalAccess: {
          create: {
            username: 'andi.susanto',
            password: await bcrypt.hash('customer123', 10),
            isActive: true,
            lastLogin: new Date(Date.now() - 86400000), // 1 day ago
            loginCount: 12,
          },
        },
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Ibu Siti Nurhaliza',
        email: 'siti.nurhaliza@yahoo.com',
        phone: '081234567891',
        address: 'Jl. Rasuna Said No. 50, Jakarta',
        virtualAccount: '8001234567890003',
        qrisUrl: 'https://qris.id/siti',
        customerType: 'residential',
        customerSegment: 'regular',
        status: 'active',
        odpId: odp2.id,
        portalAccess: {
          create: {
            username: 'siti.nurhaliza',
            password: await bcrypt.hash('customer123', 10),
            isActive: true,
            lastLogin: new Date(Date.now() - 172800000), // 2 days ago
            loginCount: 8,
          },
        },
      },
    }),
    prisma.customer.create({
      data: {
        name: 'CV. DigitalKreatif',
        email: 'info@digitalkreatif.com',
        phone: '021-9876543',
        address: 'Jl. HR Rasuna Said No. 75, Jakarta',
        virtualAccount: '8001234567890004',
        qrisUrl: 'https://qris.id/digitalkreatif',
        customerType: 'corporate',
        customerSegment: 'vip',
        status: 'active',
        odpId: odp2.id,
        portalAccess: {
          create: {
            username: 'digitalkreatif',
            password: await bcrypt.hash('customer123', 10),
            isActive: true,
            lastLogin: new Date(Date.now() - 3600000), // 1 hour ago
            loginCount: 67,
          },
        },
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Bapak Joko Widodo',
        email: 'joko.widodo@gmail.com',
        phone: '081234567892',
        address: 'Jl. MH Thamrin No. 15, Jakarta',
        virtualAccount: '8001234567890005',
        customerType: 'residential',
        customerSegment: 'trial',
        status: 'suspended',
        autoSuspendDate: new Date(Date.now() - 86400000),
        odpId: odp1.id,
        portalAccess: {
          create: {
            username: 'joko.widodo',
            password: await bcrypt.hash('customer123', 10),
            isActive: false,
            lastLogin: new Date(Date.now() - 604800000), // 7 days ago
            loginCount: 3,
          },
        },
      },
    }),
  ]);

  console.log('✅ Customers created');

  // 7. Create Services
  const services = await Promise.all([
    prisma.service.create({
      data: {
        customerId: customers[0].id,
        packageId: package100M.id,
        mikrotikId: mikrotik1.id,
        status: 'active',
        ipAddress: '10.10.1.100',
        pppoeUsername: 'majujaya@audira',
        pppoePassword: 'pass123',
      },
    }),
    prisma.service.create({
      data: {
        customerId: customers[1].id,
        packageId: package20M.id,
        mikrotikId: mikrotik1.id,
        status: 'active',
        ipAddress: '10.10.1.101',
        pppoeUsername: 'andi@audira',
        pppoePassword: 'pass123',
      },
    }),
    prisma.service.create({
      data: {
        customerId: customers[2].id,
        packageId: package10M.id,
        mikrotikId: mikrotik2.id,
        status: 'active',
        ipAddress: '10.10.2.100',
        pppoeUsername: 'siti@audira',
        pppoePassword: 'pass123',
      },
    }),
    prisma.service.create({
      data: {
        customerId: customers[3].id,
        packageId: package50M.id,
        mikrotikId: mikrotik2.id,
        status: 'active',
        ipAddress: '10.10.2.101',
        pppoeUsername: 'digitalkreatif@audira',
        pppoePassword: 'pass123',
      },
    }),
    prisma.service.create({
      data: {
        customerId: customers[4].id,
        packageId: package10M.id,
        mikrotikId: mikrotik1.id,
        status: 'suspended',
        ipAddress: '10.10.1.102',
        pppoeUsername: 'joko@audira',
        pppoePassword: 'pass123',
      },
    }),
  ]);

  console.log('✅ Services created');

  // 8. Create Billing Schedules
  const billingSchedule = await prisma.billingSchedule.create({
    data: {
      name: 'Monthly Billing',
      dayOfMonth: 1,
      dueDays: 7,
      autoGenerate: true,
      autoSuspend: true,
      suspendAfterDays: 3,
      isActive: true,
    },
  });

  console.log('✅ Billing schedule created');

  // 9. Create Invoices
  const currentMonth = new Date();
  const lastMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
  const lastMonthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0);

  const invoices = [];
  for (let i = 0; i < customers.length; i++) {
    const customer = customers[i];
    const service = services[i];
    const package_ = [package100M, package20M, package10M, package50M, package10M][i];
    
    const subtotal = package_.price;
    const tax = subtotal * 0.11; // PPN 11%
    const amount = subtotal + tax;

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber: `INV-${currentMonth.getFullYear()}${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(i + 1).padStart(4, '0')}`,
        customerId: customer.id,
        billingScheduleId: billingSchedule.id,
        periodStart: lastMonth,
        periodEnd: lastMonthEnd,
        dueDate: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 8),
        subtotal,
        discount: 0,
        tax,
        amount,
        status: i === 4 ? 'overdue' : (i < 2 ? 'paid' : 'unpaid'),
        paidDate: i < 2 ? new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 5) : null,
        isProratedBilling: false,
        items: {
          create: {
            description: `Layanan Internet ${package_.name} - ${lastMonth.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}`,
            quantity: 1,
            unitPrice: package_.price,
            amount: package_.price,
            serviceId: service.id,
            packageId: package_.id,
          },
        },
      },
    });

    invoices.push(invoice);
  }

  console.log('✅ Invoices created');

  // 10. Create Payments (for paid invoices)
  await prisma.payment.create({
    data: {
      invoiceId: invoices[0].id,
      customerId: customers[0].id,
      amount: invoices[0].amount,
      method: 'virtual_account',
      provider: 'midtrans',
      externalId: `TRX-${Date.now()}-001`,
      vaNumber: customers[0].virtualAccount,
      status: 'paid',
      paidAt: invoices[0].paidDate,
      isReconciled: true,
      reconciledAt: invoices[0].paidDate,
      metadata: { bank: 'BCA', channel: 'va' },
    },
  });

  await prisma.payment.create({
    data: {
      invoiceId: invoices[1].id,
      customerId: customers[1].id,
      amount: invoices[1].amount,
      method: 'qris',
      provider: 'xendit',
      externalId: `TRX-${Date.now()}-002`,
      qrisUrl: customers[1].qrisUrl,
      status: 'paid',
      paidAt: invoices[1].paidDate,
      isReconciled: true,
      reconciledAt: invoices[1].paidDate,
      metadata: { qris_acquirer: 'DANA' },
    },
  });

  console.log('✅ Payments created');

  // 11. Create Payment Gateway Configs
  await prisma.paymentGatewayConfig.create({
    data: {
      provider: 'midtrans',
      isActive: true,
      apiKey: 'SB-Mid-server-xxx',
      secretKey: 'SB-Mid-client-xxx',
      merchantId: 'G123456789',
      callbackUrl: 'https://api.audira.net/payments/midtrans/callback',
      webhookUrl: 'https://api.audira.net/payments/midtrans/webhook',
    },
  });

  await prisma.paymentGatewayConfig.create({
    data: {
      provider: 'xendit',
      isActive: true,
      apiKey: 'xnd_development_xxx',
      secretKey: 'xnd_secret_xxx',
      callbackUrl: 'https://api.audira.net/payments/xendit/callback',
      webhookUrl: 'https://api.audira.net/payments/xendit/webhook',
    },
  });

  console.log('✅ Payment gateway configs created');

  // 12. Create WhatsApp Config
  await prisma.whatsAppConfig.create({
    data: {
      provider: 'wablas',
      isActive: true,
      apiKey: 'wablas-api-key-xxx',
      phoneNumber: '6281234567890',
      webhookUrl: 'https://api.audira.net/whatsapp/webhook',
    },
  });

  console.log('✅ WhatsApp config created');

  // 13. Create WhatsApp Templates
  await Promise.all([
    prisma.whatsAppTemplate.create({
      data: {
        name: 'invoice_reminder',
        category: 'billing',
        message: 'Halo {customer_name}, invoice {invoice_number} sebesar Rp {amount} jatuh tempo pada {due_date}. Segera lakukan pembayaran.',
        variables: ['customer_name', 'invoice_number', 'amount', 'due_date'],
        isActive: true,
      },
    }),
    prisma.whatsAppTemplate.create({
      data: {
        name: 'payment_confirmation',
        category: 'billing',
        message: 'Terima kasih {customer_name}, pembayaran Rp {amount} untuk invoice {invoice_number} telah diterima.',
        variables: ['customer_name', 'amount', 'invoice_number'],
        isActive: true,
      },
    }),
    prisma.whatsAppTemplate.create({
      data: {
        name: 'ticket_created',
        category: 'support',
        message: 'Tiket #{ticket_id} telah dibuat. Teknisi akan segera menghubungi Anda. Kategori: {category}',
        variables: ['ticket_id', 'category'],
        isActive: true,
      },
    }),
  ]);

  console.log('✅ WhatsApp templates created');

  // 14. Create Tickets
  await Promise.all([
    prisma.ticket.create({
      data: {
        customerId: customers[1].id,
        technicianId: technician1.id,
        category: 'installation',
        title: 'Instalasi Baru',
        description: 'Mohon instalasi untuk pelanggan baru',
        priority: 'medium',
        status: 'resolved',
        resolvedAt: new Date(Date.now() - 86400000),
        comments: {
          create: [
            {
              userId: technicianUser.id,
              userType: 'technician',
              comment: 'Instalasi telah selesai dilakukan',
            },
          ],
        },
      },
    }),
    prisma.ticket.create({
      data: {
        customerId: customers[2].id,
        technicianId: technician2.id,
        category: 'technical',
        title: 'Internet Lambat',
        description: 'Kecepatan internet tidak sesuai paket',
        priority: 'high',
        status: 'in_progress',
      },
    }),
    prisma.ticket.create({
      data: {
        customerId: customers[3].id,
        category: 'billing',
        title: 'Pertanyaan Tagihan',
        description: 'Ingin konfirmasi tagihan bulan ini',
        priority: 'low',
        status: 'open',
      },
    }),
  ]);

  console.log('✅ Tickets created');

  // 15. Create Network Monitoring Data
  await Promise.all([
    prisma.deviceMonitoring.create({
      data: {
        deviceId: mikrotik1.id,
        deviceType: 'mikrotik',
        cpuUsage: 45.5,
        memoryUsage: 62.3,
        diskUsage: 38.7,
        temperature: 52.0,
        bandwidth: { download: 850.5, upload: 320.8 },
        uptime: 2592000, // 30 days in seconds
        isOnline: true,
        latency: 1.2,
        packetLoss: 0.05,
      },
    }),
    prisma.deviceMonitoring.create({
      data: {
        deviceId: mikrotik2.id,
        deviceType: 'mikrotik',
        cpuUsage: 38.2,
        memoryUsage: 55.8,
        diskUsage: 42.1,
        temperature: 48.5,
        bandwidth: { download: 650.3, upload: 280.4 },
        uptime: 1296000, // 15 days in seconds
        isOnline: true,
        latency: 1.5,
        packetLoss: 0.08,
      },
    }),
  ]);

  console.log('✅ Device monitoring data created');

  // 16. Create Bandwidth Usage
  const today = new Date();
  for (let i = 0; i < customers.length; i++) {
    if (services[i].status === 'active') {
      await prisma.bandwidthUsage.create({
        data: {
          customerId: customers[i].id,
          serviceId: services[i].id,
          date: today,
          downloadBytes: BigInt(Math.floor(Math.random() * 50000000000)), // 0-50GB
          uploadBytes: BigInt(Math.floor(Math.random() * 10000000000)), // 0-10GB
          totalBytes: BigInt(Math.floor(Math.random() * 60000000000)), // 0-60GB
          peakDownload: Math.random() * 100,
          peakUpload: Math.random() * 50,
          sessionCount: Math.floor(Math.random() * 100),
        },
      });
    }
  }

  console.log('✅ Bandwidth usage data created');

  // 17. Create Leads
  await Promise.all([
    prisma.lead.create({
      data: {
        name: 'PT. Teknologi Maju',
        email: 'contact@tekmaju.com',
        phone: '021-5555678',
        address: 'Jl. Kuningan No. 88, Jakarta',
        source: 'website',
        status: 'qualified',
        interestedPackage: 'Business 100 Mbps',
        budget: 2000000,
        assignedTo: adminUser.id,
        notes: 'Tertarik paket bisnis untuk kantor 50 karyawan',
        activities: {
          create: {
            activityType: 'call',
            title: 'Follow up call',
            description: 'Sudah dijelaskan detail paket dan harga',
            performedBy: adminUser.id,
          },
        },
      },
    }),
    prisma.lead.create({
      data: {
        name: 'Ibu Dewi Lestari',
        email: 'dewi.lestari@gmail.com',
        phone: '081234567893',
        address: 'Jl. Kemang Raya No. 45, Jakarta',
        source: 'referral',
        status: 'new',
        interestedPackage: 'Home 20 Mbps',
        budget: 400000,
        notes: 'Referral dari customer Andi Susanto',
      },
    }),
  ]);

  console.log('✅ Leads created');

  // 18. Create Loyalty Points
  await Promise.all([
    prisma.loyaltyPoint.create({
      data: {
        customerId: customers[0].id,
        points: 100,
        type: 'earn',
        reason: 'on_time_payment',
        description: 'Bonus pembayaran tepat waktu 3 bulan berturut-turut',
      },
    }),
    prisma.loyaltyPoint.create({
      data: {
        customerId: customers[1].id,
        points: 50,
        type: 'earn',
        reason: 'referral',
        description: 'Bonus referral customer baru',
      },
    }),
  ]);

  console.log('✅ Loyalty points created');

  // 19. Create Churn Predictions
  await prisma.churnPrediction.create({
    data: {
      customerId: customers[4].id,
      riskScore: 0.85,
      riskLevel: 'high',
      factors: {
        payment_delays: 3,
        complaint_count: 2,
        usage_decrease: '40%',
      },
      recommendations: {
        actions: ['Hubungi customer', 'Tawarkan diskon', 'Survey kepuasan'],
      },
      predictedDate: new Date(Date.now() + 2592000000), // 30 days from now
    },
  });

  console.log('✅ Churn predictions created');

  console.log('');
  console.log('🎉 Seed completed successfully!');
  console.log('');
  console.log('📊 Summary:');
  console.log(`   - ${(await prisma.user.count())} users`);
  console.log(`   - ${(await prisma.technician.count())} technicians`);
  console.log(`   - ${(await prisma.package.count())} packages`);
  console.log(`   - ${(await prisma.mikrotik.count())} MikroTik devices`);
  console.log(`   - ${(await prisma.oDP.count())} ODPs`);
  console.log(`   - ${(await prisma.customer.count())} customers`);
  console.log(`   - ${(await prisma.service.count())} services`);
  console.log(`   - ${(await prisma.invoice.count())} invoices`);
  console.log(`   - ${(await prisma.payment.count())} payments`);
  console.log(`   - ${(await prisma.ticket.count())} tickets`);
  console.log(`   - ${(await prisma.lead.count())} leads`);
  console.log('');
  console.log('🔑 Login credentials:');
  console.log('   Admin: admin@audira.net / admin123');
  console.log('   Technician: budi@audira.net / tech123');
  console.log('   Customer Portal: majujaya / customer123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
