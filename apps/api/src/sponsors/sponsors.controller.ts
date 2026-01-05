import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { SponsorsService } from './sponsors.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@sportsacademy/prisma';

@Controller('sponsors')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SponsorsController {
  constructor(private sponsorsService: SponsorsService) {}

  @Get()
  async findAll(@Request() req) {
    return this.sponsorsService.findByClub(req.user.clubId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.sponsorsService.findOne(id);
  }

  @Post()
  @Roles(UserRole.CLUB_ADMIN, UserRole.SECRETARY)
  async create(@Body() data: any) {
    return this.sponsorsService.create(data);
  }

  @Put(':id')
  @Roles(UserRole.CLUB_ADMIN, UserRole.SECRETARY)
  async update(@Param('id') id: string, @Body() data: any) {
    return this.sponsorsService.update(id, data);
  }

  @Delete(':id')
  @Roles(UserRole.CLUB_ADMIN)
  async delete(@Param('id') id: string) {
    return this.sponsorsService.delete(id);
  }

  @Post('offers')
  @Roles(UserRole.CLUB_ADMIN, UserRole.SECRETARY)
  async createOffer(@Body() data: any) {
    return this.sponsorsService.createOffer(data);
  }
}
