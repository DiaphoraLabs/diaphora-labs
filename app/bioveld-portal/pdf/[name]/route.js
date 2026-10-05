import { summary, full } from '../../../../lib/bioveld/pdfs.js';
import { PRIVATE_HEADERS, isAllowedHost, isSignedIn, publicUrl, basePath } from '../../../../lib/bioveld/auth.js';
import { logVisit } from '../../../../lib/bioveld/visits.js';

// The briefing's PDFs, behind the same password as the page. Someone who is not
// signed in is sent to the sign-in page rather than shown an error.
export const dynamic = 'force-dynamic';

const FILES = {
  summary: { data: summary, file: 'Bioveld-summary.pdf' },
  full: { data: full, file: 'Bioveld-briefing.pdf' },
};

export async function GET(request, { params }) {
  if (!isAllowedHost(request)) return new Response('Not found', { status: 404 });
  const entry = FILES[(await params).name];
  if (!entry) return new Response('Not found', { status: 404 });
  if (!isSignedIn(request)) {
    return new Response(null, { status: 303, headers: { ...PRIVATE_HEADERS, location: publicUrl(request, basePath(request) || '/') } });
  }
  logVisit(request, `pdf-${(await params).name}`);
  return new Response(Buffer.from(entry.data, 'base64'), {
    headers: {
      ...PRIVATE_HEADERS,
      'content-type': 'application/pdf',
      'content-disposition': `attachment; filename="${entry.file}"`,
    },
  });
}
