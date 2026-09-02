// Emits the media kit as a single document, for the Drive copy.
// Read from the same source as the /press page, so the two cannot disagree.
// Usage:  node scripts/build-media-doc.mjs > out.md
import { BOILERPLATE, LOCKUPS, MONOGRAM, NOT_TRUE, USAGE, WORDMARK, wordCount } from '../lib/brand.js';
import { MARKS } from '../lib/marks.js';
import { COLOR_ROLES, TYPE_ROLES } from '../lib/palette.js';
import { readTokens } from '../lib/tokens.server.js';

const T = readTokens();
const L = [];
const p = (s = '') => L.push(s);

p('# Diaphora Labs — Media Kit');
p();
p('Generated from the running site on 2 September 2026. The live version, with every file downloadable, is at **/press**.');
p();
p('---');
p();
p('## The mark');
p();
p('A step — _|- — rising left to right, drawn as one unbroken stroke on a 24-unit grid, the same grid as the punch alphabet.');
p();
p('It is the escarpment read backwards. Lake Erie stands 99.5 metres above Lake Ontario and the falls are the step between them; turned to face the other way it is the figure a founder is trying to draw. It is also a delta — a step change, which is what the programmes are named for — and a threshold, which is what a border is.');
p();
p('It is deliberately not one of the fifteen punch marks. Those are the team’s values; this one is the institution’s.');
p();
p(`- **Geometry:** ${MONOGRAM.d} — on a ${MONOGRAM.viewBox.split(' ').slice(2).join('×')} grid`);
p(`- **Stroke weights:** ${MONOGRAM.weight.punch} beside the punch alphabet, ${MONOGRAM.weight.logo} standing alone, ${MONOGRAM.weight.icon} at icon sizes`);
p('- **Colour:** bone by default, bronze when struck, patina-deep on light grounds');
p();
p('There is no chartreuse version, and that is a rule rather than an oversight. That colour marks what is live and nothing else; an identity mark is not a control.');
p();
p('## Lockups');
p();
for (const l of LOCKUPS) {
  p(`**${l.name}** — ${l.use}`);
  p();
  p(`> ${l.spec}`);
  p();
}
p(`The wordmark is ${WORDMARK.face} at weight ${WORDMARK.weight}, width axis ${WORDMARK.stretch}, tracking ${WORDMARK.tracking}. ${WORDMARK.note}`);
p();
p('## Colour');
p();
for (const [t, role] of COLOR_ROLES) {
  p(`- **--${t}** — ${T[t]} — ${role}`);
}
p();
p('Chartreuse is the only signal ink and marks only what is live. A second highlight colour anywhere means the system has been broken. The alarm token is the one sanctioned exception and carries errors alone. The bronze-dim token is never text — it measures 2.99:1.');
p();
p('## Type');
p();
for (const t of TYPE_ROLES) {
  p(`**${t.role}** — ${t.face}`);
  p();
  p(`> ${t.setting}`);
  p();
}
p('All three are free on Google Fonts and none is distributed in this kit.');
p();
p('## Boilerplate');
p();
p('Take these as they are. Every claim is checkable, and none describes Project: Waterfall as anything but a proposal.');
p();
for (const b of BOILERPLATE) {
  p(`### ${b.label} — ${wordCount(b.text)} words`);
  p();
  p(b.text);
  p();
}
p('## Using the mark');
p();
for (const u of USAGE) {
  p(`**${u.rule}** — ${u.detail}`);
  p();
}
p('## What is not true');
p();
p('Diaphora Labs is early and unfunded, and ambition is easy to mistake for achievement. This list exists so nobody has to print a correction later.');
p();
for (const n of NOT_TRUE) p(`- ${n}`);
p();
p('## The punch alphabet');
p();
p(`Fifteen marks on one grid at one stroke weight — the team’s values, drawn. The four that bind every audience, partners included, carry chartreuse: ${MARKS.filter((m) => m.bindsAll).map((m) => m.name).join(', ')}.`);
p();
p(MARKS.map((m) => m.name).join(' · '));
p();
p('## Files');
p();
p('All assets are at **/press** on the website, free to use in coverage of Diaphora Labs without asking:');
p();
p('- diaphora-monogram-bone.svg · -bronze.svg · -patina.svg · -die.svg');
p('- diaphora-lockup-horizontal.svg · diaphora-lockup-stacked.svg');
p('- diaphora-palette.svg · diaphora-tokens.css');
p('- marks/[id].svg — the fifteen punch marks');
p();
p('No photographs of the generating station are included, because we have none we are entitled to distribute. No renderings of Project: Waterfall exist at all.');
p();
p('## Contact');
p();
p('Interviews, the Project: Waterfall proposal document, or anything not in this kit: the contact page on the website.');

process.stdout.write(L.join('\n') + '\n');
