import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import {
  ExtinguisherStatus,
  ExtinguisherType,
  InspectionStatus,
  MaintenanceCondition,
  PrismaClient,
  Role,
} from '../src/generated/prisma/client';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const BCRYPT_ROUNDS = 10;

function daysFromNow(days: number): Date {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

async function main() {
  console.log('Seeding FEMS database...');

  const [adminPwd, inspectorPwd, userPwd] = await Promise.all([
    bcrypt.hash('Admin@123', BCRYPT_ROUNDS),
    bcrypt.hash('Inspector@123', BCRYPT_ROUNDS),
    bcrypt.hash('User@123', BCRYPT_ROUNDS),
  ]);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@tzw.com' },
    update: {},
    create: {
      firstName: 'System',
      lastName: 'Admin',
      email: 'admin@tzw.com',
      passwordHash: adminPwd,
      role: Role.ADMIN,
    },
  });

  const inspector = await prisma.user.upsert({
    where: { email: 'inspector@tzw.com' },
    update: {},
    create: {
      firstName: 'Ingrid',
      lastName: 'Inspector',
      email: 'inspector@tzw.com',
      passwordHash: inspectorPwd,
      role: Role.INSPECTOR,
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'user@tzw.com' },
    update: {},
    create: {
      firstName: 'Uma',
      lastName: 'User',
      email: 'user@tzw.com',
      passwordHash: userPwd,
      role: Role.USER,
    },
  });

  const types = [
    ExtinguisherType.WATER,
    ExtinguisherType.CO2,
    ExtinguisherType.FOAM,
    ExtinguisherType.DRY_CHEMICAL,
  ];

  const extinguishers = [];
  let n = 1;
  for (const type of types) {
    for (let i = 0; i < 2; i++) {
      const serial = `FE-${type}-${String(n).padStart(4, '0')}`;
      const isExpired = n % 7 === 0;
      const ext = await prisma.fireExtinguisher.upsert({
        where: { serialNumber: serial },
        update: {},
        create: {
          serialNumber: serial,
          location: `Building ${String.fromCharCode(65 + (n % 4))} — Floor ${(n % 3) + 1}`,
          type,
          size: ['2.5lbs', '5lbs', '9lbs', '12lbs'][n % 4],
          installationDate: daysFromNow(-400 + n * 10),
          expiryDate: isExpired ? daysFromNow(-10) : daysFromNow(200 + n * 5),
          status: isExpired
            ? ExtinguisherStatus.EXPIRED
            : ExtinguisherStatus.ACTIVE,
        },
      });
      extinguishers.push(ext);
      n++;
    }
  }

  const inspection = await prisma.inspection.create({
    data: {
      extinguisherId: extinguishers[0].id,
      scheduledById: admin.id,
      inspectorId: inspector.id,
      scheduledAt: daysFromNow(7),
      status: InspectionStatus.SCHEDULED,
      notes: 'Routine annual inspection',
    },
  });

  await prisma.inspection.create({
    data: {
      extinguisherId: extinguishers[1].id,
      scheduledById: user.id,
      inspectorId: inspector.id,
      scheduledAt: daysFromNow(-3),
      status: InspectionStatus.COMPLETED,
      result: 'Passed — pressure nominal',
      completedAt: daysFromNow(-3),
    },
  });

  await prisma.maintenanceLog.create({
    data: {
      extinguisherId: extinguishers[1].id,
      inspectorId: inspector.id,
      inspectionId: inspection.id,
      actionsTaken: 'Replaced safety pin and verified gauge.',
      conditionNoted: MaintenanceCondition.GOOD,
      actionDate: daysFromNow(-3),
    },
  });

  await prisma.maintenanceLog.create({
    data: {
      extinguisherId: extinguishers[2].id,
      inspectorId: inspector.id,
      actionsTaken: 'Cleaned nozzle; minor corrosion noted on bracket.',
      conditionNoted: MaintenanceCondition.FAIR,
      actionDate: daysFromNow(-30),
    },
  });

  console.log('Seed complete:');
  console.log(`  Users: admin@tzw.com / inspector@tzw.com / user@tzw.com`);
  console.log(`  Extinguishers: ${extinguishers.length}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
