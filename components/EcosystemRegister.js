'use client';

import { useMemo, useState } from 'react';
import { CHECKED, ENTRIES, NEEDS, SIDES } from '../lib/ecosystem';
import styles from './EcosystemRegister.module.css';

// The register. Two axes, because those are the two questions a founder
// actually arrives with: which side of the river can I get to, and what am I
// short of. Both default to everything — the unfiltered list is the point of
// the page, and a filter the visitor has to clear before they can see anything
// would hide the one thing we are claiming nobody else has assembled.
//
// Rows, not cards. A card grid would present eleven institutions as
// interchangeable tiles; they are not interchangeable, and the register form
// is the same one Project: Waterfall and the Niagara case already use.
export default function EcosystemRegister() {
  const [sides, setSides] = useState([]);
  const [needs, setNeeds] = useState([]);

  const shown = useMemo(
    () =>
      ENTRIES.filter(
        (e) =>
          (sides.length === 0 || sides.includes(e.side)) &&
          (needs.length === 0 || needs.some((n) => e.needs.includes(n)))
      ),
    [sides, needs]
  );

  const filtered = sides.length > 0 || needs.length > 0;

  function toggle(setter) {
    return (id) => setter((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  }
  const toggleSide = toggle(setSides);
  const toggleNeed = toggle(setNeeds);

  return (
    <div className={styles.register}>
      <div className={styles.filters}>
        <fieldset className={styles.axis}>
          <legend className={`assay-line ${styles.legend}`}>Side of the river</legend>
          <div className={styles.opts}>
            {SIDES.map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={sides.includes(s.id)}
                onClick={() => toggleSide(s.id)}
                className={`${styles.opt} ${sides.includes(s.id) ? styles.on : ''}`}
              >
                <span className={styles.optName}>{s.label}</span>
                <span className={styles.optNote}>{s.note}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className={styles.axis}>
          <legend className={`assay-line ${styles.legend}`}>What you are short of</legend>
          <div className={styles.opts}>
            {NEEDS.map((n) => (
              <button
                key={n.id}
                type="button"
                aria-pressed={needs.includes(n.id)}
                onClick={() => toggleNeed(n.id)}
                className={`${styles.opt} ${needs.includes(n.id) ? styles.on : ''}`}
              >
                <span className={styles.optName}>{n.label}</span>
                <span className={styles.optNote}>{n.note}</span>
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className={styles.count}>
        <p aria-live="polite" className={`assay-line ${styles.countText}`}>
          {shown.length} of {ENTRIES.length} listed
          {filtered ? '' : ' · everything we know of'}
        </p>
        {filtered && (
          <button
            type="button"
            className={styles.clear}
            onClick={() => {
              setSides([]);
              setNeeds([]);
            }}
          >
            Show all
          </button>
        )}
      </div>

      <ol className={styles.rows}>
        {shown.map((e) => {
          const side = SIDES.find((s) => s.id === e.side);
          return (
            <li key={e.id} className={styles.row}>
              <div className={styles.rowKey}>
                <a className={styles.name} href={e.href} target="_blank" rel="noopener noreferrer">
                  {e.name}
                </a>
                <span className={`assay-line ${styles.where}`}>
                  {side.label} · {e.where}
                </span>
              </div>
              <div className={styles.rowBody}>
                <p className={styles.what}>{e.what}</p>
                <p className={styles.offer}>{e.offer}</p>
                <ul className={styles.tags}>
                  <li className={`assay-line ${styles.open}`}>{e.open}</li>
                  {e.needs.map((n) => (
                    <li key={n} className={`assay-line ${styles.tag}`}>
                      {NEEDS.find((x) => x.id === n).label}
                    </li>
                  ))}
                </ul>
                {e.note && <p className={styles.warn}>{e.note}</p>}
              </div>
            </li>
          );
        })}
      </ol>

      {shown.length === 0 && (
        <p className={styles.empty}>
          Nothing in the register matches that combination. That is a gap in the region, or a
          gap in our list — either way we would like to know which.
        </p>
      )}

      <p className={`assay-line ${styles.checked}`}>Every link last checked {CHECKED}</p>
    </div>
  );
}
