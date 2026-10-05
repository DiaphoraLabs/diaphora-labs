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
  // The host form: one page with three forms. /venues and /sponsor open it on
  // their own form, so each audience can be handed a link that starts there.
  '/host': '/niagara-tech-week/host.html',
  '/venues': '/niagara-tech-week/host.html',
  '/sponsor': '/niagara-tech-week/host.html',
};

// diaphoralabs.com is parked on a coming-soon page while the site is rebuilt.
// Only the root is taken: the rest of the app stays reachable at its own paths,
// because Project: Waterfall is a live proposal with Niagara Parks and its URL
// is in circulation. Parking the whole host would take that offline.
const DIAPHORA_HOSTS = new Set([
  'diaphoralabs.com',
  'www.diaphoralabs.com',
]);

const DIAPHORA_PAGE = '/diaphora/index.html';

// bioveld.diaphoralabs.com is a private briefing for BMI Group. Everything on
// that host is answered by the password-gated routes in app/bioveld-portal, so
// no page of the main site, and no file in public/, is reachable from it.
const BIOVELD_HOSTS = new Set([
  'bioveld.diaphoralabs.com',
]);

const BIOVELD_ROUTES = {
  '/login': '/bioveld-portal/login',
  '/logout': '/bioveld-portal/logout',
};

export function proxy(request) {
  // The Host header carries the port in local dev; the domain is what matters.
  const host = (request.headers.get('host') || '').toLowerCase().split(':')[0];

  if (BIOVELD_HOSTS.has(host)) {
    const { pathname } = request.nextUrl;
    if (pathname === '/robots.txt') {
      return new NextResponse('User-agent: *\nDisallow: /\n', {
        headers: { 'content-type': 'text/plain; charset=utf-8' },
      });
    }
    const route = BIOVELD_ROUTES[pathname] || '/bioveld-portal';
    return NextResponse.rewrite(new URL(route + request.nextUrl.search, request.url));
  }

  if (DIAPHORA_HOSTS.has(host)) {
    return request.nextUrl.pathname === '/'
      ? NextResponse.rewrite(new URL(DIAPHORA_PAGE, request.url))
      : NextResponse.next();
  }

  if (!NTW_HOSTS.has(host)) return NextResponse.next();

  const { pathname } = request.nextUrl;

  // /api/register is the register for every list on the site, this one
  // included, so the API must stay reachable on this domain rather than being
  // rewritten to the landing page.
  if (pathname.startsWith('/api/')) return NextResponse.next();

  const file = NTW_FILES[pathname];
  if (file) return NextResponse.rewrite(new URL(file, request.url));

  // Serving the page's own path directly keeps a hard refresh of the rewritten
  // URL working. The only thing it fetches is the hosts' marks for the barrels,
  // which would otherwise come back as the page's HTML and draw nothing.
  if (pathname === NTW_PAGE || pathname === '/niagara-tech-week/host.html'
      || pathname.startsWith('/niagara-tech-week/sponsors/')) {
    return NextResponse.next();
  }

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
