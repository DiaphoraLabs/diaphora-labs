'use client';

import { useMemo, useState } from 'react';
import { MARKS } from '../lib/marks';
import Mark from './Mark';
import styles from './MarkForge.module.css';

const MAX = 4;

// The signature goes into an SVG that the visitor downloads and may well send
// on to someone else. Unescaped, a name containing < or & produces a broken
// file at best and an executable one at worst.
function xmlEscape(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Delta 0's strike: self-service, no gate, and it really does hand you the file.
export default function MarkForge() {
  const [chosen, setChosen] = useState(['curious', 'transparency']);
  const [name, setName] = useState('');
  const [struck, setStruck] = useState(false);

  const picked = useMemo(
    () => chosen.map((id) => MARKS.find((m) => m.id === id)).filter(Boolean),
    [chosen]
  );
  const full = chosen.length >= MAX;

  function toggle(id) {
    setStruck(false);
    setChosen((c) =>
      c.includes(id) ? c.filter((x) => x !== id) : c.length >= MAX ? c : [...c, id]
    );
  }

  function svgSource() {
    const label = xmlEscape((name || 'Unsigned').toUpperCase());
    const cell = 64;
    const w = Math.max(cell * picked.length, cell);
    const glyphs = picked
      .map(
        (m, i) =>
          `  <g transform="translate(${i * cell + 20} 18) scale(1)"><path d="${m.d}" fill="none" stroke="#b8894a" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round"/></g>`
      )
      .join('\n');
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="86" viewBox="0 0 ${w} 86">
  <rect width="100%" height="100%" fill="#123029"/>
${glyphs}
  <text x="20" y="72" font-family="monospace" font-size="9" letter-spacing="1.6" fill="#ece7d9">${label} · DELTA 0 · SELF-STRUCK</text>
</svg>`;
  }

  function strike() {
    if (picked.length === 0) return;
    setStruck(true);
    const blob = new Blob([svgSource()], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(name || 'unsigned').toLowerCase().replace(/[^a-z0-9]+/g, '-')}-mark.svg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    // Firefox aborts the download if the object URL is revoked in the same
    // tick as the click, so let the navigation start first.
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }

  return (
    <div className={styles.forge}>
      <fieldset className={styles.picker}>
        <legend className={`assay-line ${styles.legend}`}>
          Choose up to {MAX} — {chosen.length}/{MAX} struck
        </legend>
        <ul className={styles.grid}>
          {MARKS.map((m) => {
            const on = chosen.includes(m.id);
            const blocked = full && !on;
            return (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => toggle(m.id)}
                  aria-pressed={on}
                  disabled={blocked}
                  className={`${styles.opt} ${on ? styles.on : ''}`}
                >
                  <Mark mark={m} size={26} struck={on} />
                  <span className={styles.optName}>{m.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <div className={styles.die}>
        <span className={`assay-line ${styles.dieLabel}`}>The die</span>
        <div className={styles.face} data-empty={picked.length === 0}>
          {picked.length === 0 ? (
            <span className={styles.blank}>Blank. Choose a value.</span>
          ) : (
            picked.map((m) => <Mark key={m.id} mark={m} size={40} struck />)
          )}
        </div>

        <label className={styles.nameLabel} htmlFor="signature">
          <span className="assay-line">Sign the dial</span>
          <input
            id="signature"
            className={styles.input}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setStruck(false);
            }}
            placeholder="Your name or your company"
            maxLength={42}
          />
        </label>

        <button
          type="button"
          className={styles.strike}
          onClick={strike}
          disabled={picked.length === 0}
        >
          {struck ? 'Struck — file downloaded' : 'Strike the mark'}
        </button>
        <p className={styles.note}>
          Yours on the spot. Nothing is sent anywhere, nothing is recorded, and
          nobody approves it.
        </p>
      </div>
    </div>
  );
}
