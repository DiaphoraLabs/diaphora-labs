'use client';

import { useEffect, useRef, useState } from 'react';
import { postRegister } from '../lib/register-client';
import styles from './BriefGate.module.css';

export const BRIEF_FILE = '/media/project-waterfall-proposal.pdf';

// The proposal, in exchange for an address.
//
// The document is handed over in the browser the moment the address lands,
// not emailed: nothing on this site sends mail, and a gate that promises an
// email it cannot send is a gate that loses the reader and the address both.
// The copy says so plainly, so nobody sits waiting on an inbox.
export default function BriefGate() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');
  const [error, setError] = useState('');
  const doneRef = useRef(null);

  // The download is the whole point of the exchange, so focus has to land on
  // it — the form unmounts on success and would otherwise drop focus to the
  // top of the document.
  useEffect(() => {
    if (state === 'done' && doneRef.current) doneRef.current.focus();
  }, [state]);

  async function submit(e) {
    e.preventDefault();
    setState('submitting');
    setError('');

    const res = await postRegister({ email: email.trim(), list: 'waterfall-brief' });
    if (res.ok) {
      setState('done');
      return;
    }
    setError(res.error);
    setState('error');
  }

  if (state === 'done') {
    return (
      <div className={styles.gate}>
        <p className={`assay-line ${styles.kicker}`}>The proposal</p>
        <p className={styles.doneLead}>Here it is. Five pages, and yours to forward.</p>
        <a
          ref={doneRef}
          className={styles.download}
          href={BRIEF_FILE}
          download
        >
          Download the proposal (PDF)
        </a>
        <p className={styles.fine}>
          Nothing else will be sent to that address unless you ask. If the download does not
          start, the file is at{' '}
          <a className={styles.plain} href={BRIEF_FILE}>
            {BRIEF_FILE}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form className={styles.gate} onSubmit={submit}>
      <p className={`assay-line ${styles.kicker}`}>The proposal</p>
      <p className={styles.lead}>
        The whole case in five pages: how the building got here, the six proposed uses, what
        the site can test that nowhere else can, and what we are asking for. Leave an address
        and it downloads straight away.
      </p>

      <div className={styles.row}>
        <label className={styles.field}>
          <span className="assay-line">Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            inputMode="email"
            placeholder="you@organisation.com"
            value={email}
            onChange={(ev) => {
              setEmail(ev.target.value);
              if (state === 'error') {
                setState('idle');
                setError('');
              }
            }}
            aria-invalid={state === 'error' || undefined}
            aria-describedby={state === 'error' ? 'brief-error' : undefined}
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.submit} disabled={state === 'submitting'}>
          {state === 'submitting' ? 'Striking…' : 'Get the proposal'}
        </button>
      </div>

      {state === 'error' && (
        <p id="brief-error" role="alert" className={styles.error}>
          {error}
        </p>
      )}

      <p className={styles.fine}>
        The file downloads in your browser — we do not email it. Your address goes on the
        Project: Waterfall register and nowhere else.
      </p>
    </form>
  );
}
