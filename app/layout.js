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
        {/* The direction contract lives in DESIGN.md, where it belongs. It used
            to ship as an HTML comment on every page, which put the strategy in
            front of anyone who opened view-source. */}
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
