import { publicUrl, isSecure, PRIVATE_HEADERS } from '../../../lib/bioveld/auth.js';
import { COOKIE, MAX_AGE, basePath, isAllowedHost, passwordMatches, sessionValue } from '../../../lib/hub/auth.js';
import { logVisit, newVisitorId, VISITOR } from '../../../lib/bioveld/visits.js';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  if (!isAllowedHost(request)) return new Response('Not found', { status: 404 });

  const form = await request.formData().catch(() => null);
  const ok = passwordMatches(form?.get('password'));
  const home = basePath(request) || '/';
  const headers = new Headers({ ...PRIVATE_HEADERS, location: publicUrl(request, ok ? home : `${home}?e=1`) });
  const secure = isSecure(request) ? ['Secure'] : [];
  if (ok) {
    headers.append('set-cookie', [`${COOKIE}=${sessionValue()}`, 'Path=/', `Max-Age=${MAX_AGE}`, 'HttpOnly', 'SameSite=Lax', ...secure].join('; '));
    const visitor = request.cookies.get(VISITOR)?.value || newVisitorId();
    headers.append('set-cookie', [`${VISITOR}=${visitor}`, 'Path=/', 'Max-Age=31536000', 'HttpOnly', 'SameSite=Lax', ...secure].join('; '));
    logVisit(request, 'signin', visitor);
  } else {
    logVisit(request, 'failed');
  }
  return new Response(null, { status: 303, headers });
}
