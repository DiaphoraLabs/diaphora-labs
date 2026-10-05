import { sql } from '../../../lib/db.js';
import { PRIVATE_HEADERS, isAllowedHost, isSecure } from '../../../lib/bioveld/auth.js';
import { OWNER, statsKeyMatches } from '../../../lib/bioveld/visits.js';

// The author's view of who has opened the briefing. It needs its own key, not
// the briefing password, so BMI never sees it. A wrong or missing key gets the
// same 404 as a page that does not exist. Opening it also marks this browser
// as the author's, so its own reading stops being counted.
export const dynamic = 'force-dynamic';

const TZ = 'America/Toronto';
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const when = (d) => new Date(d).toLocaleString('en-CA', { timeZone: TZ, dateStyle: 'medium', timeStyle: 'short' });
const LABEL = { signin: 'Signed in', view: 'Opened', failed: 'Wrong password' };

export async function GET(request) {
  if (!isAllowedHost(request) || !statsKeyMatches(request.nextUrl.searchParams.get('key'))) {
    return new Response('Not found', { status: 404 });
  }

  let rows = [];
  let error = '';
  try {
    rows = await sql()`select kind, device, visitor, at from bioveld_visits order by at desc limit 500`;
  } catch (err) {
    console.error('bioveld: visits read failed', err);
    error = 'Could not read the log. It may not exist until the next deploy has run the migration.';
  }

  // Scripts and bots are kept in the table but left out of the counts.
  const people = rows.filter((r) => r.device !== 'script' && r.device !== 'bot');
  const visitors = new Set(people.filter((r) => r.visitor).map((r) => r.visitor));
  const count = (k) => people.filter((r) => r.kind === k).length;
  const days = new Map();
  for (const r of people) {
    const d = new Date(r.at).toLocaleDateString('en-CA', { timeZone: TZ });
    const e = days.get(d) || { signin: 0, view: 0, failed: 0 };
    e[r.kind] = (e[r.kind] || 0) + 1;
    days.set(d, e);
  }
  const last = people[0];

  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Bioveld visits</title><meta name="robots" content="noindex">
<style>
:root{--bg:#0b1815;--panel:#123029;--ink:#ece7d9;--muted:#a9b3a8;--rule:#24443b;--accent:#d9a865}
body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.5 system-ui,sans-serif}
main{max-width:860px;margin:0 auto;padding:28px 16px 60px}
h1{font-size:26px;margin:0 0 4px}h2{font-size:17px;margin:28px 0 8px}
p{color:var(--muted);margin:0 0 12px}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin:18px 0}
.stats div{background:var(--panel);border-radius:6px;padding:12px 14px;color:var(--muted);font-size:13px}
.stats b{display:block;color:var(--ink);font-size:26px;font-variant-numeric:tabular-nums}
table{width:100%;border-collapse:collapse;font-size:14px}
th,td{text-align:left;padding:7px 8px;border-bottom:1px solid var(--rule)}
th{color:var(--muted);font-weight:500}td.n{font-variant-numeric:tabular-nums}
.err{color:var(--accent)}
</style></head><body><main>
<h1>Who has opened the Bioveld briefing</h1>
<p>Times are Toronto time. No names, addresses or IPs are kept: only the event, the kind of device and a random id per browser. Your own browser is now excluded from the counts.</p>
${error ? `<p class="err">${esc(error)}</p>` : ''}
<div class="stats">
<div><b>${count('signin')}</b>sign-ins</div>
<div><b>${count('view')}</b>times opened</div>
<div><b>${visitors.size}</b>different browsers</div>
<div><b>${count('failed')}</b>wrong passwords</div>
<div><b style="font-size:17px">${last ? esc(when(last.at)) : '—'}</b>most recent</div>
</div>
<h2>By day</h2>
<table><thead><tr><th>Day</th><th>Sign-ins</th><th>Opened</th><th>Wrong password</th></tr></thead><tbody>
${[...days].map(([d, e]) => `<tr><td>${esc(d)}</td><td class="n">${e.signin || 0}</td><td class="n">${e.view || 0}</td><td class="n">${e.failed || 0}</td></tr>`).join('') || '<tr><td colspan="4">Nothing yet.</td></tr>'}
</tbody></table>
<h2>Latest events</h2>
<table><thead><tr><th>When</th><th>What</th><th>Device</th><th>Browser</th></tr></thead><tbody>
${rows.slice(0, 60).map((r) => `<tr><td>${esc(when(r.at))}</td><td>${esc(LABEL[r.kind] || r.kind)}</td><td>${esc(r.device)}</td><td>${esc(r.visitor ? r.visitor.slice(0, 6) : '—')}</td></tr>`).join('') || '<tr><td colspan="4">Nothing yet.</td></tr>'}
</tbody></table>
</main></body></html>`;

  const headers = new Headers({ ...PRIVATE_HEADERS, 'content-type': 'text/html; charset=utf-8' });
  headers.append('set-cookie', [`${OWNER}=1`, 'Path=/', 'Max-Age=31536000', 'HttpOnly', 'SameSite=Lax', ...(isSecure(request) ? ['Secure'] : [])].join('; '));
  return new Response(html, { headers });
}
