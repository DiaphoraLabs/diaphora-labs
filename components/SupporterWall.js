import styles from './SupporterWall.module.css';

// One unstruck die, not a fixed grid of them. A fixed count invents a target
// nobody set and then draws the project failing to reach it; a single blank says
// the same true thing — the next name is not here yet — without the denominator.
export default function SupporterWall({ supporters = [] }) {
  const blanks = supporters.length === 0 ? 3 : 1;

  return (
    <div className={styles.wall}>
      <ul className={styles.grid}>
        {supporters.map((s) => (
          <li key={s.name} className={styles.slot}>
            <span className={styles.name}>{s.name}</span>
          </li>
        ))}
        {Array.from({ length: blanks }).map((_, i) => (
          <li key={`blank-${i}`} className={`${styles.slot} ${styles.blank}`}>
            <svg viewBox="0 0 60 34" className={styles.die} aria-hidden="true">
              <rect x="0.5" y="0.5" width="59" height="33" fill="none" stroke="currentColor" strokeDasharray="3 4" />
            </svg>
            <span className={styles.blankLabel}>Unstruck</span>
          </li>
        ))}
      </ul>
      <p className={styles.note}>
        {supporters.length === 0
          ? 'Nobody has signed on yet. There are no logos here because there are no supporters here — not because we have not got around to adding them. The first name on this wall is worth more than the fiftieth.'
          : 'These organisations have backed our founders and agreed to support Diaphora Labs. They are supporters, not funders, nothing here is a commitment of capital or space, and none of them has been asked to endorse Project: Waterfall. Wordmarks stand in until each supplies its own mark. The next die stays unstruck until a name is genuinely on it.'}
      </p>
    </div>
  );
}
