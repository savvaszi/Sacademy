import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@sportsacademy/prisma';

@Controller('teams')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @Get()
  async findAll(@Request() req) {
    return this.teamsService.findByClub(req.user.clubId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.teamsService.findOne(id);
  }

  @Post()
  @Roles(UserRole.CLUB_ADMIN, UserRole.SECRETARY)
  async create(@Body() data: any) {
    return this.teamsService.create(data);
  }

  @Put(':id')
  @Roles(UserRole.CLUB_ADMIN, UserRole.SECRETARY)
  async update(@Param('id') id: string, @Body() data: any) {
    return this.teamsService.update(id, data);
  }

  @Delete(':id')
  @Roles(UserRole.CLUB_ADMIN)
  async delete(@Param('id') id: string) {
    return this.teamsService.delete(id);
  }
}
