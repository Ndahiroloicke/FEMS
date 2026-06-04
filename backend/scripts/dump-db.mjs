import { spawn } from 'node:child_process';
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { platform } from 'node:os';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const backendRoot = join(__dirname, '..');
const dumpsDir = join(backendRoot, 'dumps');

dotenv.config({ path: join(backendRoot, '.env') });

function sanitizeDatabaseUrl(raw) {
  if (!raw) return null;
  return raw.replace(/^["']|["']$/g, '').split('?')[0];
}

function findPgDump() {
  const exe = platform() === 'win32' ? 'pg_dump.exe' : 'pg_dump';

  if (process.env.PG_DUMP && existsSync(process.env.PG_DUMP)) {
    return process.env.PG_DUMP;
  }

  try {
    const cmd = platform() === 'win32' ? 'where pg_dump' : 'which pg_dump';
    const hit = execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] })
      .trim()
      .split(/\r?\n/)[0]
      ?.trim();
    if (hit && existsSync(hit)) return hit;
  } catch {
    // not on PATH
  }

  if (platform() === 'win32') {
    const base = 'C:\\Program Files\\PostgreSQL';
    if (existsSync(base)) {
      const versions = readdirSync(base)
        .filter((dir) => existsSync(join(base, dir, 'bin', exe)))
        .sort()
        .reverse();
      if (versions[0]) return join(base, versions[0], 'bin', exe);
    }
  }

  return exe;
}

function timestamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

function runPgDump(pgDump, databaseUrl, outFile) {
  return new Promise((resolve, reject) => {
    const args = [
      '--dbname',
      databaseUrl,
      '--no-owner',
      '--no-acl',
      '--format',
      'plain',
      '--file',
      outFile,
    ];

    const child = spawn(pgDump, args, { stdio: 'inherit', windowsHide: true });

    child.on('error', (err) => {
      if (err.code === 'ENOENT') {
        reject(
          new Error(
            `pg_dump not found (${pgDump}). Install PostgreSQL client tools or set PG_DUMP to the full path to pg_dump.exe`,
          ),
        );
      } else {
        reject(err);
      }
    });

    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`pg_dump exited with code ${code}`));
    });
  });
}

const databaseUrl = sanitizeDatabaseUrl(process.env.DATABASE_URL);
if (!databaseUrl) {
  console.error('DATABASE_URL is missing. Set it in backend/.env (see .env.example).');
  process.exit(1);
}

mkdirSync(dumpsDir, { recursive: true });
const outFile = join(dumpsDir, `fire_extinguisher_${timestamp()}.sql`);
const pgDump = findPgDump();

console.log(`Using: ${pgDump}`);
console.log(`Dumping to: ${outFile}`);

try {
  await runPgDump(pgDump, databaseUrl, outFile);
  console.log('Done.');
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
