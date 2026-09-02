'use client';

import { useEffect, useState } from 'react';
import styles from './CopyBlock.module.css';

// Boilerplate exists to be taken. A press page that makes a journalist select
// three paragraphs by hand has misunderstood its job.
export default function CopyBlock({ label, meta, text }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Clipboard access can be refused outright — an insecure origin, a
      // permissions policy, a browser that never implemented it. The text is
      // on the page and selectable either way, so say so rather than
      // pretending it worked.
      setCopied(false);
    }
  }

  return (
    <div className={styles.block}>
      <div className={styles.head}>
        <span className={`assay-line ${styles.label}`}>{label}</span>
        <span className={`assay-line ${styles.meta}`}>{meta}</span>
        <button type="button" onClick={copy} className={styles.copy}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
}
