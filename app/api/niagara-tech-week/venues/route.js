import { validateVenue, bestMatches } from '../../../../lib/ntw-events';
import { events, venues } from '../../../../lib/ntw-store';
import { submissionHandlers } from '../../../../lib/ntw-routes';
import { mailVenue } from '../../../../lib/ntw-mail';

// Venues offering space to Niagara Tech Week hosts. Each offer is matched
// against the events that asked for help finding a room, and the best fits go
// to the team with the offer, so the introduction can be made from the inbox.

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const { POST, GET, PATCH } = submissionHandlers({
  name: 'niagara-tech-week/venues',
  store: venues,
  validate: validateVenue,
  async onCreate(venue) {
    const seeking = await events.open(`and 'venue' = any(needs)`);
    await mailVenue(venue, bestMatches(venue, seeking, (v, e) => [e, v]));
  },
});
