import { NextResponse } from 'next/server';

// Niagara Tech Week is a separate domain served from this same project. The
// coming-soon page is a standalone document in public/, so nothing about the
// Diaphora site's chrome — the axis, the footer, the root layout — reaches it.
//
// Next 16 renamed `middleware.js` to `proxy.js`; the behaviour is unchanged.
const NTW_HOSTS = new Set([
  'niagaratechweek.com',
  'www.niagaratechweek.com',
]);

const NTW_PAGE = '/niagara-tech-week/index.html';

// Files that must answer as themselves on this host rather than be rewritten to
// the page. Without this, /robots.txt served the landing page's HTML, which
// tells a crawler nothing and reads as a broken site.
const NTW_FILES = {
  '/robots.txt': '/niagara-tech-week/robots.txt',
  '/sitemap.xml': '/niagara-tech-week/sitemap.xml',
};

export function proxy(request) {
  // The Host header carries the port in local dev; the domain is what matters.
  const host = (request.headers.get('host') || '').toLowerCase().split(':')[0];
  if (!NTW_HOSTS.has(host)) return NextResponse.next();

  const { pathname } = request.nextUrl;

  // /api/register is the register for every list on the site, this one
  // included, so the API must stay reachable on this domain rather than being
  // rewritten to the landing page.
  if (pathname.startsWith('/api/')) return NextResponse.next();

  const file = NTW_FILES[pathname];
  if (file) return NextResponse.rewrite(new URL(file, request.url));

  // The page asks for nothing else, but serving its own asset path directly
  // keeps a hard refresh of the rewritten URL working.
  if (pathname === NTW_PAGE) return NextResponse.next();

  // Everything else on this domain is the one page. A visitor who guesses a
  // path from the main site should land here, not on a Diaphora 404 wearing
  // the wrong domain.
  return NextResponse.rewrite(new URL(NTW_PAGE, request.url));
}

export const config = {
  // Static assets and image optimization are excluded so the rewrite cannot
  // swallow CSS, JS, or images. `/media` is the public asset folder the
  // Diaphora site serves its brand files from.
  matcher: ['/((?!_next/static|_next/image|media|favicon.ico).*)'],
};
