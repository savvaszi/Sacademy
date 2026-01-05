import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@sportsacademy/prisma';

@Controller('clubs')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClubsController {
  constructor(private clubsService: ClubsService) {}

  @Get()
  @Roles(UserRole.SUPER_ADMIN)
  async findAll() {
    return this.clubsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.clubsService.findOne(id);
  }

  @Post()
  @Roles(UserRole.SUPER_ADMIN)
  async create(@Body() data: any) {
    return this.clubsService.create(data);
  }

  @Put(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.CLUB_ADMIN)
  async update(@Param('id') id: string, @Body() data: any) {
    return this.clubsService.update(id, data);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN)
  async delete(@Param('id') id: string) {
    return this.clubsService.delete(id);
  }
}
