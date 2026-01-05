import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AttendanceStatus } from '@sportsacademy/prisma';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async markBulkAttendance(eventId: string, attendances: Array<{ athleteId: string; status: AttendanceStatus; notes?: string }>) {
    const operations = attendances.map((attendance) =>
      this.prisma.attendance.upsert({
        where: {
          eventId_athleteId: {
            eventId,
            athleteId: attendance.athleteId,
          },
        },
        update: {
          status: attendance.status,
          notes: attendance.notes,
        },
        create: {
          eventId,
          athleteId: attendance.athleteId,
          status: attendance.status,
          notes: attendance.notes,
        },
      }),
    );

    return Promise.all(operations);
  }

  async findByEvent(eventId: string) {
    return this.prisma.attendance.findMany({
      where: { eventId },
      include: {
        athlete: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async findByAthlete(athleteId: string) {
    return this.prisma.attendance.findMany({
      where: { athleteId },
      include: {
        event: {
          include: {
            team: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
