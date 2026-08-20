import { Archivo, Martian_Mono, Source_Serif_4 } from 'next/font/google';
import './globals.css';
import Axis from '../components/Axis';
import Footer from '../components/Footer';

const plaque = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-plaque',
  display: 'swap',
});

const mono = Martian_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const text = Source_Serif_4({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-text',
  display: 'swap',
});

export const metadata = {
  title: 'Diaphora Labs — Niagara Falls',
  description:
    'An incubator at the Canada/USA border. Delta 0 is open to anyone, anywhere — start there. Delta 1 is the mark you cannot give yourself.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${plaque.variable} ${mono.variable} ${text.variable}`}>
      <body>
        {/* The direction contract. Emitted as a real HTML comment so it survives
            the production build and can be audited against the render. */}
        <div
          hidden
          dangerouslySetInnerHTML={{
            __html: `<!--
  THESIS: An incubator that marks, not one that ranks. A hallmark is a legal
  instrument legible across borders without translation; Diaphora is the
  differentia, the difference that distinguishes. Refuses the accelerator
  arrangement - white page, batch logo grid, orange apply button - and its
  predictable opposite, near-black deep-tech with one neon glow.
  OWN-WORLD: Oxidized copper ground, struck bronze punches, incised plaque
  caps, bone engraving. One signal ink, live-current chartreuse, marking only
  what is live and appearing nowhere else. Fifteen value punches on one grid.
  STORY: A clockmaker signs the dial in the open and punches the movement
  where only an opened case reveals it. Delta 0 is the open register - take
  your mark, self-service, global - the copy says "on your mark, start here".
  Delta 1 is the assay office in the world's own terms, but never in reader
  copy: on the page it is "make your mark", the one you cannot give yourself.
  FIRST VIEWPORT: Verdigris full-bleed. Bronze plaque upper left on the
  governing axis, assay line beneath. Mark row of fifteen punches to its
  right, the four that bind every audience struck in chartreuse. Two doors at
  equal size: Delta 0 live in chartreuse reading "on your mark", Delta 1
  resting bone reading "make your mark".
  FORM: Hallmark - candidate 4 of the grounded list, user-pinned across a
  bolder re-roll. Seed key 1370db39.
  FINISH: unreviewed and undocumented is unfinished; this build ends with the
  finish review, the verdict, DESIGN.md, and every shipping raster carrying
  its provenance.
-->`,
          }}
        />
        <a className="skip-link" href="#main">Skip to content</a>
        <div className="shell">
          <Axis />
          <div>
            <div id="main" tabIndex={-1}>
              {children}
            </div>
            <Footer />
          </div>
        </div>
</body>
    </html>
  );
}
