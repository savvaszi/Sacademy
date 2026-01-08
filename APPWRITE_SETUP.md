# Appwrite Setup Guide for Sports Academy

This guide explains how to set up Appwrite as the database for the Sports Academy Management Platform.

## Prerequisites

1. An Appwrite Cloud account (https://cloud.appwrite.io) or self-hosted Appwrite instance
2. Dokploy deployment configured

## Step 1: Create Appwrite Project

1. Log in to your Appwrite Console
2. Create a new project named "Sports Academy"
3. Note down your **Project ID** from the project settings

## Step 2: Create Database and Collections

### Create Database
1. Go to Databases in the Appwrite Console
2. Create a new database named `sportsacademy`
3. Note down the **Database ID**

### Create Collections

You need to create the following collections with their respective attributes:

#### 1. Clubs Collection (`clubs`)
- `name` (String, required)
- `description` (String, optional)
- `logo` (String, optional)
- `address` (String, optional)
- `phone` (String, optional)
- `email` (Email, optional)
- `website` (URL, optional)

#### 2. Users Collection (`users`)
- `clubId` (String, required)
- `email` (Email, required, unique)
- `firstName` (String, required)
- `lastName` (String, required)
- `phone` (String, optional)
- `avatar` (String, optional)
- `role` (Enum: SUPER_ADMIN, CLUB_ADMIN, SECRETARY, COACH, PARENT, ATHLETE)
- `isActive` (Boolean, default: true)

#### 3. Teams Collection (`teams`)
- `clubId` (String, required)
- `ageGroupId` (String, optional)
- `name` (String, required)
- `sport` (String, optional)
- `season` (String, optional)

#### 4. Athletes Collection (`athletes`)
- `userId` (String, required)
- `teamId` (String, optional)
- `dateOfBirth` (DateTime, required)
- `emergencyContact` (String, optional)
- `medicalNotes` (String, optional)
- `jerseyNumber` (Integer, optional)

#### 5. Events Collection (`events`)
- `teamId` (String, required)
- `facilityId` (String, optional)
- `type` (Enum: TRAINING, MATCH, TOURNAMENT, OTHER)
- `title` (String, required)
- `description` (String, optional)
- `startTime` (DateTime, required)
- `endTime` (DateTime, required)
- `location` (String, optional)

#### 6. Attendance Collection (`attendance`)
- `eventId` (String, required)
- `athleteId` (String, required)
- `status` (Enum: PRESENT, ABSENT, LATE, EXCUSED)
- `notes` (String, optional)

#### 7. Subscriptions Collection (`subscriptions`)
- `athleteId` (String, required)
- `planId` (String, required)
- `status` (Enum: ACTIVE, PAUSED, CANCELLED, EXPIRED)
- `startDate` (DateTime, required)
- `endDate` (DateTime, optional)

#### 8. Invoices Collection (`invoices`)
- `subscriptionId` (String, required)
- `invoiceNumber` (String, required, unique)
- `amount` (Float, required)
- `currency` (String, default: EUR)
- `status` (Enum: DRAFT, SENT, PAID, OVERDUE, CANCELLED)
- `dueDate` (DateTime, required)
- `paidAt` (DateTime, optional)
- `notes` (String, optional)

#### 9. Payments Collection (`payments`)
- `invoiceId` (String, required)
- `amount` (Float, required)
- `currency` (String, default: EUR)
- `method` (Enum: CASH, CARD, BANK_TRANSFER, JCC, VIVA, STRIPE)
- `transactionId` (String, optional)
- `notes` (String, optional)
- `paidAt` (DateTime, required)

#### 10. Announcements Collection (`announcements`)
- `clubId` (String, required)
- `teamId` (String, optional)
- `authorId` (String, required)
- `title` (String, required)
- `content` (String, required)
- `isPinned` (Boolean, default: false)

#### 11. Facilities Collection (`facilities`)
- `clubId` (String, required)
- `name` (String, required)
- `address` (String, optional)
- `capacity` (Integer, optional)

#### 12. Age Groups Collection (`age_groups`)
- `clubId` (String, required)
- `name` (String, required)
- `minAge` (Integer, required)
- `maxAge` (Integer, required)

#### 13. Sponsors Collection (`sponsors`)
- `clubId` (String, required)
- `name` (String, required)
- `logo` (String, optional)
- `website` (URL, optional)
- `contactName` (String, optional)
- `email` (Email, optional)
- `phone` (String, optional)

#### 14. Products Collection (`products`)
- `name` (String, required)
- `description` (String, optional)
- `sku` (String, optional, unique)
- `price` (Float, required)
- `currency` (String, default: EUR)
- `stock` (Integer, default: 0)

#### 15. Expenses Collection (`expenses`)
- `clubId` (String, required)
- `category` (String, required)
- `description` (String, required)
- `amount` (Float, required)
- `currency` (String, default: EUR)
- `date` (DateTime, required)
- `receipt` (String, optional)

## Step 3: Configure Permissions

For each collection, set appropriate permissions:

1. **Read Access**: Based on user roles (use Appwrite Teams for role management)
2. **Write Access**: Restricted to admins and authorized users
3. **Create Access**: Based on user roles
4. **Delete Access**: Restricted to admins

Example permission setup for Users collection:
- Read: `role:admin`, `role:secretary`, `user:[USER_ID]`
- Create: `role:admin`, `role:secretary`
- Update: `role:admin`, `role:secretary`, `user:[USER_ID]`
- Delete: `role:admin`

## Step 4: Update Dokploy Environment Variables

In your Dokploy application settings, update the environment variables:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_APPWRITE_DATABASE_ID=sportsacademy

# NextAuth Configuration
NEXTAUTH_SECRET=your-nextauth-secret-change-in-production
NEXTAUTH_URL=https://your-domain.com

# Other configurations...
```

## Step 5: Authentication Setup

Appwrite handles authentication automatically. The frontend uses:
- Email/Password authentication
- Session management
- JWT tokens

The authentication is configured in `apps/web/src/lib/appwrite-auth.ts`.

## Step 6: Deploy

1. Commit and push your changes to GitHub
2. Dokploy will automatically deploy the frontend
3. The application will be available at: `https://sportsacademy-web-eindpg.traefik.me`

## Step 7: Test the Setup

1. Access the deployed application
2. Try to register a new user
3. Log in with the created user
4. Verify database connections in Appwrite Console

## Migration from Prisma/PostgreSQL

If you're migrating from the existing Prisma setup:

1. Export data from PostgreSQL
2. Transform data to match Appwrite document structure
3. Import data using Appwrite API or Console
4. Update application code to use Appwrite SDK instead of Prisma

## Appwrite SDK Usage

The frontend now includes:
- `apps/web/src/lib/appwrite.ts` - Main Appwrite client configuration
- `apps/web/src/lib/appwrite-config.ts` - Configuration validation
- `apps/web/src/lib/appwrite-auth.ts` - Authentication helpers

Example usage:
```typescript
import { databases, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite';

// Fetch clubs
const clubs = await databases.listDocuments(
  DATABASE_ID,
  COLLECTIONS.CLUBS
);

// Create a new team
const team = await databases.createDocument(
  DATABASE_ID,
  COLLECTIONS.TEAMS,
  ID.unique(),
  {
    clubId: 'club-id',
    name: 'Team Name',
    sport: 'Football'
  }
);
```

## Support

For issues or questions:
- Appwrite Documentation: https://appwrite.io/docs
- Appwrite Discord: https://appwrite.io/discord
- Project Repository: https://github.com/savvaszi/Sacademy

## Next Steps

1. Set up Appwrite Teams for role-based access control
2. Configure email templates for user notifications
3. Set up Appwrite Functions for background tasks (optional)
4. Configure Appwrite Storage for file uploads (logos, avatars, receipts)
