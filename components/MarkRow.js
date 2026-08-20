'use client';

import { useState } from 'react';
import { MARKS } from '../lib/marks';
import Mark from './Mark';
import styles from './MarkRow.module.css';

// THE STRIKE. The row is the identity: fifteen punches on one ruled line.
// The four that bind every audience rest already struck, in current.
export default function MarkRow({ only, showReadout = true, size = 34 }) {
  const marks = only ? MARKS.filter((m) => only.includes(m.id)) : MARKS;
  const [hovered, setHovered] = useState(null);
  const [pinned, setPinned] = useState(null);
  const active = hovered || pinned;
  const shown = active ? marks.find((m) => m.id === active) : null;

  return (
    <div className={styles.wrap}>
      <ul className={styles.row} aria-label="The fifteen marks">
        {marks.map((m) => (
          <li key={m.id}>
            <button
              type="button"
              className={styles.punch}
              onMouseEnter={() => setHovered(m.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(m.id)}
              onBlur={() => setHovered(null)}
              onClick={() => setPinned((p) => (p === m.id ? null : m.id))}
              aria-pressed={pinned === m.id}
              aria-describedby="mark-readout"
            >
              <Mark
                mark={m}
                size={size}
                struck={m.bindsAll || active === m.id}
                current={m.bindsAll}
              />
            </button>
          </li>
        ))}
      </ul>

      {showReadout && (
        <p className={styles.readout} id="mark-readout">
          {shown ? (
            <>
              <span className={styles.readName}>{shown.name}</span>
              {shown.facets.length > 0 && (
                <span className={styles.readFacets}>{shown.facets.join(' · ')}</span>
              )}
              <span className={styles.readBinds}>
                Binds {shown.audiences.join(', ')}
              </span>
            </>
          ) : (
            <span className={styles.readIdle}>
              Fifteen punches. Four bind every audience, partners included.
            </span>
          )}
        </p>
      )}
    </div>
  );
}
