// Builds public/media/project-waterfall-proposal.pdf — the document behind the
// email gate on the Waterfall page.
//
// Read from source like every other generated asset: the proposal content from
// lib/proposal.js, the monogram from lib/brand.js, and the colours from the
// @media print palette in globals.css, which is already the right one for a
// document that will be printed and filed.
//
// pdfkit is a devDependency and the PDF is committed, so production never needs
// it at runtime.
//
// Re-run with:  npm run pdf
import { createWriteStream } from 'node:fs';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import PDFDocument from 'pdfkit';
import { MONOGRAM } from '../lib/brand.js';
import { STORY, USES, RANGES, PROVEN_MARK, SUPPORTERS, SOURCES } from '../lib/proposal.js';
import { readPrintTokens } from '../lib/tokens.server.js';

const T = readPrintTokens();
const OUT = join(process.cwd(), 'public', 'media');
mkdirSync(OUT, { recursive: true });
const FILE = join(OUT, 'project-waterfall-proposal.pdf');

const ARCHIVO = join(process.cwd(), 'assets', 'fonts', 'ArchivoBlack-Regular.ttf');
const M = 64;

const doc = new PDFDocument({
  size: 'LETTER',
  // Required for switchToPage: without it the footer loop only ever sees the
  // first page, and bufferedPageRange reports a count of 1.
  bufferPages: true,
  margins: { top: M, bottom: M, left: M, right: M },
  info: {
    Title: 'Project: Waterfall — a proposal',
    Author: 'Diaphora Labs',
    Subject:
      'A proposal to reuse the Ontario Power Company generating station at the base of Niagara Falls',
    Keywords: 'Niagara Falls, Ontario Power Company, Niagara Parks, proposal, Diaphora Labs',
  },
});
doc.pipe(createWriteStream(FILE));
doc.registerFont('display', ARCHIVO);

const W = doc.page.width - M * 2;

// The monogram, drawn from the same path the site and the favicon use.
function monogram(x, y, size, color) {
  const s = size / 24;
  doc
    .save()
    .translate(x, y)
    .scale(s)
    .moveTo(3, 17)
    .lineTo(12, 17)
    .lineTo(12, 7)
    .lineTo(21, 7)
    .lineWidth(MONOGRAM.weight.logo)
    .strokeColor(color)
    .lineCap('round')
    .lineJoin('round')
    .stroke()
    .restore();
}

function rule(y, strong = false) {
  doc
    .save()
    .moveTo(M, y)
    .lineTo(M + W, y)
    .lineWidth(strong ? 1 : 0.5)
    .strokeColor(T.bone)
    .opacity(strong ? 0.5 : 0.28)
    .stroke()
    .restore();
}

// Keeps a heading and its first rows together: a section head alone at the
// foot of a page is the classic generated-PDF tell.
function room(needed) {
  if (doc.y + needed > doc.page.height - M) doc.addPage();
}

function sectionHead(text, kicker) {
  room(120);
  doc.moveDown(1.2);
  if (kicker) {
    doc
      .font('Helvetica')
      .fontSize(8)
      .fillColor(T.bronze)
      .text(kicker.toUpperCase(), M, doc.y, { characterSpacing: 1.6 });
    doc.moveDown(0.35);
  }
  doc.font('display').fontSize(19).fillColor(T.bone).text(text, M, doc.y, { width: W });
  doc.moveDown(0.5);
  rule(doc.y, true);
  doc.moveDown(0.7);
}

// A ruled row: key on the left, prose on the right. The same register the site
// argues with, which is why the document does not read as a different project.
function row(key, head, body) {
  room(84);
  const top = doc.y;
  const keyW = 118;
  const bodyX = M + keyW + 22;
  const bodyW = W - keyW - 22;

  doc
    .font('Helvetica')
    .fontSize(8)
    .fillColor(T.bronze)
    .text(String(key).toUpperCase(), M, top + 2, { width: keyW, characterSpacing: 1.2 });

  let y = top;
  if (head) {
    doc.font('display').fontSize(11.5).fillColor(T.bone).text(head, bodyX, y, { width: bodyW });
    y = doc.y + 3;
  }
  doc
    .font('Helvetica')
    .fontSize(9.5)
    .fillColor(T['bone-dim'])
    .text(body, bodyX, y, { width: bodyW, lineGap: 2.4 });

  doc.y = Math.max(doc.y, top + 26) + 12;
  rule(doc.y - 6);
}

/* ---- cover -------------------------------------------------------------- */
monogram(M, M, 58, T.bone);

doc.y = M + 132;
doc.font('display').fontSize(52).fillColor(T.bone).text('Project:', M, doc.y, { width: W });
doc.font('display').fontSize(52).fillColor(T.bone).text('Waterfall', M, doc.y, { width: W });

doc.moveDown(0.8);
doc
  .font('Helvetica')
  .fontSize(12.5)
  .fillColor(T['bone-dim'])
  .text(
    'A generating station was built at the base of the falls to turn falling water into power for a continent. It stopped generating and it is still standing there. Project: Waterfall is the proposal to make it the home of Diaphora Labs.',
    M,
    doc.y,
    { width: W * 0.86, lineGap: 3.4 }
  );

doc.moveDown(1.4);
rule(doc.y, true);
doc.moveDown(0.8);

for (const line of [
  'Base of the falls · Niagara Falls, Ontario, Canada',
  'Ontario Power Company generating station',
  'Owned by the Niagara Parks Commission · out of service since 1999',
  'Issued August 2026 · innovate@diaphoralabs.com',
]) {
  doc.font('Helvetica').fontSize(9).fillColor(T['bone-faint']).text(line, M, doc.y, {
    characterSpacing: 0.7,
  });
  doc.moveDown(0.34);
}

// The standing caveat. It is on the cover because a document that travels
// without the page around it has to carry its own disclaimer.
doc.moveDown(1.1);
const cy = doc.y;
doc.save().rect(M, cy, W, 44).fillColor(T.bone).opacity(0.055).fill().restore();
doc
  .font('Helvetica')
  .fontSize(9.5)
  .fillColor(T.bone)
  .text(
    'This is a proposal. Nothing described here is built, leased, bought or approved. The station is owned by the Niagara Parks Commission, and this document is an approach to them and to the public.',
    M + 14,
    cy + 11,
    { width: W - 28, lineGap: 2 }
  );

/* ---- the story ---------------------------------------------------------- */
doc.addPage();
sectionHead('How the building got here', 'One');
for (const s of STORY) row(s.year, s.head, s.body);

/* ---- the uses ----------------------------------------------------------- */
sectionHead('One building, six uses', 'Two');
doc
  .font('Helvetica')
  .fontSize(9.5)
  .fillColor(T['bone-dim'])
  .text('Every use below is proposed. None of it exists.', M, doc.y, { width: W });
doc.moveDown(0.8);
for (const u of USES) row(u.where, u.head, u.body);

/* ---- the ranges --------------------------------------------------------- */
sectionHead('What the site can test that nowhere else can', 'Three');
doc
  .font('Helvetica')
  .fontSize(9.5)
  .fillColor(T['bone-dim'])
  .text(
    'The conditions at the base of the falls — permanent mist, natural spray icing, a constant acoustic floor, a sustained grade and the station’s own below-grade works — are a set of test environments that cannot be manufactured. Each is subject to survey and to Niagara Parks’ consent.',
    M,
    doc.y,
    { width: W, lineGap: 2.4 }
  );
doc.moveDown(0.8);
for (const r of RANGES) row(r.cond, r.head, r.body);

/* ---- the mark ----------------------------------------------------------- */
sectionHead('Niagara-Proven', 'Four');
doc
  .font('Helvetica')
  .fontSize(9.5)
  .fillColor(T['bone-dim'])
  .text(
    `A proposed certification mark. A product that has been through the ranges above carries ${PROVEN_MARK.name} — evidence it was tested against real conditions rather than simulated ones. The mark does not exist yet and nothing has been certified.`,
    M,
    doc.y,
    { width: W, lineGap: 2.4 }
  );

/* ---- supporters --------------------------------------------------------- */
sectionHead('Who supports Diaphora Labs', 'Five');
doc
  .font('Helvetica')
  .fontSize(9.5)
  .fillColor(T['bone-dim'])
  .text(
    'These organisations have backed the founders and support Diaphora Labs. None of them is an investor or funder, none has committed capital or space, and none has committed anything to Project: Waterfall.',
    M,
    doc.y,
    { width: W, lineGap: 2.4 }
  );
doc.moveDown(0.7);
for (const s of SUPPORTERS) {
  doc.font('display').fontSize(12).fillColor(T.bone).text(s.name, M, doc.y);
  doc.moveDown(0.3);
}

/* ---- sources ------------------------------------------------------------ */
sectionHead('Where these facts come from', 'Six');
for (const s of SOURCES) {
  room(56);
  doc.font('Helvetica').fontSize(8).fillColor(T.bronze).text(s.fact.toUpperCase(), M, doc.y, {
    characterSpacing: 1.2,
  });
  doc.moveDown(0.2);
  doc.font('Helvetica').fontSize(9).fillColor(T['bone-dim']).text(s.cite, M, doc.y, { width: W });
  doc.moveDown(0.15);
  doc
    .font('Helvetica')
    .fontSize(8)
    .fillColor(T['bone-faint'])
    .text(s.href, M, doc.y, { width: W, link: s.href });
  doc.moveDown(0.7);
}

/* ---- the ask ------------------------------------------------------------ */
sectionHead('What we are asking for', 'Seven');
doc
  .font('Helvetica')
  .fontSize(10.5)
  .fillColor(T['bone-dim'])
  .text(
    'A conversation with the Niagara Parks Commission about the future of the Ontario Power Company station, and public support for reopening it as a working institution rather than a monument that costs money to stand still.\n\nIf you are a partner, a design or engineering firm, a startup or researcher, a Niagara local, an investor or anchor tenant, or a journalist, there is a way to sign on at diaphoralabs.com/waterfall.',
    M,
    doc.y,
    { width: W, lineGap: 3.2 }
  );

/* ---- page furniture ----------------------------------------------------- */
const range = doc.bufferedPageRange();
for (let i = range.start; i < range.start + range.count; i += 1) {
  doc.switchToPage(i);
  const y = doc.page.height - M + 22;
  doc
    .font('Helvetica')
    .fontSize(7.5)
    .fillColor(T['bone-faint'])
    .text('PROJECT: WATERFALL · A PROPOSAL · DIAPHORA LABS', M, y, {
      characterSpacing: 1.1,
      lineBreak: false,
    });
  if (i > range.start) {
    // Positioned explicitly rather than with align:'right' — combined with
    // lineBreak:false the aligned call silently drew nothing.
    const n = String(i - range.start + 1);
    doc.text(n, M + W - doc.widthOfString(n), y, { lineBreak: false });
  }
}

doc.end();
console.log(`public/media/project-waterfall-proposal.pdf  ·  ${range.count} pages`);
