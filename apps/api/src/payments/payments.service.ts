import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async createInvoice(subscriptionId: string, amount: number, dueDate: Date) {
    const invoiceCount = await this.prisma.invoice.count();
    const invoiceNumber = `INV-${new Date().getFullYear()}-${String(invoiceCount + 1).padStart(4, '0')}`;

    return this.prisma.invoice.create({
      data: {
        subscriptionId,
        invoiceNumber,
        amount,
        status: 'SENT',
        dueDate,
      },
    });
  }

  async recordPayment(invoiceId: string, amount: number, method: any, transactionId?: string) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: {
        payments: true,
      },
    });

    const totalPaid = invoice.payments.reduce((sum, p) => sum + Number(p.amount), 0) + amount;
    const isPaid = totalPaid >= Number(invoice.amount);

    await this.prisma.payment.create({
      data: {
        invoiceId,
        amount,
        method,
        transactionId,
      },
    });

    if (isPaid) {
      await this.prisma.invoice.update({
        where: { id: invoiceId },
        data: {
          status: 'PAID',
          paidAt: new Date(),
        },
      });
    }

    return this.prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: {
        payments: true,
      },
    });
  }

  async findInvoicesBySubscription(subscriptionId: string) {
    return this.prisma.invoice.findMany({
      where: { subscriptionId },
      include: {
        payments: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOverdueInvoices(clubId: string) {
    return this.prisma.invoice.findMany({
      where: {
        status: 'SENT',
        dueDate: {
          lt: new Date(),
        },
        subscription: {
          athlete: {
            user: {
              clubId,
            },
          },
        },
      },
      include: {
        subscription: {
          include: {
            athlete: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });
  }
}
