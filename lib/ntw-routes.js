import { after } from 'next/server';
import { tokenFrom } from './ntw-store';

// POST / GET / PATCH for a Niagara Tech Week submission table. A submitter
// creates a row (POST), reads it back (GET ?token=) and corrects or withdraws
// it (PATCH) through the secret edit link, the way Toronto Tech Week mails
// hosts an update link.
//
// Same contract as the sign-up route: { ok } on success, { ok:false, error }
// otherwise, plus `fields` when the problem is one the form can point at.

function fail(error, status, fields) {
  return Response.json({ ok: false, error, ...(fields ? { fields } : {}) }, { status });
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return undefined;
  }
}

// `onCreate(row)` runs after the response is sent: the notification email and
// its matching must never slow a submission down or fail it.
export function submissionHandlers({ name, store, validate, onCreate }) {
  async function POST(request) {
    const body = await readJson(request);
    if (body === undefined) return fail('Malformed request.', 400);

    // The form carries a field people never see. A bot fills every field it
    // finds; answering it as a success tells it nothing worth retrying.
    if (String(body?.website ?? '').trim()) return Response.json({ ok: true });

    const { value, errors } = validate(body);
    if (Object.keys(errors).length) return fail('A few things need another look.', 422, errors);

    let created;
    try {
      created = await store.insert(value);
    } catch (err) {
      console.error(`${name}: insert failed`, err);
      return fail('We could not record that. Try again in a moment.', 500);
    }

    if (onCreate) {
      after(async () => {
        try {
          await onCreate(created.row);
        } catch (err) {
          console.error(`${name}: follow-up failed`, err);
        }
      });
    }
    return Response.json({ ok: true, id: created.row.id, token: created.token });
  }

  async function GET(request) {
    const token = tokenFrom(new URL(request.url).searchParams.get('token'));
    if (!token) return fail('That edit link is not complete.', 400);
    try {
      const row = await store.byToken(token);
      if (!row) return fail('We could not find anything for that link.', 404);
      return Response.json({ ok: true, item: row });
    } catch (err) {
      console.error(`${name}: read failed`, err);
      return fail('We could not load that. Try again in a moment.', 500);
    }
  }

  async function PATCH(request) {
    const body = await readJson(request);
    if (body === undefined) return fail('Malformed request.', 400);

    const token = tokenFrom(body?.token);
    if (!token) return fail('That edit link is not complete.', 400);

    const { value, errors } = validate(body, { partial: true });
    if (Object.keys(errors).length) return fail('A few things need another look.', 422, errors);

    try {
      const res = await store.update(token, value, { withdraw: body?.withdraw === true });
      if (res.empty) return fail('Nothing to change.', 400);
      if (!res.row) return fail('We could not find an open submission for that link.', 404);
      return Response.json({ ok: true, item: res.row });
    } catch (err) {
      console.error(`${name}: update failed`, err);
      return fail('We could not save that. Try again in a moment.', 500);
    }
  }

  return { POST, GET, PATCH };
}
