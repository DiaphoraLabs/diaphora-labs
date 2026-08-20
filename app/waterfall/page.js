import PageHead from '../../components/PageHead';
import { marksFor } from '../../lib/marks';
import SignOn from '../../components/SignOn';
import SupporterWall from '../../components/SupporterWall';
import Mark from '../../components/Mark';
import { STORY, USES, RANGES, PROVEN_MARK, SUPPORTERS } from '../../lib/proposal';
import prose from '../prose.module.css';
import styles from './waterfall.module.css';

export const metadata = {
  title: 'Project: Waterfall — Diaphora Labs',
  description:
    'A flagship home at the old Ontario Power Company generating station, at the base of Niagara Falls.',
};

export default function Waterfall() {
  return (
    <main>
      <PageHead
        ord="05"
        title={<>Project:<br />Waterfall</>}
        standfirst="A generating station was built at the base of the falls to turn falling water into power for a continent. It stopped generating and it is still standing there. Project: Waterfall is the plan to make it the home of Diaphora Labs."
        meta={[
          'Base of the falls · Ontario · Canada',
          'Ontario Power Company station',
          'Proposal · nothing here is built',
          // A submission to a public body has to be filable: dated, and
          // distinguishable from a later revision.
          'Issued August 2026 · innovate@diaphoralabs.com',
        ]}
        marks={marksFor('Partners')}
      />

      <section className={`page-pad ${styles.tablet}`}>
        {/* Set as text, not cast: the page head is already the tablet, and two
            plaques on one page put two cast objects in competition. */}
        <div className={styles.spec}>
          <h2 className={styles.specHead}>The building</h2>
          <ul className={styles.specLines}>
            <li className="assay-line">The Ontario Power Company generating station</li>
            <li className="assay-line">At the base of the Canadian falls</li>
            <li className="assay-line">Dedication pending</li>
          </ul>
        </div>
        <div className={styles.tabletBody}>
          <p className="measure">
            The building was designed for one job: take the weight of the river and
            hand back current. It did that job, and then the job ended, and a
            monumental industrial hall at the foot of one of the most visited natural
            sites on earth was left with nothing to do.
          </p>
          <p className="measure">
            An incubator is the same machine in a different medium. Something with
            enormous latent energy arrives, is put through a structure built to
            convert it, and leaves as something that can travel. We would rather do
            that inside a building that already knows how than in an office park.
          </p>
        </div>
      </section>

      {/* THE STORY --------------------------------------------------------- */}
      <section className={`page-pad ${styles.story}`}>
        <h2 className={styles.sectionHead}>
          The last time Niagara asked the world for ideas, the world got electricity
        </h2>
        <p className={`measure ${styles.sectionLede}`}>
          In 1890 the International Niagara Commission, chaired by Lord Kelvin, invited
          engineers everywhere to answer one question: how do you put the falls to work?
          Alternating current won, and every grid on earth still runs on the result. The
          building has earned a question that big again.
        </p>
        <ol className={styles.timeline}>
          {STORY.map((t) => (
            <li key={t.year} className={t.future ? `${styles.era} ${styles.eraFuture}` : styles.era}>
              <span className={styles.year}>{t.year}</span>
              <div>
                <h3 className={styles.eraHead}>{t.head}</h3>
                <p className="measure">{t.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* SIX USES ---------------------------------------------------------- */}
      <section className={`page-pad ${styles.uses}`}>
        <h2 className={styles.sectionHead}>One building, six uses</h2>
        <p className={`measure ${styles.sectionLede}`}>
          The station is big enough to hold all of this at once. None of it is exotic —
          every piece has a working precedent somewhere in the world. What exists nowhere
          is all six under one roof, at the foot of the falls. This is what we are
          proposing, not what is there today.
        </p>
        <ol className={styles.register}>
          {USES.map((u) => (
            <li key={u.head} className={styles.row}>
              <span className={styles.rowWhere}>{u.where}</span>
              <h3 className={styles.rowHead}>{u.head}</h3>
              <p className={styles.rowBody}>{u.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* THE PROVING GROUND ------------------------------------------------ */}
      <section className={`page-pad ${styles.proving}`}>
        <h2 className={styles.sectionHead}>
          Everything that makes this site impossible is something industry pays to simulate
        </h2>
        <p className={`measure ${styles.sectionLede}`}>
          Mist, natural icing, a permanent roar, a long tailrace tunnel, live hydraulic
          infrastructure, a sustained grade, and millions of visitors a year. Companies
          spend fortunes recreating these conditions badly indoors. We are cataloguing
          seventeen test ranges that offer them real, and one steward controls land,
          water, roads and underground — so the whole catalogue could run under a single
          site agreement. Six of the seventeen are below.
        </p>

        <ol className={styles.register}>
          {RANGES.map((r) => (
            <li key={r.head} className={styles.row}>
              <span className={styles.rowWhere}>{r.cond}</span>
              <h3 className={styles.rowHead}>{r.head}</h3>
              <p className={styles.rowBody}>{r.body}</p>
            </li>
          ))}
          {/* The catalogue was announced and then withheld with no affordance.
              The last row is the way to the rest of it. */}
          <li className={styles.row}>
            <span className={styles.rowWhere}>Eleven more</span>
            <h3 className={styles.rowHead}>The rest of the catalogue</h3>
            <p className={styles.rowBody}>
              Still being written up. If a condition you need is not listed, say which
              one — it is how the catalogue gets finished.{' '}
              <a href="#research">Ask through the research lane</a>.
            </p>
          </li>
        </ol>

        {/* The proposal's own certification mark, struck in the same alphabet. */}
        <div className={styles.proven}>
          <span className={styles.provenMark}>
            <Mark mark={PROVEN_MARK} size={54} struck current />
          </span>
          <div>
            <h3 className={styles.provenHead}>Niagara-Proven</h3>
            <p className="measure">
              A proposed mark for products that pass here. A hallmark certifies where a
              thing was made and to what standard; this one would certify that a product
              survived conditions no laboratory can honestly reproduce. It does not exist
              yet, and nothing carries it.
            </p>
          </div>
        </div>
      </section>

      <section className={`page-pad ${prose.prose}`}>
        <div className={prose.pairs}>
          <div className={prose.block}>
            <h3>Why the building matters</h3>
            <p>
              A physical home is the difference between a program and a place.
              Delta 1 is in person because the things it is trying to cause —
              introductions, arguments, borrowed courage — do not happen on a call.
            </p>
          </div>
          <div className={prose.block}>
            <h3>Why the falls matter</h3>
            <p>
              Millions of people already come here every year. An institution at the
              base of the falls is visible in a way that an institution in a
              business district is not, and visibility is how a region changes what
              it is known for.
            </p>
          </div>
          <div className={prose.block}>
            <h3>Why now</h3>
            <p>
              The building is not getting younger, and the case for what happens to
              it is being made now, by whoever bothers to make it. This is us
              bothering.
            </p>
          </div>
        </div>

        <div className={prose.pending}>
          <span className={`assay-line ${prose.pendingLabel}`}>What is not settled</span>
          <p className="measure">
            Everything on this page is proposed. Nothing described here is built,
            funded, approved or agreed. Diaphora Labs does not control this building:
            there is no lease, no purchase, no agreement and no municipal approval,
            and the proposal is offered to Niagara Parks and the region, whose land
            and whose decision this is. The seventeen ranges are a catalogue in
            progress. Niagara-Proven is a proposed mark that certifies nothing
            today. There are no renderings here and no photographs of the station.
            We hold none that are real, and we will not manufacture any.
          </p>
        </div>

      </section>

      {/* WAYS IN ---------------------------------------------------------- */}
      <section className={`page-pad ${styles.ways}`}>
        <h2 className={styles.waysHead}>Put your name on the drawing</h2>
        <p className={`measure ${styles.waysLede}`}>
          A building this size moves when enough people say out loud that it should.
          Six ways in, each about two minutes, none of them costing anything. If you
          are local and you think this is the wrong idea,{' '}
          <a href="#local">the community lane</a> is still for you. Write to{' '}
          <a href="mailto:innovate@diaphoralabs.com">innovate@diaphoralabs.com</a>{' '}
          if none of them fit.
        </p>
        <SignOn />
      </section>

      {/* THE REGISTER ------------------------------------------------------ */}
      <section className={`page-pad ${styles.registerSection}`}>
        {/* "Who has signed on" sat under "Put your name on the drawing" and read
            as an endorsement of this proposal. These three back Diaphora Labs;
            none has been asked about the station. */}
        <h2 className={styles.waysHead}>Who supports Diaphora Labs</h2>
        <SupporterWall supporters={SUPPORTERS} />
      </section>
    </main>
  );
}
