import Link from 'next/link';
import Monogram from './Monogram';
import styles from './Footer.module.css';

// The page has to end somewhere. The foot of a hallmarked piece carries the
// assay line again, and the way back to every other destination.
const DESTINATIONS = [
  { href: '/niagara', label: 'Niagara & Buffalo' },
  { href: '/delta-0', label: 'Delta 0' },
  { href: '/delta-1', label: 'Delta 1' },
  { href: '/delta-2', label: 'Delta 2' },
  { href: '/waterfall', label: 'Project: Waterfall' },
  { href: '/contact', label: 'Contact' },
  { href: '/press', label: 'Press' },
];

export default function Footer() {
  return (
    <footer className={`page-pad ${styles.foot}`}>
      <div className={styles.mark}>
        <Link href="/" className={styles.wordmark}>
          <Monogram size={26} decorative />
          Diaphora Labs
        </Link>
        <span className="assay-line">Niagara Falls · Ontario · Canada / USA</span>
      </div>

      <nav className={styles.nav} aria-label="Footer">
        <ul>
          {DESTINATIONS.map((d) => (
            <li key={d.href}>
              <Link href={d.href}>{d.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
