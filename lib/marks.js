// The punch alphabet. Fifteen marks, one 24-unit grid, one stroke weight.
// Drawn from a shared vocabulary — arc, bar, chevron, ring, notch — so the set
// reads as one punch library rather than fifteen unrelated icons.
// `nudge` recentres a glyph inside the 24-unit box without touching the
// drawing: measured offsets of the path's bounding box from centre, applied as
// a translate. Sankofa overhung the box by 1.5 units before this, which pushed
// it into its neighbour's cell on the mark row.
// `bindsAll` marks the four values the values document applies to every
// audience including partners: Loyalty, Transparency, Curiosity, Fairness.
// Display names are nouns; the `id` slugs are stable and deliberately left
// alone, since lib/waterfall.js and MarkForge address marks by id.

export const MARKS = [
  {
    id: 'wonder',
    name: 'Wonder',
    facets: ['Beauty', 'Authenticity', 'Joy'],
    audiences: ['Team', 'Delta 1'],
    bindsAll: false,
    d: 'M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 100-9M19.5 12H22M4.5 12H2M12 4.5V2M12 19.5V22M17.3 6.7l1.8-1.8M6.7 6.7L4.9 4.9M17.3 17.3l1.8 1.8M6.7 17.3l-1.8 1.8',
  },
  {
    id: 'pressure-seeking',
    name: 'Pressure-Seeking',
    facets: ['Openness', 'Level-Headedness', 'Stoicism'],
    audiences: ['Team', 'Delta 0', 'Delta 1'],
    bindsAll: false,
    d: 'M5 5.5h14M5 18.5h14M12 8.2v7.6M9.5 10.7L12 8.2l2.5 2.5M9.5 13.3L12 15.8l2.5-2.5',
  },
  {
    id: 'omotenashi',
    name: 'Omotenashi',
    facets: ['Humility', 'Low Ego', 'Grace', 'Empathy'],
    audiences: ['Team', 'Delta 1'],
    bindsAll: false,
    d: 'M6 12a6 6 0 0012 0M4.5 19.5h15M12 6.4a1.6 1.6 0 100 3.2 1.6 1.6 0 100-3.2',
    nudge: [0, -0.95],
  },
  {
    id: 'loyal',
    name: 'Loyalty',
    facets: [],
    audiences: ['Team', 'Delta 0', 'Delta 1', 'Partners'],
    bindsAll: true,
    d: 'M9.5 7.6a4.4 4.4 0 100 8.8 4.4 4.4 0 100-8.8M14.5 7.6a4.4 4.4 0 100 8.8 4.4 4.4 0 100-8.8',
  },
  {
    id: 'sankofa',
    name: 'Sankofa',
    facets: [],
    audiences: ['Team', 'Delta 0', 'Delta 1'],
    bindsAll: false,
    d: 'M18 19.5a7.5 7.5 0 10-7.5-7.5v5.6M7.6 14.9l2.9 2.9 2.9-2.9',
    nudge: [-4.55, 0],
  },
  {
    id: 'transparency',
    name: 'Transparency',
    facets: ['Sustainability', 'Service', 'Peace'],
    audiences: ['Team', 'Delta 0', 'Delta 1', 'Partners'],
    bindsAll: true,
    d: 'M12 3.4a8.6 8.6 0 100 17.2 8.6 8.6 0 100-17.2M12 8.6a3.4 3.4 0 100 6.8 3.4 3.4 0 100-6.8M3.4 12h5.2M15.4 12h5.2',
  },
  {
    id: 'curious',
    name: 'Curiosity',
    facets: [],
    audiences: ['Team', 'Delta 0', 'Delta 1', 'Partners'],
    bindsAll: true,
    d: 'M8.5 6.5a7 7 0 000 11M12 8.5a4 4 0 000 7M15.6 11.2a1.3 1.3 0 100 2.6 1.3 1.3 0 100-2.6',
    nudge: [0.63, 0],
  },
  {
    id: 'speed',
    name: 'Speed',
    facets: [],
    audiences: ['Team', 'Delta 1', 'Partners'],
    bindsAll: false,
    d: 'M5 8l3.2 4-3.2 4M10.5 8l3.2 4-3.2 4M16 8l3.2 4-3.2 4',
  },
  {
    id: 'perseverance',
    name: 'Perseverance',
    facets: ['Drive', 'Dedication'],
    audiences: ['Team', 'Delta 0', 'Delta 1'],
    bindsAll: false,
    d: 'M12 3.5v14.6M8.5 6.6h7M8.5 10.1h7M8.5 13.6h7M4.5 20.5h15M12 18.1v2.4',
  },
  {
    id: 'fun',
    name: 'Fun',
    facets: [],
    audiences: ['Team', 'Delta 0', 'Delta 1'],
    bindsAll: false,
    d: 'M4 18c1.6-6.4 4.8-6.4 6.4 0s4.8 6.4 6.4 0M19.9 8.4a1.2 1.2 0 100 2.4 1.2 1.2 0 100-2.4',
    nudge: [-0.55, -3.6],
  },
  {
    id: 'visionary',
    name: 'Vision',
    facets: ['Forward Thinking', 'Optimism'],
    audiences: ['Team', 'Delta 1', 'Partners'],
    bindsAll: false,
    d: 'M2.5 18.5h19M4.5 15.6L17.6 9.4M19.5 6.4a2.1 2.1 0 100 4.2 2.1 2.1 0 100-4.2',
    nudge: [0, -0.45],
  },
  {
    id: 'fairness',
    name: 'Fairness',
    facets: ['Mutual Respect', 'Openness', 'Cosmopolitanism'],
    audiences: ['Team', 'Delta 0', 'Delta 1', 'Partners'],
    bindsAll: true,
    d: 'M12 3.5v17M5 20.5h14M4 8h16M4 8l-2.5 5.5h5zM20 8l2.5 5.5h-5z',
    nudge: [1.25, 0],
  },
  {
    id: 'ingenuity',
    name: 'Ingenuity',
    facets: ['Invention', 'Resourcefulness', 'Craft'],
    audiences: ['Team', 'Delta 0', 'Delta 1'],
    bindsAll: false,
    // A beam enters a wedge and leaves as two. Bar and chevron only, no new
    // vocabulary: ingenuity as getting more out than you put in.
    d: 'M2.6 12h7.4M10 12l4.6-4.2v8.4l-4.6-4.2M14.6 9.9h6.8M14.6 14.1h6.8',
  },
  {
    id: 'execution',
    name: 'Execution',
    facets: ['Intelligence', 'Eloquence'],
    audiences: ['Team', 'Delta 1', 'Partners'],
    bindsAll: false,
    d: 'M12 2.8v11.4M8.8 11L12 14.2l3.2-3.2M4.5 17.5h15M7 20.6l1.4-2M17 20.6l-1.4-2',
    nudge: [0, 0.3],
  },
  {
    id: 'danketsu',
    name: 'Danketsu',
    facets: ['Collaboration', 'Kindness', 'Welcoming'],
    audiences: ['Team', 'Delta 0', 'Delta 1', 'Partners'],
    bindsAll: false,
    d: 'M12 3.4a3.4 3.4 0 100 6.8 3.4 3.4 0 100-6.8M6.4 13.6a3.4 3.4 0 100 6.8 3.4 3.4 0 100-6.8M17.6 13.6a3.4 3.4 0 100 6.8 3.4 3.4 0 100-6.8M10.4 9.7l-1.5 2.3M13.6 9.7l1.5 2.3M9.8 17.2h4.4',
  },
];

export const MARKS_BY_ID = Object.fromEntries(MARKS.map((m) => [m.id, m]));

// The four that bind every audience, partners included. The institution's
// constant: what is true on a page that belongs to no single programme.
export const BINDING = MARKS.filter((m) => m.bindsAll);

// The marks a given programme is asked to hold. Order follows the alphabet,
// never relevance, so the row reads as one struck line wherever it appears.
export function marksFor(audience) {
  return MARKS.filter((m) => m.audiences.includes(audience));
}
