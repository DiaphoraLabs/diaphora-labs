import { promises as fs } from 'node:fs';
import path from 'node:path';

// Capture is local-first on purpose: no provider has been chosen yet, and a
// form that pretends to submit is worse than one that plainly does not.
// Swap this body for the provider's API when one is picked; the contract the
// client depends on is { ok } / { ok:false, error }.
const STORE = path.join(process.cwd(), '.data', 'registrations.jsonl');
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LISTS = new Set([
  'delta-1-founder',
  'delta-1-partner',
  'delta-2',
  'waterfall-partner',
  'waterfall-design',
  'waterfall-research',
  'waterfall-local',
  'waterfall-capital',
  'waterfall-media',
]);

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Malformed request.' }, { status: 400 });
  }

  const email = String(body?.email || '').trim();
  const list = String(body?.list || '');

  if (!EMAIL.test(email)) {
    return Response.json(
      { ok: false, error: 'That address is missing an @ or a domain. Check it and send again.' },
      { status: 422 }
    );
  }
  if (!LISTS.has(list)) {
    return Response.json({ ok: false, error: 'Unknown register.' }, { status: 422 });
  }

  const record = {
    email,
    list,
    name: String(body?.name || '').trim().slice(0, 120),
    org: String(body?.org || '').trim().slice(0, 120),
    note: String(body?.note || '').trim().slice(0, 2000),
    role: String(body?.role || '').trim().slice(0, 120),
    city: String(body?.city || '').trim().slice(0, 120),
    use: String(body?.use || '').trim().slice(0, 4000),
    commitments: Array.isArray(body?.commitments)
      ? body.commitments.slice(0, 12).map((c) => String(c).slice(0, 40))
      : [],
    at: new Date().toISOString(),
  };

  try {
    await fs.mkdir(path.dirname(STORE), { recursive: true });
    await fs.appendFile(STORE, `${JSON.stringify(record)}\n`, 'utf8');
  } catch {
    return Response.json(
      { ok: false, error: 'We could not record that. Try again in a moment.' },
      { status: 500 }
    );
  }

  return Response.json({ ok: true });
}
