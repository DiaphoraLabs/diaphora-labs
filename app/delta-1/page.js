import PageHead from '../../components/PageHead';
import Register from '../../components/Register';
import MarkRow from '../../components/MarkRow';
import prose from '../prose.module.css';
import styles from './delta1.module.css';

export const metadata = {
  title: 'Delta 1 — Diaphora Labs',
  description: 'Application-based, in person, in Niagara Falls. This mark cannot be self-struck.',
};

export default function Delta1() {
  return (
    <main>
      <PageHead
        ord="03"
        title={<>Make your<br />mark</>}
        standfirst="Application-based, in person, in Niagara Falls, for founders already running an MVP. Research teams are assessed on TRL. Delta 0 is yours the moment you decide to take it. This one has to be given to you."
        meta={['Application only', 'In person · Niagara Falls', 'MVP stage', 'TRL assessed']}
      />

      {/* Two conversions, one page, neither diluting the other. ------------- */}
      <section className={`page-pad ${styles.twoDoors}`}>
        <div className={styles.column}>
          <h2 className={styles.h2}>For founders</h2>
          <p className="measure">
            Applications are not open yet. When the first cohort opens, this list
            hears before anyone else. It is the only queue there is.
          </p>
          <p className="measure">
            If you are building on research, we assess TRL. Good science fails an
            accelerator&rsquo;s traction test all the time, for reasons that have
            nothing to do with the science.
          </p>
          <Register
            list="delta-1-founder"
            label="Founder waitlist"
            action="Join the waitlist"
            fields={['name', 'org', 'email', 'note']}
            tone="current"
            done="You are on the founder waitlist. When Delta 1 opens, this list is told first."
          />
        </div>

        <div className={styles.column}>
          <h2 className={styles.h2}>For partners and funders</h2>
          <p className="measure">
            Delta 1 is unfunded. You would learn that in the second meeting anyway,
            so here it is in the first.
          </p>
          <p className="measure">
            What exists is the position: a program sited on the border, cross-border
            legal tooling built into it, a building worth restoring, and an open
            global funnel feeding a selective in-person cohort. If that is something
            you back, start here.
          </p>
          <Register
            list="delta-1-partner"
            label="Partners and funders"
            action="Open a conversation"
            fields={['name', 'org', 'email', 'note']}
            noteLabel="What you have in mind, in a line"
            done="Recorded. A person reads these."
          />
        </div>
      </section>

      <section className={`page-pad ${styles.assay}`}>
        <h2 className={styles.h2}>The standard</h2>
        <p className={`measure ${styles.assayLede}`}>
          Every mark on the row applies to Delta 1 — what the program holds itself
          to, and what it will hold you to.
        </p>
        <MarkRow size={38} />
      </section>

      <section className={`page-pad ${prose.prose}`}>
        <div className={`${prose.pending} ${prose.block}`}>
          <span className={`assay-line ${prose.pendingLabel}`}>Not yet decided</span>
          <p className="measure">
            Cohort dates, cohort size, program length, terms and whether Delta 1
            takes equity are all undecided. They will be published here when they
            are settled. Nothing on this page should be read as an offer.
          </p>
        </div>
      </section>
    </main>
  );
}
