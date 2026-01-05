import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@sportsacademy/prisma';

@Controller('attendance')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Post('events/:eventId/bulk')
  @Roles(UserRole.COACH, UserRole.CLUB_ADMIN, UserRole.SECRETARY)
  async markBulkAttendance(@Param('eventId') eventId: string, @Body() data: any) {
    return this.attendanceService.markBulkAttendance(eventId, data.attendances);
  }

  @Get('events/:eventId')
  async findByEvent(@Param('eventId') eventId: string) {
    return this.attendanceService.findByEvent(eventId);
  }

  @Get('athletes/:athleteId')
  async findByAthlete(@Param('athleteId') athleteId: string) {
    return this.attendanceService.findByAthlete(athleteId);
  }
}
