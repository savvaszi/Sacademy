import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        firstName: dto.firstName,
        lastName: dto.lastName,
        phone: dto.phone,
        role: dto.role || 'STUDENT',
        profile: {
          create: {},
        },
      },
      include: {
        profile: true,
      },
    });

    const token = await this.signToken(user.id, user.email, user.role);

    return {
      user: this.sanitizeUser(user),
      token,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: {
        profile: true,
        coachProfile: true,
        studentProfile: true,
        parentProfile: true,
      },
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    const token = await this.signToken(user.id, user.email, user.role);

    return {
      user: this.sanitizeUser(user),
      token,
    };
  }

  async googleLogin(profile: any) {
    let user = await this.prisma.user.findUnique({
      where: { googleId: profile.id },
    });

    if (!user) {
      user = await this.prisma.user.findUnique({
        where: { email: profile.emails[0].value },
      });

      if (user) {
        user = await this.prisma.user.update({
          where: { id: user.id },
          data: { googleId: profile.id },
        });
      } else {
        user = await this.prisma.user.create({
          data: {
            email: profile.emails[0].value,
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            avatar: profile.photos[0]?.value,
            emailVerified: true,
            profile: {
              create: {},
            },
          },
        });
      }
    }

    const token = await this.signToken(user.id, user.email, user.role);

    return {
      user: this.sanitizeUser(user),
      token,
    };
  }

  async facebookLogin(profile: any) {
    let user = await this.prisma.user.findUnique({
      where: { facebookId: profile.id },
    });

    if (!user) {
      user = await this.prisma.user.findUnique({
        where: { email: profile.emails[0].value },
      });

      if (user) {
        user = await this.prisma.user.update({
          where: { id: user.id },
          data: { facebookId: profile.id },
        });
      } else {
        user = await this.prisma.user.create({
          data: {
            email: profile.emails[0].value,
            facebookId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            avatar: profile.photos[0]?.value,
            emailVerified: true,
            profile: {
              create: {},
            },
          },
        });
      }
    }

    const token = await this.signToken(user.id, user.email, user.role);

    return {
      user: this.sanitizeUser(user),
      token,
    };
  }

  async validateUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        coachProfile: true,
        studentProfile: true,
        parentProfile: true,
      },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('User not found or inactive');
    }

    return this.sanitizeUser(user);
  }

  private async signToken(userId: string, email: string, role: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
      role,
    };

    return this.jwt.signAsync(payload);
  }

  private sanitizeUser(user: any) {
    const { password, ...sanitized } = user;
    return sanitized;
  }
}
