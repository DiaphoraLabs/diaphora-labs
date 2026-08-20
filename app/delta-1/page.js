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
        title={<>Be<br />assayed</>}
        standfirst="Assay is the old word for testing metal against a standard. Delta 1 is the assay office, and it does that to companies: application-based, in person, in Niagara Falls, and biased toward founders already operating with an MVP. Science and research companies are assessed on TRL. Unlike Delta 0, this mark cannot be self-struck — that is the whole difference between them."
        meta={['Application only', 'In person · Niagara Falls', 'MVP stage', 'TRL assessed']}
      />

      {/* Two conversions, one page, neither diluting the other. ------------- */}
      <section className={`page-pad ${styles.twoDoors}`}>
        <div className={styles.column}>
          <h2 className={styles.h2}>For founders</h2>
          <p className="measure">
            Applications are not open yet. The waitlist is the real queue: when the
            first cohort opens, it opens to this list first, and nothing else about
            the process is decided in a back room.
          </p>
          <p className="measure">
            If you are building on research, you will be assessed on TRL rather than
            on traction, because the two are not the same thing and pretending they
            are is how good science gets rejected by accelerators.
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
            Delta 1 is currently unfunded. We would rather write that on the page
            than imply otherwise and have you find out in the second meeting.
          </p>
          <p className="measure">
            What exists is the position: a program at the border, with cross-border
            legal tooling, a building worth restoring, and an open global funnel
            feeding a selective in-person cohort. If that is a thing you back,
            partner or fund, this is the door.
          </p>
          <Register
            list="delta-1-partner"
            label="Partners and funders"
            action="Open a conversation"
            fields={['name', 'org', 'email', 'note']}
            noteLabel="What you have in mind, in a line"
            done="Recorded. A person will read this, not a pipeline."
          />
        </div>
      </section>

      <section className={`page-pad ${styles.assay}`}>
        <h2 className={styles.h2}>What the assay tests</h2>
        <p className={`measure ${styles.assayLede}`}>
          Every value on the row applies to Delta 1. These are the marks the program
          demands, not the ones it grants.
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
