import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  async findByClub(clubId: string) {
    return this.prisma.team.findMany({
      where: { clubId },
      include: {
        ageGroup: true,
        coaches: {
          include: {
            coach: true,
          },
        },
        athletes: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.team.findUnique({
      where: { id },
      include: {
        ageGroup: true,
        coaches: {
          include: {
            coach: true,
          },
        },
        athletes: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async create(data: any) {
    return this.prisma.team.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.team.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.team.delete({ where: { id } });
  }
}
