import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@sportsacademy/prisma';

@Controller('events')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  async findByTeam(
    @Query('teamId') teamId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.eventsService.findByTeam(
      teamId,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Post()
  @Roles(UserRole.CLUB_ADMIN, UserRole.SECRETARY, UserRole.COACH)
  async create(@Body() data: any) {
    return this.eventsService.create(data);
  }

  @Put(':id')
  @Roles(UserRole.CLUB_ADMIN, UserRole.SECRETARY, UserRole.COACH)
  async update(@Param('id') id: string, @Body() data: any) {
    return this.eventsService.update(id, data);
  }

  @Delete(':id')
  @Roles(UserRole.CLUB_ADMIN, UserRole.SECRETARY)
  async delete(@Param('id') id: string) {
    return this.eventsService.delete(id);
  }
}
