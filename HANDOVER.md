# Handover — Diaphora Labs site

Paused 18 August 2026. This file is the resume point: read it, then `PRODUCT.md`
and `DESIGN.md`. Everything below is current as of the last build.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start   # production check
```

Next.js 16 (App Router) + React 19, plain JavaScript, CSS Modules. No test suite.
Not a git repository yet — **there is no version history, so this working tree is
the only copy.** Initialising git is the single highest-value next action.

## What exists

Six routes, all built and verified at 1440px and 390px:

| Route | State |
|---|---|
| `/` | Home. Plaque, thesis, struck mark row, two doors, third route for non-founders, "what the mark certifies", footer. |
| `/niagara` | The case for the place: five staged courses down a vertical sightline. |
| `/delta-0` | Open program. Includes the **mark forge** — the working signature interaction. |
| `/delta-1` | Two conversions on one page: founder waitlist and partner/funder route. |
| `/delta-2` | Unstruck die + email capture. Deliberately near-empty. |
| `/waterfall` | The full Project: Waterfall proposal — story, six uses, test ranges, Niagara-Proven mark, six-lane sign-on, supporter register. |

Key source:

- `lib/marks.js` — the fourteen value punches. **Single source of truth for the identity.**
- `lib/proposal.js` — Project: Waterfall proposal content and the three real supporters.
- `lib/waterfall.js` — the six sign-on lanes and their commitments.
- `components/Mark.js` / `MarkRow.js` / `MarkForge.js` — the punch system and the strike.
- `components/SignOn.js` — multi-lane sign-on; commitments render as struck punches.
- `app/api/register/route.js` — all capture, local-first.

## Decisions already made (do not relitigate)

- **Visual world: "Hallmark."** Chosen from a direction round, user-pinned across a
  deliberately bolder re-roll, then sharpened by the user's clockmaker note. The
  signed-dial / punched-movement split is what carries Delta 0 vs Delta 1
  structurally. Seed key `1370db39`; the contract is an HTML comment in
  `app/layout.js` and survives the production build.
- **Values are load-bearing, not decorative** — the user's explicit instruction.
- **Spacing is three semantic bands**, never one repeated value. See DESIGN.md.
- **Registers, not cards.** Proposal content is ruled rows. There are no cards in
  this system and adding them would break it.
- Rejected alternates, should they come up again: Azulejo Station Hall and The Kit
  both beat Hallmark on one axis and were declined by the user.

## Outstanding work, highest value first

1. **`git init` and commit.** No history exists.
2. **Verify the historical and factual claims** before the Niagara Parks
   presentation. Specifically: four Great Lakes draining through the river; the
   border running mid-channel; the Underground Railroad crossing; AC power reaching
   Buffalo in the 1890s; the Ontario Power Company station's build and
   decommissioning dates; and the figures softened out of the proposal document
   (2,200-foot tunnel, 90 decibels, thirteen million visitors, seventeen ranges).
   These are on `/niagara` and `/waterfall` and will be read by government.
3. **Wire capture to a real provider.** `/api/register` appends to a gitignored
   `.data/registrations.jsonl`. Swap the route body; the client contract is
   `{ ok }` / `{ ok: false, error }` and nothing else needs to change.
4. **Open critique findings** (from `.impeccable/critique/`, scored 20/32). The user
   scoped the last pass to copy only, so these remain:
   - Mobile first screen carries no CTA above the fold (`/impeccable adapt`).
   - Axis ordinals fail contrast at 2.99:1; axis labels and the mark-row caption at 4.45:1.
   - Emphasis on "marks" in the h1 is colour-only — fails WCAG 1.4.1.
   - Both 64px door CTAs are `<span>`, not headings; absent from the heading outline.
   - `aria-live` on the mark row fires fourteen times on a sweep with no context.
   - `layout-transition` warning at `components/Axis.module.css:62`.
5. **Supporter logos.** Niagara Innovation Hub, Brock University and Velocity render
   as wordmarks; `components/SupporterWall.js` takes `{ name }` and wants real marks.
6. **Delta 0's real links** — repository, wiki, community — once they exist.

## Assets still needed from the client

- Photographs of the Ontario Power Company generating station (there are none, and
  the site says so rather than faking it).
- Logo files for the three supporters.
- A Diaphora Labs logo, if one is ever made. The plaque currently is the identity.

## Hard rules

`PRODUCT.md` holds the full list. The short version:

- Delta 1 is **unfunded** and the site says so. The three supporters are supporters,
  **not funders** — never imply capital or space.
- Project: Waterfall is **proposed**. No lease, purchase, agreement or approval
  exists. Everything in it must stay visibly framed as proposal.
- No cohort data, alumni, portfolio, metrics, testimonials or press exist. Do not
  invent them. Absence is designed for — unstruck dies, blank plates, pending
  blocks — never filled in.

## Where the thinking is recorded

- `PRODUCT.md` — product truth, four audiences, must-not-fabricate list.
- `DESIGN.md` — the Hallmark world: palette, type, materials, motion, spacing bands,
  the punch alphabet, sign-on and register patterns.
- `.impeccable/surfaces/app-page-js.md` — surface strategy for the whole site.
- `.impeccable/critique/` — the last critique in full, with heuristic scores.
- `.impeccable/live/config.json` — live-mode config; `/impeccable live` boots without setup.

`CLAUDE.md` and `AGENTS.md` are generated by `next dev`, not authored.
