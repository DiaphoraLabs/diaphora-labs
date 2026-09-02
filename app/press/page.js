import Link from 'next/link';
import CopyBlock from '../../components/CopyBlock';
import Mark from '../../components/Mark';
import Monogram from '../../components/Monogram';
import PageHead from '../../components/PageHead';
import { BOILERPLATE, LOCKUPS, MONOGRAM, NOT_TRUE, USAGE, WORDMARK, wordCount } from '../../lib/brand';
import { MARKS } from '../../lib/marks';
import { COLOR_ROLES, TYPE_ROLES } from '../../lib/palette';
import { readTokens } from '../../lib/tokens.server';
import prose from '../prose.module.css';
import styles from './press.module.css';

export const metadata = {
  title: 'Press and assets — Diaphora Labs',
  description:
    'The Diaphora Labs media kit: the mark and its lockups, the palette, the typefaces, the punch alphabet, boilerplate at three lengths, usage rules, and the list of things that are not true.',
};

const DOWNLOADS = [
  ['diaphora-monogram-bone.svg', 'The mark. Default, for dark grounds.'],
  ['diaphora-monogram-bronze.svg', 'The mark, struck.'],
  ['diaphora-monogram-patina.svg', 'The mark for light grounds.'],
  ['diaphora-monogram-die.svg', 'The mark on its own ground. Favicons and avatars.'],
  ['diaphora-lockup-horizontal.svg', 'Horizontal lockup.'],
  ['diaphora-lockup-stacked.svg', 'Stacked lockup.'],
  ['diaphora-palette.svg', 'All thirteen colour tokens, named.'],
  ['diaphora-tokens.css', 'The palette as custom properties.'],
  ['README.txt', 'The rules, in the folder, for whoever opens it next.'],
];

export default function Press() {
  // Read at build from app/globals.css, so a swatch here cannot disagree with
  // the colour the site actually paints.
  const tokens = readTokens();

  return (
    <main>
      <PageHead
        ord="07"
        title="Press"
        standfirst="Everything needed to write about Diaphora Labs accurately: the mark and how to place it, the palette and the faces, boilerplate at three lengths to take as-is, and — the part that matters most to us — a plain list of things that are not true and should not be printed."
        meta={['Media kit', 'Assets free to use', 'Updated 2 September 2026']}
      />

      {/* --- the mark ---------------------------------------------------- */}
      <section className={`page-pad ${styles.band}`}>
        <h2 className={styles.head}>The mark</h2>
        <div className={styles.markShow}>
          <div className={styles.markStage}>
            <Monogram size={132} />
          </div>
          <div className={styles.markText}>
            <p className="measure">
              A step — <span className={styles.mono}>_|-</span> — rising left to right, drawn
              as one unbroken stroke on the same 24-unit grid as the punch alphabet.
            </p>
            <p className="measure">
              It is the escarpment read backwards. Lake Erie stands 99.5 metres above Lake
              Ontario and the falls are the step between them; turned to face the other way it
              is the figure a founder is trying to draw. It is also a delta — a step change,
              which is what the programmes are named for — and a threshold, which is what a
              border is.
            </p>
            <p className="measure">
              It is deliberately <em>not</em> one of the fifteen punch marks. Those are the
              team&rsquo;s values. This one is the institution&rsquo;s.
            </p>
            <ul className={styles.tones}>
              <li className={styles.tone}>
                <Monogram size={38} tone="bone" decorative />
                <span className={`assay-line ${styles.toneLabel}`}>Bone · default</span>
              </li>
              <li className={styles.tone}>
                <Monogram size={38} tone="bronze" decorative />
                <span className={`assay-line ${styles.toneLabel}`}>Bronze · struck</span>
              </li>
              <li className={styles.tone}>
                <Monogram size={38} die decorative />
                <span className={`assay-line ${styles.toneLabel}`}>Die · own ground</span>
              </li>
            </ul>
            <p className={`measure ${styles.aside}`}>
              There is no chartreuse version, and that is a rule rather than an oversight.
              That colour marks what is live and nothing else; an identity mark is not a
              control.
            </p>
          </div>
        </div>
      </section>

      {/* --- lockups ------------------------------------------------------ */}
      <section className={`page-pad ${styles.band}`}>
        <h2 className={styles.head}>Lockups</h2>
        <ul className={styles.rows}>
          {LOCKUPS.map((l) => (
            <li key={l.id} className={styles.row}>
              <span className={`assay-line ${styles.rowKey}`}>{l.name}</span>
              <div className={styles.rowBody}>
                <p className={styles.rowLead}>{l.use}</p>
                <p className={styles.rowNote}>{l.spec}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className={`measure ${styles.aside}`}>
          The wordmark is {WORDMARK.face} at weight {WORDMARK.weight}, width axis{' '}
          {WORDMARK.stretch}. {WORDMARK.note}
        </p>
      </section>

      {/* --- colour ------------------------------------------------------- */}
      <section className={`page-pad ${styles.band}`}>
        <h2 className={styles.head}>Colour</h2>
        <ul className={styles.swatches}>
          {COLOR_ROLES.map(([token, role]) => (
            <li key={token} className={styles.swatch}>
              <span className={styles.chip} style={{ background: tokens[token] }} aria-hidden="true" />
              <span className={`assay-line ${styles.swatchToken}`}>--{token}</span>
              <span className={`assay-line ${styles.swatchHex}`}>{tokens[token]}</span>
              <span className={styles.swatchRole}>{role}</span>
            </li>
          ))}
        </ul>
        <p className={`measure ${styles.aside}`}>
          Chartreuse is the only signal ink and marks only what is live. A second highlight
          colour anywhere means the system has been broken. <span className={styles.mono}>--alarm</span>{' '}
          is the one sanctioned exception and carries errors alone.{' '}
          <span className={styles.mono}>--bronze-dim</span> is never text — it measures 2.99:1.
        </p>
      </section>

      {/* --- type --------------------------------------------------------- */}
      <section className={`page-pad ${styles.band}`}>
        <h2 className={styles.head}>Type</h2>
        <ul className={styles.rows}>
          {TYPE_ROLES.map((t) => (
            <li key={t.face} className={styles.row}>
              <span className={`assay-line ${styles.rowKey}`}>{t.role}</span>
              <div className={styles.rowBody}>
                <p className={styles.rowLead}>{t.face}</p>
                <p className={styles.rowNote}>{t.setting}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className={`measure ${styles.aside}`}>
          All three are free on Google Fonts and none is distributed here.
        </p>
      </section>

      {/* --- the punch alphabet ------------------------------------------- */}
      <section className={`page-pad ${styles.band}`}>
        <h2 className={styles.head}>The punch alphabet</h2>
        <p className={`measure ${styles.aside}`}>
          Fifteen marks on one grid at one stroke weight — the team&rsquo;s values, drawn.
          The four in chartreuse bind every audience, partners included.
        </p>
        <ul className={styles.punches}>
          {MARKS.map((m) => (
            <li key={m.id} className={styles.punch}>
              <Mark mark={m} size={34} struck current={m.bindsAll} />
              <span className={`assay-line ${styles.punchName}`}>{m.name}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* --- boilerplate --------------------------------------------------- */}
      <section className={`page-pad ${styles.band}`}>
        <h2 className={styles.head}>Boilerplate</h2>
        <p className={`measure ${styles.aside}`}>
          Take these as they are. Every claim in them is checkable, and they are written to
          stay true — none of them describes Project: Waterfall as anything but a proposal.
        </p>
        <div className={styles.copyStack}>
          {BOILERPLATE.map((b) => (
            <CopyBlock
              key={b.id}
              label={b.label}
              meta={`${wordCount(b.text)} words`}
              text={b.text}
            />
          ))}
        </div>
      </section>

      {/* --- usage --------------------------------------------------------- */}
      <section className={`page-pad ${styles.band}`}>
        <h2 className={styles.head}>Using the mark</h2>
        <ul className={styles.rows}>
          {USAGE.map((u) => (
            <li key={u.rule} className={styles.row}>
              <span className={`assay-line ${styles.rowKey}`}>{u.rule}</span>
              <div className={styles.rowBody}>
                <p className={styles.rowLead}>{u.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* --- the corrections list ------------------------------------------ */}
      <section className={`page-pad ${styles.band}`}>
        <h2 className={styles.head}>What is not true</h2>
        <p className={`measure ${styles.aside}`}>
          Diaphora Labs is early and unfunded, and ambition is easy to mistake for
          achievement. This list exists so nobody has to print a correction later.
        </p>
        <ul className={styles.corrections}>
          {NOT_TRUE.map((n) => (
            <li key={n} className={styles.correction}>
              {n}
            </li>
          ))}
        </ul>
      </section>

      {/* --- downloads ------------------------------------------------------ */}
      <section className={`page-pad ${styles.band}`}>
        <h2 className={styles.head}>Files</h2>
        <p className={`measure ${styles.aside}`}>
          Free to use in coverage of Diaphora Labs without asking. Every file is generated
          from the running site, so none of it can drift from what you see here.
        </p>
        <ul className={styles.files}>
          {DOWNLOADS.map(([file, what]) => (
            <li key={file} className={styles.file}>
              <a className={styles.fileName} href={`/media/${file}`} download>
                {file}
              </a>
              <span className={styles.fileWhat}>{what}</span>
            </li>
          ))}
          <li className={styles.file}>
            <a className={styles.fileName} href="/media/marks/wonder.svg" download>
              marks/&lt;id&gt;.svg
            </a>
            <span className={styles.fileWhat}>
              The fifteen punch marks, named by id: {MARKS.map((m) => m.id).join(', ')}.
            </span>
          </li>
        </ul>
      </section>

      <section className={`page-pad ${prose.prose}`}>
        <div className={prose.block}>
          <h2>Asking us something</h2>
          <p className="measure">
            For interviews, the Project: Waterfall proposal document, or anything not in this
            kit, the address is on the <Link href="/contact">contact page</Link>. If you are
            writing about entrepreneurship in the region rather than about us, the{' '}
            <Link href="/niagara">Niagara River register</Link> lists every programme
            on both sides of the river, with sources.
          </p>
          <p className="measure">
            No photographs of the generating station exist in this kit because we do not have
            any we are entitled to distribute, and no renderings of Project: Waterfall exist
            at all. We would rather say that than hand you something misleading. The mark
            geometry lives in <span className={styles.mono}>lib/brand.js</span>; the grid is{' '}
            {MONOGRAM.viewBox.split(' ').slice(2).join('×')}.
          </p>
        </div>
      </section>
    </main>
  );
}
