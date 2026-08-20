'use client';

import './globals.css';

// The last boundary. This one replaces the root layout, so the axis, the
// footer and the loaded faces are all gone — it has to carry the world on its
// own, with system fallbacks, and say the one thing that matters.
export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body>
        <main
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '1.4rem',
            padding: 'clamp(1.25rem, 4vw, 4rem)',
            background: 'var(--patina-deep)',
          }}
        >
          <span
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '0.8rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--bronze)',
            }}
          >
            Diaphora Labs · Fault
          </span>

          <h1
            style={{
              margin: 0,
              fontFamily: "'Arial Narrow', Arial, sans-serif",
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.01em',
              lineHeight: 0.9,
              fontSize: 'clamp(2.2rem, 1.4rem + 4vw, 5rem)',
              color: 'var(--bone)',
              maxWidth: '14ch',
            }}
          >
            The whole die cracked
          </h1>

          <p style={{ margin: 0, maxWidth: '60ch', color: 'var(--bone-dim)', lineHeight: 1.6 }}>
            The site failed to load at its root, so nothing on this page can be trusted to
            be right. Nothing you typed was sent anywhere. Reloading usually clears it.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.9rem', alignItems: 'center' }}>
            <button
              type="button"
              onClick={reset}
              style={{
                appearance: 'none',
                border: '1px solid var(--bone)',
                background: 'var(--bone)',
                color: 'var(--patina-deep)',
                fontFamily: "'Arial Narrow', Arial, sans-serif",
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontSize: '0.8rem',
                padding: '0.85rem 1.1rem',
                minHeight: '44px',
                cursor: 'pointer',
              }}
            >
              Reload the site
            </button>
            <a
              href="mailto:innovate@diaphoralabs.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                minHeight: '44px',
                fontFamily: 'ui-monospace, monospace',
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--bone)',
              }}
            >
              innovate@diaphoralabs.com
            </a>
          </div>

          {error?.digest && (
            <span
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--bone-dim)',
              }}
            >
              Fault reference {error.digest}
            </span>
          )}
        </main>
      </body>
    </html>
  );
}
