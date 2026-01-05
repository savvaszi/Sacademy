import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SponsorsService {
  constructor(private prisma: PrismaService) {}

  async findByClub(clubId: string) {
    return this.prisma.sponsor.findMany({
      where: { clubId },
      include: {
        offers: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.sponsor.findUnique({
      where: { id },
      include: {
        offers: true,
      },
    });
  }

  async create(data: any) {
    return this.prisma.sponsor.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.sponsor.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.sponsor.delete({ where: { id } });
  }

  async createOffer(data: any) {
    return this.prisma.sponsorOffer.create({ data });
  }
}
