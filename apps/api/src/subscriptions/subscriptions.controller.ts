import { Controller, Get, Post, Put, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@sportsacademy/prisma';

@Controller('subscriptions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SubscriptionsController {
  constructor(private subscriptionsService: SubscriptionsService) {}

  @Get('plans')
  async findPlans(@Request() req) {
    return this.subscriptionsService.findByClub(req.user.clubId);
  }

  @Post('plans')
  @Roles(UserRole.CLUB_ADMIN, UserRole.SECRETARY)
  async createPlan(@Body() data: any) {
    return this.subscriptionsService.createPlan(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.subscriptionsService.findOne(id);
  }

  @Post()
  @Roles(UserRole.CLUB_ADMIN, UserRole.SECRETARY)
  async create(@Body() data: any) {
    return this.subscriptionsService.createSubscription(data);
  }

  @Put(':id')
  @Roles(UserRole.CLUB_ADMIN, UserRole.SECRETARY)
  async update(@Param('id') id: string, @Body() data: any) {
    return this.subscriptionsService.updateSubscription(id, data);
  }

  @Put(':id/cancel')
  @Roles(UserRole.CLUB_ADMIN, UserRole.SECRETARY)
  async cancel(@Param('id') id: string) {
    return this.subscriptionsService.cancelSubscription(id);
  }
}
