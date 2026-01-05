import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@sportsacademy/prisma';

@Controller('announcements')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AnnouncementsController {
  constructor(private announcementsService: AnnouncementsService) {}

  @Get()
  async findAll(@Request() req, @Query('teamId') teamId?: string) {
    return this.announcementsService.findByClub(req.user.clubId, teamId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.announcementsService.findOne(id);
  }

  @Post()
  @Roles(UserRole.CLUB_ADMIN, UserRole.SECRETARY, UserRole.COACH)
  async create(@Body() data: any, @Request() req) {
    return this.announcementsService.create({
      ...data,
      authorId: req.user.userId,
    });
  }

  @Put(':id')
  @Roles(UserRole.CLUB_ADMIN, UserRole.SECRETARY, UserRole.COACH)
  async update(@Param('id') id: string, @Body() data: any) {
    return this.announcementsService.update(id, data);
  }

  @Delete(':id')
  @Roles(UserRole.CLUB_ADMIN, UserRole.SECRETARY, UserRole.COACH)
  async delete(@Param('id') id: string) {
    return this.announcementsService.delete(id);
  }
}
