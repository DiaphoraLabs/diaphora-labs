import { sql } from '../../../lib/db';

// Capture writes to Postgres (Neon). The contract the client depends on is
// unchanged: { ok } on success, { ok:false, error } on anything else. A form
// that pretends to submit is worse than one that plainly does not, so a write
// that does not land must reach the visitor as a failure.
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
  // The proposal PDF gate. Same register as every other lane; the document is
  // handed over in the browser rather than emailed, because nothing here sends
  // mail and a promised email that never arrives is worse than no gate at all.
  'waterfall-brief',
]);

export const runtime = 'nodejs';
// Every submission must hit the database; a cached route would answer some of
// them without ever running.
export const dynamic = 'force-dynamic';

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
  };

  try {
    const db = sql();
    await db`
      insert into registrations
        (email, list, name, org, note, role, city, use_case, commitments)
      values
        (${record.email}, ${record.list}, ${record.name}, ${record.org}, ${record.note},
         ${record.role}, ${record.city}, ${record.use}, ${record.commitments})
    `;
  } catch (err) {
    // The visitor gets one recoverable sentence; the detail goes to the
    // function log, where it is actually actionable.
    console.error('register: write failed', err);
    return Response.json(
      { ok: false, error: 'We could not record that. Try again in a moment.' },
      { status: 500 }
    );
  }

  return Response.json({ ok: true });
}
