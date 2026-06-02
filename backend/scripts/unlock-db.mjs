import 'dotenv/config';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

try {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(`
      SELECT pid, state, left(query, 120) AS query
      FROM pg_stat_activity
      WHERE datname = current_database()
        AND pid <> pg_backend_pid()
    `);

    console.log(`Found ${rows.length} other session(s)`);
    for (const row of rows) {
      console.log(`  terminating pid=${row.pid} state=${row.state}`);
      await client.query('SELECT pg_terminate_backend($1)', [row.pid]);
    }

    await client.query('SELECT pg_advisory_unlock_all()');
    console.log('Locks cleared. You can run: npx prisma migrate dev --name init');
  } finally {
    client.release();
  }
} catch (error) {
  console.error(error.message);
  process.exit(1);
} finally {
  await pool.end();
}
