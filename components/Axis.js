'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Axis.module.css';

// The governing axis. One sightline holds every destination; the open one is
// the only thing on the page allowed to carry current.
const TICKS = [
  { href: '/', label: 'Diaphora', ord: '00' },
  { href: '/niagara', label: 'Niagara', ord: '01' },
  { href: '/delta-0', label: 'Delta 0', ord: '02' },
  { href: '/delta-1', label: 'Delta 1', ord: '03' },
  { href: '/delta-2', label: 'Delta 2', ord: '04' },
  { href: '/waterfall', label: 'Waterfall', ord: '05' },
  { href: '/contact', label: 'Contact', ord: '06' },
];

export default function Axis() {
  const pathname = usePathname();

  return (
    <nav className={styles.axis} aria-label="Diaphora Labs">
      <div className={styles.rail} aria-hidden="true" />
      <ol className={styles.ticks}>
        {TICKS.map((t) => {
          const live = pathname === t.href;
          return (
            <li key={t.href}>
              <Link
                href={t.href}
                className={live ? `${styles.tick} ${styles.live}` : styles.tick}
                aria-current={live ? 'page' : undefined}
              >
                <span className={styles.notch} aria-hidden="true" />
                <span className={styles.ord}>{t.ord}</span>
                <span className={styles.label}>{t.label}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
