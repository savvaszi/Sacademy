import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClubsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.club.findMany();
  }

  async findOne(id: string) {
    return this.prisma.club.findUnique({
      where: { id },
      include: {
        facilities: true,
        teams: true,
        ageGroups: true,
      },
    });
  }

  async create(data: any) {
    return this.prisma.club.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.club.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.club.delete({ where: { id } });
  }
}
