import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.product.findMany({
      include: {
        stockMovements: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 5,
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        stockMovements: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }

  async create(data: any) {
    return this.prisma.product.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async adjustStock(productId: string, quantity: number, type: string, notes?: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    const newStock = product.stock + quantity;

    await this.prisma.stockMovement.create({
      data: {
        productId,
        quantity,
        type,
        notes,
      },
    });

    return this.prisma.product.update({
      where: { id: productId },
      data: {
        stock: newStock,
      },
    });
  }
}
