import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

// The Bioveld briefing is a private document for BMI Group, shared with one
// password. Only the password's SHA-256 is kept here, never the password.
// To change it, replace this hash; every existing session ends with it.
const PASSWORD_SHA256 = '6370a0c378b34dd0aa37ee3842f2347b7638864e34230abc0f67122a50b41b8d';

// The session cookie carries an HMAC rather than anything a visitor typed, so
// it cannot be forged without the secret. Set BIOVELD_SESSION_SECRET in Vercel
// to end every session at once; without it the hash above stands in.
const SECRET = process.env.BIOVELD_SESSION_SECRET || PASSWORD_SHA256;
const SESSION = createHmac('sha256', SECRET).update('bioveld-session:' + PASSWORD_SHA256).digest('hex');

export const COOKIE = 'bioveld_session';
export const MAX_AGE = 60 * 60 * 24 * 30; // thirty days

const BIOVELD_HOSTS = new Set(['bioveld.diaphoralabs.com']);

function hostOf(request) {
  return (request.headers.get('host') || '').toLowerCase().split(':')[0];
}

// The briefing answers on its own subdomain, on Vercel previews, and in local
// development. On diaphoralabs.com and niagaratechweek.com it does not exist.
export function isAllowedHost(request) {
  const host = hostOf(request);
  return BIOVELD_HOSTS.has(host) || host === 'localhost' || host === '127.0.0.1' || host.endsWith('.vercel.app');
}

// On the subdomain the proxy maps / , /login and /logout onto these routes, so
// links are written without the /bioveld-portal prefix there and with it
// everywhere else.
export function basePath(request) {
  return BIOVELD_HOSTS.has(hostOf(request)) ? '' : '/bioveld-portal';
}

// An absolute URL on the host the visitor actually used. Next resolves a
// relative Location against its own origin, which behind the proxy rewrite is
// not always the public one, so the forwarded host is used explicitly.
export function publicUrl(request, path) {
  const host = request.headers.get('host') || request.headers.get('x-forwarded-host') || new URL(request.url).host;
  const proto = (request.headers.get('x-forwarded-proto') || '').split(',')[0].trim() || (isSecure(request) ? 'https' : 'http');
  return `${proto}://${host}${path}`;
}

export function isSecure(request) {
  const host = hostOf(request);
  return !(host === 'localhost' || host === '127.0.0.1');
}

function equal(a, b) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function passwordMatches(input) {
  const digest = createHash('sha256').update(String(input ?? '').trim()).digest('hex');
  return equal(digest, PASSWORD_SHA256);
}

export function sessionValue() {
  return SESSION;
}

export function isSignedIn(request) {
  const value = request.cookies.get(COOKIE)?.value;
  return Boolean(value) && equal(value, SESSION);
}

// Every response from these routes is private: never cached, never indexed,
// never framed by another site.
export const PRIVATE_HEADERS = {
  'cache-control': 'private, no-store, max-age=0',
  'x-robots-tag': 'noindex, nofollow, noarchive',
  'x-frame-options': 'DENY',
  'referrer-policy': 'no-referrer',
  'x-content-type-options': 'nosniff',
};
