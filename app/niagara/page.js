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
    head: 'Everything between the lakes still comes past here',
    body:
      'Lake Erie sits 99.5 metres above Lake Ontario, and the falls are the step between them. No vessel can climb it. The Welland Canal was cut across the peninsula to get around the drop — 43.4 kilometres, eight locks — and it is still the only marine route between the upper and lower Great Lakes. In the 2024 navigation season it carried 3,098 vessel transits and 26.6 million tonnes of cargo. Grain leaving Thunder Bay and ore bound for Hamilton pass within a half-hour drive of this site, on a channel that exists because of the drop the falls made.',
  },
  {
    head: 'The meeting point of two powers',
    body:
      'The international boundary does not follow the bank. It runs down the centre of the river and through the falls themselves. A company founded here is not near a border; it is on one. Nearly $3.6 billion in goods and services crossed the Canada–US border every day in 2024 — the largest bilateral trading relationship on earth — and three international bridges cross the river within the region. Two legal systems, two currencies and two regulatory regimes are the operating conditions from the first day. The program answers that from the first day too, while the answer is still cheap.',
  },
  {
    head: 'Getting across the line is the oldest industry here',
    body:
      'Niagara rivalled Detroit as a crossing point of the Underground Railroad. Freedom seekers crossed by the Suspension Bridge, by ferry, and on foot; Harriet Tubman brought a party over by train in November 1856. The river that marked the boundary was also the thing that had to be got across, and the far bank meant a different legal status for the person standing on it. That work continues in less consequential form: several international road crossings sit within minutes of the site, the Welland Canal cuts the peninsula for shipping, and two international airports serve the region from opposite sides of the line.',
  },
  {
    head: 'The current went out from here',
    body:
      'On 16 November 1896, power generated at the falls reached Buffalo — twenty-two miles, stepped up to 11,000 volts, on Tesla and Westinghouse’s polyphase alternating current. The argument over whether electricity could travel at all was settled at this spot, and the industrial map of North America was redrawn around the answer. A place that has already settled one argument about the future carries weight when the next one is held there.',
  },
  {
    head: 'The audience is already here',
    body:
      'More than 13 million people visit Niagara each year — over three million from the United States and about a million from overseas — spending more than $2 billion and supporting over 40,000 jobs in the region. Most new institutions have to buy their way into international attention. An institution at the base of these falls inherits an audience that is already standing there: investors, press, ministers and founders who came for the water and can be shown the work while they are in front of it.',
  },
  {
    head: 'And the building was left standing',
    body:
      'The generating stations at the base of the falls outlived their purpose. The Ontario Power Company station stopped generating and remained: monumental, unused, and standing at the foot of the thing everyone came to see. Project: Waterfall is the proposal for what it becomes next. Nothing about it is leased, bought or approved.',
  },
];

// The economic argument. Every figure used here is sourced in SOURCES below;
// anything we cannot cite stays off the page.
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
      'Brock University enrolled 19,075 students in 2025–26, in a region of 477,941 people. Delta 1 exists so that a founder educated here has a reason to build here. Brock, Niagara Innovation Hub and Velocity have backed the founders and support Diaphora Labs; none of them has committed capital or space, and none is described here as having done so.',
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

// Every figure that appears above, and the primary source it came from. A
// government or institutional reader should be able to check any claim on this
// page without writing to ask where it came from.
const SOURCES = [
  {
    fact: 'Welland Canal traffic, 2024',
    cite: 'St. Lawrence Seaway Management Corporation, Traffic Report 2024, Table W5',
    href: 'https://greatlakes-seaway.com/wp-content/uploads/2025/04/traffic_report_2024_en.pdf',
  },
  {
    fact: 'Canal length, locks and lift',
    cite: 'St. Lawrence Seaway Management Corporation, The Welland Canal Section',
    href: 'https://greatlakes-seaway.com/wp-content/uploads/2019/10/welland.pdf',
  },
  {
    fact: 'Cross-border trade per day, 2024',
    cite: 'Global Affairs Canada, Canada–United States relations',
    href: 'https://www.international.gc.ca/country-pays/us-eu/relations.aspx?lang=eng',
  },
  {
    fact: 'Visitors, tourism spending and employment',
    cite: 'Niagara Economic Development, Tourism',
    href: 'https://niagaracanada.com/key-sectors/tourism/',
  },
  {
    fact: 'Regional population, 2021',
    cite: 'Statistics Canada, 2021 Census of Population, Niagara Regional Municipality',
    href: 'https://www12.statcan.gc.ca/census-recensement/2021/dp-pd/prof/details/page.cfm?Lang=E&SearchText=Niagara&DGUIDlist=2021A00033526&GENDERlist=1%2C2%2C3&STATISTIClist=1&HEADERlist=0',
  },
  {
    fact: 'Brock University enrolment, 2025–26',
    cite: 'Brock University, Institutional Planning, Analysis & Performance',
    href: 'https://brocku.ca/institutional-analysis/institutional-reporting/headcount-and-course-enrolment-reports/',
  },
  {
    fact: 'Power reaching Buffalo, 1896',
    cite: 'IEEE, Milestones: Adams Hydroelectric Generating Plant',
    href: 'https://ethw.org/Milestones:Adams_Hydroelectric_Generating_Plant,_1895',
  },
  {
    fact: 'The Underground Railroad crossing',
    cite: 'US National Park Service, The Niagara River: Between Slavery and Freedom',
    href: 'https://www.nps.gov/articles/the-niagara-river-between-slavery-and-freedom.htm',
  },
];

export default function Niagara() {
  return (
    <main>
      <PageHead
        ord="01"
        title="Niagara"
        standfirst="Every incubator has to explain its address. This one is the whole argument: the only marine route between the upper and lower Great Lakes, a border that runs down the middle of the water, the spot where the question of whether power could travel was settled, and a site the world already visits without being asked."
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
        <div className={prose.block}>
          <h2>Where these figures come from</h2>
          <p className="measure">
            Every number on this page is cited below, and every citation is a primary
            source. Nothing here is an estimate. The station&rsquo;s condition and the
            cost to occupy it are still unknown, which is why no figure for either
            appears on this page or on{' '}
            <Link href="/waterfall">Project: Waterfall</Link>.
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
