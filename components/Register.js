'use client';

import { useState } from 'react';
import { postRegister, FIELD_LIMITS } from '../lib/register-client';
import styles from './Register.module.css';

// One register, three uses. States are real: idle, submitting, error, struck.
export default function Register({
  list,
  label,
  action,
  fields = ['email'],
  done = 'Recorded.',
  tone = 'bone',
  noteLabel = 'What you are building, in a line',
}) {
  const [values, setValues] = useState({ email: '', name: '', org: '', note: '' });
  const [state, setState] = useState('idle');
  const [error, setError] = useState('');

  function set(k, v) {
    setValues((prev) => ({ ...prev, [k]: v }));
    if (state === 'error') { setState('idle'); setError(''); }
  }

  async function submit(e) {
    e.preventDefault();
    setState('submitting');
    setError('');
    const result = await postRegister({ ...values, list });
    if (result.ok) {
      setState('struck');
      return;
    }
    setState('error');
    setError(result.error);
  }

  if (state === 'struck') {
    return (
      <div className={`${styles.register} ${styles.doneBox}`} role="status">
        <span className={`assay-line ${styles.doneLabel}`}>Struck</span>
        <p className={styles.doneText}>{done}</p>
      </div>
    );
  }

  return (
    <form className={styles.register} onSubmit={submit} noValidate>
      <span className={`assay-line ${styles.label}`}>{label}</span>

      {fields.includes('name') && (
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Name</span>
          <input
            className={styles.input}
            value={values.name}
            onChange={(e) => set('name', e.target.value)}
            autoComplete="name"
            maxLength={FIELD_LIMITS.name}
          />
        </label>
      )}

      {fields.includes('org') && (
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Company or institution</span>
          <input
            className={styles.input}
            value={values.org}
            onChange={(e) => set('org', e.target.value)}
            autoComplete="organization"
            maxLength={FIELD_LIMITS.org}
          />
        </label>
      )}

      <label className={styles.field}>
        <span className={styles.fieldLabel}>
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
          aria-describedby={state === 'error' ? `${list}-err` : undefined}
        />
      </label>

      {fields.includes('note') && (
        <label className={styles.field}>
          <span className={styles.fieldLabel}>{noteLabel}</span>
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
        <p className={styles.error} id={`${list}-err`} role="alert">{error}</p>
      )}

      <button
        type="submit"
        className={tone === 'current' ? `${styles.submit} ${styles.current}` : styles.submit}
        disabled={state === 'submitting'}
      >
        {state === 'submitting' ? 'Striking…' : action}
      </button>
    </form>
  );
}
