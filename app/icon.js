import { ImageResponse } from 'next/og';
import { DIE, MONOGRAM } from '../lib/brand';

// The favicon. Generated from the same path the site draws, so the tab icon
// cannot drift from the mark on the page. The site shipped without one until
// now, which meant every shared link previewed as a blank square.
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  const inner = DIE.inset;
  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        <svg width="32" height="32" viewBox={MONOGRAM.viewBox}>
          <rect
            x={inner}
            y={inner}
            width={24 - inner * 2}
            height={24 - inner * 2}
            fill="#0b1815"
          />
          <path
            d={MONOGRAM.d}
            fill="none"
            stroke="#ece7d9"
            strokeWidth={MONOGRAM.weight.icon}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size
  );
}
