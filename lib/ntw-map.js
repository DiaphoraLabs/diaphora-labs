// The public side of Niagara Tech Week: which events can be shown, and where.
// Only approved or listed events whose host chose a public or invite-only
// listing appear, and only the fields a listing would show anyway. Emails,
// notes, needs and private events never leave the database through here.
import { sql } from './db.js';
import { LABELS, isLumaLink } from './ntw-events.js';

// The twelve municipalities, with the towns and neighbourhoods people actually
// write in a venue line, so "Beamsville" lands in Lincoln and "Fonthill" in Pelham.
export const PLACES = {
  'niagara-falls': ['niagara falls', 'chippawa', 'stamford'],
  'st-catharines': ['st. catharines', 'st catharines', 'saint catharines', 'port dalhousie', 'brock university'],
  thorold: ['thorold', 'allanburg', 'port robinson', 'bioveld'],
  welland: ['welland'],
  'port-colborne': ['port colborne'],
  'fort-erie': ['fort erie', 'crystal beach', 'ridgeway', 'stevensville'],
  grimsby: ['grimsby'],
  lincoln: ['lincoln', 'beamsville', 'vineland', 'jordan'],
  notl: ['niagara-on-the-lake', 'niagara on the lake', 'notl', 'virgil', 'queenston', 'st. davids', 'st davids'],
  pelham: ['pelham', 'fonthill', 'fenwick'],
  wainfleet: ['wainfleet'],
  'west-lincoln': ['west lincoln', 'smithville'],
  wny: ['buffalo', 'niagara falls, ny', 'niagara falls ny', 'lewiston', 'western new york'],
};

// Longest names first, so "West Lincoln" is not read as "Lincoln" and
// "Niagara Falls, NY" is not read as the Ontario city.
const MATCHERS = Object.entries(PLACES)
  .flatMap(([key, names]) => names.map((n) => [key, n]))
  .sort((a, b) => b[1].length - a[1].length);

export function placeOf(text) {
  const t = ` ${String(text || '').toLowerCase()} `;
  for (const [key, name] of MATCHERS) if (t.includes(name)) return key;
  return null;
}

export async function publicEvents() {
  const db = sql();
  const events = await db.query(
    `select id, title, org, host_name, concept, kind, format, streams, days, venue, link, visibility, status
       from niagara_tech_week_events
      where status in ('approved', 'listed') and visibility in ('public', 'invite')
      order by created_at`
  );
  // A venue line that names an offered venue takes that venue's city.
  const venues = await db.query(
    `select venue_name, city from niagara_tech_week_venues where status not in ('declined', 'withdrawn')`
  );
  const byName = venues
    .filter((v) => v.venue_name)
    .map((v) => [v.venue_name.toLowerCase(), v.city])
    .sort((a, b) => b[0].length - a[0].length);

  return events.map((e) => {
    const venueLine = String(e.venue || '');
    const known = byName.find(([name]) => venueLine.toLowerCase().includes(name));
    return {
      id: e.id,
      title: e.title,
      host: e.org || e.host_name,
      summary: String(e.concept || '').slice(0, 280),
      kind: e.kind,
      format: LABELS.formats[e.format] || e.format,
      streams: (e.streams || []).map((s) => ({ key: s, label: LABELS.streams[s] || s })),
      days: e.days || [],
      venue: venueLine,
      place: placeOf(known ? known[1] : venueLine),
      link: e.link || '',
      calendar: isLumaLink(e.link),
      inviteOnly: e.visibility === 'invite',
    };
  });
}
