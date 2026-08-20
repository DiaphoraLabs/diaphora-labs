# Figma export — Diaphora Labs / Hallmark

`figma-export.svg` — one board, eight sections, 144 named layers.

## Import

1. In Figma: **File → Place image…** or drag `figma-export.svg` onto the canvas.
   (Drag-and-drop preserves the layer tree; "Import" on the file browser does not.)
2. Select the placed frame → right-click → **Ungroup** once to expose the eight sections.
3. Install the three faces before importing, or Figma substitutes and the metrics shift:
   **Archivo**, **Martian Mono**, **Source Serif 4** — all free on Google Fonts.

## What's on the board

| Section | Contents |
|---|---|
| 00 · Cover | Title and provenance |
| 01 · Colour tokens | 13 swatches, each with token name, hex and role |
| 02 · Type | Three faces at their real settings |
| 03 · Punch alphabet | All 15 marks, each with name, facets and `id` |
| 04 · Plaque | The cast tablet, bolts, struck line, assay lines, anatomy notes |
| 05 · Die | The cut block, plus both frames of the loading mark |
| 06 · Doors and actions | Both doors, four button states |
| 07 · Register | Ruled rows — the pattern that replaces cards |

## Regenerating

The file is **built from source**, not drawn by hand:

```bash
node scripts/build-figma-export.mjs
```

It reads colour tokens from `app/globals.css` and the punch alphabet from
`lib/marks.js`, so it cannot drift from the site. Re-run it after any change to
either and re-import. Do not hand-edit the SVG — edits are overwritten.

## What SVG cannot carry

Three things in this system have no SVG equivalent. Rebuild them as Figma
effects if you need them on the artboard:

**Plaque shadow** — SVG holds one drop shadow; the real plaque casts three
ranges. In Figma add three Drop Shadows to the plaque rect:

| Y | Blur | Spread | Colour |
|---|---|---|---|
| 2 | 3 | −1 | #000000 70% |
| 12 | 22 | −10 | #000000 80% |
| 30 | 60 | −24 | #000000 90% |

Plus two Inner Shadows: `Y 1, blur 0, #ECE7D9 16%` (top lip) and
`Y −2, blur 0, #000000 62%` (bottom lip).

**Cast grain** — a 112° repeating gradient at 1.4% bone / 1.6% black over the
plaque body. Reproduce as a Noise fill at very low opacity, or omit; it reads
as texture, not as pattern.

**The impression** — punches invert their lighting on press: the shadow moves
to the upper lip and deepens, the light catch drops to the lower lip and
brightens, the face dims and thins. The board shows the resting state only.
Build the pressed state as a variant if you are prototyping it.

## Rules that travel with the system

- **No radii.** Square corners everywhere. There are no cards in this system.
- **One signal ink.** `--current` chartreuse marks only what is live. A second
  highlight colour means the system has been broken. `--alarm` is the one
  sanctioned exception, for errors.
- **`--bronze-dim` is never text** — it fails contrast at 2.99:1. Gradients,
  scrollbar and bolt highlights only.
- **One plaque per page.** Two cast objects compete.
- **Registers, not card grids** — ruled rows of condition and description.
