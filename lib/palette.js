// The colour roles, in one place.
//
// The hex values themselves live in app/globals.css and are read from it — a
// second copy of a hex value is a second thing to forget to update. What lives
// here is the part CSS cannot carry: what each token is *for*. The figma
// export, the media kit and the press page all read this list, so the three
// cannot disagree about what --current means.
export const COLOR_ROLES = [
  ['patina-deep', 'Page ground'],
  ['patina', 'Raised surface, hover ground'],
  ['patina-raised', 'Plaque and die highlight edge'],
  ['patina-edge', 'Cast borders'],
  ['bronze', 'Assay lines, ordinals, bolts'],
  ['bronze-bright', 'Struck mark face, subheads'],
  ['bronze-dim', 'Gradients, scrollbar — never text'],
  ['bone', 'Plaque lettering, headings'],
  ['bone-dim', 'Body text on patina'],
  ['bone-faint', 'Resting labels, placeholders'],
  ['current', 'THE ONLY SIGNAL INK'],
  ['current-dim', 'Current at rest, underlines'],
  ['alarm', 'The one sanctioned break — errors'],
];

export const TYPE_ROLES = [
  {
    role: 'Plaque / display',
    face: 'Archivo',
    setting: 'Variable, wdth axis. Uppercase, font-stretch 125%, weight 900, line-height 0.88–0.94.',
  },
  {
    role: 'Marks, data, assay lines',
    face: 'Martian Mono',
    setting: 'Uppercase, letter-spacing 0.06–0.2em, tabular numerals on.',
  },
  {
    role: 'Long-form reading',
    face: 'Source Serif 4',
    setting: 'Regular and italic, measure capped at 68ch.',
  },
];
