import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async findByTeam(teamId: string, startDate?: Date, endDate?: Date) {
    return this.prisma.event.findMany({
      where: {
        teamId,
        ...(startDate && endDate
          ? {
              startTime: {
                gte: startDate,
                lte: endDate,
              },
            }
          : {}),
      },
      include: {
        team: true,
        facility: true,
        attendances: {
          include: {
            athlete: {
              include: {
                user: true,
              },
            },
          },
        },
      },
      orderBy: {
        startTime: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.event.findUnique({
      where: { id },
      include: {
        team: true,
        facility: true,
        attendances: {
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

  async create(data: any) {
    return this.prisma.event.create({
      data,
      include: {
        team: true,
        facility: true,
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.event.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.event.delete({ where: { id } });
  }
}
