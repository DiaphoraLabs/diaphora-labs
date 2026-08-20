'use client';

import { useEffect, useState } from 'react';
import { BINDING } from '../lib/marks';
import Mark from './Mark';
import styles from './AddressPlate.module.css';

// The address is the page's one artifact: a cast tablet with the inscription
// struck into it. Taking it is self-service — you copy the mark yourself,
// which is why the action is allowed to carry current.
export default function AddressPlate({ address }) {
  const [state, setState] = useState('idle');

  useEffect(() => {
    if (state !== 'struck') return undefined;
    const t = setTimeout(() => setState('idle'), 2400);
    return () => clearTimeout(t);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(address);
      setState('struck');
    } catch {
      setState('error');
    }
  }

  const [local, domain] = address.split('@');

  return (
    <div className={`plaque ${styles.plate}`}>
      <span className={styles.bolt} data-corner="tl" aria-hidden="true" />
      <span className={styles.bolt} data-corner="tr" aria-hidden="true" />
      <span className={styles.bolt} data-corner="bl" aria-hidden="true" />
      <span className={styles.bolt} data-corner="br" aria-hidden="true" />

      <span className={`assay-line ${styles.label}`}>Write to</span>

      <span className={styles.marks}>
        {BINDING.map((m) => (
          <Mark key={m.id} mark={m} size={24} struck current />
        ))}
      </span>

      <a href={`mailto:${address}`} className={`plaque-text ${styles.address}`}>
        <span className={styles.local}>{local}</span>
        <span className={styles.domain}>@{domain}</span>
      </a>

      <span className={styles.lines}>
        <span className="assay-line">Diaphora Labs · Niagara Falls · Ontario</span>
        <span className="assay-line">Delta 0 · Delta 1 · Delta 2 · Project: Waterfall</span>
      </span>

      <div className={styles.actions}>
        <button type="button" className={styles.copy} onClick={copy}>
          {state === 'struck' ? 'Struck' : 'Copy the address'}
        </button>
        <span className={styles.status} role="status" aria-live="polite">
          {state === 'struck' && 'Address copied.'}
          {state === 'error' && 'Copy blocked — select the address and copy it by hand.'}
        </span>
      </div>
    </div>
  );
}
