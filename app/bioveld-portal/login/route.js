import { publicUrl, COOKIE, MAX_AGE, basePath, isAllowedHost, isSecure, passwordMatches, sessionValue, PRIVATE_HEADERS } from '../../../lib/bioveld/auth.js';
import { logVisit, newVisitorId, VISITOR } from '../../../lib/bioveld/visits.js';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  if (!isAllowedHost(request)) return new Response('Not found', { status: 404 });

  const form = await request.formData().catch(() => null);
  const ok = passwordMatches(form?.get('password'));
  const home = basePath(request) || '/';

  // A relative Location keeps the visitor on whichever host they came in on;
  // 303 makes the browser follow with a GET, so a refresh never resubmits.
  const headers = new Headers({ ...PRIVATE_HEADERS, location: publicUrl(request, ok ? home : `${home}?e=1`) });
  if (ok) {
    headers.append('set-cookie', [
      `${COOKIE}=${sessionValue()}`,
      'Path=/',
      `Max-Age=${MAX_AGE}`,
      'HttpOnly',
      'SameSite=Lax',
      ...(isSecure(request) ? ['Secure'] : []),
    ].join('; '));
    // A random id per browser, so returning visits and second devices can be
    // told apart without knowing who anyone is. Kept if one already exists.
    const visitor = request.cookies.get(VISITOR)?.value || newVisitorId();
    headers.append('set-cookie', [
      `${VISITOR}=${visitor}`,
      'Path=/',
      'Max-Age=31536000',
      'HttpOnly',
      'SameSite=Lax',
      ...(isSecure(request) ? ['Secure'] : []),
    ].join('; '));
    logVisit(request, 'signin', visitor);
  } else {
    logVisit(request, 'failed');
  }
  return new Response(null, { status: 303, headers });
}
