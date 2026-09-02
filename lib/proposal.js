// The Project: Waterfall proposal. Everything here is PROPOSED, not built.
// The page is responsible for keeping that visible on every claim.

export const STORY = [
  {
    year: '1890',
    head: 'The commission',
    body:
      "Lord Kelvin's International Niagara Commission opened a worldwide call for proposals to harness the falls. The question was simple and enormous: how do you put this to work?",
  },
  {
    year: '1896',
    head: 'Alternating current wins',
    body:
      "Tesla and Westinghouse's polyphase alternating current was proven at Niagara. On 16 November 1896 power from the Adams plant reached Buffalo, twenty-two miles away, and transmitting power over distance stopped being a theory.",
  },
  {
    year: '1905–1999',
    head: 'A working century',
    body:
      'The Ontario Power Company station opened at the foot of the Horseshoe Falls in 1905. Fifteen generators produced 203,000 horsepower, converted from 25 to 60 hertz in the 1970s, and ran until the station was taken out of service in 1999.',
  },
  {
    year: 'Today',
    head: 'The building waits',
    body:
      'The station still stands at the base of the falls, owned by the Niagara Parks Commission and out of service since 1999 — intact, dramatic, and unused, beside one of the most visited places on the continent.',
  },
  {
    year: 'Proposed',
    head: 'The second powering',
    body:
      'Reopen it for the industries that will define the next hundred years — energy, water, computing, climate — with the public invited in. That is what this page is asking for.',
    future: true,
  },
];

export const USES = [
  {
    where: 'Turbine hall',
    head: 'The forum',
    body: 'Summits, exhibitions and public events under the original vaulted ceiling.',
  },
  {
    where: 'Generator floors',
    head: 'Labs and residencies',
    body: 'Bench and studio space for startups, university groups and corporate research teams.',
  },
  {
    where: 'Penstock levels',
    head: 'The deep works',
    body: 'The shafts descending through the gorge become exhibition and testing space that cannot be built anywhere else.',
  },
  {
    where: 'Switch house',
    head: 'Anchor studios',
    body: 'Signature space for a small number of institutions that want their name on the project.',
  },
  {
    where: 'Gallery',
    head: 'The record',
    body: 'The Tesla–Westinghouse story, told in the building where it happened, one floor from the work continuing it.',
  },
  {
    where: 'Terraces',
    head: 'The public edge',
    body: 'Cafés, events and open space facing the falls, so the campus stays open to the city that surrounds it.',
  },
];

export const RANGES = [
  {
    cond: 'Mist and atmosphere',
    head: 'The fog corridor',
    body: 'Lidar and camera validation in natural, repeatable fog; accelerated weathering racks in the spray line.',
  },
  {
    cond: 'Ice and winter',
    head: 'The icing station',
    body: 'De-icing systems and icephobic coatings under natural spray icing; heat pumps certified in a real winter.',
  },
  {
    cond: 'Sound and vibration',
    head: 'The noise floor',
    body: 'Noise-cancelling audio and hearing technology proven against a constant roar; acoustic models trained on the steadiest noise on earth.',
  },
  {
    cond: 'Underground',
    head: 'The tunnel range',
    body: "GPS-denied robotics and confined-space rescue training in the station's below-grade works, subject to survey.",
  },
  {
    cond: 'Water and power',
    head: 'The hydraulic loop',
    body: 'Turbine and fish-passage certification in the original penstocks; a hydro-powered hydrogen demonstration.',
  },
  {
    cond: 'People, grade and cable',
    head: 'The living lab',
    body: 'Opt-in crowd-flow and accessibility research at world scale; EV braking trials on a sustained grade.',
  },
];

// The certification mark the proposal puts forward. It belongs to the punch
// alphabet: same grid, same stroke, same vocabulary of ring, bar and drop.
export const PROVEN_MARK = {
  id: 'niagara-proven',
  name: 'Niagara-Proven',
  d: 'M12 2.4a9.6 9.6 0 100 19.2 9.6 9.6 0 100-19.2M8.5 6.8v5.4M12 6.8v6.6M15.5 6.8v5.4M6.6 16.4h10.8',
};

export const SUPPORTERS = [
  { name: 'Niagara Falls Innovation Hub' },
  { name: 'Brock University' },
  { name: 'Velocity' },
];
