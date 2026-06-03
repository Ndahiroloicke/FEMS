import 'dotenv/config';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const statements = [
  `ALTER TYPE "InspectionStatus" ADD VALUE IF NOT EXISTS 'PENDING'`,
  `ALTER TYPE "InspectionStatus" ADD VALUE IF NOT EXISTS 'APPROVED'`,
  `ALTER TABLE fire_extinguishers ADD COLUMN IF NOT EXISTS "ownerId" TEXT REFERENCES users(id) ON DELETE SET NULL`,
];

for (const sql of statements) {
  try {
    await pool.query(sql);
    console.log('OK:', sql.slice(0, 60));
  } catch (e) {
    console.error('ERR:', e.message);
  }
}

await pool.end();
console.log('Migration done.');
