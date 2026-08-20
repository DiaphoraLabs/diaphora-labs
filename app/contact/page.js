import Link from 'next/link';
import PageHead from '../../components/PageHead';
import AddressPlate from '../../components/AddressPlate';
import styles from './contact.module.css';
import prose from '../prose.module.css';

export const metadata = {
  title: 'Contact — Diaphora Labs',
  description:
    'One address for Diaphora Labs: innovate@diaphoralabs.com. Most doors open without writing to us at all.',
};

const ADDRESS = 'innovate@diaphoralabs.com';

// A register, not a contact form. Each row says who you are, what actually
// happens, and where that happens — which for most people is not the inbox.
const ROUTES = [
  {
    who: 'Founders, today',
    what:
      'Delta 0 is open, self-service and global. There is no application, no cohort and no permission to ask for. Nothing here needs our answer first.',
    href: '/delta-0',
    action: 'Take your mark',
  },
  {
    who: 'Founders, Delta 1',
    what:
      'In person, in Niagara Falls, and biased toward teams already running an MVP. Research teams are read on TRL. The waitlist reaches us faster than a letter does.',
    href: '/delta-1',
    action: 'Delta 1',
  },
  {
    who: 'Partners and funders',
    what:
      'Delta 1 is unfunded. This is the conversation we most want to have, and the one worth writing to the address above about.',
    href: '/delta-1',
    action: 'Delta 1',
  },
  {
    who: 'Project: Waterfall',
    what:
      'Support, an objection, or an idea for what the station should become. Six lanes to sign on to, and one of them is deliberately left open.',
    href: '/waterfall',
    action: 'Project: Waterfall',
  },
  {
    who: 'Delta 2',
    what:
      'Not open, and no date. The register hears once, when the die is cut.',
    href: '/delta-2',
    action: 'Delta 2',
  },
  {
    who: 'Press, government, anything else',
    what:
      'There is no separate desk and no form to fill in. Write to the address above and it reaches us.',
    href: `mailto:${ADDRESS}`,
    action: 'Write',
    external: true,
  },
];

export default function Contact() {
  return (
    <main>
      <PageHead
        ord="06"
        title={<>Where to<br />write</>}
        standfirst="One address carries everything: applications we cannot take yet, partnerships we are actively looking for, objections to a building that does not exist. Before you use it, the register below says which of those already has a door that opens without us."
        meta={['One address', 'No form', 'Niagara Falls · Ontario']}
        plaque={false}
      />

      <section className={`page-pad ${styles.plateSection}`}>
        <div className={styles.plateCol}>
          <AddressPlate address={ADDRESS} />
        </div>
        <div className={styles.plateAside}>
          <h2 className={styles.h2}>One address, on purpose</h2>
          <p className="measure">
            A hallmark carries the maker&rsquo;s name once. Diaphora Labs is small enough
            that a routing tree would be a costume, so there is a single address and no
            contact form standing between you and it.
          </p>
          <p className="measure">
            Say which of the four you are — founder, investor, partner, or public sector —
            and what you want to happen next.
          </p>
        </div>
      </section>

      <section className={`page-pad ${styles.registerSection}`}>
        <h2 className={styles.h2}>What reaches us where</h2>
        <ul className={styles.register}>
          {ROUTES.map((r) => (
            <li key={r.who} className={styles.row}>
              <span className={`assay-line ${styles.who}`}>{r.who}</span>
              <p className={styles.what}>{r.what}</p>
              {r.external ? (
                <a href={r.href} className={styles.action} aria-label={`${r.action} — ${r.who}`}>
                  {r.action}
                </a>
              ) : (
                <Link href={r.href} className={styles.action} aria-label={`${r.action} — ${r.who}`}>
                  {r.action}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className={`page-pad ${styles.pendingSection}`}>
        <div className={`${prose.pending} ${styles.pendingBlock}`}>
          <span className={`assay-line ${prose.pendingLabel}`}>What we cannot answer yet</span>
          <p className="measure">
            Delta 1 has no published dates, cohort size, length, terms or equity, because they
            are not decided. Project: Waterfall has no lease, no purchase and no approval from
            Niagara Parks; it is a proposal being made to them. If you write and ask about any
            of it, the honest answer will be that it is still open.
          </p>
        </div>
      </section>
    </main>
  );
}
