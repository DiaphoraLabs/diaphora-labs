import briefing from '../../lib/bioveld/briefing-html.js';
import { loginPage } from '../../lib/bioveld/login-page.js';
import { logVisit } from '../../lib/bioveld/visits.js';
import { PRIVATE_HEADERS, basePath, isAllowedHost, isSignedIn } from '../../lib/bioveld/auth.js';

// The Bioveld briefing lives here rather than in public/, so the only way to
// read it is through this check. bioveld.diaphoralabs.com is rewritten onto this
// route by the proxy.
export const dynamic = 'force-dynamic';

export async function GET(request) {
  if (!isAllowedHost(request)) return new Response('Not found', { status: 404 });

  const headers = { 'content-type': 'text/html; charset=utf-8', ...PRIVATE_HEADERS };

  if (isSignedIn(request)) {
    logVisit(request, 'view');
    return new Response(briefing.replace('href="/logout"', `href="${basePath(request)}/logout"`), { headers });
  }

  const error = request.nextUrl.searchParams.get('e') === '1';
  return new Response(loginPage({ action: `${basePath(request)}/login`, error }), { status: 401, headers });
}
