# Why a font file is committed here

`ImageResponse` rasterises with satori, which needs real font data — it cannot
reach the webfonts `next/font` loads for the browser, and the `.woff2` files
next emits are not a format it reads.

**Archivo Black** stands in for the site's display face. The site sets
**Archivo** variable at weight 900 with `wdth: 125%`; satori does not reliably
apply variable axes, so it would silently render Regular — the wrong weight
entirely. Archivo Black is the closest static face in the same family design.

It is used **only** in generated social images (`app/opengraph-image.js` and
friends). Nothing in the browser loads it, and the plaque on the site itself is
still real Archivo with its width axis.

Licensed under the SIL Open Font License 1.1 — see `ArchivoBlack-OFL.txt`.
