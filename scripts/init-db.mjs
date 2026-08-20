// Applies scripts/schema.sql to DATABASE_URL. Runs as part of `npm run build`,
// which is where Vercel hands the process a credential that cannot be read back
// out through the CLI or API. Idempotent: every statement is
// create-if-not-exists, so running it on every deploy is a no-op.
//
//   node --env-file=.env.local scripts/init-db.mjs
import { readFile } from 'node:fs/promises';
import { neon } from '@neondatabase/serverless';

const url = process.env.DATABASE_URL;

// A build without a database is legitimate: local builds, and previews created
// before the integration was attached. The register route fails loudly at
// request time in that case, which is the right place for it to surface —
// failing the build would take the whole site down over one route.
if (!url) {
  console.warn('init-db: DATABASE_URL not set — skipping migration.');
  process.exit(0);
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
  console.log('init-db ok:', statement.split('\n').find((l) => !l.trim().startsWith('--'))?.trim());
}

const [{ count }] = await sql`select count(*)::int as count from registrations`;
console.log(`init-db: registrations table ready — ${count} row(s).`);
