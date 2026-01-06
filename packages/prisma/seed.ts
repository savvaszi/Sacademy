import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const passwordHash = await bcrypt.hash('password123', 10);

  const club = await prisma.club.create({
    data: {
      name: 'Demo Sports Academy',
      description: 'A demo sports academy for testing',
      email: 'info@demoacademy.com',
      phone: '+357 99 123456',
      address: 'Nicosia, Cyprus',
    },
  });

  console.log('✅ Created club:', club.name);

  // Create superadmin user
  const superadmin = await prisma.user.create({
    data: {
      clubId: club.id,
      email: 'superadmin@sportsacademy.com',
      passwordHash,
      firstName: 'Super',
      lastName: 'Admin',
      role: UserRole.SUPER_ADMIN,
      phone: '+357 99 000000',
    },
  });

  console.log('✅ Created superadmin user:', superadmin.email);

  const facility = await prisma.facility.create({
    data: {
      clubId: club.id,
      name: 'Main Training Ground',
      address: 'Stadium Street, Nicosia',
      capacity: 100,
    },
  });

  console.log('✅ Created facility:', facility.name);

  const ageGroup = await prisma.ageGroup.create({
    data: {
      clubId: club.id,
      name: 'U12',
      minAge: 10,
      maxAge: 12,
    },
  });

  console.log('✅ Created age group:', ageGroup.name);

  const team = await prisma.team.create({
    data: {
      clubId: club.id,
      ageGroupId: ageGroup.id,
      name: 'U12 Lions',
      sport: 'Football',
      season: '2024-2025',
    },
  });

  console.log('✅ Created team:', team.name);

  const admin = await prisma.user.create({
    data: {
      clubId: club.id,
      email: 'admin@demoacademy.com',
      passwordHash,
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.CLUB_ADMIN,
      phone: '+357 99 111111',
    },
  });

  console.log('✅ Created admin user:', admin.email);

  const coach = await prisma.user.create({
    data: {
      clubId: club.id,
      email: 'coach@demoacademy.com',
      passwordHash,
      firstName: 'John',
      lastName: 'Coach',
      role: UserRole.COACH,
      phone: '+357 99 222222',
    },
  });

  console.log('✅ Created coach:', coach.email);

  await prisma.coachAssignment.create({
    data: {
      coachId: coach.id,
      teamId: team.id,
      isPrimary: true,
    },
  });

  const parent = await prisma.user.create({
    data: {
      clubId: club.id,
      email: 'parent@demoacademy.com',
      passwordHash,
      firstName: 'Maria',
      lastName: 'Parent',
      role: UserRole.PARENT,
      phone: '+357 99 333333',
    },
  });

  console.log('✅ Created parent:', parent.email);

  const athleteUser = await prisma.user.create({
    data: {
      clubId: club.id,
      email: 'athlete@demoacademy.com',
      passwordHash,
      firstName: 'Alex',
      lastName: 'Athlete',
      role: UserRole.ATHLETE,
      phone: '+357 99 444444',
    },
  });

  const athlete = await prisma.athleteProfile.create({
    data: {
      userId: athleteUser.id,
      teamId: team.id,
      dateOfBirth: new Date('2012-05-15'),
      emergencyContact: '+357 99 333333',
      jerseyNumber: 10,
    },
  });

  console.log('✅ Created athlete:', athleteUser.email);

  await prisma.parentLink.create({
    data: {
      parentId: parent.id,
      athleteId: athlete.id,
      relationship: 'Mother',
    },
  });

  const subscriptionPlan = await prisma.subscriptionPlan.create({
    data: {
      clubId: club.id,
      name: 'Monthly Training',
      description: '3 training sessions per week',
      price: 50,
      currency: 'EUR',
      interval: 'monthly',
    },
  });

  console.log('✅ Created subscription plan:', subscriptionPlan.name);

  const subscription = await prisma.subscription.create({
    data: {
      athleteId: athlete.id,
      planId: subscriptionPlan.id,
      status: 'ACTIVE',
      startDate: new Date(),
    },
  });

  const invoice = await prisma.invoice.create({
    data: {
      subscriptionId: subscription.id,
      invoiceNumber: 'INV-2024-001',
      amount: 50,
      currency: 'EUR',
      status: 'SENT',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  console.log('✅ Created invoice:', invoice.invoiceNumber);

  const event = await prisma.event.create({
    data: {
      teamId: team.id,
      facilityId: facility.id,
      type: 'TRAINING',
      title: 'Weekly Training',
      description: 'Regular training session',
      startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
      location: 'Main Training Ground',
    },
  });

  console.log('✅ Created event:', event.title);

  const sponsor = await prisma.sponsor.create({
    data: {
      clubId: club.id,
      name: 'Local Sports Shop',
      contactName: 'George Sponsor',
      email: 'sponsor@sportsshop.com',
      phone: '+357 99 555555',
    },
  });

  console.log('✅ Created sponsor:', sponsor.name);

  await prisma.sponsorOffer.create({
    data: {
      sponsorId: sponsor.id,
      title: '10% Discount on Equipment',
      description: 'Special discount for academy members',
      discount: '10%',
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.announcement.create({
    data: {
      clubId: club.id,
      teamId: team.id,
      authorId: admin.id,
      title: 'Welcome to the Academy!',
      content: 'We are excited to have you join our sports academy. Training starts next week!',
      isPinned: true,
    },
  });

  console.log('✅ Created announcement');

  console.log('\n🎉 Seeding completed successfully!');
  console.log('\n📝 Demo credentials:');
  console.log('   Superadmin: superadmin@sportsacademy.com / password123');
  console.log('   Admin: admin@demoacademy.com / password123');
  console.log('   Coach: coach@demoacademy.com / password123');
  console.log('   Parent: parent@demoacademy.com / password123');
  console.log('   Athlete: athlete@demoacademy.com / password123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
