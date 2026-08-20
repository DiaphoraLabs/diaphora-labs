'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import PageHead from '../components/PageHead';
import { BINDING } from '../lib/marks';
import styles from './error.module.css';

// One component throwing should not take the institution down with it. The
// axis and the footer survive this boundary, so every destination stays
// reachable while the broken part is retried.
export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main>
      <PageHead
        ord="——"
        title={<>The strike<br />did not<br />land</>}
        standfirst="Something on this page failed while it was being drawn. This is our fault, not yours, and nothing you typed was sent anywhere. The rest of the site is unaffected."
        meta={['Diaphora Labs · Niagara Falls', 'Nothing was submitted or recorded', 'Every other page still works']}
        marks={BINDING}
      />

      <section className={`page-pad ${styles.actions}`}>
        <div className={styles.actionCol}>
          <button type="button" className={styles.retry} onClick={reset}>
            Strike it again
          </button>
          <p className={styles.note}>
            Retrying redraws this page only. If it fails a second time the fault is
            ours to fix — write to{' '}
            <a href="mailto:innovate@diaphoralabs.com">innovate@diaphoralabs.com</a> and
            say which page you were on.
          </p>
        </div>

        <div className={styles.outCol}>
          <span className={`assay-line ${styles.outLabel}`}>Ways out</span>
          <ul className={styles.out}>
            <li><Link href="/">Diaphora Labs</Link></li>
            <li><Link href="/delta-0">Delta 0 — take your mark</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
          {error?.digest && (
            <span className={styles.digest}>Fault reference {error.digest}</span>
          )}
        </div>
      </section>
    </main>
  );
}
