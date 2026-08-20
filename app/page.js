import Link from 'next/link';
import Plaque from '../components/Plaque';
import { BINDING } from '../lib/marks';
import MarkRow from '../components/MarkRow';
import styles from './home.module.css';

export default function Home() {
  return (
    <main>
      {/* FIRST VIEWPORT ---------------------------------------------------- */}
      <section className={`page-pad ${styles.first}`}>
        <div className={styles.plaqueCol}>
          <Plaque
            name={<>Diaphora<br />Labs</>}
            marks={BINDING}
            lines={[
              'Niagara Falls · 43°04′N 79°04′W',
              'Delta 0 · Delta 1 · Delta 2',
            ]}
          />
        </div>

        <div className={styles.markCol}>
          <h1 className={styles.thesis}>
            An incubator that <em>marks</em>, not one that ranks.
          </h1>
          <p className={`measure ${styles.lede}`}>
            An incubator at the Canada&ndash;US border, in Niagara Falls. Two
            programs: one open to anyone on earth, one you have to be let into.
            Fifteen values behind both, and four of them bind us as tightly as
            they bind you.
          </p>
        </div>
      </section>

      {/* The struck line: the punches run the full width, under both columns. */}
      <section className={`page-pad ${styles.strike}`}>
        <MarkRow />
      </section>

      {/* THE TWO DOORS ----------------------------------------------------- */}
      <section className={`page-pad ${styles.doors}`}>
        <Link href="/delta-0" className={`${styles.door} ${styles.doorLive}`}>
          <span className={styles.doorOrd}>Delta 0</span>
          <span className={styles.doorAct}>On your mark</span>
          <p className={styles.doorBody}>
            <strong>Start here.</strong> Open source, self-service, and open to anyone
            anywhere on earth — no application, no cohort, no permission to ask for. A
            community you can join today, a source repository you can read and fork, and
            an agent-run incubation tool. The punch is free: strike it yourself.
          </p>
          <span className={`assay-line ${styles.doorMeta}`}>Start here · Open · No gate</span>
        </Link>

        <Link href="/delta-1" className={styles.door}>
          <span className={styles.doorOrd}>Delta 1</span>
          <span className={styles.doorAct}>Make your mark</span>
          <p className={styles.doorBody}>
            The one you cannot give yourself. Application-based, in person, in Niagara
            Falls, and biased toward founders already operating with an MVP. Research
            teams are read on TRL. Delta 0 is where you start;
            this is where the work goes in front of other people and has to hold up.
          </p>
          <span className={`assay-line ${styles.doorMeta}`}>
            Selective · In person · TRL assessed
          </span>
        </Link>
      </section>

      {/* Neither door is theirs. Warmer voice on purpose: these are peers. */}
      <section className={`page-pad ${styles.thirdRoute}`}>
        <p className={`measure ${styles.thirdRouteBody}`}>
          <strong>Not a founder?</strong> Delta 1 is unfunded and we are looking for
          partners. Project: Waterfall is a live proposal to Niagara Parks for the
          generating station at the base of the falls. Both conversations start with
          a person.
        </p>
        <p className={styles.thirdRouteLinks}>
          <Link href="/delta-1">Partners and funders →</Link>
          <Link href="/waterfall">Project: Waterfall →</Link>
        </p>
      </section>

      {/* THE MACHINERY BENEATH THE SPECTACLE -------------------------------- */}
      <section className={`page-pad ${styles.beneath}`}>
        <h2 className={styles.beneathHead}>What the mark certifies</h2>
        <div className={styles.beneathGrid}>
          <div>
            <span className="assay-line">Origin</span>
            <p className="measure">
              Niagara Falls, where the boundary runs down the middle of the river
              and nearly $3.6 billion in goods and services crosses it every day.
              Diaphora is Greek for the difference that distinguishes one thing
              within its kind. The address is the argument.
            </p>
          </div>
          <div>
            <span className="assay-line">Standard</span>
            <p className="measure">
              Fifteen values, four of which bind every audience we have — founders,
              partners, and ourselves alike. Each one has to show up in the work to
              count for anything.
            </p>
          </div>
          <div>
            <span className="assay-line">Instrument</span>
            <p className="measure">
              Cross-border legal tooling, built for companies that must exist on
              both sides of the line at once. Details are being drafted and will be
              published here once they are settled.
            </p>
          </div>
        </div>

        <p className={styles.beneathNote}>
          <Link href="/niagara">Why this happens at Niagara →</Link>
        </p>
      </section>
    </main>
  );
}
