import PageHead from '../../components/PageHead';
import { marksFor } from '../../lib/marks';
import SignOn from '../../components/SignOn';
import SupporterWall from '../../components/SupporterWall';
import BriefGate from '../../components/BriefGate';
import { STORY, USES, SUPPORTERS, SOURCES } from '../../lib/proposal';
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

      {/* THE ASK ----------------------------------------------------------
          Both calls to action sit above the argument. A reader who is already
          convinced should not have to scroll a proposal to act on it, and a
          reader who is not can carry the PDF away and be convinced elsewhere. */}
      <section className={`page-pad ${styles.ask}`}>
        <BriefGate />
      </section>

      {/* WAYS IN ---------------------------------------------------------- */}
      <section className={`page-pad ${styles.ways}`}>
        <h2 className={styles.waysHead}>Put your name on the drawing</h2>
        <p className={`measure ${styles.waysLede}`}>
          A building this size moves when enough people say out loud that it should.
          Six ways in, each about two minutes, none of them costing anything, and every
          one of them the same commitment: your name on the drawing. If you
          are local and you think this is the wrong idea,{' '}
          <a href="#local">the community lane</a> is still for you. Write to{' '}
          <a href="mailto:innovate@diaphoralabs.com">innovate@diaphoralabs.com</a>{' '}
          if none of them fit.
        </p>
        <SignOn />
      </section>


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
        <ol className={styles.programme}>
          {USES.map((u) => (
            <li key={u.head} className={styles.entry}>
              <span className={styles.entryWhere}>{u.where}</span>
              {/* Head and body in one cell: as siblings in the grid the head sat
                  as close to the level label as to the text it introduces. */}
              <div>
                <h3 className={styles.entryHead}>{u.head}</h3>
                <p className={styles.entryBody}>{u.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={`page-pad ${prose.prose}`}>
        <div className={prose.steps}>
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
            and whose decision this is. The catalogue of test ranges is still
            being written, and Niagara-Proven is a proposed mark that certifies
            nothing today; both are set out in the proposal above. There are no
            renderings here and no photographs of the station.
            We hold none that are real, and we will not manufacture any.
          </p>
        </div>

        <div className={prose.block}>
          <h3>Where the history comes from</h3>
          <p className="measure">
            The building&rsquo;s record is not ours to assert. Everything stated above
            about the station and the commission is cited here.
          </p>
          <ul className={prose.sources}>
            {SOURCES.map((s) => (
              <li key={s.href} className={prose.source}>
                <span className={`assay-line ${prose.sourceFact}`}>{s.fact}</span>
                <a href={s.href}>{s.cite}</a>
              </li>
            ))}
          </ul>
        </div>

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
