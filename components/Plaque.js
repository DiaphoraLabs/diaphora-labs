import Mark from './Mark';
import styles from './Plaque.module.css';

// The dedication tablet. Cast, bolted, and carrying the assay line beneath.
// `as` exists because the tablet is often the page's headline: the lettering
// has to be able to be the h1 rather than a span dressed up as one.
export default function Plaque({
  as: Name = 'span',
  name,
  lines = [],
  marks = [],
  markSize = 24,
  size = 'lg',
}) {
  return (
    <div className={`plaque ${styles.plaque} ${styles[size]}`}>
      <span className={styles.bolt} data-corner="tl" aria-hidden="true" />
      <span className={styles.bolt} data-corner="tr" aria-hidden="true" />
      <span className={styles.bolt} data-corner="bl" aria-hidden="true" />
      <span className={styles.bolt} data-corner="br" aria-hidden="true" />
      <Name className={`${styles.name} plaque-text`}>{name}</Name>
      {marks.length > 0 && (
        <span className={styles.marks}>
          {marks.map((m) => (
            <Mark key={m.id} mark={m} size={markSize} struck current={m.bindsAll} />
          ))}
        </span>
      )}
      {lines.length > 0 && (
        <span className={styles.lines}>
          {lines.map((l) => (
            <span key={l} className="assay-line">{l}</span>
          ))}
        </span>
      )}
    </div>
  );
}
