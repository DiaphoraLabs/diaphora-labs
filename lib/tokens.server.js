// Reads the live colour tokens out of app/globals.css.
//
// Node-only: it touches the filesystem, so it must never be imported from a
// client component. The press page is static, so this runs at build and the
// values are baked into the HTML.
//
// Parse only the FIRST :root block. globals.css redefines the whole palette
// inside `@media print` — bone becomes #000000, patina becomes #ffffff — and a
// regex swept over the whole file collects those too, with the later
// declaration winning. Every generated asset then comes out in the print
// palette. This is not hypothetical: figma-export.svg shipped that way until
// 2026-09-02, 52 values black.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export function readTokens(cwd = process.cwd()) {
  const css = readFileSync(join(cwd, 'app', 'globals.css'), 'utf8');

  const start = css.indexOf(':root');
  if (start === -1) throw new Error('globals.css: no :root block found');
  const open = css.indexOf('{', start);
  let depth = 0;
  let end = -1;
  for (let i = open; i < css.length; i += 1) {
    if (css[i] === '{') depth += 1;
    else if (css[i] === '}') {
      depth -= 1;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (end === -1) throw new Error('globals.css: unterminated :root block');

  const tokens = {};
  for (const m of css.slice(open, end).matchAll(/^\s*--([\w-]+):\s*([^;]+);/gm)) {
    tokens[m[1]] = m[2].trim();
  }
  return tokens;
}

// The print palette — the same tokens redefined inside @media print, where the
// ground goes white and the lettering black. It is the correct source for
// anything that will be printed or handed over as a document, so the proposal
// PDF reads from here rather than inventing a light palette of its own.
export function readPrintTokens(cwd = process.cwd()) {
  const css = readFileSync(join(cwd, 'app', 'globals.css'), 'utf8');
  const at = css.indexOf('@media print');
  if (at === -1) throw new Error('globals.css: no @media print block');
  const root = css.indexOf(':root', at);
  const open = css.indexOf('{', root);
  const close = css.indexOf('}', open);
  const tokens = { ...readTokens(cwd) };
  for (const m of css.slice(open, close).matchAll(/^\s*--([\w-]+):\s*([^;]+);/gm)) {
    tokens[m[1]] = m[2].trim();
  }
  return tokens;
}
