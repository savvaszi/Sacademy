import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AthletesService } from './athletes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@sportsacademy/prisma';

@Controller('athletes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AthletesController {
  constructor(private athletesService: AthletesService) {}

  @Get()
  async findByTeam(@Query('teamId') teamId: string) {
    return this.athletesService.findByTeam(teamId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.athletesService.findOne(id);
  }

  @Post()
  @Roles(UserRole.CLUB_ADMIN, UserRole.SECRETARY)
  async create(@Body() data: any) {
    return this.athletesService.create(data);
  }

  @Put(':id')
  @Roles(UserRole.CLUB_ADMIN, UserRole.SECRETARY)
  async update(@Param('id') id: string, @Body() data: any) {
    return this.athletesService.update(id, data);
  }

  @Delete(':id')
  @Roles(UserRole.CLUB_ADMIN)
  async delete(@Param('id') id: string) {
    return this.athletesService.delete(id);
  }
}
