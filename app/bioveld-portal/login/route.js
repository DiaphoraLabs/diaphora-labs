import { publicUrl, COOKIE, MAX_AGE, basePath, isAllowedHost, isSecure, passwordMatches, sessionValue, PRIVATE_HEADERS } from '../../../lib/bioveld/auth.js';

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
  }
  return new Response(null, { status: 303, headers });
}
