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
            Choose the values your work actually runs on. Delta 0 strikes the mark
            and hands you the file. Nobody grants this one; you take it.
          </p>
        </div>
        <MarkForge />
      </section>

      <section className={`page-pad ${styles.marksSection}`}>
        <h2 className={styles.h2}>The fifteen</h2>
        <p className={`measure ${styles.marksLede}`}>
          Four of them bind every audience we have, partners included: Loyalty,
          Transparency, Curiosity, Fairness. Those four rest already struck.
        </p>
        <MarkRow size={40} />
      </section>

      <section className={`page-pad ${prose.prose}`}>
        <div className={prose.pairs}>
          <div className={prose.block}>
            <h3>The wiki</h3>
            <p>
              Everything the program knows, written down where anyone can read it,
              correct it, and take it away. There is no proprietary curriculum. A
              curriculum you cannot copy is a lock.
            </p>
          </div>
          <div className={prose.block}>
            <h3>The tool</h3>
            <p>
              Incubation, run primarily by agents. Most of early company building
              is advice, and advice should be available at three in the morning, in
              any timezone, without an introduction.
            </p>
            <p>
              <a href="https://github.com/francois-build/delta-0">
                Read the source &rarr;
              </a>
            </p>
          </div>
          <div className={prose.block}>
            <h3>The community</h3>
            <p>
              Open to anyone who wants in. Danketsu is one of the fifteen, and it
              means a unity you build rather than one you are selected into.
            </p>
            <p>
              <a href="https://discord.gg/AnWHBBTjB">Join the community &rarr;</a>
            </p>
          </div>
        </div>

        <div className={`${prose.pending} ${prose.block}`}>
          <span className={`assay-line ${prose.pendingLabel}`}>Not yet published</span>
          <p className="measure">
            The wiki is still being written and has no home yet. The community and
            the source are open now, linked above. The source is MIT licensed, so
            you can check that claim rather than take it.
          </p>
        </div>
      </section>
    </main>
  );
}
