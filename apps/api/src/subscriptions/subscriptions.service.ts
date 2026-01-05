import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  async findByClub(clubId: string) {
    return this.prisma.subscriptionPlan.findMany({
      where: { clubId },
    });
  }

  async findOne(id: string) {
    return this.prisma.subscription.findUnique({
      where: { id },
      include: {
        athlete: {
          include: {
            user: true,
          },
        },
        plan: true,
        invoices: true,
      },
    });
  }

  async createPlan(data: any) {
    return this.prisma.subscriptionPlan.create({ data });
  }

  async createSubscription(data: any) {
    return this.prisma.subscription.create({
      data,
      include: {
        athlete: {
          include: {
            user: true,
          },
        },
        plan: true,
      },
    });
  }

  async updateSubscription(id: string, data: any) {
    return this.prisma.subscription.update({
      where: { id },
      data,
    });
  }

  async cancelSubscription(id: string) {
    return this.prisma.subscription.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        endDate: new Date(),
      },
    });
  }
}
