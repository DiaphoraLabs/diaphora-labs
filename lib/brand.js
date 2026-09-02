// The identity, as data.
//
// Single source of truth for the media kit: the monogram geometry, the
// lockups, the boilerplate, and the rules that travel with them. The press
// page, the favicon, the OG image and the downloadable kit all read from here,
// so none of them can drift from the others — the same discipline
// scripts/build-figma-export.mjs already applies to the punch alphabet.

// --- the monogram --------------------------------------------------------
//
// A step, `_|-`, rising left to right, drawn as one unbroken stroke.
//
// It is the escarpment read backwards. Lake Erie stands 99.5 metres above Lake
// Ontario and the falls are the step between them; everything on the Niagara
// page is organised around that drop. Turned to face the other way it is the
// same figure a founder is trying to draw. It is also a delta — a step change
// — which is what the programmes are named for, and a threshold, which is what
// a border is.
//
// One stroke, one grid, one weight: it belongs to the punch alphabet without
// being one of the fifteen values. Those are the team's; this is the
// institution's, and conflating them would put a sixteenth mark into a set
// that is documented everywhere as fifteen.
export const MONOGRAM = {
  // 24-unit grid, shared with lib/marks.js so the mark sits correctly beside
  // any punch. Low bar 3→12, riser 17→7, high bar 12→21: symmetric about
  // centre on both axes, so it optically centres without a nudge.
  viewBox: '0 0 24 24',
  d: 'M3 17h9V7h9',
  // Stroke weight is contextual, not fixed. The punch alphabet sits at 1.55;
  // the mark standing alone needs more body, and at favicon sizes it needs
  // enough that the riser does not disappear into a single grey pixel.
  weight: { punch: 1.55, logo: 2.4, icon: 3.2 },
};

// The die: the mark on its own ground. A hallmark is struck inside a shape —
// the shape is half of what makes it a hallmark rather than a pictogram — and
// a favicon needs its own field so it is legible on any tab colour.
// The mark is drawn in bone, not chartreuse.
//
// DESIGN.md reserves --current for what is live — the active rail tick, the
// Delta 0 door, the strike button — and says plainly that a second highlight
// colour means the system is broken. That rule was written before a logo
// existed, so it does not name this case; the disciplined reading is that an
// identity mark is not a live control and does not qualify. Bone also happens
// to be the more legible of the two at 16px on a dark tab strip.
//
// Putting the mark in chartreuse would be a deliberate amendment to DESIGN.md,
// not a styling choice. Do not make it here alone.
export const DIE = {
  // Inset from the 24-unit box, leaving the mark room to breathe inside it.
  inset: 1.4,
  // No radius. There are no rounded corners anywhere in this system.
  radius: 0,
};

export const WORDMARK = {
  text: 'DIAPHORA LABS',
  face: 'Archivo',
  weight: 900,
  stretch: '125%',
  tracking: '0.02em',
  note: 'Set in the same plaque lettering the site casts its headings in. Never set in another face, never in sentence case, never with the two words on one line in the stacked lockup.',
};

export const LOCKUPS = [
  {
    id: 'horizontal',
    name: 'Horizontal',
    use: 'The default. Site header, letterhead, email signature, slide footer.',
    spec: 'Mark at cap height of the wordmark, one cap height of space between them, baselines aligned.',
  },
  {
    id: 'stacked',
    name: 'Stacked',
    use: 'Square and near-square spaces: social avatars, the cover of a document, signage.',
    spec: 'Mark centred above the wordmark, one mark-height of space between them, DIAPHORA over LABS.',
  },
  {
    id: 'mark',
    name: 'Mark alone',
    use: 'Favicon, app icon, and anywhere the name is already present in the surrounding text.',
    spec: 'Struck inside the die. Never smaller than 16px, and at 16px use the icon stroke weight.',
  },
];

// --- what may be said ----------------------------------------------------
//
// Boilerplate at three lengths, because a journalist takes the one that fits
// the hole. Every claim here is checkable and none of it outruns what
// PRODUCT.md permits: Waterfall is a proposal, Delta 1 is unfunded, and the
// three supporters are supporters rather than funders.
export const BOILERPLATE = [
  {
    id: 'short',
    label: 'One line',
    text:
      'Diaphora Labs is a startup incubator at the base of Niagara Falls, Canada, building a cross-border programme on the line between two countries.',
  },
  {
    id: 'medium',
    label: 'Short paragraph',
    text:
      'Diaphora Labs is a startup incubator in Niagara Falls, Ontario, sited where the Canada–US border runs down the middle of the river. It runs two programmes: Delta 0, an open, free, self-service programme available to anyone in the world, and Delta 1, a selective in-person programme for founders already operating with an MVP. It also keeps a public register of every entrepreneurship programme in Niagara and Buffalo.',
  },
  {
    id: 'long',
    label: 'Full',
    text:
      'Diaphora Labs is a startup incubator in Niagara Falls, Ontario. Diaphora is Greek for the differentia — the specific difference that distinguishes one thing within its kind — and the address is the same idea in geography: the international boundary runs through the middle of the river and through the falls themselves, making two legal systems and two currencies the operating conditions from a company’s first day. It runs Delta 0, which is open, free, self-service and global, and Delta 1, a selective in-person programme for founders with an MVP, currently unfunded and seeking partners. It maintains a public register of entrepreneurship programming on both sides of the river. Project: Waterfall is its proposal to reuse the decommissioned Ontario Power Company generating station at the base of the falls; the proposal has been made to Niagara Parks and nothing about it is leased, bought or approved.',
  },
];

// The corrections list. A press kit's real job is to stop a journalist writing
// something we would have to ask them to retract.
// Counted, never declared. A hand-kept word count is wrong one edit later,
// and the length is the only reason a journalist picks one of these over
// another.
export function wordCount(text) {
  return text.trim().split(/\s+/).length;
}

export const NOT_TRUE = [
  'Diaphora Labs does not own, lease or occupy the Ontario Power Company generating station. Project: Waterfall is a proposal made to Niagara Parks, the steward of the land. No renderings exist and no approval has been given.',
  'Delta 1 is unfunded. Nobody has committed capital to it.',
  'Niagara Innovation Hub, Brock University and Velocity have backed the founders and support Diaphora Labs. None of them is an investor or funder, and none has committed capital or space.',
  'The organisations listed in the Niagara & Buffalo register are not partners, sponsors or affiliates. The register is a directory; inclusion was not requested by them and implies no relationship.',
  'There are no cohort figures, alumni, portfolio companies or funding totals, because no cohort has run. Any such number attributed to Diaphora Labs is wrong.',
  'Delta 2 has not launched and its content has not been announced.',
];

export const USAGE = [
  {
    rule: 'Clear space',
    detail: 'One mark-height on every side of the lockup. Nothing sits inside it, including a partner mark.',
  },
  {
    rule: 'Minimum size',
    detail: 'Mark alone: 16px. Horizontal lockup: 120px wide. Below that the riser closes up and the wordmark loses its width axis.',
  },
  {
    rule: 'Colour',
    detail: 'Bone on patina is the default. Bronze for a struck mark. On a light ground, patina-deep. Never chartreuse: that ink marks what is live, and an identity mark is not a control.',
  },
  {
    rule: 'Do not',
    detail: 'Do not rotate, mirror, outline, add a radius, place it on a busy photograph, recolour it outside the palette, or redraw the step at a different angle. The step rises left to right; mirrored it says the opposite thing.',
  },
  {
    rule: 'The name',
    detail: 'Diaphora Labs, both words, roman type. The programmes are Delta 0, Delta 1 and Delta 2 — never Δ0, never "Delta Zero". The initiative is Project: Waterfall, with the colon.',
  },
];

export const CONTACT = {
  line: 'Press enquiries and asset requests',
  href: '/contact',
};
