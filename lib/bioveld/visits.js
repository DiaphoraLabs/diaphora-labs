import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { after } from 'next/server';
import { sql } from '../db.js';

// Who has opened the briefing, recorded without personal data: the event, the
// kind of device and a random per-browser id. Logging runs after the response
// is sent and never fails a sign-in or a page load.
export const VISITOR = 'bioveld_visitor';
// Set by opening /visits with the key, so the author's own reading is not counted.
export const OWNER = 'bioveld_owner';

// Only the SHA-256 of the stats key is kept here, like the password.
const STATS_KEY_SHA256 = '134a43d1aef07fb43d90133f42d8edf0371e4fa74f81c9d96c8a2249322d11fd';

export function statsKeyMatches(input) {
  const a = Buffer.from(createHash('sha256').update(String(input ?? '')).digest('hex'));
  const b = Buffer.from(STATS_KEY_SHA256);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function newVisitorId() {
  return randomBytes(9).toString('base64url');
}

function deviceOf(request) {
  const ua = request.headers.get('user-agent') || '';
  if (!/Mozilla/.test(ua)) return 'script';
  if (/bot|crawl|spider|preview|slurp/i.test(ua)) return 'bot';
  if (/iPad|Tablet/i.test(ua)) return 'tablet';
  if (/Mobi|Android|iPhone/i.test(ua)) return 'phone';
  return 'desktop';
}

// Only the real subdomain is logged; previews and local development are testing.
function counts(request) {
  const host = (request.headers.get('host') || '').toLowerCase().split(':')[0];
  return host === 'bioveld.diaphoralabs.com' && !request.cookies.get(OWNER)?.value;
}

export function logVisit(request, kind, visitor = '') {
  if (!counts(request)) return;
  const device = deviceOf(request);
  const id = visitor || request.cookies.get(VISITOR)?.value || '';
  after(async () => {
    try {
      await sql()`insert into bioveld_visits (kind, device, visitor) values (${kind}, ${device}, ${id.slice(0, 24)})`;
    } catch (err) {
      console.error('bioveld: visit log failed', err);
    }
  });
}
