// The Niagara–Buffalo register.
//
// One list of every programme, fund, incubator and workspace an entrepreneur
// in this region can actually walk into, on both sides of the river. Diaphora
// Labs keeps it; Diaphora Labs does not run most of it, and the register says
// so on the page. An entry here is a listing, not an endorsement, and never a
// claim that the organisation is a partner, supporter or funder of ours.
//
// Rules for adding an entry:
//   1. It must be open to entrepreneurs in Niagara or Buffalo right now.
//   2. `href` is the organisation's own site — that page is the citation.
//   3. Figures are quoted only where the organisation publishes them, and are
//      attributed in the entry text rather than asserted as ours.
//   4. `checked` is the date a human last opened the link and confirmed the
//      entry still describes what is on it. Stale entries are worse than
//      absent ones; the page prints this date so the reader can judge.

export const CHECKED = '2026-09-02';

// The side of the river. The whole point of the register is that the
// ecosystem does not stop at the water, and that the crossing costs something.
export const SIDES = [
  { id: 'on', label: 'Ontario', note: 'Canada' },
  { id: 'ny', label: 'New York', note: 'United States' },
];

// What you came for. A founder does not think in institution types; they
// think in what they are short of this month.
export const NEEDS = [
  { id: 'capital', label: 'Money', note: 'Loans, grants, seed cheques, prize capital.' },
  { id: 'space', label: 'Space', note: 'Desks, labs, makerspace, wet bench.' },
  { id: 'mentorship', label: 'Advice', note: 'Advisors, EIRs, structured programmes.' },
  { id: 'students', label: 'Students', note: 'Open to people still in school.' },
  { id: 'research', label: 'Applied research', note: 'Prototyping and testing with an institution.' },
  { id: 'community', label: 'Community', note: 'Events, networks, somewhere to turn up.' },
];

export const ENTRIES = [
  // --- Ontario -----------------------------------------------------------
  {
    id: 'innovate-niagara',
    name: 'Innovate Niagara',
    side: 'on',
    where: 'St. Catharines · region-wide',
    href: 'https://www.innovateniagara.com/',
    what: 'The province-designated Regional Innovation Centre for Niagara, and the front door most Ontario-side founders are pointed at first.',
    offer:
      'Free business advisory, entrepreneurial training, industry and academic introductions, and residency in a network of incubation facilities. Runs the Eureka! programme for early-stage startups and an Interactive Digital Media incubator for digital media companies.',
    needs: ['mentorship', 'community', 'space'],
    open: 'Open intake',
  },
  {
    id: 'nf-innovation-hub',
    name: 'Niagara Falls Innovation Hub',
    side: 'on',
    where: '4551 Zimmerman Ave, Niagara Falls',
    href: 'https://nfinnovationhub.ca/',
    what: 'Niagara Falls’ own workspace and community, formerly Spark Niagara. The nearest working room to the site of Project: Waterfall.',
    offer:
      'Coworking with a makerspace — 3D printers, workbenches, VR and CNC — a podcast studio, kitchen and gated parking, plus events and mentoring. The Hub publishes memberships starting at $60 + HST.',
    needs: ['space', 'community', 'mentorship'],
    open: 'Membership',
    supporter: true,
  },
  {
    id: 'brock-linc',
    name: 'Brock LINC and BioLinc',
    side: 'on',
    where: 'Brock University, St. Catharines',
    href: 'https://brocku.ca/linc/',
    what: 'Brock’s entrepreneurship and commercialisation building, with a bioscience incubator inside it.',
    offer:
      'Support for research commercialisation, industry partnerships and student ventures, with prototyping equipment and lab space. BioLinc, run by the Goodman School of Business, incubates health, bioscience and biomanufacturing companies and sits in Innovate Niagara’s network.',
    needs: ['students', 'research', 'space', 'mentorship'],
    open: 'Open intake',
    supporter: true,
  },
  {
    id: 'niagara-college-ri',
    name: 'Niagara College Research & Innovation',
    side: 'on',
    where: 'Welland and Niagara-on-the-Lake campuses',
    href: 'https://www.ncinnovation.ca/',
    what: 'Applied research done with companies rather than for a journal — the route for a small business that needs a prototype built and tested.',
    offer:
      'Four innovation centres — business and commercialisation, food and beverage, horticultural and environmental sciences, and advanced manufacturing. Projects are staffed by students and graduates working alongside faculty researchers, with funding support from federal and provincial agencies.',
    needs: ['research', 'students'],
    open: 'By project',
  },
  {
    id: 'venture-niagara',
    name: 'Venture Niagara',
    side: 'on',
    where: 'Thorold · serves seven municipalities',
    href: 'https://www.ventureniagara.com/',
    what: 'The Community Futures Development Corporation for the area — patient debt for businesses a bank has said no to.',
    offer:
      'Term loans and operating lines to small and medium enterprises, up to $250,000 by the organisation’s own published limit, plus management counselling. Serves Grimsby, Lincoln, Niagara-on-the-Lake, Pelham, St. Catharines, Thorold and Welland.',
    needs: ['capital', 'mentorship'],
    open: 'Rolling',
  },
  {
    id: 'sbec',
    name: 'Small Business Enterprise Centres',
    side: 'on',
    where: 'Niagara Falls, St. Catharines and other municipalities',
    href: 'https://www.ontario.ca/page/small-business-enterprise-centre-locations',
    what: 'The municipal front counter. Unglamorous, free, and the fastest route to a first grant if you are early or young.',
    offer:
      'One-to-one advisory, plus two provincially funded programmes: Starter Company Plus, for owners 18 and over starting or expanding a business, which the centres describe as competing for a micro-grant of up to $5,000; and Summer Company, for students aged 15 to 29 returning to school, offering mentoring and up to $3,000.',
    needs: ['capital', 'mentorship', 'students'],
    open: 'Programme intakes',
  },

  // --- New York ----------------------------------------------------------
  {
    id: '43north',
    name: '43North',
    side: 'ny',
    where: 'Buffalo',
    href: 'https://43north.org/',
    what: 'The best-known cheque in Western New York: an annual competition that pays companies to be in Buffalo.',
    offer:
      'Five companies each receive a $1 million investment, with office space, mentorship and network access. Across twelve competitions since 2014, 43North reports investing $55 million in 79 companies. The twelfth and final competition — “The Final Finals” — is on 8 October 2026 at Shea’s Performing Arts Center; 2026 is the last year of New York State funding, and the accelerator concludes at the end of 2027 once the final cohort finishes its programming.',
    needs: ['capital', 'mentorship', 'space'],
    open: 'Final competition, 8 Oct 2026',
    note: 'The last cycle. We could not confirm whether applications remain open, and on the previous years’ calendar the finalists are chosen shortly before the finals — assume it is closed and check 43north.org before planning around it. The successor is Radial Ventures, listed below.',
  },
  {
    id: 'radial-ventures',
    name: 'Radial Ventures and the 43North Foundation',
    side: 'ny',
    where: 'Buffalo',
    href: 'https://43north.org/home/final-pitch/',
    what: 'What replaces the competition. A venture studio builds companies rather than funding ones you arrived with, so it is a different door from the one 43North has been — and it is the one that stays open after 2027.',
    offer:
      'The 43North Foundation describes a $100 million commitment across 2025–2035 in four parts: Radial Ventures, an AI-led venture studio creating and transforming startups; TechBuffalo, a nonprofit for tech talent development; Series B, storytelling to attract founders, investors and partners; and an Ambassador Network for corporate connectivity.',
    needs: ['capital', 'mentorship', 'community'],
    open: 'Forming',
    note: 'Announced rather than established. Terms of entry were not published as of the date this register was checked.',
  },
  {
    id: 'launch-ny',
    name: 'Launch NY',
    side: 'ny',
    where: 'Headquartered in Buffalo · 27 upstate counties',
    href: 'https://launchny.org/',
    what: 'A nonprofit venture development organisation, and the mentorship most Buffalo founders name first.',
    offer:
      'Free, confidential mentorship from Entrepreneurs-in-Residence — operators and investors rather than generalist coaches — plus a seed fund. Launch NY describes itself as the only US Treasury-designated Community Development Financial Institution directly funding businesses in New York State.',
    needs: ['mentorship', 'capital'],
    open: 'Rolling',
  },
  {
    id: 'win',
    name: 'WNY Incubator Network',
    side: 'ny',
    where: 'Erie, Niagara, Chautauqua, Cattaraugus and Allegany counties',
    href: 'https://www.wnyincubators.com/',
    what: 'Not one incubator but the index of them — the New York-side equivalent of this page, and the place to start if you do not know which door is yours.',
    offer:
      'A collaborative network of business incubators across five counties, managed by University at Buffalo Business & Entrepreneur Partnerships, listing the region’s incubation space and the programmes attached to it.',
    needs: ['space', 'community', 'mentorship'],
    open: 'Directory',
  },
  {
    id: 'ub-colab',
    name: 'UB Startup & Innovation CoLab',
    side: 'ny',
    where: 'Student Union, UB North Campus, Amherst',
    href: 'https://www.buffalo.edu/entrepreneurship.html',
    what: 'University at Buffalo’s student-facing entrepreneurship hub, powered by Blackstone LaunchPad.',
    offer:
      'Open to UB students at any stage, free and without taking equity: ideation workshops, a pitch series, venture coaching, master classes and competitions, with access to the Blackstone LaunchPad national network.',
    needs: ['students', 'mentorship', 'community'],
    open: 'Open to UB students',
  },
  {
    id: 'bnmc-innovation-center',
    name: 'Thomas R. Beecher, Jr. Innovation Center',
    side: 'ny',
    where: '640 Ellicott Street, Buffalo Niagara Medical Campus',
    href: 'https://www.wnyincubators.com/innovation-center',
    what: 'Wet bench on the medical campus — the answer for a life sciences company that cannot work out of a desk.',
    offer:
      'A LEED-certified research and development building housing life sciences and biotech companies, with office, wet lab and research space for small to medium companies, adjacent to the hospitals and research institutes of the medical campus.',
    needs: ['space', 'research'],
    open: 'Tenancy',
  },
];

// Our own two doors, kept deliberately separate from the register above so
// that nobody has to wonder whether the list was assembled to flatter us.
export const OURS = [
  {
    id: 'delta-0',
    name: 'Delta 0',
    href: '/delta-0',
    what: 'Open to anyone on earth, free and self-service. No application, no cohort, no geography — including no requirement to be in Niagara at all.',
  },
  {
    id: 'delta-1',
    name: 'Delta 1',
    href: '/delta-1',
    what: 'In person, in Niagara Falls, and selective — biased toward founders already operating with an MVP. Currently unfunded, and looking for partners and funders.',
  },
];

// The compressed case for the address. The long version of this argument used
// to be the whole page; it is now the reason the register is worth keeping.
// Every figure is cited in SOURCES.
export const GROUND = [
  {
    head: 'The border runs through the water',
    body:
      'The international boundary follows the centre of the river and passes through the falls themselves. Nearly $3.6 billion in goods and services crossed the Canada–US border every day in 2024, and three international bridges cross within the region. A company started here is not near a border; it is on one, with two legal systems and two currencies as operating conditions from the first day.',
  },
  {
    head: 'The current went out from here',
    body:
      'On 16 November 1896, power generated at the falls reached Buffalo — twenty-two miles, stepped up to 11,000 volts. The argument over whether electricity could travel at all was settled between these two cities. They have been one working region far longer than either has had a startup programme.',
  },
  {
    head: 'The support is real, and it is scattered',
    body:
      'Both sides carry decades of institutional support: a Regional Innovation Centre, two universities and a college, a CDFI, municipal enterprise centres, a five-county incubator network. What neither side has is one list. A founder in St. Catharines can name three Ontario programmes and no Buffalo ones, and a founder in Buffalo can do the reverse. That gap is what this page is for.',
  },
];

export const SOURCES = [
  {
    fact: 'Cross-border trade per day, 2024',
    cite: 'Global Affairs Canada, Canada–United States relations',
    href: 'https://www.international.gc.ca/country-pays/us-eu/relations.aspx?lang=eng',
  },
  {
    fact: 'Power reaching Buffalo, 1896',
    cite: 'IEEE, Milestones: Adams Hydroelectric Generating Plant',
    href: 'https://ethw.org/Milestones:Adams_Hydroelectric_Generating_Plant,_1895',
  },
  {
    fact: '43North impact figures and 2027 conclusion',
    cite: 'Office of the Governor of New York, Highlighting More Than a Decade of Impact Through 43North',
    href: 'https://www.governor.ny.gov/news/governor-hochul-highlights-more-decade-impact-through-43north-buffalo',
  },
  {
    fact: 'The final competition, its date and its five $1M awards',
    cite: '43North, The Final Pitch',
    href: 'https://43north.org/home/final-pitch/',
  },
  {
    fact: 'End of New York State funding after 2026',
    cite: 'Spectrum News, 43North accelerator program to conclude at end of 2027 (27 May 2026)',
    href: 'https://spectrumlocalnews.com/nys/buffalo/news/2026/05/27/43north-accelerator-program-to-conclude-at-end-of-2027',
  },
  {
    fact: 'Every other figure on this page',
    cite: 'The listed organisation’s own website, linked in its entry',
    href: null,
  },
];
