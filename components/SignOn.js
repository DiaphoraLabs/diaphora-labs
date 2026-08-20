'use client';

import { useEffect, useRef, useState } from 'react';
import { LANES } from '../lib/waterfall';
import { MARKS_BY_ID } from '../lib/marks';
import Mark from './Mark';
import { postRegister, FIELD_LIMITS } from '../lib/register-client';
import styles from './SignOn.module.css';

const EMPTY = { name: '', org: '', role: '', email: '', city: '', note: '', use: '' };

export default function SignOn() {
  const [laneId, setLaneId] = useState('partner');
  const [values, setValues] = useState(EMPTY);
  // Nothing is pre-committed. The fine print promises written permission, so the
  // first mark has to be struck by the person giving it.
  const [commitments, setCommitments] = useState([]);
  const [state, setState] = useState('idle');
  const [error, setError] = useState('');
  const doneRef = useRef(null);
  const lanesRef = useRef(null);

  const lane = LANES.find((l) => l.id === laneId);
  // The suggestion box is the point of the community lane; never hide it behind a tick.
  const wantsUse = Boolean(lane.useField);

  // The lane lives in the URL so this page can be forwarded to the door that
  // suits the reader: /waterfall#local reaches the community lane directly.
  useEffect(() => {
    const apply = () => {
      const fromHash = window.location.hash.replace('#', '');
      if (LANES.some((l) => l.id === fromHash)) setLaneId(fromHash);
    };
    apply();
    // In-page links to a lane have to move the register too, not just the scroll.
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
  }, []);

  // Focus follows the outcome. Without this the form unmounts on success and a
  // keyboard or screen-reader user is dropped back at the top of the document.
  useEffect(() => {
    if (state === 'struck') doneRef.current?.focus();
  }, [state]);

  function selectLane(id) {
    setLaneId(id);
    setState('idle');
    setError('');
    setCommitments([]);
    // Fields differ per lane, and anything typed under the old lane was never
    // shown under the new one. Carrying it over would ship an invisible payload.
    setValues(EMPTY);
    window.history.replaceState(null, '', `#${id}`);
  }

  function set(k, v) {
    setValues((p) => ({ ...p, [k]: v }));
    if (state === 'error') { setState('idle'); setError(''); }
  }

  function toggleCommitment(id) {
    setCommitments((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  }

  async function submit(e) {
    e.preventDefault();
    setState('submitting');
    setError('');
    // Built from the fields this lane actually rendered, so what is sent is what
    // was seen. Spreading `values` would carry text the reader typed elsewhere.
    const payload = { list: `waterfall-${laneId}`, email: values.email, commitments };
    lane.fields.forEach((f) => { payload[f] = values[f]; });
    if (wantsUse) payload.use = values.use;

    const result = await postRegister(payload);
    if (result.ok) {
      setState('struck');
      return;
    }
    setState('error');
    setError(result.error);
  }

  return (
    <div className={styles.signon}>
      {/* A register of marks, not a tab strip — so it stays a real list with real
          buttons. The ARIA tab pattern promised arrow-key navigation this never
          implemented, and put six controls in the tab order with no way out. */}
      <ul className={styles.lanes} aria-label="Ways in" ref={lanesRef}>
        {LANES.map((l) => {
          const on = l.id === laneId;
          return (
            <li key={l.id}>
              <button
                type="button"
                aria-current={on || undefined}
                className={`${styles.lane} ${on ? styles.laneOn : ''}`}
                onClick={() => selectLane(l.id)}
              >
                <Mark mark={MARKS_BY_ID[l.mark]} size={26} struck={on} current={on} />
                <span className={styles.laneName}>{l.name}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className={styles.panel} role="region" aria-label={lane.name}>
        <p className={`measure ${styles.laneLine}`}>{lane.line}</p>

        {state === 'struck' ? (
          <div className={styles.doneBox} role="status" tabIndex={-1} ref={doneRef}>
            <span className={`assay-line ${styles.doneLabel}`}>Struck</span>
            <p className={styles.doneText}>{lane.done}</p>
            <button
              type="button"
              className={styles.again}
              onClick={() => {
                setValues(EMPTY);
                setCommitments([]);
                setState('idle');
                // The label promises another way in, so send them to the register
                // of ways in rather than back to the form they just submitted.
                lanesRef.current?.querySelector('button')?.focus();
              }}
            >
              Sign on another way
            </button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={submit} noValidate>
            <div className={styles.fields}>
              {lane.fields.includes('org') && (
                <label className={styles.field}>
                  <span className={styles.label}>Organization</span>
                  <input className={styles.input} value={values.org} onChange={(e) => set('org', e.target.value)}
                  maxLength={FIELD_LIMITS.org} autoComplete="organization" />
                </label>
              )}
              {lane.fields.includes('name') && (
                <label className={styles.field}>
                  <span className={styles.label}>Your name</span>
                  <input className={styles.input} value={values.name} onChange={(e) => set('name', e.target.value)}
                  maxLength={FIELD_LIMITS.name} autoComplete="name" />
                </label>
              )}
              {lane.fields.includes('role') && (
                <label className={styles.field}>
                  <span className={styles.label}>Role</span>
                  <input className={styles.input} value={values.role} onChange={(e) => set('role', e.target.value)}
                  maxLength={FIELD_LIMITS.role} autoComplete="organization-title" />
                </label>
              )}
              {lane.fields.includes('city') && (
                <label className={styles.field}>
                  <span className={styles.label}>Town or city</span>
                  <input className={styles.input} value={values.city} onChange={(e) => set('city', e.target.value)}
                  maxLength={FIELD_LIMITS.city} autoComplete="address-level2" />
                </label>
              )}
              <label className={styles.field}>
                <span className={styles.label}>
                  Email <span className={styles.required}>Required</span>
                </span>
                <input
                  className={styles.input}
                  type="email"
                  required
                  value={values.email}
                  onChange={(e) => set('email', e.target.value)}
                  autoComplete="email"
                  maxLength={254}
                  aria-invalid={state === 'error' || undefined}
                  aria-describedby={state === 'error' ? 'signon-error' : undefined}
                />
              </label>
            </div>

            {lane.commitments && (
              <fieldset className={styles.commitments}>
                <legend className={`assay-line ${styles.legend}`}>
                  What you can commit to — every one of these is free
                </legend>
                <ul className={styles.tickList}>
                  {lane.commitments.map(([id, title, sub]) => {
                    const on = commitments.includes(id);
                    return (
                      <li key={id}>
                        <label className={`${styles.tick} ${on ? styles.tickOn : ''}`}>
                          <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={on}
                            onChange={() => toggleCommitment(id)}
                          />
                          {/* The commitment IS a punch: unchecked is incised, checked is struck. */}
                          <span className={styles.tickMark} aria-hidden="true">
                            <Mark mark={MARKS_BY_ID.execution} size={22} struck={on} current={on} />
                          </span>
                          <span className={styles.tickText}>
                            <b>{title}</b>
                            <span>{sub}</span>
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </fieldset>
            )}

            {wantsUse && (
              <label className={styles.field}>
                <span className={styles.label}>What should this building become?</span>
                <textarea
                  className={`${styles.input} ${styles.textarea}`}
                  rows={4}
                  value={values.use}
                  onChange={(e) => set('use', e.target.value)}
                  maxLength={FIELD_LIMITS.use}
                  placeholder="Anything. A use, a worry, a memory of the place, a reason this is a bad idea."
                />
                {values.use.length > FIELD_LIMITS.use - 500 && (
                  <span className={styles.count}>
                    {FIELD_LIMITS.use - values.use.length} characters left
                  </span>
                )}
              </label>
            )}

            {lane.fields.includes('note') && (
              <label className={styles.field}>
                <span className={styles.label}>{lane.noteLabel}</span>
                <textarea
                  className={`${styles.input} ${styles.textarea}`}
                  rows={3}
                  value={values.note}
                  onChange={(e) => set('note', e.target.value)}
                  maxLength={FIELD_LIMITS.note}
                />
              </label>
            )}

            {state === 'error' && (
              <p className={styles.error} id="signon-error" role="alert">{error}</p>
            )}

            <div className={styles.submitRow}>
              <button type="submit" className={styles.submit} disabled={state === 'submitting'}>
                {state === 'submitting' ? 'Striking…' : lane.action}
              </button>
              <span className={styles.fine}>
                Nothing is published, listed, or shared without your written permission. No cost, ever.
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
