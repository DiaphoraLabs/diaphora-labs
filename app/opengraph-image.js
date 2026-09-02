import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { MONOGRAM } from '../lib/brand';

// The social card is the plaque. Every link to this site previewed as a blank
// rectangle before this existed, which is an odd first impression for an
// institution whose whole argument is that it is serious.
export const alt = 'Diaphora Labs — a startup incubator at the base of Niagara Falls';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const BOLTS = [
  [58, 58],
  [1142, 58],
  [58, 572],
  [1142, 572],
];

export default async function Image() {
  const archivo = await readFile(
    join(process.cwd(), 'assets', 'fonts', 'ArchivoBlack-Regular.ttf')
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(158deg, #16382f 0%, #0b1815 62%)',
          border: '1px solid #1e4a3e',
          padding: '84px 96px',
          fontFamily: 'Archivo',
        }}
      >
        {/* The four bolts that fix every plaque on the site to its ground. */}
        {BOLTS.map(([x, y]) => (
          <div
            key={`${x}-${y}`}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: 10,
              height: 10,
              background: '#0b1815',
              border: '1px solid #b8894a',
              display: 'flex',
            }}
          />
        ))}

        <svg width="156" height="156" viewBox={MONOGRAM.viewBox}>
          <path
            d={MONOGRAM.d}
            fill="none"
            stroke="#ece7d9"
            strokeWidth={MONOGRAM.weight.logo}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 118,
              lineHeight: 1,
              color: '#ece7d9',
              letterSpacing: '-0.01em',
            }}
          >
            DIAPHORA LABS
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 30,
              fontSize: 25,
              letterSpacing: '0.15em',
              color: '#b8894a',
            }}
          >
            NIAGARA FALLS · ONTARIO · THE LINE RUNS MID-RIVER
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Archivo', data: archivo, style: 'normal', weight: 900 }],
    }
  );
}
