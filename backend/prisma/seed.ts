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

function daysAgo(days: number): Date {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

function daysFromNow(days: number): Date {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

const TYPES: ExtinguisherType[] = [
  ExtinguisherType.WATER,
  ExtinguisherType.CO2,
  ExtinguisherType.FOAM,
  ExtinguisherType.DRY_CHEMICAL,
];

const SIZES = ['2.5lbs', '5lbs', '9lbs', '12lbs'] as const;

const STATUSES: ExtinguisherStatus[] = [
  ExtinguisherStatus.ACTIVE,
  ExtinguisherStatus.ACTIVE,
  ExtinguisherStatus.ACTIVE,
  ExtinguisherStatus.ACTIVE,
  ExtinguisherStatus.ACTIVE,
  ExtinguisherStatus.EXPIRED,
  ExtinguisherStatus.NEEDS_MAINTENANCE,
  ExtinguisherStatus.OUT_OF_SERVICE,
];

const LOCATIONS = [
  'Building A — Floor 1 Lobby',
  'Building A — Floor 2 Corridor',
  'Building A — Floor 3 Server Room',
  'Building B — Ground Floor',
  'Building B — Floor 1 Office',
  'Building B — Floor 2 Lab',
  'Building C — Basement',
  'Building C — Floor 1 Reception',
  'Building C — Floor 2 Kitchen',
  'Warehouse 1 — Entrance',
  'Warehouse 1 — Bay A',
  'Warehouse 2 — Loading Dock',
  'Car Park Level 1',
  'Car Park Level 2',
  'Data Centre — Row 3',
  'Canteen',
  'Generator Room',
  'Chemical Store',
  'Security Post',
  'Roof Plant Room',
  'Building D — Floor 1',
  'Building D — Floor 2',
  'Maintenance Workshop',
  'Archive Room',
];

const INSPECTION_STATUSES: InspectionStatus[] = [
  InspectionStatus.COMPLETED,
  InspectionStatus.COMPLETED,
  InspectionStatus.COMPLETED,
  InspectionStatus.COMPLETED,
  InspectionStatus.COMPLETED,
  InspectionStatus.SCHEDULED,
  InspectionStatus.SCHEDULED,
  InspectionStatus.PENDING,
  InspectionStatus.PENDING,
  InspectionStatus.CANCELLED,
];

const MAINTENANCE_CONDITIONS: MaintenanceCondition[] = [
  MaintenanceCondition.GOOD,
  MaintenanceCondition.GOOD,
  MaintenanceCondition.GOOD,
  MaintenanceCondition.FAIR,
  MaintenanceCondition.FAIR,
  MaintenanceCondition.POOR,
  MaintenanceCondition.DAMAGED,
];

const MAINTENANCE_ACTIONS = [
  'Replaced safety pin; gauge pressure nominal.',
  'Cleaned nozzle and hose; retested pressure.',
  'Annual service — replaced O-ring seals and reweighed cylinder.',
  'Minor corrosion on bracket — treated and repainted.',
  'Full hydrostatic test completed; passed.',
  'Replaced discharge head and safety valve.',
  'Refilled agent after discharge test.',
  'Label and tamper seal replaced; location updated.',
  'Bracket replaced due to wall damage; unit repositioned.',
  'Verified charge level and pressure; all clear.',
  'Anti-tamper tag refreshed; inspection label updated.',
  'Cleaned external surface; checked for physical damage.',
  'Replaced hose assembly — original showed cracking.',
  'Pressure gauge replaced — reading was outside tolerance.',
  'Full internal inspection; cylinder recoated.',
];

async function main() {
  console.log('Seeding FEMS database...');

  // Clear transactional data first (preserve users if already exist)
  await prisma.maintenanceLog.deleteMany();
  await prisma.inspection.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.fireExtinguisher.deleteMany();

  const [adminPwd, inspectorPwd, userPwd, user2Pwd] = await Promise.all([
    bcrypt.hash('Admin@123', BCRYPT_ROUNDS),
    bcrypt.hash('Inspector@123', BCRYPT_ROUNDS),
    bcrypt.hash('User@123', BCRYPT_ROUNDS),
    bcrypt.hash('User2@123', BCRYPT_ROUNDS),
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

  const user2 = await prisma.user.upsert({
    where: { email: 'user2@tzw.com' },
    update: {},
    create: {
      firstName: 'Boris',
      lastName: 'User',
      email: 'user2@tzw.com',
      passwordHash: user2Pwd,
      role: Role.USER,
    },
  });

  // Create 24 extinguishers spread over 12 months
  const extinguishers = [];
  for (let i = 0; i < 24; i++) {
    const monthsAgo = Math.floor((i / 24) * 12);
    const installDate = daysAgo(365 - monthsAgo * 30 + (i % 5) * 3);
    const isExpired = STATUSES[i % STATUSES.length] === ExtinguisherStatus.EXPIRED;
    const expiryDate = isExpired
      ? daysAgo(10 + (i % 20))
      : daysFromNow(180 + i * 7);

    const ownerId =
      i < 8
        ? user.id
        : i < 14
          ? user2.id
          : null;

    const ext = await prisma.fireExtinguisher.create({
      data: {
        serialNumber: `FE-${String(i + 1).padStart(4, '0')}`,
        location: LOCATIONS[i % LOCATIONS.length],
        type: TYPES[i % TYPES.length],
        size: SIZES[i % SIZES.length],
        installationDate: installDate,
        expiryDate,
        status: STATUSES[i % STATUSES.length],
        ownerId,
        createdAt: new Date(installDate.getTime() + 2 * 60 * 60 * 1000),
      },
    });
    extinguishers.push(ext);
  }

  // Create ~30 inspections spread over last 12 months
  const inspectionResults: Awaited<ReturnType<typeof prisma.inspection.create>>[] = [];
  let inspIdx = 0;
  for (let month = 11; month >= 0; month--) {
    const count = month > 6 ? 2 : 3;
    for (let j = 0; j < count; j++) {
      const daysBack = month * 30 + j * 8 + (inspIdx % 5);
      const schedDate = daysAgo(daysBack);
      const extIdx = inspIdx % extinguishers.length;
      const status = INSPECTION_STATUSES[inspIdx % INSPECTION_STATUSES.length];
      const isCompleted = status === InspectionStatus.COMPLETED;
      const isFuture = status === InspectionStatus.SCHEDULED;
      const scheduledById =
        extinguishers[extIdx].ownerId === user.id ? user.id : admin.id;

      const ins = await prisma.inspection.create({
        data: {
          extinguisherId: extinguishers[extIdx].id,
          scheduledById,
          inspectorId: inspector.id,
          scheduledAt: isFuture ? daysFromNow(7 + j * 5) : schedDate,
          status,
          result: isCompleted
            ? inspIdx % 3 === 0
              ? 'FAIL'
              : inspIdx % 3 === 1
                ? 'PASS_WITH_NOTES'
                : 'PASS'
            : null,
          completedAt: isCompleted ? new Date(schedDate.getTime() + 2 * 60 * 60 * 1000) : null,
          notes: isCompleted ? `Inspection completed — ref #${inspIdx + 1}` : null,
        },
      });
      inspectionResults.push(ins);
      inspIdx++;
    }
  }

  // Create ~20 maintenance logs spread over last 12 months
  for (let i = 0; i < 20; i++) {
    const daysBack = Math.floor((i / 20) * 360) + (i % 7);
    const extIdx = (i * 3) % extinguishers.length;
    const linkedInspection = inspectionResults[i % inspectionResults.length];
    const useInspectionLink =
      i % 4 === 0 &&
      linkedInspection.status === InspectionStatus.COMPLETED &&
      linkedInspection.extinguisherId === extinguishers[extIdx].id;

    await prisma.maintenanceLog.create({
      data: {
        extinguisherId: extinguishers[extIdx].id,
        inspectorId: inspector.id,
        inspectionId: useInspectionLink ? linkedInspection.id : null,
        actionsTaken: MAINTENANCE_ACTIONS[i % MAINTENANCE_ACTIONS.length],
        conditionNoted: MAINTENANCE_CONDITIONS[i % MAINTENANCE_CONDITIONS.length],
        actionDate: daysAgo(daysBack),
      },
    });
  }

  console.log('Seed complete:');
  console.log(`  Users: admin@tzw.com / inspector@tzw.com / user@tzw.com / user2@tzw.com`);
  console.log(`  Extinguishers: ${extinguishers.length} (8 → user, 6 → user2, 10 unassigned)`);
  console.log(`  Inspections: ${inspectionResults.length}`);
  console.log('  Maintenance logs: 20');
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
