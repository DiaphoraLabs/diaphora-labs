import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

// The Innovation Hub page is a private proposal for the Niagara Falls Rankin
// Innovation Hub, shared with one password. Only its SHA-256 is kept here.
// To change it, replace this hash; every existing session ends with it.
const PASSWORD_SHA256 = '50a3b397ad10f71b90677c37cc3b92800a3ff485d0f87e5c18c6044ce6e73eed';

// Same scheme as the Bioveld briefing, with its own secret and cookie, so a
// session on one page never opens the other.
const SECRET = process.env.HUB_SESSION_SECRET || PASSWORD_SHA256;
const SESSION = createHmac('sha256', SECRET).update('hub-session:' + PASSWORD_SHA256).digest('hex');

export const COOKIE = 'hub_session';
export const MAX_AGE = 60 * 60 * 24 * 30; // thirty days

export const HUB_HOSTS = new Set(['innovationhub.diaphoralabs.com']);

function hostOf(request) {
  return (request.headers.get('host') || '').toLowerCase().split(':')[0];
}

// Answers on its own subdomain, on Vercel previews, and in local development.
export function isAllowedHost(request) {
  const host = hostOf(request);
  return HUB_HOSTS.has(host) || host === 'localhost' || host === '127.0.0.1' || host.endsWith('.vercel.app');
}

// On the subdomain the proxy maps / , /login and /logout onto these routes.
export function basePath(request) {
  return HUB_HOSTS.has(hostOf(request)) ? '' : '/hub-portal';
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
