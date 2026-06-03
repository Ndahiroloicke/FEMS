"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const bcrypt = __importStar(require("bcrypt"));
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("../src/generated/prisma/client");
const pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
const BCRYPT_ROUNDS = 10;
function daysFromNow(days) {
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
            role: client_1.Role.ADMIN,
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
            role: client_1.Role.INSPECTOR,
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
            role: client_1.Role.USER,
        },
    });
    const types = [
        client_1.ExtinguisherType.WATER,
        client_1.ExtinguisherType.CO2,
        client_1.ExtinguisherType.FOAM,
        client_1.ExtinguisherType.DRY_CHEMICAL,
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
                        ? client_1.ExtinguisherStatus.EXPIRED
                        : client_1.ExtinguisherStatus.ACTIVE,
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
            status: client_1.InspectionStatus.SCHEDULED,
            notes: 'Routine annual inspection',
        },
    });
    await prisma.inspection.create({
        data: {
            extinguisherId: extinguishers[1].id,
            scheduledById: user.id,
            inspectorId: inspector.id,
            scheduledAt: daysFromNow(-3),
            status: client_1.InspectionStatus.COMPLETED,
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
            conditionNoted: client_1.MaintenanceCondition.GOOD,
            actionDate: daysFromNow(-3),
        },
    });
    await prisma.maintenanceLog.create({
        data: {
            extinguisherId: extinguishers[2].id,
            inspectorId: inspector.id,
            actionsTaken: 'Cleaned nozzle; minor corrosion noted on bracket.',
            conditionNoted: client_1.MaintenanceCondition.FAIR,
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
//# sourceMappingURL=seed.js.map