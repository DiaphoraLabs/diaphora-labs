# Design — Hallmark

<!-- The visual world of Diaphora Labs, documented from the built site. -->

## The idea

An incubator that **marks**, not one that ranks.

A hallmark is a struck set of marks certifying origin, standard, maker and date — a
statutory instrument, legible across borders without translation. *Diaphora* is Greek
for the differentia: the specific difference that distinguishes a thing within its
kind. A hallmark is that difference struck into metal.

The clockmaker's distinction carries the product architecture: a clockmaker **signs
the dial** in the open, where anyone can read it, and **punches the movement** where
only an opened case reveals it.

- **Delta 0** is the open register — the punch is free, self-service, global. Take your mark.
- **Delta 1** is the assay office — it tests, and its mark cannot be self-struck.
- **Delta 2** is a blank die, uncut.

**The assay is structural, not spoken.** It governs how the two programs differ and how
they are drawn, but the word never reaches reader copy: most visitors do not know it, and
a term that has to be defined before it persuades is a tax on the argument. On the page
the split is carried in plain language the visitor already owns — Delta 0 is **"on your
mark"** and says *start here*; Delta 1 is **"make your mark"**, the one you cannot give
yourself. `assay-line` survives as a class name and as the type role, where only the
maintainers read it.

This world refuses two arrangements: the accelerator standard (white page, batch logo
grid, orange apply button) and its predictable opposite (near-black deep-tech with one
neon glow).

## Color

Strategy: **Committed** — oxidized copper owns the surface at page scale, with a single
signal ink. Dark, because the use scene is a founder reading at 1am and a deputy
minister reading it projected in a bright room; a struck-metal world needs a ground
that light sits *on*.

| Token | Value | Role |
|---|---|---|
| `--patina-deep` | `#0b1815` | Page ground |
| `--patina` | `#123029` | Raised surfaces, hover ground |
| `--patina-raised` | `#16382f` | Plaque and die highlight edge |
| `--patina-edge` | `#1e4a3e` | Cast borders |
| `--bronze` | `#b8894a` | Assay lines, ordinals, bolts |
| `--bronze-bright` | `#d9a865` | Struck mark face, subheads |
| `--bronze-dim` | `#7d5c33` | Rail notches, scrollbar |
| `--bone` | `#ece7d9` | Plaque lettering, headings |
| `--bone-dim` | `#a9b5ac` | Body text on patina |
| `--bone-faint` | `#7c9086` | Resting labels, placeholders, resting punch stroke |
| `--current` | `#cbf51f` | **The only signal ink** |
| `--current-dim` | `#8fa81b` | Current at rest / underlines |
| `--alarm` | `#f0b7a0` | **The one sanctioned break** — error text and its 1px edge |

**The current rule.** Chartreuse marks what is live and appears nowhere else: the
active rail tick, the four values that bind every audience, the Delta 0 door, the
self-service strike button, the skip link, text selection. It is never decoration.
If a second highlight color appears anywhere, the system has been broken.

**The one exception is `--alarm`.** A failure has to be legible as a failure, and
bronze cannot say that without reading as ornament. It carries error text and the
1px edge beside it, and nothing else. Every token in this table clears 4.5:1 as
text on `--patina-deep` except `--bronze-dim`, which is therefore restricted to
gradients, the scrollbar thumb and bolt highlights — never to text or to an
affordance boundary.

## Type

| Role | Face | Setting |
|---|---|---|
| Plaque / display | **Archivo** (variable, `wdth` axis) | Uppercase, `font-stretch: 125%`, weight 900, line-height 0.88–0.94 |
| Marks, data, assay lines | **Martian Mono** | Uppercase, `letter-spacing: 0.06–0.2em`, `tnum` on |
| Long-form reading | **Source Serif 4** | Regular and italic, measure capped at 68ch |

Display sizes come from a fluid `--step--1` → `--step-4` scale. Plaque lettering carries
`.plaque-text`: a dark drop and a faint upper catch of light, which is what makes it read
as incised rather than printed.

## Materials

**The plaque is the headline.** Every page head casts its `h1` onto a tablet rather
than setting it in ink: a hallmarked piece names itself on metal. `PageHead` renders
`Plaque` with `as="h1"` at the `xl` size, so the lettering genuinely *is* the heading
rather than a span dressed as one — the ordinal and its rule stay on the axis to the
left, and the standfirst and assay lines sit on the ground beneath, where they are read.
The one exception is `plaque={false}`, for a page whose own artifact is already a tablet
and would be put in competition with a second one: the contact page, where the address
plate is the single action — and that plate is itself struck and lined, so the page still
has a hallmarked tablet.

**One tablet per page.** Two cast objects on the same page compete, so a page gets the
head plaque and nothing else in that material — Project: Waterfall's building
specification is set on the ground as a rule, a heading and bronze lines rather than as a
second dedication tablet.

**Every tablet is struck and dated.** A hallmark reads in a fixed order and so does a
plaque here: the maker's name, then the marks, then where and when. So each plaque
carries the punches its page is actually asked to hold, and beneath them the bronze
assay lines — the seat of the institution and the programme's own tags.

| Plaque | Marks it carries |
|---|---|
| Home wordmark, Niagara, Delta 2, 404, fault, address plate | `BINDING` — the four that bind every audience |
| Delta 0 | `marksFor('Delta 0')` |
| Delta 1 | `marksFor('Delta 1')` |
| Project: Waterfall | `marksFor('Partners')` |

`BINDING` and `marksFor()` live in `lib/marks.js` beside the alphabet, so the selection is
derived from each mark's own `audiences` and never hand-listed on a page. A page that
belongs to no single programme takes the institution's constant rather than an arbitrary
subset.

- **The plaque** — a cast tablet, built to be handled rather than looked at. Three
  background layers: a near-invisible cast grain, a specular pool where the light
  actually falls, and the 158° body of the metal. A four-sided bevel drawn in inset
  shadows — light on the top lip, dark under the bottom, sides half-lit — over a 1px
  contact ring where the casting meets the ground. **Shadow is cast in three ranges,
  never one blur:** a tight contact shadow, a mid shadow, and a wide ambient. The four
  bolts are hardware: domed head, specular at 32%/26%, seated rim, and a driver slot cut
  across at 28°. The same construction carries the Delta 0 die block and the contact
  page address plate.
- **The punch** — every mark is drawn **three times**: a shadow, a catch of light, and
  the face between them. Which side each sits on is the whole illusion. At rest the
  light is on the upper lip and the shadow falls 0.62 units below, so the mark stands
  proud; the face is dim, bronze when struck, current when it binds every audience.

  **Pressed, the lighting inverts and the mark impresses into the ground.** The shadow
  moves to the upper lip and deepens, the light drops to the lower lip and brightens,
  the face dims and thins, and the punch sinks just under a pixel. Light still comes
  from above — the mark has simply gone below the surface. Any activated ancestor drives
  it, so the mark row, the forge options and the sign-on rows all press identically
  without knowing about one another, and the surface beneath takes the impression too:
  a hard shadow under its top edge and a thin return of light along the bottom.
- **The axis** — one governing sightline running the full height and off both edges,
  ticked with every destination. It rotates to horizontal below 860px, and to a
  vertical elevation section on the Niagara page.

## The mark alphabet

Fifteen punches — fourteen from the values document, plus Ingenuity — drawn on one
24-unit grid with a single
1.55 stroke weight, round caps and joins, built from a shared vocabulary of ring, bar,
chevron, arc and notch. They are abstract devices, never pictograms — the set must read
as one punch library, not as an icon set.

**Ingenuity** is the one punch not taken from the values document. It is built from bar
and chevron only — a beam entering a wedge and leaving as two, getting more out than went
in — so the set gains a member without gaining a new vocabulary. It is centred by
construction: 2.6→21.4 across, 7.8→16.2 down, dead centre on both axes with no nudge.

Each glyph is centred in its box. Six were not: **Sankofa overhung the 24-unit box by
1.5 units** and leant into its neighbour's cell on the mark row, and Fun sat 3.6 units
low. They are corrected with a per-mark `nudge` applied as a translate in `Mark.js`,
never by editing the path — the drawing is the identity, and redrawing it to fix
placement is how a punch library turns into clipart. Largest remaining offset is 0.10
units.

The four that bind every audience including partners — **Loyalty, Transparency,
Curiosity, Fairness** — rest already struck, in current. All fifteen live in
`lib/marks.js` with their facets and audiences; that file is the single source of truth.

**The names are nouns.** Every value and every facet is set as a noun, because the
alphabet is a register of things a company *has*, not a list of adjectives describing
one. Adjectival forms in the source values document were converted on the way in
(Loyal → Loyalty, Curious → Curiosity, Visionary → Vision, and the same for facets).
The `id` slugs kept their original spelling and are the stable handle: `lib/waterfall.js`
and `MarkForge` address marks by id, never by name.

## Motion

One authored moment: **the strike**. 90ms, hard-edged, no easing softness — a struck
mark does not ease in. Everything else is restraint: 220–260ms `--ease-strike`
(`cubic-bezier(0.16, 1, 0.3, 1)`) on rail notches and surface changes.

Under `prefers-reduced-motion` the *movement* goes and the *feedback* stays:
animations collapse and the transition property list narrows to colour, fill,
stroke and opacity, so nothing travels but hover, focus and state changes still
say what they said before. A blanket kill would remove the feedback along with
the motion — and `transform` is never cancelled, because the axis ticks use
`rotate()` for layout rather than for motion.

## Browser surfaces

Themed, not defaulted: selection (current on patina), caret, scrollbar (bronze thumb on
patina with a 3px track inset), focus ring (2px current at 3px offset), link underline
color and offset, and tabular numerals in every assay line.

## Spacing rhythm

Three semantic band intervals, never one value repeated. The contrast between them
is the rhythm; using a single interval everywhere flattens the page even when the
value is well chosen.

| Token | Meaning |
|---|---|
| `--band-tight` | The section continues the thought directly above it |
| `--band` | A new movement inside the same argument |
| `--band-wide` | The argument changes hands |

A page head is `--band-wide` above and `--band-tight` below, so the standfirst and its
meta line stay bound to the title. Section boundaries carry the interval; margins on
children do not compete with it.

`--row-max` (44rem) caps the mark row so fifteen punches read as a struck line rather
than scattering across a wide container.

## Composition rules

- One governing axis; every page hangs off it.
- Section boundaries are 1px rules, never cards. There are no cards in this system.
- Two-up regions are separated by a 1px rule showing the ground through, not by gaps.
- Body measure never exceeds 68ch.
- Missing content states its absence in a bordered pending block, capped at 62rem —
  never a placeholder box, never invented filler.
- Every page closes with the footer: wordmark, assay line, and every destination. A page
  that simply stops has no exit.

## Sign-on and commitments

The commitment checkbox is a punch. Unchecked it is incised and barely there; checked
it stands struck in current, and the row takes a current left edge. This is the
signature interaction doing real work rather than decoration: agreeing to something is
striking a mark. The native checkbox stays in the DOM, visually hidden, and carries
focus — the ring lands on the punch.

Lane selection is a register, not a row of tabs: one column of ruled rows, each carrying
the punch that lane is being asked for, the open one struck in current with a current
left edge.

The supporter register renders confirmed supporters as wordmarks and every remaining
slot as an unstruck die, on a fixed grid that always fills its rows. The accompanying
sentence states what the supporters are and are not. Never fill an empty slot with a
placeholder or aspirational logo.

## Proposal registers

Project: Waterfall is a proposal document, so its content lists are **registers** —
ruled rows of condition, name and description — never card grids. A card grid would
read as a product feature matrix; a register reads as a schedule attached to a drawing,
which is what this is.

`Niagara-Proven` is a proposed certification mark and is drawn into the punch alphabet:
same 24-unit grid, same 1.55 stroke, ring plus three drops over a baseline. It is struck
in current because the proposal is live, and the copy beside it says outright that it
certifies nothing today.

## Forced colours

Ministers and civil servants read this site on managed machines, so Windows
High Contrast is a real use scene rather than a checkbox. Under
`forced-colors: active` the system paint replaces every colour the world chose,
and the job is to make sure nothing *disappears*: the plaque takes a real
border because it was drawn with gradient and shadow alone, and the punch drops
its incision entirely — incision and face are the same path, so under one paint
they would land on top of each other and read as a smudge. One clean stroke is
the honest reduction of a struck mark to a single colour.

## Honest risks carried

Struck metal reads cold, which works against Omotenashi, Danketsu and Fun — the
welcoming half of the values. The counterweight is copy voice, not decoration. And the
punches are the identity: if they are ever redrawn casually they become
clipart, and the world goes with them.
