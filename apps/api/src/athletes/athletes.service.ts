import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AthletesService {
  constructor(private prisma: PrismaService) {}

  async findByTeam(teamId: string) {
    return this.prisma.athleteProfile.findMany({
      where: { teamId },
      include: {
        user: true,
        team: true,
        parents: {
          include: {
            parent: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.athleteProfile.findUnique({
      where: { id },
      include: {
        user: true,
        team: true,
        parents: {
          include: {
            parent: true,
          },
        },
        subscriptions: {
          include: {
            plan: true,
          },
        },
      },
    });
  }

  async create(data: any) {
    return this.prisma.athleteProfile.create({
      data,
      include: {
        user: true,
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.athleteProfile.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.athleteProfile.delete({ where: { id } });
  }
}
