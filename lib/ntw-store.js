import { createHash, randomBytes } from 'node:crypto';
import { sql } from './db';

// Storage for Niagara Tech Week submissions: events and venues are two tables
// with the same life, so they share one set of operations. There are no
// accounts. Each row is edited through a secret link whose token is shown to
// the submitter once; only its SHA-256 is stored, so a leaked copy of a table
// cannot be used to edit anything.

export const hash = (token) => createHash('sha256').update(token).digest('hex');

// A token is 24 random bytes, which is 32 url-safe characters. Anything else
// is not worth a query.
export function tokenFrom(value) {
  const t = String(value ?? '');
  return /^[A-Za-z0-9_-]{32}$/.test(t) ? t : '';
}

// `table` and `columns` come from the route's own constants, never from the
// request, which is why they can be spliced into the SQL text. Values always
// travel as parameters.
export function store(table, columns) {
  const visible = [...columns, 'id', 'status', 'created_at', 'updated_at'].join(', ');
  const present = (value) => columns.filter((c) => Object.hasOwn(value, c));

  return {
    async insert(value) {
      const token = randomBytes(24).toString('base64url');
      const cols = present(value);
      const rows = await sql().query(
        `insert into ${table} (${cols.join(', ')}, edit_hash)
         values (${cols.map((_, i) => `$${i + 1}`).join(', ')}, $${cols.length + 1})
         returning ${visible}`,
        [...cols.map((c) => value[c]), hash(token)]
      );
      return { row: rows[0], token };
    },

    async byToken(token) {
      const rows = await sql().query(
        `select ${visible} from ${table} where edit_hash = $1`,
        [hash(token)]
      );
      return rows[0] || null;
    },

    // Withdrawing is the one status change a submitter makes, and it is final
    // from their side: bringing something back is a conversation with the team.
    async update(token, value, { withdraw = false } = {}) {
      const cols = present(value);
      const params = cols.map((c) => value[c]);
      const sets = cols.map((c, i) => `${c} = $${i + 1}`);
      if (withdraw) sets.push(`status = 'withdrawn'`);
      if (!sets.length) return { empty: true };
      params.push(hash(token));
      const rows = await sql().query(
        `update ${table}
         set ${sets.join(', ')}, updated_at = now()
         where edit_hash = $${params.length} and status <> 'withdrawn'
         returning ${visible}`,
        params
      );
      return { row: rows[0] || null };
    },

    // Everything still in play, for matching. Small tables: a tech week has
    // hundreds of events at most, so scoring in memory beats a clever query.
    async open(where = '') {
      return sql().query(
        `select ${visible} from ${table}
         where status not in ('declined', 'withdrawn') ${where}
         order by created_at`
      );
    },
  };
}

// The columns a submitter may write. `status` is in neither: review is the
// team's, never the submitter's.
export const events = store('niagara_tech_week_events', [
  'email', 'host_name', 'org', 'title', 'concept', 'kind', 'lifestyle_tag', 'format',
  'side', 'streams', 'stream_other', 'size', 'days', 'audience', 'cohosts', 'needs',
  'visibility', 'venue', 'link', 'notes',
]);

export const venues = store('niagara_tech_week_venues', [
  'email', 'contact_name', 'org', 'venue_name', 'address', 'city', 'side',
  'capacity_seated', 'capacity_standing', 'spaces', 'days', 'offer', 'amenities',
  'formats', 'streams', 'lifestyle_ok', 'link', 'notes',
]);

export const sponsors = store('niagara_tech_week_sponsors', [
  'email', 'contact_name', 'org', 'site', 'support', 'streams', 'stream_other',
  'budget', 'goals', 'notes',
]);
