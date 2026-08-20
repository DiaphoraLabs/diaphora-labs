// Ways in to Project: Waterfall. Each lane is a real audience with its own
// action, and each carries one punch from the value alphabet — the mark that
// lane is being asked for.

export const LANES = [
  {
    id: 'partner',
    mark: 'danketsu',
    name: 'Partners and supporters',
    line: 'Lend a name, a letter, or half an hour. No money changes hands at this stage, and nothing is published without your written say-so.',
    action: 'Sign on',
    fields: ['name', 'org', 'role', 'email'],
    commitments: [
      ['name', 'Show our name', 'List us as a supporter on this site and in the proposal.'],
      ['letter', 'Send a letter of support', 'We provide a one-page template. You put it on letterhead.'],
      ['call', 'Take a 30-minute call', 'A conversation about where the organization fits.'],
      ['founding', 'Discuss founding-partner status', 'Deeper involvement: programming, space, naming, funding.'],
    ],
    done: 'Signed on. Nothing is published until we confirm the wording with you by email.',
  },
  {
    id: 'design',
    mark: 'execution',
    name: 'Design and engineering firms',
    line: 'No brief has been issued and no competition has been announced. Registering now costs nothing and puts your firm on the list that hears first.',
    action: 'Register interest',
    fields: ['org', 'name', 'email', 'note'],
    noteLabel: 'Most relevant project, in a line',
    done: 'Registered. If a brief is ever issued, this list receives it the day it goes out.',
  },
  {
    id: 'research',
    mark: 'curious',
    name: 'Startups and researchers',
    line: 'There is no space to offer yet. This is the waitlist for the day there is, and it shapes what the building is asked to hold.',
    action: 'Join the waitlist',
    fields: ['org', 'name', 'email', 'note'],
    noteLabel: 'What you are building, in a line',
    done: 'On the list. You hear when there is something real to offer.',
  },
  {
    id: 'local',
    mark: 'omotenashi',
    name: 'Niagara locals and community',
    line: 'This is a Niagara project or it is nothing. If you live, work, or build here — either side of the river — your name and your ideas count for more here than any logo.',
    action: 'Count me in',
    fields: ['name', 'email', 'city'],
    commitments: [
      ['name', 'Add my name as a local supporter', 'Listed with permission only.'],
      ['meeting', 'Come to a public meeting about it', 'Held in Niagara, in person, when there is something to show.'],
      ['history', 'I have local knowledge or family history', 'Stories of the stations and the people who ran them.'],
      ['volunteer', 'I would help at open days or events', 'Tours, clean-ups, and whatever a launch needs.'],
    ],
    useField: true,
    done: 'Counted. If you suggested a use, it goes on the list that shapes the proposal.',
  },
  {
    id: 'capital',
    mark: 'visionary',
    name: 'Investors and anchor tenants',
    line: 'There is no capital stack to show you and no tenancy to sign. There is a position and a building. Submissions stay confidential.',
    action: 'Open a conversation',
    fields: ['org', 'name', 'email', 'note'],
    noteLabel: 'Context, in a line',
    done: 'Received, and held in confidence. A person answers this, not a pipeline.',
  },
  {
    id: 'media',
    mark: 'transparency',
    name: 'Media',
    line: 'There is no press kit yet, because there is no photography of the station and we will not commission renderings and pass them off as plans. Ask anyway and you get a straight answer about where the project actually stands.',
    action: 'Ask a question',
    fields: ['name', 'org', 'email', 'note'],
    noteLabel: 'What you want to know',
    done: 'Received. You get a straight answer, including where the project is not yet real.',
  },
];

export const LANES_BY_ID = Object.fromEntries(LANES.map((l) => [l.id, l]));
