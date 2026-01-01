import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        coachProfile: true,
        studentProfile: true,
        parentProfile: true,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async updateProfile(userId: string, data: any) {
    return this.prisma.user.update({
      where: { id: userId },
      data,
      include: {
        profile: true,
      },
    });
  }

  async getAllUsers(filters?: any) {
    return this.prisma.user.findMany({
      where: filters,
      include: {
        profile: true,
      },
    });
  }
}
