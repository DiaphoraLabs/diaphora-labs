import { DIE, MONOGRAM } from '../lib/brand';
import styles from './Monogram.module.css';

// The institution's mark. Drawn with the same three-path treatment as the
// punch alphabet — shadow into the depression, catch of light on the opposite
// lip, face between them — because the whole system's claim is that these are
// struck objects rather than line drawings, and the logo cannot be the one
// place that claim lapses.
//
// `die` puts the mark on its own ground. Use it where the surrounding colour
// is not ours to choose: a browser tab, an avatar, a partner's slide.
export default function Monogram({
  size = 40,
  weight = MONOGRAM.weight.logo,
  die = false,
  tone = 'bone',
  title = 'Diaphora Labs',
  decorative = false,
}) {
  const inner = DIE.inset;
  return (
    <svg
      className={`${styles.monogram} ${styles[tone] || ''}`}
      width={size}
      height={size}
      viewBox={MONOGRAM.viewBox}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative ? 'true' : undefined}
      aria-label={decorative ? undefined : title}
      focusable="false"
      style={{ '--mono-w': weight }}
    >
      {die && (
        <rect
          className={styles.die}
          x={inner}
          y={inner}
          width={24 - inner * 2}
          height={24 - inner * 2}
          rx={DIE.radius}
        />
      )}
      <path className={styles.shade} d={MONOGRAM.d} />
      <path className={styles.light} d={MONOGRAM.d} />
      <path className={styles.face} d={MONOGRAM.d} />
    </svg>
  );
}
