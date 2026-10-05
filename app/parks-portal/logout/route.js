import { publicUrl, PRIVATE_HEADERS } from '../../../lib/bioveld/auth.js';
import { COOKIE, basePath, isAllowedHost } from '../../../lib/parks/auth.js';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  if (!isAllowedHost(request)) return new Response('Not found', { status: 404 });
  const headers = new Headers({ ...PRIVATE_HEADERS, location: publicUrl(request, basePath(request) || '/') });
  headers.append('set-cookie', `${COOKIE}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`);
  return new Response(null, { status: 303, headers });
}
