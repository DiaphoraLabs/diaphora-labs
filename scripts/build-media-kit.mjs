// Builds public/media/* — the downloadable half of the press kit.
//
// Like scripts/build-figma-export.mjs, everything is READ from source: the
// monogram from lib/brand.js, the punch alphabet from lib/marks.js, the colour
// values from app/globals.css and their roles from lib/palette.js. Nothing is
// typed twice, so a downloaded asset cannot disagree with the running site.
//
// Re-run with:  npm run media
import { mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { DIE, MONOGRAM, WORDMARK } from '../lib/brand.js';
import { MARKS } from '../lib/marks.js';
import { COLOR_ROLES } from '../lib/palette.js';
import { readTokens } from '../lib/tokens.server.js';

const OUT = join(process.cwd(), 'public', 'media');
rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, 'marks'), { recursive: true });

const T = readTokens();

const NS = 'xmlns="http://www.w3.org/2000/svg"';
const files = [];
function write(name, body) {
  writeFileSync(join(OUT, name), body);
  files.push(name);
}

const stroke = (color, w) =>
  `fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;

/* ---- the monogram, in each sanctioned colour --------------------------- */
// Bone is the default. Chartreuse is deliberately NOT offered: --current marks
// what is live, and an identity mark is not a control. See lib/brand.js.
const TONES = [
  ['bone', T.bone, 'Default. On the patina ground or any dark field.'],
  ['bronze', T['bronze-bright'], 'Struck. For a mark that is being presented as an object.'],
  ['patina', T['patina-deep'], 'For light grounds — white paper, a partner’s slide.'],
];

for (const [tone, color] of TONES) {
  write(
    `diaphora-monogram-${tone}.svg`,
    `<svg ${NS} viewBox="${MONOGRAM.viewBox}" width="240" height="240" role="img" aria-label="Diaphora Labs">
  <title>Diaphora Labs</title>
  <path d="${MONOGRAM.d}" ${stroke(color, MONOGRAM.weight.logo)}/>
</svg>
`
  );
}

/* ---- the die: the mark on its own ground ------------------------------- */
const i = DIE.inset;
write(
  'diaphora-monogram-die.svg',
  `<svg ${NS} viewBox="${MONOGRAM.viewBox}" width="240" height="240" role="img" aria-label="Diaphora Labs">
  <title>Diaphora Labs</title>
  <rect x="${i}" y="${i}" width="${24 - i * 2}" height="${24 - i * 2}" fill="${T['patina-deep']}"/>
  <path d="${MONOGRAM.d}" ${stroke(T.bone, MONOGRAM.weight.icon)}/>
</svg>
`
);

/* ---- lockups -----------------------------------------------------------
   The trap here: the step is drawn inside a 24-unit box but only occupies
   18 x 10 of it. Scaling by the box makes the mark a third of the height it
   should be next to the wordmark, so the geometry is derived from the drawn
   bounding box plus its stroke, and the spec — "mark at cap height of the
   wordmark, one cap height between them" — is arithmetic rather than taste.

   The wordmark is live text, not outlines, so it stays editable and
   accessible; the recipient needs Archivo installed, which the README says. */
const DRAWN = { x: 3, y: 7, w: 18, h: 10 };           // the step's own bounds
const HALF = MONOGRAM.weight.logo / 2;                 // the stroke overhangs it
const VIS = { w: DRAWN.w + MONOGRAM.weight.logo, h: DRAWN.h + MONOGRAM.weight.logo };
const CAP = 0.72;                                      // Archivo Black cap height

const wordStyle = `font-family="${WORDMARK.face}, sans-serif" font-weight="${WORDMARK.weight}" font-stretch="${WORDMARK.stretch}" letter-spacing="${WORDMARK.tracking}" fill="${T.bone}"`;

// Places the mark so its visual top-left lands exactly on (left, top).
function markAt(left, top, scale) {
  const tx = left - (DRAWN.x - HALF) * scale;
  const ty = top - (DRAWN.y - HALF) * scale;
  return `<g transform="translate(${round(tx)} ${round(ty)}) scale(${round(scale)})">
    <path d="${MONOGRAM.d}" ${stroke(T.bone, MONOGRAM.weight.logo)}/>
  </g>`;
}
function round(n) {
  return Math.round(n * 1000) / 1000;
}

{
  // Horizontal: baselines aligned, one cap height of air between the two.
  const fs = 26;
  const cap = fs * CAP;
  const scale = cap / VIS.h;
  const left = 8;
  const baseline = 42;
  const markTop = baseline - cap;
  const textX = left + VIS.w * scale + cap;
  write(
    'diaphora-lockup-horizontal.svg',
    `<svg ${NS} viewBox="0 0 300 64" width="600" height="128" role="img" aria-label="Diaphora Labs">
  <title>Diaphora Labs</title>
  ${markAt(left, markTop, scale)}
  <text x="${round(textX)}" y="${baseline}" ${wordStyle} font-size="${fs}">${WORDMARK.text}</text>
</svg>
`
  );
}

{
  // Stacked: mark centred over the name, one mark-height of air between them.
  const fs = 34;
  const cap = fs * CAP;
  const scale = 3;
  const markW = VIS.w * scale;
  const markH = VIS.h * scale;
  const markTop = 30;
  const left = 120 - markW / 2;
  const baseline1 = markTop + markH + markH + cap;
  const baseline2 = baseline1 + fs * 1.15;
  write(
    'diaphora-lockup-stacked.svg',
    `<svg ${NS} viewBox="0 0 240 ${Math.ceil(baseline2 + fs * 0.5)}" width="480" height="${Math.ceil(baseline2 + fs * 0.5) * 2}" role="img" aria-label="Diaphora Labs">
  <title>Diaphora Labs</title>
  ${markAt(round(left), markTop, scale)}
  <text x="120" y="${round(baseline1)}" text-anchor="middle" ${wordStyle} font-size="${fs}">DIAPHORA</text>
  <text x="120" y="${round(baseline2)}" text-anchor="middle" ${wordStyle} font-size="${fs}">LABS</text>
</svg>
`
  );
}

/* ---- the punch alphabet ------------------------------------------------ */
for (const m of MARKS) {
  const [nx, ny] = m.nudge || [0, 0];
  const g = nx || ny ? `<g transform="translate(${nx} ${ny})">` : '<g>';
  write(
    `marks/${m.id}.svg`,
    `<svg ${NS} viewBox="0 0 24 24" width="96" height="96" role="img" aria-label="${m.name}">
  <title>${m.name}</title>
  ${g}<path d="${m.d}" ${stroke(T['bronze-bright'], MONOGRAM.weight.punch)}/></g>
</svg>
`
  );
}

/* ---- colour ------------------------------------------------------------ */
const SW = 150;
const swatches = COLOR_ROLES.map(([token, role], n) => {
  const y = n * 64;
  return `  <rect x="0" y="${y}" width="${SW}" height="60" fill="${T[token]}"/>
  <text x="${SW + 18}" y="${y + 26}" font-family="monospace" font-size="14" fill="${T.bone}">--${token}</text>
  <text x="${SW + 18}" y="${y + 46}" font-family="monospace" font-size="12" fill="${T['bone-dim']}">${T[token]} · ${role}</text>`;
}).join('\n');

write(
  'diaphora-palette.svg',
  `<svg ${NS} viewBox="0 0 640 ${COLOR_ROLES.length * 64}" width="640" height="${COLOR_ROLES.length * 64}">
  <rect width="640" height="${COLOR_ROLES.length * 64}" fill="${T['patina-deep']}"/>
${swatches}
</svg>
`
);

write(
  'diaphora-tokens.css',
  `/* Diaphora Labs — colour tokens. Generated from app/globals.css. */\n:root {\n` +
    COLOR_ROLES.map(([t, role]) => `  --${t}: ${T[t]}; /* ${role} */`).join('\n') +
    `\n}\n`
);

/* ---- the note that travels with the files ------------------------------ */
write(
  'README.txt',
  `DIAPHORA LABS — MEDIA ASSETS
Generated from source. Do not hand-edit: run "npm run media" instead.

THE MARK
  A step, rising left to right, drawn as one unbroken stroke. It is the
  escarpment between Lake Erie and Lake Ontario read backwards, a delta, and a
  threshold. It is not one of the fifteen punch marks — those are the team's
  values; this is the institution's.

  diaphora-monogram-bone.svg    Default, for dark grounds.
  diaphora-monogram-bronze.svg  Struck, where the mark is presented as an object.
  diaphora-monogram-patina.svg  For light grounds.
  diaphora-monogram-die.svg     On its own ground. Favicons, avatars, any
                                surface whose colour is not ours to choose.

  There is no chartreuse version, deliberately. That colour marks what is live
  and nothing else; an identity mark is not a control.

LOCKUPS
  diaphora-lockup-horizontal.svg  The default.
  diaphora-lockup-stacked.svg     Square and near-square spaces.

  Both carry live text and need Archivo installed (free, Google Fonts). Convert
  to outlines before sending to anyone who will not have it.

MARKS
  marks/*.svg — the fifteen punch marks, named by id.

COLOUR
  diaphora-palette.svg   All thirteen tokens with names, values and roles.
  diaphora-tokens.css    The same, as custom properties.

TYPE
  Archivo, Martian Mono and Source Serif 4. All three are free on Google Fonts
  and none is included here.

RULES
  Clear space is one mark-height on every side. Minimum size is 16px for the
  mark alone and 120px wide for the horizontal lockup. Do not rotate, mirror,
  outline, round the corners, recolour outside the palette, or redraw the step
  at another angle — mirrored, it says the opposite thing.

  Full guidance, boilerplate and the corrections list: /press on the website.
`
);

console.log(
  `public/media  ·  ${files.length} files  ·  ${MARKS.length} marks  ·  ${COLOR_ROLES.length} tokens`
);
