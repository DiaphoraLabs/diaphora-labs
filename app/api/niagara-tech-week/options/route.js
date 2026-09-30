import { formOptions } from '../../../../lib/ntw-events';

// The host form's choices, from the same definitions the submission routes
// validate against, so the form cannot offer something the route would reject.
// Built once at deploy: the lists only change when the code does.
export const dynamic = 'force-static';

export function GET() {
  return Response.json(formOptions());
}
