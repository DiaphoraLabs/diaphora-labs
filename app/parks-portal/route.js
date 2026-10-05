import page from '../../lib/parks/page-html.js';
import { loginPage } from '../../lib/bioveld/login-page.js';
import { PRIVATE_HEADERS } from '../../lib/bioveld/auth.js';
import { basePath, isAllowedHost, isSignedIn } from '../../lib/parks/auth.js';
import { logVisit } from '../../lib/bioveld/visits.js';

// The Niagara Parks tourism test bed proposal. testbed.diaphoralabs.com is rewritten
// onto this route by the proxy, so the password check is the only way in.
export const dynamic = 'force-dynamic';

const TEXT = {
  title: 'Tourism Test Bed · Diaphora Labs',
  heading: 'Tourism test bed',
  sub: 'A proposal from Diaphora Labs for Niagara Parks. Enter the password you were given to continue.',
  button: 'Open the proposal',
};

export async function GET(request) {
  if (!isAllowedHost(request)) return new Response('Not found', { status: 404 });
  const headers = { 'content-type': 'text/html; charset=utf-8', ...PRIVATE_HEADERS };
  if (isSignedIn(request)) {
    logVisit(request, 'view');
    return new Response(page.replace('href="/logout"', `href="${basePath(request)}/logout"`), { headers });
  }
  const error = request.nextUrl.searchParams.get('e') === '1';
  return new Response(loginPage({ action: `${basePath(request)}/login`, error, text: TEXT }), { status: 401, headers });
}
