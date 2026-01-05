import { Controller, Post, Delete, Body, UseGuards, Request } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Post('register-device')
  async registerDevice(@Request() req, @Body() data: any) {
    return this.notificationsService.registerDeviceToken(req.user.userId, data.token, data.platform);
  }

  @Delete('unregister-device')
  async unregisterDevice(@Body() data: any) {
    return this.notificationsService.removeDeviceToken(data.token);
  }
}
