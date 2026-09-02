import Link from 'next/link';
import PageHead from '../../components/PageHead';
import EcosystemRegister from '../../components/EcosystemRegister';
import { GROUND, OURS, SOURCES } from '../../lib/ecosystem';
import { BINDING } from '../../lib/marks';
import prose from '../prose.module.css';
import styles from './niagara.module.css';

export const metadata = {
  title: 'Niagara River — Diaphora Labs',
  description:
    'One register of every programme, fund, incubator and workspace open to entrepreneurs on both sides of the Niagara river — Ontario and Western New York — kept by Diaphora Labs and filterable by what you are short of.',
};

export default function Niagara() {
  return (
    <main>
      <PageHead
        ord="01"
        title="Niagara River"
        standfirst="The border runs down the middle of the river, and so does the ecosystem. Ontario has a Regional Innovation Centre, two campuses and a college, a lender and municipal enterprise centres; Western New York has a five-county incubator network, a CDFI, a university hub and the region's largest competition — and almost nobody can name both lists. This is both lists, on one page, filterable by what you are actually short of. Most of it is not ours."
        meta={['43°04′N 79°04′W', 'Ontario · New York', 'The line runs mid-river']}
        marks={BINDING}
      />

      <section className={`page-pad ${styles.registerSection}`} id="register">
        <div className={styles.registerHead}>
          <h2 className={styles.sectionHead}>The register</h2>
          <p className={`measure ${styles.sectionNote}`}>
            Everything here is open to entrepreneurs in the region right now. Each entry links
            to the organisation&rsquo;s own site, which is where its terms and figures come
            from; we quote them rather than restate them. A listing is not an endorsement and
            not a partnership. Nobody here asked to be listed, and inclusion implies no
            relationship with Diaphora Labs in either direction.
          </p>
        </div>
        <EcosystemRegister />
      </section>

      <section className={`page-pad ${styles.drop}`}>
        <h2 className={styles.sectionHead}>Why the two sides belong on one page</h2>
        <ol className={styles.courses}>
          {GROUND.map((g, i) => (
            <li key={g.head} className={styles.course}>
              <span className={styles.depth}>{String(i + 1).padStart(2, '0')}</span>
              <div className={styles.courseBody}>
                <h3 className={styles.courseHead}>{g.head}</h3>
                <p className="measure">{g.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={`page-pad ${styles.oursSection}`}>
        <h2 className={styles.sectionHead}>And our own two doors</h2>
        <p className={`measure ${styles.sectionNote}`}>
          Kept separate from the register above, so that nobody has to wonder whether the list
          was assembled to flatter us.
        </p>
        <ul className={styles.ours}>
          {OURS.map((o) => (
            <li key={o.id} className={styles.oursRow}>
              <Link href={o.href} className={`assay-line ${styles.oursKey}`}>
                {o.name}
              </Link>
              <p className={styles.oursBody}>{o.what}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={`page-pad ${prose.prose}`}>
        <div className={prose.block}>
          <h2>Missing, wrong, or out of date</h2>
          <p className="measure">
            A register is only worth the date on it. If a programme has closed, an intake has
            moved, a figure has changed, or your organisation should be listed and is not,{' '}
            <Link href="/contact">tell us</Link> and we will correct it. We would rather run a
            short list that is true than a long one that is impressive. Organisations that
            would prefer not to be listed can say so and will be removed.
          </p>
        </div>

        <div className={prose.block}>
          <h2>Where these figures come from</h2>
          <p className="measure">
            Figures attached to an organisation are that organisation&rsquo;s own published
            terms, and change without telling us. The two historical claims, and the 43North
            wind-down — which is the one thing on this page with a deadline attached — are
            cited below.
          </p>
          <ul className={prose.sources}>
            {SOURCES.map((s) => (
              <li key={s.fact} className={prose.source}>
                <span className={`assay-line ${prose.sourceFact}`}>{s.fact}</span>
                {s.href ? <a href={s.href}>{s.cite}</a> : <span>{s.cite}</span>}
              </li>
            ))}
          </ul>
        </div>

        <div className={prose.block}>
          <h2>The difference that distinguishes</h2>
          <p className="measure">
            <em>Diaphora</em> is Greek for difference — in Aristotle, the{' '}
            <em>differentia</em>, the specific difference that separates one thing from
            everything else of its kind. We took the name before we took the address, and then
            found the address was the same idea in geography: a place that exists because of a
            line, and is worth something because of which side of it you are standing on. A
            register that ignores the line is the most useful thing we can hand a founder here.
          </p>
        </div>

        <div className={prose.block}>
          <h2>Where this goes next</h2>
          <p className="measure">
            <Link href="/waterfall">Project: Waterfall</Link> is the proposal for the old
            Ontario Power Company generating station at the base of the falls, and the building
            this region&rsquo;s programming could share. Nothing about it is leased, bought or
            approved. <Link href="/delta-2">Delta 2</Link> is not open yet. If you run one of
            the programmes above and want to do something jointly across the river, the address
            is on the <Link href="/contact">contact page</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
