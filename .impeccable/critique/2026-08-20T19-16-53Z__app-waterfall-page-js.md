---
target: "Project: Waterfall page"
total_score: 22
max_score: 36
na_heuristics: 10
p0_count: 0
p1_count: 5
timestamp: 2026-08-20T19-16-53Z
slug: app-waterfall-page-js
---
Method: dual-agent (A: design review, B: detector evidence, isolated). Browser automation unavailable (Chrome extension declined) — no live overlay; browser rule set did not run.

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Lane state reads clearly, but lane selection never touches the URL. |
| 2 | Match System / Real World | 3 | `Struck`/`Unstruck` push insider metallurgy into reader copy. |
| 3 | User Control and Freedom | 2 | `values` never resets on lane change; invisible cross-lane payload. |
| 4 | Consistency and Standards | 2 | `.register` declared twice; `role="tablist"` owns `<li>`. |
| 5 | Error Prevention | 2 | `noValidate` with no client-side check; pre-ticked consent box. |
| 6 | Recognition Rather Than Recall | 3 | Labels 10.56px uppercase mono; lede says find "the fourth one." |
| 7 | Flexibility and Efficiency | 1 | No deep links, no keyboard tab semantics, no email in markup. |
| 8 | Aesthetic and Minimalist Design | 3 | Two identical six-row registers; one band interval for all boundaries. |
| 9 | Error Recovery | 3 | Best error copy on the site; aria-invalid pinned to email; focus never moves. |
| 10 | Help and Documentation | n/a | Every disclosure is inline at the point of claim. |
| **Total** | | **22/36** | Competent with serious gaps |

## Design Specificity Verdict

Authored and unusually so, but the page under-uses its world and breaks it in three places. `--band-tight` unused; five sections share one band pair. Six uses and six ranges render through the same `.row` grid. `.proven` (waterfall.module.css:162-172) is a card using the plaque's gradient, angle and edge token, against DESIGN.md's no-cards rule.

Detector: 0 findings, exit 0, across page and all components (tool verified working via synthetic sanity check). `--no-config` surfaced 2 `layout-transition` warnings at Axis.module.css:67 and Mark.module.css:80 — both false positives, both already waived in-file with reasoning.

Convergent finding: A argued the 1px rule would vanish on a projector (DESIGN.md's named use scene); B independently computed `--rule` at 1.43:1 and `--rule-strong` at 2.25:1, both below WCAG 1.4.11's 3:1 for non-text boundaries. All text pairs pass (14.71, 8.56, 5.81, 14.38).

## Overall Impression

No showstoppers, five majors, clustered in one place: a proposal pitching "we say only what is true" pre-ticks a consent box, ships invisible form payloads, and implies an endorsement it lacks. Biggest opportunity: make the page filable and forwardable.

## What's Working

1. Empty state drawn in the product's own metaphor (SupporterWall.js:18-25, :30) — unstruck dies, not aspirational logos.
2. Commitment checkbox as a punch (SignOn.js:151-154, SignOn.module.css:108-141) — focusable hidden native input, ring on the punch, inset shadow on active. No `outline:none` anywhere in the project.
3. Error copy in lib/register-client.js — timeout deadline, crashed-route vs offline branch, state preserved, email fallback.
4. Print stylesheet globals.css:263-308.

## Priority Issues

**[P1] "Who has signed on" implies an endorsement not supported by PRODUCT.md.** The three institutions back Diaphora Labs, not this proposal. Heading and placement do the persuading. Fix: retitle, separate org support from proposal support. `/impeccable clarify`

**[P1] Publication consent is pre-ticked.** SignOn.js:15 `useState(['name'])`, re-applied on lane switch, against the page's own "written permission" promise and Canadian consent norms. Fix: `useState([])`, reset on lane change. `/impeccable harden`

**[P1] Cross-lane state leaks into every submission.** `selectLane` never resets `values`; submit ships the whole object. `use` textarea has no maxLength while the API truncates at 4000. Fix: reset values or build payload from `lane.fields`; add maxLength + count. `/impeccable harden`

**[P1] The register device is broken twice over.** `.register` declared at waterfall.module.css:56 and :129; merged rules give `gap: 1.4rem` over `border-top`, so row rules float 22px apart. Rules also drawn at 1.43:1. Fix: rename section wrapper, drop gap, lift rule token to >=3:1. `/impeccable layout`

**[P1] The page can't be forwarded or filed.** No hash-linked lanes; malformed tablist (no roving tabindex, no aria-labelledby, panel not focusable); no date or version on the plaque; email address exists only inside two error strings while print hides the form. Fix: hash lanes, drop ARIA tab pattern for buttons + aria-current, date the plaque, put the address in markup. `/impeccable harden`

## Persona Red Flags

- **Policy analyst:** no date/version/contact; 1.43:1 rules collapse on a projector; eight unexplained glyphs under the h1.
- **Hostile local:** lands on Partners with "Show our name" pre-ticked; told to find "the fourth one" in 10.56px mono.
- **Anchor tenant R&D:** 17 ranges announced, 6 shown, 11 unreachable; lane fifth of six.
- **Screen-reader user:** malformed tablist; error has no id and input no aria-describedby (Register.js:109 does it correctly); focus lost on success.

## Minor Observations

- `.again` ~22-24px and `.input` ~42.4px at min clamp, under the 44px floor enforced elsewhere.
- Off-scale type: 8.96, 9.6, 9.92, 10.24, 10.56px — below the --step--1 floor. `.fine` is the legally load-bearing line at 9.6px in the dimmest token.
- `.tablet` border-bottom stacks with the next section's border-top.
- Timeline year column 9rem vs register condition column 11rem.
- `SLOTS = 8` invents a denominator; nothing in PRODUCT.md sets a target.
- page.js:173 and SignOn.js:80 use `<span>` where siblings use headings.
- No `openGraph` block in metadata.

## Questions to Consider

1. If a minister prints this and hands it across a table, what is on the page?
2. Eight, or three? Is the honest empty state the ratio, or the absence of a fourth name?
3. Two identical six-row tables — discipline, or the system running out of ideas? Where is the second register format that is still rules and still not a card?
