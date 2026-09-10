import { sql } from '../../../lib/db';

// Niagara Tech Week's own register. It is deliberately not a lane in
// /api/register: different event, different domain, different retention, and a
// list that may one day be handed to a co-convenor should not sit in the same
// table as every Diaphora sign-on.
//
// The contract matches the rest of the site so the client code reads the same:
// { ok } on success, { ok:false, error } on anything else. A form that pretends
// to submit is worse than one that plainly does not.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const INTERESTS = new Set(['attending', 'hosting', 'sponsoring']);

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

  // Lowercased on the way in so the unique index can be a plain column index
  // and two spellings of one address cannot both take a row.
  const email = String(body?.email || '').trim().toLowerCase();
  if (!EMAIL.test(email)) {
    return Response.json(
      { ok: false, error: 'That address is missing an @ or a domain. Check it and send again.' },
      { status: 422 }
    );
  }

  // Only the three the page offers. Anything else is discarded rather than
  // stored, so the column cannot become a free-text field by accident.
  const interests = Array.isArray(body?.interests)
    ? [...new Set(body.interests.map((i) => String(i).toLowerCase()))].filter((i) => INTERESTS.has(i))
    : [];

  try {
    const db = sql();
    // Signing up twice is a correction, not a second person: keep one row and
    // take the later set of interests.
    await db`
      insert into niagara_tech_week_signups (email, interests)
      values (${email}, ${interests.length ? interests : ['attending']})
      on conflict (email)
      do update set interests = excluded.interests, at = now()
    `;
  } catch (err) {
    // The visitor gets one recoverable sentence; the detail goes to the
    // function log, where it is actually actionable.
    console.error('niagara-tech-week: write failed', err);
    return Response.json(
      { ok: false, error: 'We could not record that. Try again in a moment.' },
      { status: 500 }
    );
  }

  return Response.json({ ok: true });
}
