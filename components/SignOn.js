'use client';

import { useState } from 'react';
import { LANES } from '../lib/waterfall';
import { MARKS_BY_ID } from '../lib/marks';
import Mark from './Mark';
import { postRegister, FIELD_LIMITS } from '../lib/register-client';
import styles from './SignOn.module.css';

const EMPTY = { name: '', org: '', role: '', email: '', city: '', note: '', use: '' };

export default function SignOn() {
  const [laneId, setLaneId] = useState('partner');
  const [values, setValues] = useState(EMPTY);
  const [commitments, setCommitments] = useState(['name']);
  const [state, setState] = useState('idle');
  const [error, setError] = useState('');

  const lane = LANES.find((l) => l.id === laneId);
  // The suggestion box is the point of the community lane; never hide it behind a tick.
  const wantsUse = Boolean(lane.useField);

  function selectLane(id) {
    setLaneId(id);
    setState('idle');
    setError('');
    setCommitments(LANES.find((l) => l.id === id)?.commitments ? ['name'] : []);
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
    const result = await postRegister({ ...values, commitments, list: `waterfall-${laneId}` });
    if (result.ok) {
      setState('struck');
      return;
    }
    setState('error');
    setError(result.error);
  }

  return (
    <div className={styles.signon}>
      {/* Lane selection is a register of marks, not a row of tabs. */}
      <ul className={styles.lanes} role="tablist" aria-label="Ways in">
        {LANES.map((l) => {
          const on = l.id === laneId;
          return (
            <li key={l.id}>
              <button
                type="button"
                role="tab"
                aria-selected={on}
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

      <div className={styles.panel} role="tabpanel">
        <p className={`measure ${styles.laneLine}`}>{lane.line}</p>

        {state === 'struck' ? (
          <div className={styles.doneBox} role="status">
            <span className={`assay-line ${styles.doneLabel}`}>Struck</span>
            <p className={styles.doneText}>{lane.done}</p>
            <button type="button" className={styles.again} onClick={() => { setValues(EMPTY); setState('idle'); }}>
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
                  placeholder="Anything. A use, a worry, a memory of the place, a reason this is a bad idea."
                />
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
              <p className={styles.error} role="alert">{error}</p>
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
