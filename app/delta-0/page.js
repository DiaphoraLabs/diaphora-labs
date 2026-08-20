import PageHead from '../../components/PageHead';
import MarkRow from '../../components/MarkRow';
import MarkForge from '../../components/MarkForge';
import prose from '../prose.module.css';
import styles from './delta0.module.css';

export const metadata = {
  title: 'Delta 0 — Diaphora Labs',
  description: 'Open source, self-service, and open to anyone anywhere. Take your mark.',
};

export default function Delta0() {
  return (
    <main>
      <PageHead
        ord="02"
        title={<>Take your<br />mark</>}
        standfirst="Delta 0 is the open register. Open source, self-service, and available to anyone anywhere on earth — a community, a wiki, and a primarily agent-run incubation tool. There is no application, no cohort and no permission to ask for. The punch is free."
        meta={['Open source', 'Self-service', 'Global · no gate', 'No application']}
      />

      <section className={`page-pad ${styles.forgeSection}`}>
        <div className={styles.forgeIntro}>
          <h2 className={styles.h2}>Strike it yourself</h2>
          <p className="measure">
            A clockmaker signs the dial in the open. Choose the values your work
            actually runs on, and Delta 0 will strike you a mark and hand you the
            file. Nobody grants this one. That is the point of it.
          </p>
        </div>
        <MarkForge />
      </section>

      <section className={`page-pad ${styles.marksSection}`}>
        <h2 className={styles.h2}>The fourteen</h2>
        <p className={`measure ${styles.marksLede}`}>
          Four of them bind every audience we have, partners included: Loyal,
          Transparency, Curious, Fairness. Those four rest already struck.
        </p>
        <MarkRow size={40} />
      </section>

      <section className={`page-pad ${prose.prose}`}>
        <div className={prose.pairs}>
          <div className={prose.block}>
            <h3>The wiki</h3>
            <p>
              Everything the program knows, written down where anyone can read it,
              correct it, and take it away. Delta 0 has no proprietary curriculum,
              because a curriculum you cannot copy is not a curriculum — it is a
              lock.
            </p>
          </div>
          <div className={prose.block}>
            <h3>The tool</h3>
            <p>
              Incubation, run primarily by agents. The parts of early company
              building that are advice rather than judgement should be available at
              three in the morning, in any timezone, without an introduction.
            </p>
          </div>
          <div className={prose.block}>
            <h3>The community</h3>
            <p>
              Open to anyone who wants in. Danketsu is one of the fourteen and it
              means unity — the kind you build, not the kind you are selected into.
            </p>
          </div>
        </div>

        <div className={`${prose.pending} ${prose.block}`}>
          <span className={`assay-line ${prose.pendingLabel}`}>Not yet published</span>
          <p className="measure">
            The Delta 0 repository, wiki and community links are not live yet. When
            they are, they will be linked from this page rather than described on
            it.
          </p>
        </div>
      </section>
    </main>
  );
}
