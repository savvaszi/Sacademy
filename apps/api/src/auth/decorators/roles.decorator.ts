import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@sportsacademy/prisma';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
