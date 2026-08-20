import Link from 'next/link';
import PageHead from '../../components/PageHead';
import { BINDING } from '../../lib/marks';
import prose from '../prose.module.css';
import styles from './niagara.module.css';

export const metadata = {
  title: 'Niagara — Diaphora Labs',
  description:
    'The case for building at the base of the falls: a border that runs through the water, the place where long-distance power was proven, and an international audience that already arrives.',
};

// The axis rotates here: the river above the escarpment, the tailrace below,
// and the argument staged along the drop. Each course is one reason the
// address is the argument rather than a detail of it.
const DROP = [
  {
    head: 'A continent drains through one channel',
    body:
      'The Niagara River carries the outflow of four of the five Great Lakes — Superior, Michigan, Huron, Erie — through a single channel on its way to Lake Ontario and the Atlantic. The land beside that channel is the narrow place between the industrial cores of two countries. Water, shipping, rail, power and freight have all been forced past this spot, and the region has spent two centuries building the infrastructure to handle what comes through.',
  },
  {
    head: 'The border runs through the water',
    body:
      'The international boundary does not follow the bank. It runs down the centre of the river and through the falls themselves. A company founded here is not near a border; it is on one. Two legal systems, two currencies and two regulatory regimes are the operating conditions from the first day. The program answers that from the first day too, while the answer is still cheap.',
  },
  {
    head: 'Getting across the line is the oldest industry here',
    body:
      'Niagara was one of the great crossing points of the Underground Railroad. The river that marked the boundary was also the thing that had to be got across, and the far bank meant a different legal status for the person standing on it. That work continues in less consequential form: several international road crossings sit within minutes of the site, the Welland Canal cuts the peninsula for shipping, and two international airports serve the region from opposite sides of the line.',
  },
  {
    head: 'The current went out from here',
    body:
      'In the 1890s Niagara became the proving ground for long-distance alternating current, and power generated at the falls reached Buffalo. The argument over whether electricity could travel at all was settled at this spot, and the industrial map of North America was redrawn around the answer. A place that has already settled one argument about the future carries weight when the next one is held there.',
  },
  {
    head: 'The audience is already here',
    body:
      'Niagara Falls is one of the most visited natural sites on earth, and the people who visit arrive from everywhere. Most new institutions have to buy their way into international attention. An institution at the base of these falls inherits an audience that is already standing there — investors, press, ministers and founders who came for the water and can be shown the work while they are in front of it.',
  },
  {
    head: 'And the building was left standing',
    body:
      'The generating stations at the base of the falls outlived their purpose. The Ontario Power Company station stopped generating and remained: monumental, unused, and standing at the foot of the thing everyone came to see. Project: Waterfall is the proposal for what it becomes next. Nothing about it is leased, bought or approved.',
  },
];

// The economic argument, kept to what can be stated without a figure behind
// it. Anything that needs a number to be true is in the pending block below,
// not here.
const CASE = [
  {
    key: 'Two markets, one desk',
    body:
      'A founder here reaches both sides of the largest trading relationship on earth from a single address, and has to be legible to both from the beginning. The site supplies that advantage; we did not invent it.',
  },
  {
    key: 'A monument put back to work',
    body:
      'The proposal reuses a decommissioned station rather than asking for a new build. A working institution inside it turns a monument that costs money to stand still into one that does something.',
  },
  {
    key: 'A reason to stay',
    body:
      'Delta 1 exists so that a founder educated in this region has a reason to build in it. Brock University, Niagara Innovation Hub and Velocity have backed the founders and support Diaphora Labs; none of them has committed capital or space, and none is described here as having done so.',
  },
  {
    key: 'Attention the region already owns',
    body:
      'International visitors arrive continuously and for their own reasons. A programme sited at the falls converts footfall the region already has into an audience for the companies built here.',
  },
  {
    key: 'Open before it is funded',
    body:
      'Delta 0 is running now, free, self-service and global, with no application and no cohort. The pipeline does not wait on a building, a lease or a budget. The building is what would let it scale.',
  },
];

export default function Niagara() {
  return (
    <main>
      <PageHead
        ord="01"
        title="Niagara"
        standfirst="Every incubator has to explain its address. This one is the whole argument: the narrow place a continent drains through, a border that runs down the middle of the water, the spot where the question of whether power could travel was settled, and a site the world already visits without being asked."
        meta={['43°04′N 79°04′W', 'Ontario · Canada', 'The line runs mid-river']}
        marks={BINDING}
      />

      <section className={`page-pad ${styles.drop}`}>
        <ol className={styles.courses}>
          {DROP.map((d, i) => (
            <li key={d.head} className={styles.course}>
              <span className={styles.depth}>{String(i + 1).padStart(2, '0')}</span>
              <div className={styles.courseBody}>
                <h2 className={styles.courseHead}>{d.head}</h2>
                <p className="measure">{d.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={`page-pad ${styles.caseSection}`}>
        <h2 className={styles.caseHead}>What building here produces</h2>
        <ul className={styles.case}>
          {CASE.map((c) => (
            <li key={c.key} className={styles.caseRow}>
              <span className={`assay-line ${styles.caseKey}`}>{c.key}</span>
              <p className={styles.caseBody}>{c.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={`page-pad ${prose.prose}`}>
        <div className={`${prose.pending} ${prose.block}`}>
          <span className={`assay-line ${prose.pendingLabel}`}>
            Figures this argument needs, and does not yet have
          </span>
          <p className="measure">
            A ministry or an anchor partner will reasonably ask for annual visitor volume,
            the population and business count within a drive of the site, crossing volumes
            at the local bridges, regional employment and sector mix, and the station&rsquo;s
            condition and cost to occupy. We hold none of those figures to a standard we
            would be willing to defend in a room, so none appears on this page. They will
            be sourced and cited before they are used, and an estimate will not be
            substituted in the meantime.
          </p>
        </div>

        <div className={prose.block}>
          <h2>The difference that distinguishes</h2>
          <p className="measure">
            <em>Diaphora</em> is Greek for difference — in Aristotle, the{' '}
            <em>differentia</em>, the specific difference that separates one thing from
            everything else of its kind. A hallmark is that difference struck into metal
            so it can be read anywhere, by anyone, without translation. We took the name
            before we took the address, and then found the address was the same idea in
            geography: a place that exists because of a line, and is worth something
            because of which side of it you are standing on.
          </p>
        </div>

        <div className={prose.block}>
          <h2>Where this goes next</h2>
          <p className="measure">
            <Link href="/waterfall">Project: Waterfall</Link> is the building, and the
            proposal being made to Niagara Parks.{' '}
            <Link href="/delta-0">Delta 0</Link> is open to anyone on earth today.{' '}
            <Link href="/delta-1">Delta 1</Link> is the program that happens here, in
            person, at the bottom of the drop — and the one currently looking for
            partners and funders. If you are one, the address is on the{' '}
            <Link href="/contact">contact page</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
