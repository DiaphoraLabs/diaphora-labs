import PageHead from '../../components/PageHead';
import { BINDING } from '../../lib/marks';
import Register from '../../components/Register';
import styles from './delta2.module.css';

export const metadata = {
  title: 'Delta 2 — Diaphora Labs',
  description: 'A blank die. Register to be told when it is struck.',
};

export default function Delta2() {
  return (
    <main>
      <PageHead
        ord="04"
        title={<>An unstruck<br />die</>}
        standfirst="Delta 2 is a third program, and it is not open. There is no cohort, no application and no date. We are working on something wonderful, and when the die is cut, this list hears first."
        meta={['Diaphora Labs · Niagara Falls', 'Not open · no date', 'One announcement only']}
        marks={BINDING}
      />

      <section className={`page-pad ${styles.dieSection}`}>
        {/* The blank die: the world's own state for what does not exist yet. */}
        <div className={styles.blank} aria-hidden="true">
          <svg viewBox="0 0 200 200" className={styles.blankSvg}>
            <defs>
              <radialGradient id="dieFace" cx="38%" cy="30%">
                <stop offset="0%" stopColor="#245746" />
                <stop offset="55%" stopColor="#16382f" />
                <stop offset="100%" stopColor="#0b1815" />
              </radialGradient>
              {/* the pool of light falling across the face */}
              <linearGradient id="dieSheen" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ece7d9" stopOpacity="0.1" />
                <stop offset="45%" stopColor="#ece7d9" stopOpacity="0.02" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.22" />
              </linearGradient>
            </defs>
            {/* A square face, sharp-cornered: there are no radii anywhere in this
                system, and a die is a cut block rather than a coin. */}
            <rect x="14" y="14" width="172" height="172" fill="url(#dieFace)" />
            <rect x="14" y="14" width="172" height="172" fill="url(#dieSheen)" />

            {/* The bevel, drawn rather than blurred: the top and left arrises
                catch the light, the bottom and right fall into shadow. Two
                open polylines, so the corners mitre instead of overlapping. */}
            <path
              d="M14 186 L14 14 L186 14"
              fill="none"
              stroke="rgba(236,231,217,0.17)"
              strokeWidth="2"
            />
            <path
              d="M186 14 L186 186 L14 186"
              fill="none"
              stroke="rgba(0,0,0,0.55)"
              strokeWidth="2"
            />
            <rect x="14" y="14" width="172" height="172" fill="none" stroke="#1e4a3e" />

            {/* the milled recess the mark sits in */}
            <rect x="36" y="36" width="128" height="128" fill="none" stroke="rgba(236,231,217,0.12)" strokeDasharray="2 7" />
            <path d="M70 130 L70 70 L130 70" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" />
            <path d="M130 70 L130 130 L70 130" fill="none" stroke="rgba(236,231,217,0.07)" strokeWidth="1.5" />
            <rect x="70" y="70" width="60" height="60" fill="none" stroke="rgba(184,137,74,0.35)" />

            {/* The die is uncut, but the cutting is under way: a delta working
                itself into a stepped mark and back, on the punch alphabet's own
                24-unit grid at its 1.55 stroke. Three connected lines in both
                states: the triangle's leaning edges rotate onto the axes and it
                opens into a single step — riser, tread, riser. Four points in
                each, so the path interpolates rather than jumping. */}
            <g transform="translate(76 76) scale(2)">
              <g className={styles.cutting}>
                <path
                  d="M5 19 L12 5 L19 19 L5 19"
                  fill="none"
                  strokeWidth="1.55"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <animate
                    attributeName="d"
                    dur="3.2s"
                    repeatCount="indefinite"
                    calcMode="spline"
                    keyTimes="0;0.12;0.45;0.6;1"
                    keySplines="0 0 1 1;0.16 1 0.3 1;0 0 1 1;0.16 1 0.3 1"
                    values="M5 19 L12 5 L19 19 L5 19;M5 19 L12 5 L19 19 L5 19;M7 19 L7 12 L17 12 L17 5;M7 19 L7 12 L17 12 L17 5;M5 19 L12 5 L19 19 L5 19"
                  />
                </path>
              </g>

              {/* Reduced motion keeps the mark, drops the cycling. */}
              <path
                className={styles.cuttingStatic}
                d="M7 19 L7 12 L17 12 L17 5"
                fill="none"
                strokeWidth="1.55"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
          <span className={styles.blankLabel}>Change is coming</span>
        </div>

        <div className={styles.registerCol}>
          <Register
            list="delta-2"
            label="Delta 2 register"
            action="Tell me when it is struck"
            fields={['email']}
            tone="current"
            done="Recorded. You will hear once, when Delta 2 opens, and not before."
          />
          <p className={styles.small}>
            One email, at launch. Nothing else is sent to this list.
          </p>
        </div>
      </section>
    </main>
  );
}
