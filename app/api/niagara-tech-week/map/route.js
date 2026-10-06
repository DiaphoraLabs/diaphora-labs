import { publicEvents } from '../../../../lib/ntw-map';

// Approved, publicly listed events for the map page. Read-only and safe to
// cache briefly: a new approval appearing a few minutes late harms no one.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const events = await publicEvents();
    return Response.json({ ok: true, events }, { headers: { 'cache-control': 'public, s-maxage=300, stale-while-revalidate=600' } });
  } catch (err) {
    console.error('ntw map: read failed', err);
    return Response.json({ ok: false, events: [] }, { status: 503 });
  }
}
