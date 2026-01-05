import { Controller, Get, Post, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@sportsacademy/prisma';

@Controller('payments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('invoices')
  @Roles(UserRole.CLUB_ADMIN, UserRole.SECRETARY)
  async createInvoice(@Body() data: any) {
    return this.paymentsService.createInvoice(data.subscriptionId, data.amount, new Date(data.dueDate));
  }

  @Post('invoices/:invoiceId/payments')
  @Roles(UserRole.CLUB_ADMIN, UserRole.SECRETARY)
  async recordPayment(@Param('invoiceId') invoiceId: string, @Body() data: any) {
    return this.paymentsService.recordPayment(invoiceId, data.amount, data.method, data.transactionId);
  }

  @Get('invoices')
  async findInvoices(@Query('subscriptionId') subscriptionId: string) {
    return this.paymentsService.findInvoicesBySubscription(subscriptionId);
  }

  @Get('overdue')
  @Roles(UserRole.CLUB_ADMIN, UserRole.SECRETARY)
  async findOverdue(@Request() req) {
    return this.paymentsService.findOverdueInvoices(req.user.clubId);
  }
}
