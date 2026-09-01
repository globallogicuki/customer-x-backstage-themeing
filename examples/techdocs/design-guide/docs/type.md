# Type & layout

## Typeface

Expert Sans (the corporate face) first; Inter — self-hosted from
`packages/app/public/fonts` — as the open fallback. JetBrains Mono for code.
No third-party font requests are made.

## Scale

| Token | px | Use |
| --- | --- | --- |
| `font.xs` | 11 | keyboard hints |
| `font.sm` | 12 | table headers, meta lines, pills |
| `font.base` | 13 | card blurbs, dense body |
| `font.md` | 14 | body, nav, buttons |
| `font.lg` | 16 | card titles, search input |
| `font.xl` | 20 | content headers |
| `font.xxl` | 24 | page titles |
| `font.display` | 32 | landing greeting, sign-in headline |

Headings top out at weight 600. Hierarchy comes from size and colour.

## Spacing and radius

Everything sits on a 4px grid (`space(n)`). Radii: 6 (small controls), 8
(buttons, inputs, nav rows), 12 (cards), 16 (dialogs, the palette).

## Page anatomy

```
┌ rail ─┬──────────────────────────────────────────┐
│       │  hero (Dark Blue, cropped mark)          │
│       │  ┌──────┐┌──────┐┌──────┐┌──────┐  ← tiles overlap the hero edge
│       │  └──────┘└──────┘└──────┘└──────┘
│       │  Section heading             Section heading
│       │  cards (8 col)               panels (4 col)
└───────┴──────────────────────────────────────────┘
```

The content column is 1200px including 32px side padding; the hero's inner
width is 1136px so both share a left edge.
