// One submit path for every register on the site. It exists because a form
// that hangs is worse than one that fails: without a deadline the button sits
// on "Striking…" forever and the visitor has nothing to act on.

export const FIELD_LIMITS = { name: 120, org: 120, role: 120, city: 120, note: 2000 };

const TIMEOUT_MS = 12000;

export async function postRegister(payload) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    // A proxy or a crashed route answers with HTML, not JSON. Reading that as
    // a network failure would tell the visitor to check a connection that is
    // working perfectly well.
    let data = null;
    try {
      data = await res.json();
    } catch {
      return {
        ok: false,
        error: res.status >= 500
          ? 'The register is not answering right now. Try again in a moment, or write to innovate@diaphoralabs.com.'
          : 'The register sent back something we could not read. Try again.',
      };
    }

    if (!res.ok || !data?.ok) {
      return { ok: false, error: data?.error || 'Something went wrong. Try again.' };
    }
    return { ok: true };
  } catch (err) {
    if (err?.name === 'AbortError') {
      return {
        ok: false,
        error: 'That took too long to send. Your details are still here — send again, or write to innovate@diaphoralabs.com.',
      };
    }
    return { ok: false, error: 'No connection. Check your network and send again.' };
  } finally {
    clearTimeout(timer);
  }
}
