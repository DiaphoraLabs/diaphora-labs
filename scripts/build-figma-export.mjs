// Builds figma-export/figma-export.svg from the live design system.
// Everything here is READ from source — tokens from globals.css, the punch
// alphabet from lib/marks.js — so the export cannot drift from the site.
// Re-run with:  node scripts/build-figma-export.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const css = readFileSync('app/globals.css', 'utf8');
const marksSrc = readFileSync('lib/marks.js', 'utf8');

/* ---- tokens ------------------------------------------------------------ */
const T = {};
for (const m of css.matchAll(/^\s*--([\w-]+):\s*([^;]+);/gm)) T[m[1]] = m[2].trim();

const COLOR_ROLES = [
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

/* ---- the punch alphabet ------------------------------------------------ */
const MARKS = [];
for (const block of marksSrc.split('\n  {').slice(1)) {
  const id = /id: '([^']+)'/.exec(block);
  const name = /name: '([^']+)'/.exec(block);
  const d = /d: '([^']+)'/.exec(block);
  const nudge = /nudge: \[([-\d.]+), ([-\d.]+)\]/.exec(block);
  const binds = /bindsAll: (\w+)/.exec(block);
  const facets = /facets: \[([^\]]*)\]/.exec(block);
  if (!id || !d) continue;
  MARKS.push({
    id: id[1],
    name: name[1],
    d: d[1],
    nudge: nudge ? [+nudge[1], +nudge[2]] : [0, 0],
    bindsAll: binds?.[1] === 'true',
    facets: facets ? facets[1].split(',').map((s) => s.trim().replace(/'/g, '')).filter(Boolean) : [],
  });
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const PLAQUE_FACE = 'Archivo';
const MONO = 'Martian Mono';
const TEXT = 'Source Serif 4';

/* One punch, drawn exactly as Mark.js draws it: shadow, light catch, face. */
function punch(m, { size = 48, x = 0, y = 0, struck = true, key = '' } = {}) {
  const s = size / 24;
  const face = struck ? (m.bindsAll ? T.current : T['bronze-bright']) : T['bone-faint'];
  const [nx, ny] = m.nudge;
  const uid = `${key || 'm'}-${m.id}`;
  const P = (cls, stroke, dy) =>
    `<path id="${uid}-${cls}" d="${m.d}" fill="none" stroke="${stroke}" stroke-width="1.55" ` +
    `stroke-linecap="round" stroke-linejoin="round" transform="translate(0 ${dy})"/>`;
  return `<g id="${key ? key + ' · ' : ''}${esc(m.name)}" transform="translate(${x} ${y}) scale(${s})">
      <g transform="translate(${nx} ${ny})">
        ${P('shade', 'rgba(0,0,0,0.78)', 0.62)}
        ${P('light', 'rgba(236,231,217,0.20)', -0.42)}
        ${P('face', face, 0)}
      </g>
    </g>`;
}

function label(text, x, y, { size = 11, fill = T.bronze, family = MONO, ls = 1.6, weight = 400 } = {}) {
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" ` +
    `letter-spacing="${ls}" fill="${fill}">${esc(text)}</text>`;
}

const W = 1720;
const parts = [];
let y = 0;

/* ---- 00 · cover -------------------------------------------------------- */
y = 96;
parts.push(`<g id="00 · Cover">
  <text x="80" y="${y}" font-family="${PLAQUE_FACE}" font-size="72" font-weight="900" letter-spacing="-1" fill="${T.bone}">DIAPHORA LABS</text>
  ${label('HALLMARK — DESIGN SYSTEM EXPORT', 80, y + 40, { size: 13, ls: 3 })}
  ${label('GENERATED FROM SOURCE · app/globals.css + lib/marks.js', 80, y + 66, { size: 11, fill: T['bone-dim'], ls: 2 })}
</g>`);

/* ---- 01 · colour ------------------------------------------------------- */
y += 150;
const sw = [];
COLOR_ROLES.forEach(([tok, role], i) => {
  const col = i % 4, row = Math.floor(i / 4);
  const x = 80 + col * 400, ty = y + row * 132;
  const val = T[tok] || '#000000';
  sw.push(`<g id="${tok}">
    <rect x="${x}" y="${ty}" width="72" height="72" fill="${val}" stroke="${T['patina-edge']}"/>
    ${label(tok.toUpperCase(), x + 92, ty + 26, { size: 12, ls: 1.8 })}
    ${label(val.toUpperCase(), x + 92, ty + 46, { size: 12, fill: T.bone, ls: 1.8 })}
    ${label(role, x + 92, ty + 66, { size: 10, fill: T['bone-dim'], ls: 0.8 })}
  </g>`);
});
parts.push(`<g id="01 · Colour tokens">
  ${label('01 · COLOUR', 80, y - 24, { size: 13, ls: 3 })}
  ${sw.join('\n  ')}
</g>`);

/* ---- 02 · type --------------------------------------------------------- */
y += 4 * 132 + 40;
parts.push(`<g id="02 · Type">
  ${label('02 · TYPE', 80, y - 24, { size: 13, ls: 3 })}
  <g id="Plaque display — Archivo 900">
    <text x="80" y="${y + 60}" font-family="${PLAQUE_FACE}" font-size="64" font-weight="900" letter-spacing="-0.6" fill="${T.bone}">TAKE YOUR MARK</text>
    ${label('ARCHIVO · 900 · WDTH 125% · UPPERCASE · LH 0.88–0.94', 80, y + 84, { size: 10, ls: 1.4 })}
  </g>
  <g id="Assay line — Martian Mono">
    <text x="80" y="${y + 140}" font-family="${MONO}" font-size="14" letter-spacing="2" fill="${T.bronze}">NIAGARA FALLS · 43°04′N 79°04′W</text>
    ${label('MARTIAN MONO · UPPERCASE · TRACKING 0.06–0.2EM · TNUM ON', 80, y + 164, { size: 10, ls: 1.4 })}
  </g>
  <g id="Reading — Source Serif 4">
    <text x="80" y="${y + 220}" font-family="${TEXT}" font-size="24" fill="${T['bone-dim']}">An incubator that marks, not one that ranks.</text>
    ${label('SOURCE SERIF 4 · REGULAR + ITALIC · MEASURE CAPPED AT 68CH', 80, y + 244, { size: 10, ls: 1.4 })}
  </g>
</g>`);

/* ---- 03 · the punch alphabet ------------------------------------------- */
y += 300;
const cells = MARKS.map((m, i) => {
  const col = i % 5, row = Math.floor(i / 5);
  const x = 80 + col * 320, ty = y + row * 150;
  return `<g id="Mark · ${esc(m.name)}">
    <rect x="${x}" y="${ty}" width="288" height="118" fill="none" stroke="${T.rule || 'rgba(236,231,217,0.14)'}"/>
    ${punch(m, { size: 52, x: x + 24, y: ty + 24, key: 'Alphabet' })}
    ${label(m.name.toUpperCase(), x + 96, ty + 46, { size: 12, fill: m.bindsAll ? T.current : T.bone, ls: 1.6 })}
    ${label(m.bindsAll ? 'BINDS EVERY AUDIENCE' : m.facets.slice(0, 2).join(' · ').toUpperCase() || '—',
      x + 96, ty + 68, { size: 9, fill: T['bone-dim'], ls: 1 })}
    ${label(m.id, x + 96, ty + 88, { size: 9, fill: T['bone-faint'], ls: 1 })}
  </g>`;
}).join('\n  ');
parts.push(`<g id="03 · Punch alphabet">
  ${label(`03 · THE PUNCH ALPHABET — ${MARKS.length} MARKS`, 80, y - 24, { size: 13, ls: 3 })}
  ${cells}
</g>`);

/* ---- 04 · the plaque --------------------------------------------------- */
y += Math.ceil(MARKS.length / 5) * 150 + 60;
const binding = MARKS.filter((m) => m.bindsAll);
parts.push(`<g id="04 · Plaque">
  ${label('04 · THE PLAQUE — CAST TABLET', 80, y - 24, { size: 13, ls: 3 })}
  <g id="Plaque">
    <rect x="80" y="${y}" width="720" height="300" fill="url(#plaqueBody)" stroke="${T['patina-edge']}" filter="url(#castShadow)"/>
    <path d="M80 ${y + 300} L80 ${y} L800 ${y}" fill="none" stroke="rgba(236,231,217,0.16)" stroke-width="2"/>
    <path d="M800 ${y} L800 ${y + 300} L80 ${y + 300}" fill="none" stroke="rgba(0,0,0,0.62)" stroke-width="2"/>
    <g id="Bolts">
      ${[[97, y + 17], [783, y + 17], [97, y + 283], [783, y + 283]]
        .map(([bx, by], i) => `<circle id="bolt-${i + 1}" cx="${bx}" cy="${by}" r="3.5" fill="url(#boltHead)" stroke="rgba(0,0,0,0.55)"/>`)
        .join('\n      ')}
    </g>
    <text id="Name" x="128" y="${y + 108}" font-family="${PLAQUE_FACE}" font-size="76" font-weight="900" letter-spacing="-1" fill="${T.bone}">DIAPHORA</text>
    <text x="128" y="${y + 180}" font-family="${PLAQUE_FACE}" font-size="76" font-weight="900" letter-spacing="-1" fill="${T.bone}">LABS</text>
    <g id="Struck line">
      ${binding.map((m, i) => punch(m, { size: 28, x: 128 + i * 44, y: y + 202, key: 'Plaque' })).join('\n      ')}
    </g>
    <line x1="128" y1="${y + 246}" x2="752" y2="${y + 246}" stroke="rgba(236,231,217,0.14)"/>
    ${label('NIAGARA FALLS · 43°04′N 79°04′W', 128, y + 268, { size: 11, ls: 1.8 })}
    ${label('DELTA 0 · DELTA 1 · DELTA 2', 128, y + 286, { size: 11, ls: 1.8 })}
  </g>
  <g id="Plaque — anatomy notes">
    ${label('MAKER — MARKS — WHERE AND WHEN', 840, y + 40, { size: 11, ls: 2 })}
    ${label('A hallmark reads in a fixed order and so does this.', 840, y + 62, { size: 12, fill: T['bone-dim'], family: TEXT, ls: 0 })}
    ${label('BEVEL  inset top +16% bone · bottom −62% black', 840, y + 100, { size: 10, fill: T['bone-dim'], ls: 0.6 })}
    ${label('SHADOW  three ranges: 2/3 · 12/22 · 30/60', 840, y + 122, { size: 10, fill: T['bone-dim'], ls: 0.6 })}
    ${label('GRAIN  112° repeating, 1.4% bone / 1.6% black', 840, y + 144, { size: 10, fill: T['bone-dim'], ls: 0.6 })}
    ${label('CORNERS  square. no radii anywhere in this system', 840, y + 166, { size: 10, fill: T['bone-dim'], ls: 0.6 })}
  </g>
</g>`);

/* ---- 05 · the die ------------------------------------------------------ */
y += 360;
const DIE = 240, dx = 80, dy = y;
const triangle = 'M5 19 L12 5 L19 19 L5 19';
const step = 'M7 19 L7 12 L17 12 L17 5';
const dieMark = (d, ox, id) => `<g id="${id}"><path d="${d}" fill="none" stroke="${T['bronze-bright']}" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round" transform="translate(${ox} ${dy + 96}) scale(2)"/></g>`;
parts.push(`<g id="05 · Die — cut block">
  ${label('05 · THE DIE — CUT BLOCK', 80, y - 24, { size: 13, ls: 3 })}
  <g id="Die">
    <rect x="${dx}" y="${dy}" width="${DIE}" height="${DIE}" fill="url(#dieFace)"/>
    <rect x="${dx}" y="${dy}" width="${DIE}" height="${DIE}" fill="url(#dieSheen)"/>
    <path d="M${dx} ${dy + DIE} L${dx} ${dy} L${dx + DIE} ${dy}" fill="none" stroke="rgba(236,231,217,0.17)" stroke-width="2"/>
    <path d="M${dx + DIE} ${dy} L${dx + DIE} ${dy + DIE} L${dx} ${dy + DIE}" fill="none" stroke="rgba(0,0,0,0.55)" stroke-width="2"/>
    <rect x="${dx}" y="${dy}" width="${DIE}" height="${DIE}" fill="none" stroke="${T['patina-edge']}"/>
    <rect x="${dx + 28}" y="${dy + 28}" width="${DIE - 56}" height="${DIE - 56}" fill="none" stroke="rgba(236,231,217,0.12)" stroke-dasharray="3 8"/>
    <rect x="${dx + 66}" y="${dy + 66}" width="${DIE - 132}" height="${DIE - 132}" fill="none" stroke="rgba(184,137,74,0.35)"/>
    ${dieMark(triangle, dx + 96, 'Mark state A — delta')}
  </g>
  <g id="Die — loading states">
    ${label('CHANGE IS COMING — 3.2S LOOP', dx + 300, dy + 32, { size: 11, ls: 2 })}
    ${label('THREE LINES. THE TRIANGLE UNFOLDS INTO ONE STEP.', dx + 300, dy + 54, { size: 10, fill: T['bone-dim'], ls: 1 })}
    <g transform="translate(${dx + 300} ${dy - 20})">${dieMark(triangle, 0, 'State A · delta')}</g>
    <g transform="translate(${dx + 400} ${dy - 20})">${dieMark(step, 0, 'State B · step')}</g>
    ${label('A · DELTA', dx + 300, dy + 190, { size: 10, ls: 1.4 })}
    ${label('B · STEP', dx + 400, dy + 190, { size: 10, ls: 1.4 })}
  </g>
</g>`);

/* ---- 06 · doors and actions -------------------------------------------- */
y += 320;
const door = (id, ord, act, body, meta, live, x) => `<g id="${id}">
  <rect x="${x}" y="${y}" width="500" height="260" fill="${T['patina-deep']}" stroke="rgba(236,231,217,0.14)"/>
  ${label(ord, x + 40, y + 52, { size: 12, ls: 2.6 })}
  <text x="${x + 40}" y="${y + 116}" font-family="${PLAQUE_FACE}" font-size="44" font-weight="900" fill="${live ? T.current : T.bone}">${esc(act)}</text>
  <text x="${x + 40}" y="${y + 156}" font-family="${TEXT}" font-size="15" fill="${T['bone-dim']}">${esc(body)}</text>
  ${label(meta, x + 40, y + 222, { size: 11, ls: 1.8 })}
</g>`;
const button = (id, x, fill, stroke, txt, txtFill) => `<g id="${id}">
  <rect x="${x}" y="${y + 300}" width="230" height="46" fill="${fill}" stroke="${stroke}"/>
  <text x="${x + 20}" y="${y + 329}" font-family="${PLAQUE_FACE}" font-size="13" font-weight="800" letter-spacing="1" fill="${txtFill}">${esc(txt)}</text>
</g>`;
parts.push(`<g id="06 · Doors and actions">
  ${label('06 · DOORS AND ACTIONS', 80, y - 24, { size: 13, ls: 3 })}
  ${door('Door · Delta 0 (live)', 'DELTA 0', 'ON YOUR MARK', 'Start here. Open source, self-service, global.', 'START HERE · OPEN · NO GATE', true, 80)}
  ${door('Door · Delta 1', 'DELTA 1', 'MAKE YOUR MARK', 'The one you cannot give yourself.', 'SELECTIVE · IN PERSON · TRL ASSESSED', false, 620)}
  ${button('Button · Current (self-service strike)', 80, T.current, T.current, 'JOIN THE DISCORD', T['patina-deep'])}
  ${button('Button · Bone (submit)', 340, T.bone, T.bone, 'JOIN THE WAITLIST', T['patina-deep'])}
  ${button('Button · Hover (bronze)', 600, T['bronze-bright'], T['bronze-bright'], 'HOVER STATE', T['patina-deep'])}
  ${button('Button · Disabled', 860, 'none', 'rgba(236,231,217,0.28)', 'DISABLED', T['bone-faint'])}
</g>`);

/* ---- 07 · register row ------------------------------------------------- */
y += 400;
const rows = [
  ['ONE YOU TAKE', 'Delta 0 is open, self-service and global.'],
  ['ONE YOU ARE GRANTED', 'Delta 1 is in person, and cannot be self-struck.'],
  ['NOT YET CUT', 'Delta 2 is a blank die. No date.'],
];
parts.push(`<g id="07 · Register">
  ${label('07 · REGISTER — RULED ROWS, NEVER CARDS', 80, y - 24, { size: 13, ls: 3 })}
  <line x1="80" y1="${y}" x2="1200" y2="${y}" stroke="rgba(236,231,217,0.14)"/>
  ${rows.map(([k, v], i) => `<g id="Register row ${i + 1}">
    ${label(k, 100, y + 42 + i * 68, { size: 11, ls: 1.8 })}
    <text x="420" y="${y + 42 + i * 68}" font-family="${TEXT}" font-size="16" fill="${T['bone-dim']}">${esc(v)}</text>
    <line x1="80" y1="${y + 68 + i * 68}" x2="1200" y2="${y + 68 + i * 68}" stroke="rgba(236,231,217,0.14)"/>
  </g>`).join('\n  ')}
</g>`);

const H = y + 300;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none">
  <title>Diaphora Labs — Hallmark design system</title>
  <defs>
    <linearGradient id="plaqueBody" x1="0" y1="0" x2="0.55" y2="1">
      <stop offset="0%" stop-color="${T['patina-raised']}"/>
      <stop offset="58%" stop-color="${T.patina}"/>
      <stop offset="100%" stop-color="${T['patina-deep']}"/>
    </linearGradient>
    <radialGradient id="boltHead" cx="32%" cy="26%">
      <stop offset="0%" stop-color="#f0cf9a"/>
      <stop offset="24%" stop-color="${T['bronze-bright']}"/>
      <stop offset="58%" stop-color="${T.bronze}"/>
      <stop offset="100%" stop-color="${T['bronze-dim']}"/>
    </radialGradient>
    <radialGradient id="dieFace" cx="38%" cy="30%">
      <stop offset="0%" stop-color="#245746"/>
      <stop offset="55%" stop-color="#16382f"/>
      <stop offset="100%" stop-color="#0b1815"/>
    </radialGradient>
    <linearGradient id="dieSheen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ece7d9" stop-opacity="0.10"/>
      <stop offset="45%" stop-color="#ece7d9" stop-opacity="0.02"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.22"/>
    </linearGradient>
    <filter id="castShadow" x="-20%" y="-20%" width="140%" height="160%">
      <feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#000000" flood-opacity="0.8"/>
    </filter>
  </defs>
  <rect id="Ground" x="0" y="0" width="${W}" height="${H}" fill="${T['patina-deep']}"/>
${parts.join('\n')}
</svg>
`;

writeFileSync('figma-export/figma-export.svg', svg);
console.log(`figma-export/figma-export.svg  ${(svg.length / 1024).toFixed(1)} KB  ·  ${MARKS.length} marks  ·  ${Object.keys(T).length} tokens`);
