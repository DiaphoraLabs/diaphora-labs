import Plaque from './Plaque';
import styles from './PageHead.module.css';

// The page head. By default the title is cast onto a plaque, because on this
// site the tablet IS the headline — a hallmarked piece names itself on metal,
// not in ink. `plaque={false}` is for pages whose own artifact is already a
// plaque and would be competing with a second one.
export default function PageHead({
  ord,
  title,
  standfirst,
  meta = [],
  marks = [],
  plaque = true,
}) {
  return (
    <header className={`page-pad ${styles.head}`}>
      <div className={styles.ordCol}>
        <span className={styles.ord}>{ord}</span>
        <span className={styles.tickRule} aria-hidden="true" />
      </div>
      <div className={styles.body}>
        {plaque ? (
          <div className={styles.plaqueWrap}>
            <Plaque as="h1" size="xl" name={title} marks={marks} lines={meta} markSize={26} />
          </div>
        ) : (
          <h1 className={styles.title}>{title}</h1>
        )}
        {standfirst && <p className={`measure ${styles.standfirst}`}>{standfirst}</p>}
        {!plaque && meta.length > 0 && (
          <ul className={styles.meta}>
            {meta.map((m) => (
              <li key={m} className="assay-line">{m}</li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}
