import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        athleteProfile: true,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findAll(clubId: string) {
    return this.prisma.user.findMany({
      where: { clubId },
      include: {
        athleteProfile: true,
      },
    });
  }

  async create(data: any) {
    const passwordHash = await bcrypt.hash(data.password, 10);
    const { password, ...userData } = data;

    return this.prisma.user.create({
      data: {
        ...userData,
        passwordHash,
      },
    });
  }

  async update(id: string, data: any) {
    if (data.password) {
      data.passwordHash = await bcrypt.hash(data.password, 10);
      delete data.password;
    }

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
