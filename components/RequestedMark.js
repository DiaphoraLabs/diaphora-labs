'use client';

import { usePathname } from 'next/navigation';
import styles from './RequestedMark.module.css';

// The one mark on this site that did not land. Reading it back is usually the
// whole fix — a typo is invisible in the address bar and obvious in a register.
export default function RequestedMark() {
  const pathname = usePathname();
  return (
    <p className={styles.asked}>
      <span className={styles.askedPath}>{pathname}</span>
    </p>
  );
}
