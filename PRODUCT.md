# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js + React (chosen by the user). Selected over Astro and static HTML because the site spans several distinct pages — an incubator overview, two program pages, and a Project: Waterfall showcase — is image-forward, and is expected to grow an application flow for Delta 1 later.

## Users

Four audiences arrive with genuinely different jobs, and the site must serve all four without collapsing into one voice:

- **Startup founders** — the applicants. Delta 0 draws anyone in the world who wants to start; Delta 1 draws founders already operating with an MVP, including science and research teams evaluated on TRL levels. They are deciding whether to join, and comparing against Y Combinator and other accelerators.
- **Investors** — assessing deal flow quality, the pipeline mechanism, and whether Niagara Falls produces companies worth backing.
- **Corporate partners and funding partners** — Delta 1 is currently unfunded and actively seeking both. They are evaluating what they get and whether the operation is credible.
- **Government ministers and public-sector stakeholders** — Canadian and cross-border. They evaluate regional economic impact, legitimacy, and alignment with policy priorities.

## Product Purpose

Diaphora Labs is a startup incubator based in Niagara Falls, Canada. It runs two programs — Delta 0 and Delta 1 — and is building toward a flagship physical home, Project: Waterfall. The website exists to make the incubator attractive and credible to founders, investors, partners, and government simultaneously, and to convert that attention into applications, partnerships, and funding.

Success means: founders apply, investors take meetings, partners and funders engage, and government stakeholders treat Diaphora Labs as a serious regional institution.

## Positioning

Diaphora Labs competes with Y Combinator on a different axis. Three things a neighboring incubator could not truthfully copy:

1. **Cross-border by design.** Sited at the Canada–US border in Niagara Falls, with cross-border connections and legal tooling as a core part of what the program provides — not an afterthought.
2. **Delta 0 is open to the world.** An open-source, self-service community, wiki, and primarily agent-run incubation tool. No application, no gatekeeping, no geography. This is a genuinely different top of funnel from a cohort-only accelerator.
3. **Project: Waterfall.** A flagship building based on the old Ontario Power Company generating station at the base of Niagara Falls — a physical anchor with real industrial and civic history.

## Operating Context

- **Delta 0** — open-source, self-service, global, and always available. A community, a wiki, and an agent-run incubation tool. Anyone in the world can join and use it. No application required.
- **Delta 1** — application-based, in person, in Niagara Falls. Biased toward founders currently operating with an MVP. Science and research companies are assessed on **TRL (Technology Readiness Level)**. Currently an **unfunded program**; attracting partners and funding partners is an active goal, and the site is part of how that happens.
- **Project: Waterfall is a live proposal** being presented to **Niagara Parks**, the steward of the land, and used to build public and institutional support. Everything in it is proposed, not built, and the site must keep that distinction visible on every claim.
- **Delta 2** — a future program, not yet launched. It gets a "coming soon" page with email capture for launch notification. No details about its content exist; do not invent any.
- **Project: Waterfall** — the flagship building initiative, based on the old Ontario Power Company generating station at the base of Niagara Falls. Warrants its own page.
- **Niagara** — the case for building here: the history of the falls, the border, and North America, and why that history makes this the right place. The user considers this narrative central enough to hold its own page.
- The site is read by four audiences with different stakes, often in the same session (a minister and an investor may both arrive from the same press mention).

## Capabilities and Constraints

Confirmed site architecture:

| Page | Job |
|---|---|
| Home | Make the institution legible and credible to all four audiences; route each to their door. |
| Niagara | The narrative case for building here — the falls, the border, the history of North America. |
| Delta 0 | The open, global, self-service program: community, wiki, agent-run incubation tool. |
| Delta 1 | **Two conversions on one page**: a founder application waitlist, and a distinct path for partners and funders. |
| Delta 2 | "We're working on something wonderful" — coming soon, with email capture for launch notification. |
| Project: Waterfall | **The proposal itself.** The case for the old Ontario Power Company generating station and its outlying spaces: the history, the six proposed uses, the proposed test ranges, six audience-specific ways in, a community suggestion channel, and the supporter register. Presented to Niagara Parks and used to build public support. |

- Delta 1 must hold two audiences with two different actions without either diluting the other.
- Project: Waterfall carries six sign-on lanes, each with its own action: partners and supporters (with free commitments: name, letter of support, a call, founding-partner talks), design and engineering firms, startups and researchers, Niagara locals and community, investors and anchor tenants, and media. The community lane always shows an open "what should this building become?" field — public input is a stated goal of the project, not an afterthought.
- A supporter register exists on the Waterfall page and is currently empty by design. Names appear only with written permission. Do not populate it with placeholder or aspirational logos.
- Email capture is required on Delta 2, waitlist capture on Delta 1, and six-lane sign-on capture on Project: Waterfall. Backend/provider not yet chosen; all of it currently appends to a local gitignored JSONL via `/api/register`.
- Delta 0 lives partly off-site. Two of the three pieces are live and linked from the Delta 0 page: the community at **https://discord.gg/AnWHBBTjB** and the source at **https://github.com/francois-build/delta-0** (public, MIT licensed). The **wiki is not live yet** and its host is still undecided.
- The term **TRL levels** is real, load-bearing vocabulary for the research-startup audience and should be used correctly.
- Terminology to use exactly: *Diaphora Labs*, *Delta 0*, *Delta 1*, *Delta 2*, *Project: Waterfall*.

## Brand Commitments

- Name: **Diaphora Labs**. Programs: **Delta 0**, **Delta 1**. Initiative: **Project: Waterfall**.
- **No visual assets exist** — no logo, no colors, no typefaces, no brand guide. The visual world is entirely open and will be established in later design work, not here.
- A **team values document** exists: `Branding_Value_Diaphora.xlsx`. It is binding input for voice, principles, and identity.
- The values, and which audiences each applies to, are recorded in Evidence on Hand below. There are **fifteen**: the fourteen from the values document plus **Ingenuity**, added at the user's direction on 2026-08-20. Ingenuity is not yet in `Branding_Value_Diaphora.xlsx`; the spreadsheet needs updating to match.
- The user has directed that the values be **load-bearing in the visual identity, not decorative** — the cross-cultural vocabulary is a real differentiator and must shape the identity's structure, not sit in a list on an about page.
- *Diaphora* is Greek for difference/distinction — in Aristotle, the *differentia*: the specific difference that distinguishes one thing within its kind. The name is itself an argument about not being Y Combinator.

## Evidence on Hand

**Real, confirmed material:**

- **Supporters:** Niagara Innovation Hub, Brock University, Velocity — all three back the founders and support Diaphora Labs. Wordmarks only; no logo files yet.
- **The Project: Waterfall proposal document**, which is the user's own and describes the intended programme for the station and its outlying spaces.
- **The team values document** (`Branding_Value_Diaphora.xlsx`).
- **Delta 0 community:** https://discord.gg/AnWHBBTjB — open now, no application.
- **Delta 0 source:** https://github.com/francois-build/delta-0 — public, MIT licensed, described as "startup resources".

**Future work must not fabricate any of the following:**

- **No photographs** of the Ontario Power Company generating station, the falls, or any facility. Project: Waterfall has no imagery yet, and no renderings exist.
- **No funders or sponsors.** Delta 1 is explicitly unfunded. The three supporters above are supporters, not funders, and must not be described as investors, funders, or as having committed capital or space.
- **No further named institutions or government backers** beyond the three confirmed supporters.
- **No cohort data, alumni, portfolio companies, testimonials, metrics, funding totals, or press.**
- **No specifics of the cross-border legal tooling** beyond its existence as a positioning pillar. Do not invent legal mechanisms, jurisdictions, or services.
- **Three real supporters exist**, confirmed by the user: **Niagara Innovation Hub**, **Brock University**, and **Velocity**. All three have backed the founders and agreed to be in support of Diaphora Labs. No logo files have been supplied yet, so they currently appear as wordmarks. Do not add a fourth name.
- **The proposal programme is real intent, not fabrication.** The Project: Waterfall proposal document is the user's own and describes what Diaphora Labs *aims to build*: six uses for the station, a catalogue of seventeen environmental test ranges, a "Niagara-Proven" certification mark, and an international design competition. None of it is built. It may be presented as proposal, and must never be presented as existing.
- **Still absent:** photographs of the station, renderings, cohort data, alumni, metrics, press coverage, and any capital commitment. Delta 1 remains unfunded.
- Real content assets: the **team values document** (not yet in this repo) and the **Delta 0 repository** at https://github.com/francois-build/delta-0 — public and MIT licensed, which makes "open source" a checkable claim rather than an assertion.

Placeholders must be visibly placeholders. Any claim not sourced from this file or the values document needs the user's confirmation first.

## Product Principles

1. **Four audiences, one institution.** Every page must hold up under a founder's, an investor's, a partner's, and a minister's reading. Serve them with structure and routing, not with four different voices.
2. **Credible before impressive.** Diaphora Labs is early and unfunded. Ambition is the asset; overstated proof is the risk. Earn seriousness through clarity, specificity, and craft rather than borrowed authority.
3. **Place is the differentiator.** Niagara Falls, the border, and the generating station are not decoration — they are the argument. Never treat the location as generic.
4. **Doors, clearly marked.** Delta 0 is open to everyone and free to enter; Delta 1 is selective, in person, and MVP-stage; Delta 2 is not open yet. A visitor should never be confused about which one is theirs, and Delta 1 must serve founders and funders without either action weakening the other.
5. **Say only what is true.** With no logos, metrics, or alumni to lean on, the site's integrity is its strongest asset. Absence of proof is stated or designed around, never filled in.

## Accessibility & Inclusion

No product-specific requirement was established. Government and institutional readership makes WCAG 2.1 AA a sensible default target; confirm before treating it as binding.
