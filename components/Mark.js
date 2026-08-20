'use client';

import { useId } from 'react';
import styles from './Mark.module.css';

// A punch is drawn three times, because that is what makes it read as metal
// rather than as a line drawing: a shadow cast into the depression, a catch of
// light on the opposite lip, and the face itself between them. Which side each
// sits on is what tells the eye whether the mark stands proud or is sunk into
// the ground — so pressing it swaps them, and the mark impresses.
export default function Mark({ mark, size = 34, struck = false, current = false, title }) {
  const id = useId();
  // Recentre the glyph in its box. Measured per mark, applied here so the
  // path data itself stays exactly as it was drawn.
  const [nx, ny] = mark.nudge || [0, 0];
  const centre = nx || ny ? `translate(${nx} ${ny})` : undefined;
  return (
    <svg
      className={[styles.mark, struck && styles.struck, current && styles.current]
        .filter(Boolean)
        .join(' ')}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-labelledby={`${id}-t`}
      focusable="false"
    >
      <title id={`${id}-t`}>{title || mark.name}</title>
      <g transform={centre}>
        <path className={styles.shade} d={mark.d} />
        <path className={styles.light} d={mark.d} />
        <path className={styles.face} d={mark.d} />
      </g>
    </svg>
  );
}
