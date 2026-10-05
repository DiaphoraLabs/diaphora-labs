import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

// The Niagara Parks test bed page is a private proposal, shared with one password. Only its SHA-256 is kept here.
// To change it, replace this hash; every existing session ends with it.
const PASSWORD_SHA256 = 'a5495c0c0caf8488b0ea9bdb5f68e16a346594eb8c1bf1f44dca719b7406a91e';

// Same scheme as the Bioveld briefing, with its own secret and cookie, so a
// session on one page never opens the other.
const SECRET = process.env.PARKS_SESSION_SECRET || PASSWORD_SHA256;
const SESSION = createHmac('sha256', SECRET).update('parks-session:' + PASSWORD_SHA256).digest('hex');

export const COOKIE = 'parks_session';
export const MAX_AGE = 60 * 60 * 24 * 30; // thirty days

export const PARKS_HOSTS = new Set(['testbed.diaphoralabs.com']);

function hostOf(request) {
  return (request.headers.get('host') || '').toLowerCase().split(':')[0];
}

// Answers on its own subdomain, on Vercel previews, and in local development.
export function isAllowedHost(request) {
  const host = hostOf(request);
  return PARKS_HOSTS.has(host) || host === 'localhost' || host === '127.0.0.1' || host.endsWith('.vercel.app');
}

// On the subdomain the proxy maps / , /login and /logout onto these routes.
export function basePath(request) {
  return PARKS_HOSTS.has(hostOf(request)) ? '' : '/parks-portal';
}

function equal(a, b) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function passwordMatches(input) {
  return equal(createHash('sha256').update(String(input ?? '').trim()).digest('hex'), PASSWORD_SHA256);
}

export function sessionValue() {
  return SESSION;
}

export function isSignedIn(request) {
  const value = request.cookies.get(COOKIE)?.value;
  return Boolean(value) && equal(value, SESSION);
}
