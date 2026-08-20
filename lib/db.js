// One connection helper for the whole site. The driver speaks HTTP, not TCP,
// so it works inside a serverless function without a pool that outlives the
// request. `neon()` is lazy: constructing it costs nothing until a query runs.
import { neon } from '@neondatabase/serverless';

let cached = null;

export function sql() {
  if (cached) return cached;

  // Vercel's Neon integration injects DATABASE_URL. The unpooled variant is
  // only needed for transactions and migrations, which the register does not
  // use, so the pooled URL is the right default here.
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL is not set. The register has nowhere to write.');
  }

  cached = neon(url);
  return cached;
}
