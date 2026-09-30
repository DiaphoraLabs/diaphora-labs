import { validateSponsor, bestMatches, scoreSponsor } from '../../../../lib/ntw-events';
import { events, sponsors } from '../../../../lib/ntw-store';
import { submissionHandlers } from '../../../../lib/ntw-routes';
import { mailSponsor } from '../../../../lib/ntw-mail';

// Sponsors for Niagara Tech Week. Each is matched against the events that
// asked for sponsorship, by industry, and the best fits go to the team with
// the offer, so the introduction can be made from the inbox.

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const { POST, GET, PATCH } = submissionHandlers({
  name: 'niagara-tech-week/sponsors',
  store: sponsors,
  validate: validateSponsor,
  async onCreate(sponsor) {
    const seeking = await events.open(`and 'sponsor' = any(needs)`);
    await mailSponsor(sponsor, bestMatches(sponsor, seeking, (sp, e) => [e, sp], 5, scoreSponsor));
  },
});
