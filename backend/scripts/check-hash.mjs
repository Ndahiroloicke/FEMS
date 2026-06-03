import 'dotenv/config';
import bcrypt from 'bcrypt';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const res = await pool.query('SELECT email, "passwordHash" FROM users WHERE email = $1', ['admin@tzw.com']);

if (!res.rows.length) {
  console.log('USER NOT FOUND in DB');
  await pool.end();
  process.exit(1);
}

const { email, passwordHash } = res.rows[0];
console.log('email      :', email);
console.log('storedHash :', passwordHash);

const candidates = ['Admin@123', 'admin@123', 'Admin123'];
for (const pwd of candidates) {
  const ok = await bcrypt.compare(pwd, passwordHash);
  console.log(`compare "${pwd}":`, ok);
}

await pool.end();
