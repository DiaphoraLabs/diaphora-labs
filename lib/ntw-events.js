// Niagara Tech Week submissions: the one definition of what a host or a venue
// can tell us. The API routes validate against it, the host form draws its
// choices from it (via /api/niagara-tech-week/options), and the notification
// email reads it back, so the three can never disagree about a field.
//
// The model follows Toronto, Waterloo and SF Tech Week: hosts propose, the
// team reviews, approved events go on the shared calendar, and every host runs
// their own registration. Submissions open a year out, so the first stage asks
// for an idea, not a finished event. The listing fields (venue, times,
// registration link) are the second stage and are optional until then.

// The week itself. Hosts pick days inside it; anything else is a conversation,
// not a checkbox.
export const DAYS = [
  '2027-09-27', '2027-09-28', '2027-09-29', '2027-09-30',
  '2027-10-01', '2027-10-02', '2027-10-03',
];

// Which side of the river. The week is binational, and an event's side decides
// who can reach it without a passport, so it is asked for outright.
export const SIDES = {
  ontario: 'Niagara Region, Ontario',
  'new-york': 'Western New York',
  either: 'Either side / not decided',
  virtual: 'Virtual',
};

// A venue is somewhere, so it has no "either" and no "virtual".
export const VENUE_SIDES = {
  ontario: SIDES.ontario,
  'new-york': SIDES['new-york'],
};

export const FORMATS = {
  panel: 'Panel or fireside',
  hackathon: 'Hackathon or build challenge',
  demo: 'Demo night or launch',
  workshop: 'Workshop',
  meetup: 'Meetup or social',
  dinner: 'Dinner',
  tour: 'Tour or open house',
  other: 'Something else',
};

// The week exists to put the region's own industries in front of the people
// building for them. These five come first on the form and are ticked for the
// host when their description mentions them, because an event in one of them
// has partners waiting in the region: that is the match the week is for.
export const REGIONAL_STREAMS = {
  energy: 'Energy',
  tourism: 'Tourism & hospitality',
  agriculture: 'Agriculture & agri-food',
  transportation: 'Transportation & mobility',
  manufacturing: 'Manufacturing & logistics',
};

export const STREAMS = {
  ai: 'AI & data',
  software: 'Software & SaaS',
  health: 'Health & life sciences',
  climate: 'Climate & water',
  fintech: 'Finance & fintech',
  robotics: 'Robotics & hardware',
  security: 'Cybersecurity',
  creative: 'Creative, media & games',
  education: 'Education & research',
  public: 'Government & public sector',
  founders: 'Founders & investing',
};

const ALL_STREAMS = { ...REGIONAL_STREAMS, ...STREAMS };

// Words that put an event in a regional stream. Matched on whole words, so
// "power" finds "power grid" but "hydro" does not fire inside "hydrangea".
// Deliberately generous: a wrong tick costs the host one click to undo, a
// missed one costs them the partners the stream would have found them.
export const STREAM_KEYWORDS = {
  energy: ['energy', 'power', 'grid', 'electricity', 'electric', 'hydro', 'hydroelectric',
    'solar', 'wind', 'battery', 'batteries', 'hydrogen', 'nuclear', 'utility',
    'utilities', 'turbine', 'turbines', 'renewable', 'renewables', 'opg', 'microgrid'],
  tourism: ['tourism', 'tourist', 'tourists', 'visitor', 'visitors', 'hospitality', 'hotel',
    'hotels', 'travel', 'destination', 'attraction', 'attractions', 'casino', 'resort',
    'restaurant', 'restaurants'],
  agriculture: ['agriculture', 'agricultural', 'agri', 'agrifood', 'agtech', 'farm', 'farms',
    'farming', 'farmer', 'farmers', 'food', 'wine', 'wines', 'winery', 'wineries', 'vineyard',
    'vineyards', 'grape', 'grapes', 'greenhouse', 'greenhouses', 'orchard', 'crop', 'crops',
    'harvest', 'brewery', 'cidery'],
  transportation: ['transportation', 'transport', 'transit', 'mobility', 'rail', 'railway',
    'trucking', 'truck', 'trucks', 'aviation', 'airport', 'aerospace', 'drone', 'drones',
    'vehicle', 'vehicles', 'ev', 'evs', 'autonomous', 'car', 'cars', 'automotive', 'border',
    'canal', 'shipping', 'marine', 'port'],
  manufacturing: ['manufacturing', 'manufacturer', 'manufacturers', 'factory', 'factories',
    'industrial', 'logistics', 'warehouse', 'warehousing', 'fabrication', 'machining',
    'steel', 'automation', 'freight', 'packaging'],
};

// Events that are not about technology but draw the same people. They are
// welcome, and they are always labelled, so nobody arrives at a poker night
// expecting a panel.
export const KINDS = {
  tech: 'Tech event',
  lifestyle: 'Lifestyle event',
};

export const LIFESTYLE_TAGS = {
  cars: 'Car show or motorsport',
  games: 'Poker, cards or games night',
  food: 'Food, wine or drinks',
  sport: 'Sports or fitness',
  music: 'Music or arts',
  outdoors: 'Outdoors or adventure',
  social: 'Party or social',
  other: 'Other lifestyle',
};

export const SIZES = {
  'under-25': 'Under 25',
  '25-75': '25–75',
  '75-200': '75–200',
  '200-plus': '200+',
  unsure: 'Not sure yet',
};

// The smallest room each size needs, for matching against a venue's capacity.
const SIZE_FLOOR = { 'under-25': 0, '25-75': 25, '75-200': 75, '200-plus': 200, unsure: 0 };
const SIZE_CEIL = { 'under-25': 25, '25-75': 75, '75-200': 200, '200-plus': 400, unsure: 50 };

// What the host would like help with. This is what the team acts on after
// review, so it is a fixed list rather than free text.
export const NEEDS = {
  venue: 'Finding a venue',
  cohost: 'A co-host or partner',
  speakers: 'Speakers',
  sponsor: 'Sponsorship',
  promotion: 'Promotion',
  border: 'Cross-border logistics',
};

export const OFFERS = {
  free: 'Free to hosts',
  discounted: 'Discounted rate',
  inkind: 'In exchange for credit or sponsorship',
  paid: 'Standard rate',
};

export const AMENITIES = {
  av: 'Screen & AV',
  wifi: 'Wi-Fi',
  stage: 'Stage or podium',
  catering: 'Catering on site',
  bar: 'Licensed bar',
  kitchen: 'Kitchen',
  breakout: 'Breakout rooms',
  outdoor: 'Outdoor space',
  parking: 'Parking',
  accessible: 'Step-free access',
};

// Review states, in the order a submission moves through them. Only the team
// moves one past `proposed`; a submitter's own edits never change it.
export const STATUSES = ['proposed', 'in_review', 'approved', 'declined', 'listed', 'withdrawn'];

// The calendar runs on Luma for 2027, as Toronto's does: approved hosts add
// Niagara Tech Week as a co-host on their Luma event, which is what pulls it
// into the shared calendar. Other platforms are accepted but will not appear
// there on their own. This is expected to move to a custom calendar page, so
// nothing else here, and nothing in the tables, is specific to Luma.
const LUMA_HOSTS = new Set(['lu.ma', 'luma.com', 'www.luma.com']);

export function isLumaLink(link) {
  try {
    return LUMA_HOSTS.has(new URL(link).hostname.toLowerCase());
  } catch {
    return false;
  }
}

// Which regional streams a piece of text points at, and the word that did it,
// so the form can say why it ticked a box rather than tick it silently.
export function suggestStreams(textIn) {
  const words = new Set(String(textIn ?? '').toLowerCase().match(/[a-z0-9]+/g) || []);
  const out = [];
  for (const [stream, keys] of Object.entries(STREAM_KEYWORDS)) {
    const hit = keys.find((k) => words.has(k));
    if (hit) out.push({ stream, word: hit });
  }
  return out;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Field lengths are limits on what a reviewer can take in, not on storage.
const LIMITS = {
  host_name: 120, contact_name: 120, org: 160, title: 120, venue_name: 160,
  concept: 280, audience: 280, cohosts: 280, venue: 200, address: 240,
  city: 80, spaces: 400, notes: 1000,
};

function text(v, max) {
  return String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
}

function pick(v, allowed) {
  const s = String(v ?? '').toLowerCase();
  return Object.hasOwn(allowed, s) ? s : '';
}

function pickMany(v, allowed) {
  if (!Array.isArray(v)) return [];
  const set = Array.isArray(allowed) ? new Set(allowed) : new Set(Object.keys(allowed));
  return [...new Set(v.map((x) => String(x).toLowerCase()))].filter((x) => set.has(x));
}

// Whole people, not fractions, and nothing that would overflow a column.
function count(v) {
  const n = Math.round(Number(v));
  return Number.isFinite(n) && n > 0 ? Math.min(n, 100000) : 0;
}

// Only http(s), and only something that parses. A link is shown to the public
// once listed, so a `javascript:` URL must never get stored.
function url(v) {
  const s = String(v ?? '').trim();
  if (!s) return '';
  try {
    const u = new URL(s);
    return u.protocol === 'https:' || u.protocol === 'http:' ? u.toString().slice(0, 500) : null;
  } catch {
    return null;
  }
}

// Shared by both validators. With `partial`, a missing field is left out
// rather than failed, which is what an edit needs: it sends only what changed.
function reader(body, partial) {
  const b = body && typeof body === 'object' ? body : {};
  const has = (k) => !partial || Object.hasOwn(b, k);
  const value = {};
  const errors = {};
  return {
    b, has, value, errors,
    email(k) {
      if (!has(k)) return;
      const e = String(b[k] ?? '').trim().toLowerCase();
      if (!EMAIL.test(e)) errors[k] = 'That address is missing an @ or a domain.';
      else value[k] = e;
    },
    required(k) {
      if (!has(k)) return;
      const v = text(b[k], LIMITS[k]);
      if (!v) errors[k] = 'This one is needed.';
      else value[k] = v;
    },
    optional(k) {
      if (has(k)) value[k] = text(b[k], LIMITS[k]);
    },
    one(k, allowed, message) {
      if (!has(k)) return;
      const v = pick(b[k], allowed);
      if (!v) errors[k] = message;
      else value[k] = v;
    },
    many(k, allowed) {
      if (has(k)) value[k] = pickMany(b[k], allowed);
    },
    link(k) {
      if (!has(k)) return;
      const v = url(b[k]);
      if (v === null) errors[k] = 'That does not look like a web address.';
      else value[k] = v;
    },
  };
}

// Returns { value, errors }. `errors` maps a field to one sentence the form can
// show beside it.
export function validateEvent(body, { partial = false } = {}) {
  const r = reader(body, partial);
  const { b, has, value, errors } = r;

  r.email('email');
  r.required('host_name');
  r.required('title');
  r.required('concept');
  for (const k of ['org', 'audience', 'cohosts', 'venue', 'notes']) r.optional(k);
  r.one('format', FORMATS, 'Pick the closest format.');
  r.one('side', SIDES, 'Pick a side of the river, or “either”.');
  r.one('kind', KINDS, 'Say whether this is a tech or a lifestyle event.');
  r.many('streams', ALL_STREAMS);
  r.many('days', DAYS);
  r.many('needs', NEEDS);
  r.link('link');
  if (has('size')) value.size = pick(b.size, SIZES) || 'unsure';
  if (has('public')) value.public = b.public !== false;

  // A lifestyle event must say what it is; a tech event has no use for the tag.
  // Checked only when the kind is being set, so an edit that leaves the kind
  // alone does not have to resend the tag.
  if (has('kind')) {
    if (value.kind === 'lifestyle') {
      const tag = pick(b.lifestyle_tag, LIFESTYLE_TAGS);
      if (!tag) errors.lifestyle_tag = 'Tag it, so people know what they are coming to.';
      else value.lifestyle_tag = tag;
    } else if (value.kind === 'tech') {
      value.lifestyle_tag = '';
      // Streams are how a tech event finds its partners, so it needs one.
      if (has('streams') && !value.streams.length) {
        errors.streams = 'Pick at least one stream.';
      }
    }
  }

  return { value, errors };
}

export function validateVenue(body, { partial = false } = {}) {
  const r = reader(body, partial);
  const { b, has, value, errors } = r;

  r.email('email');
  r.required('venue_name');
  r.required('contact_name');
  r.required('city');
  for (const k of ['org', 'address', 'spaces', 'notes']) r.optional(k);
  r.one('side', VENUE_SIDES, 'Pick the side of the river the venue is on.');
  r.one('offer', OFFERS, 'Pick the terms closest to what you can offer.');
  r.many('days', DAYS);
  r.many('amenities', AMENITIES);
  r.many('formats', FORMATS);
  r.many('streams', ALL_STREAMS);
  r.link('link');
  if (has('lifestyle_ok')) value.lifestyle_ok = b.lifestyle_ok !== false;

  for (const k of ['capacity_seated', 'capacity_standing']) {
    if (has(k)) value[k] = count(b[k]);
  }
  // A venue with no capacity cannot be matched to anything, which is the
  // whole reason it is on the list.
  if (has('capacity_seated') || has('capacity_standing')) {
    if (!value.capacity_seated && !value.capacity_standing) {
      errors.capacity_seated = 'Give at least one capacity, even a rough one.';
    }
  }

  return { value, errors };
}

// How well a venue suits an event. Returns null where the pair cannot work at
// all (wrong side of the river, room too small, a lifestyle event the venue has
// said no to), otherwise a score and the reasons for it, which is what goes in
// the email: a reviewer should see why two things were put together.
export function scoreMatch(event, venue) {
  if (event.side === 'virtual') return null;
  if (event.side !== 'either' && event.side !== venue.side) return null;
  if (event.kind === 'lifestyle' && !venue.lifestyle_ok) return null;

  const room = Math.max(venue.capacity_seated || 0, venue.capacity_standing || 0);
  const size = event.size || 'unsure';
  if (room < SIZE_FLOOR[size]) return null;

  let score = 0;
  const reasons = [];

  if (event.side === venue.side) { score += 3; reasons.push('same side of the river'); }
  else score += 1;

  if (room >= SIZE_CEIL[size]) { score += 2; reasons.push(`room for ${room}`); }
  else { score += 1; reasons.push(`room for ${room}, may be tight`); }

  const eDays = event.days || [], vDays = venue.days || [];
  const both = eDays.filter((d) => vDays.includes(d));
  if (both.length) { score += 2; reasons.push(`both free ${both.length} day${both.length > 1 ? 's' : ''}`); }
  else if (!eDays.length || !vDays.length) score += 0.5;
  else return null;

  if ((venue.formats || []).includes(event.format)) { score += 2; reasons.push('suits the format'); }

  const shared = (event.streams || []).filter((s) => (venue.streams || []).includes(s));
  if (shared.length) {
    score += shared.length;
    reasons.push(`shares ${shared.map((s) => ALL_STREAMS[s]).join(', ')}`);
  }

  if (venue.offer === 'free') { score += 1; reasons.push('free to hosts'); }

  return { score, reasons };
}

// The best few of `others` for `one`, strongest first. `pair(one, other)` puts
// the pair in (event, venue) order, so this runs in either direction.
export function bestMatches(one, others, pair, limit = 5) {
  return others
    .map((o) => ({ item: o, m: scoreMatch(...pair(one, o)) }))
    .filter((x) => x.m)
    .sort((a, b) => b.m.score - a.m.score)
    .slice(0, limit);
}

// Everything the form needs to draw itself, in one object.
export function formOptions() {
  return {
    days: DAYS, sides: SIDES, venueSides: VENUE_SIDES, formats: FORMATS,
    regionalStreams: REGIONAL_STREAMS, streams: STREAMS, streamKeywords: STREAM_KEYWORDS,
    kinds: KINDS, lifestyleTags: LIFESTYLE_TAGS, sizes: SIZES, needs: NEEDS,
    offers: OFFERS, amenities: AMENITIES,
  };
}

export const LABELS = {
  sides: SIDES, formats: FORMATS, streams: ALL_STREAMS, kinds: KINDS,
  lifestyleTags: LIFESTYLE_TAGS, sizes: SIZES, needs: NEEDS, offers: OFFERS,
  amenities: AMENITIES,
};
