// Applies scripts/schema.sql to whatever DATABASE_URL points at. Idempotent:
// every statement is create-if-not-exists, so running it twice is a no-op.
//
//   node --env-file=.env.local scripts/init-db.mjs
import { readFile } from 'node:fs/promises';
import { neon } from '@neondatabase/serverless';

const url = process.env.DATABASE_URL;
if (!url) {
  console.error('DATABASE_URL is not set. Pass it, or use --env-file=.env.local');
  process.exit(1);
}

const schema = await readFile(new URL('./schema.sql', import.meta.url), 'utf8');
const sql = neon(url);

// The HTTP driver sends one statement per call, so split on the boundaries
// rather than shipping the whole file as a single query.
const statements = schema
  .split(';')
  .map((s) => s.trim())
  .filter((s) => s && !s.split('\n').every((line) => line.trim().startsWith('--')));

for (const statement of statements) {
  await sql.query(statement);
  console.log('ok:', statement.split('\n').find((l) => !l.trim().startsWith('--'))?.trim());
}

const [{ count }] = await sql`select count(*)::int as count from registrations`;
console.log(`\nregistrations table ready — ${count} row(s).`);
