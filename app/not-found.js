import Link from 'next/link';
import PageHead from '../components/PageHead';
import { BINDING } from '../lib/marks';
import RequestedMark from '../components/RequestedMark';
import styles from './not-found.module.css';

export const metadata = {
  title: 'No mark answers to that — Diaphora Labs',
  description: 'That page is not in the register. Every destination on the site is listed here.',
};

// A hallmark register is precisely the thing you look a mark up in, and this is
// a mark that is not in it. The page reads the requested mark back, then gives
// the whole register, struck and legible.
const REGISTER = [
  { href: '/', ord: '00', label: 'Diaphora', what: 'The institution, and which door is yours.' },
  { href: '/niagara', ord: '01', label: 'Niagara & Buffalo', what: 'The register: every programme, fund and workspace on both sides of the river.' },
  { href: '/delta-0', ord: '02', label: 'Delta 0', what: 'Open, self-service, global. Start here.' },
  { href: '/delta-1', ord: '03', label: 'Delta 1', what: 'The selective program, and the partners it needs.' },
  { href: '/delta-2', ord: '04', label: 'Delta 2', what: 'An unstruck die. Not open, no date.' },
  { href: '/waterfall', ord: '05', label: 'Project: Waterfall', what: 'The proposal for the generating station.' },
  { href: '/contact', ord: '06', label: 'Contact', what: 'One address, and what it is for.' },
  { href: '/press', ord: '07', label: 'Press', what: 'The mark, the palette, boilerplate, and what is not true.' },
];

export default function NotFound() {
  return (
    <main>
      <PageHead
        ord="——"
        title={<>No mark<br />answers<br />to that</>}
        standfirst="Every page on this site is a struck mark with a number against it. The one you asked for is not in the register — most often that means a typo, or a link written before the page was cut."
        meta={['Diaphora Labs · Niagara Falls', 'Not in the register', 'Nothing was lost']}
        marks={BINDING}
      />

      <section className={`page-pad ${styles.askedSection}`}>
        <span className={`assay-line ${styles.askedLabel}`}>Mark requested</span>
        <RequestedMark />
      </section>

      <section className={`page-pad ${styles.registerSection}`}>
        <h2 className={styles.h2}>The register</h2>
        <ul className={styles.register}>
          {REGISTER.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className={styles.row}>
                <span className={styles.rowOrd}>{r.ord}</span>
                <span className={styles.rowLabel}>{r.label}</span>
                <span className={styles.rowWhat}>{r.what}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
