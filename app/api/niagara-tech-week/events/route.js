import { validateEvent, bestMatches, scoreSponsor } from '../../../../lib/ntw-events';
import { events, venues, sponsors } from '../../../../lib/ntw-store';
import { submissionHandlers } from '../../../../lib/ntw-routes';
import { mailEvent } from '../../../../lib/ntw-mail';

// Event proposals for Niagara Tech Week. The handlers are shared with venues;
// what is particular to events is what the team is told when one arrives.

export const runtime = 'nodejs';
// Every call must reach the database; a cached answer would be someone else's.
export const dynamic = 'force-dynamic';

export const { POST, GET, PATCH } = submissionHandlers({
  name: 'niagara-tech-week/events',
  store: events,
  validate: validateEvent,
  // A host who asked for help with a venue or with sponsorship gets the likeliest
  // rooms and backers listed in the team's email, so the introduction can be
  // made from the inbox.
  async onCreate(event) {
    const rooms = event.needs.includes('venue')
      ? bestMatches(event, await venues.open(), (e, v) => [e, v])
      : [];
    const backers = event.needs.includes('sponsor')
      ? bestMatches(event, await sponsors.open(), (e, sp) => [e, sp], 5, scoreSponsor)
      : [];
    await mailEvent(event, rooms, backers);
  },
});
