import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class KeuanganService {
  constructor(private prisma: PrismaService) {}

  async findAllInvoices() {
    return this.prisma.invoice.findMany({
      include: {
        customer: true,
        payments: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getStats() {
    const invoices = await this.prisma.invoice.findMany();
    
    const totalRevenue = invoices
      .filter(i => i.status === 'paid')
      .reduce((sum, i) => sum + i.amount, 0);
    
    const unpaidAmount = invoices
      .filter(i => i.status === 'unpaid')
      .reduce((sum, i) => sum + i.amount, 0);
    
    const overdueAmount = invoices
      .filter(i => i.status === 'overdue')
      .reduce((sum, i) => sum + i.amount, 0);
    
    const paidCount = invoices.filter(i => i.status === 'paid').length;

    return {
      totalRevenue,
      unpaidAmount,
      overdueAmount,
      paidCount,
      totalInvoices: invoices.length
    };
  }

  async findInvoice(id: string) {
    return this.prisma.invoice.findUnique({
      where: { id },
      include: {
        customer: true,
        payments: true
      }
    });
  }

  async createInvoice(data: any) {
    return this.prisma.invoice.create({
      data: {
        invoiceNumber: data.invoiceNumber,
        amount: data.amount,
        dueDate: new Date(data.dueDate),
        status: data.status || 'unpaid',
        description: data.description,
        customerId: data.customerId
      }
    });
  }

  async createPayment(data: any) {
    const payment = await this.prisma.payment.create({
      data: {
        invoiceId: data.invoiceId,
        amount: data.amount,
        paymentMethod: data.method,
        paymentDate: new Date(),
        status: data.status || 'success',
        transactionId: data.transactionId,
        description: data.description,
      }
    });

    // Update invoice status if payment is successful
    if (data.status === 'success') {
      await this.prisma.invoice.update({
        where: { id: data.invoiceId },
        data: {
          status: 'paid',
          paidAt: new Date()
        }
      });
    }

    return payment;
  }

  async updateInvoice(id: string, data: any) {
    return this.prisma.invoice.update({
      where: { id },
      data
    });
  }
}
