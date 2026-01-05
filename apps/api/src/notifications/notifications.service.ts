import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async registerDeviceToken(userId: string, token: string, platform: string) {
    return this.prisma.deviceToken.upsert({
      where: { token },
      update: {
        userId,
        platform,
      },
      create: {
        userId,
        token,
        platform,
      },
    });
  }

  async removeDeviceToken(token: string) {
    return this.prisma.deviceToken.delete({
      where: { token },
    });
  }

  async sendPushNotification(userId: string, title: string, body: string, data?: any) {
    const tokens = await this.prisma.deviceToken.findMany({
      where: { userId },
    });

    console.log(`Sending push notification to ${tokens.length} devices for user ${userId}`);
    console.log(`Title: ${title}`);
    console.log(`Body: ${body}`);

    return { sent: tokens.length };
  }

  async sendEmailNotification(email: string, subject: string, body: string) {
    console.log(`Sending email to ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${body}`);

    return { sent: true };
  }
}
