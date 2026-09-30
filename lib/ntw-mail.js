import { LABELS, REGIONAL_STREAMS, isLumaLink } from './ntw-events';

// Every Niagara Tech Week submission is copied to the team's inbox. The
// database is the record; the email is the prompt to act on it, so a failed
// send is logged and never fails the submission.
//
// Sent through Resend's HTTP API, which needs no SDK. Set RESEND_API_KEY and
// verify diaphoralabs.com as a sending domain in Resend. Until the key is set,
// submissions still save and the would-be email is written to the log.

const TO = process.env.NTW_MAIL_TO || 'techweek@diaphoralabs.com';
const FROM = process.env.NTW_MAIL_FROM || 'Niagara Tech Week <techweek@diaphoralabs.com>';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

const label = (map, key) => (key ? map[key] || key : '');
const list = (map, keys) => (keys || []).map((k) => label(map, k)).join(', ');
const day = (d) => new Date(`${d}T12:00:00Z`).toLocaleDateString('en-CA', {
  weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC',
});
const days = (ds) => (ds || []).map(day).join(' · ');

async function send({ subject, rows, extra, replyTo }) {
  const text = [
    ...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`),
    '', ...(extra || []).map((e) => e.text),
  ].join('\n');

  const html = `<table cellpadding="6" style="border-collapse:collapse;font:14px/1.5 Georgia,serif">${
    rows.filter(([, v]) => v).map(([k, v]) =>
      `<tr><td style="color:#667;vertical-align:top;white-space:nowrap">${esc(k)}</td><td>${esc(v)}</td></tr>`
    ).join('')
  }</table>${(extra || []).map((e) => e.html).join('')}`;

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn(`ntw-mail: RESEND_API_KEY not set, not sent to ${TO}: ${subject}\n${text}`);
    return;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      // Replying goes straight to the submitter, which is the conversation the
      // email exists to start.
      body: JSON.stringify({ from: FROM, to: [TO], reply_to: replyTo, subject, text, html }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) console.error('ntw-mail: send failed', res.status, await res.text());
  } catch (err) {
    console.error('ntw-mail: send failed', err);
  }
}

function matchBlock(title, matches, describe) {
  if (!matches?.length) return null;
  const lines = matches.map(({ item, m }) => `- ${describe(item)} (${m.reasons.join('; ')})`);
  return {
    text: `${title}\n${lines.join('\n')}`,
    html: `<h3 style="font:600 15px Georgia,serif;margin:22px 0 6px">${esc(title)}</h3><ul>${
      matches.map(({ item, m }) => `<li>${esc(describe(item))} <span style="color:#667">(${esc(m.reasons.join('; '))})</span></li>`).join('')
    }</ul>`,
  };
}

const describeVenue = (v) =>
  `${v.venue_name}, ${v.city} (up to ${Math.max(v.capacity_seated, v.capacity_standing)}, ${label(LABELS.offers, v.offer)}) ${v.email}`;
const describeEvent = (e) =>
  `${e.title} by ${e.host_name}${e.org ? `, ${e.org}` : ''} (${label(LABELS.sizes, e.size)}) ${e.email}`;

export function mailEvent(e, venueMatches) {
  const lifestyle = e.kind === 'lifestyle';
  const regional = (e.streams || []).filter((s) => Object.hasOwn(REGIONAL_STREAMS, s));
  return send({
    subject: `${lifestyle ? '[Lifestyle] ' : ''}${regional.length ? '[Regional] ' : ''}Event proposal: ${e.title}`,
    replyTo: e.email,
    rows: [
      ['Event', e.title],
      ['Concept', e.concept],
      ['Kind', lifestyle ? `Lifestyle: ${label(LABELS.lifestyleTags, e.lifestyle_tag)}` : 'Tech'],
      ['Regional streams', list(LABELS.streams, regional)],
      ['Other streams', list(LABELS.streams, (e.streams || []).filter((s) => !regional.includes(s)))],
      ['Format', label(LABELS.formats, e.format)],
      ['Side', label(LABELS.sides, e.side)],
      ['Days', days(e.days)],
      ['Size', label(LABELS.sizes, e.size)],
      ['Public', e.public ? 'Yes' : 'Private'],
      ['Audience', e.audience],
      ['Co-hosts', e.cohosts],
      ['Needs help with', list(LABELS.needs, e.needs)],
      ['Venue', e.venue],
      ['Link', e.link ? `${e.link}${isLumaLink(e.link) ? '' : ' (not Luma)'}` : ''],
      ['Notes', e.notes],
      ['Host', `${e.host_name}${e.org ? `, ${e.org}` : ''} <${e.email}>`],
      ['Submission', `#${e.id}`],
    ],
    extra: [matchBlock('Venues that could fit', venueMatches, describeVenue)].filter(Boolean),
  });
}

export function mailVenue(v, eventMatches) {
  return send({
    subject: `Venue offer: ${v.venue_name}, ${v.city}`,
    replyTo: v.email,
    rows: [
      ['Venue', v.venue_name],
      ['Operator', v.org],
      ['Address', [v.address, v.city].filter(Boolean).join(', ')],
      ['Side', label(LABELS.sides, v.side)],
      ['Seated', v.capacity_seated || ''],
      ['Standing', v.capacity_standing || ''],
      ['Spaces', v.spaces],
      ['Free on', days(v.days)],
      ['Terms', label(LABELS.offers, v.offer)],
      ['Amenities', list(LABELS.amenities, v.amenities)],
      ['Suits', list(LABELS.formats, v.formats)],
      ['Industries', list(LABELS.streams, v.streams)],
      ['Lifestyle events', v.lifestyle_ok ? 'Welcome' : 'No'],
      ['Link', v.link],
      ['Notes', v.notes],
      ['Contact', `${v.contact_name} <${v.email}>`],
      ['Submission', `#${v.id}`],
    ],
    extra: [matchBlock('Events looking for a venue that could fit', eventMatches, describeEvent)].filter(Boolean),
  });
}
