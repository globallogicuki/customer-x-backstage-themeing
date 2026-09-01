# Colour

## Brand

| Token | Hex | Use |
| --- | --- | --- |
| `brand.cyan` | `#00AEEF` | The mark, icon washes, active states, focus rings |
| `brand.cyanText` | `#0076B6` | Cyan at text weight — links and accent labels on white (meets AA) |
| `brand.navy` | `#00395D` | Rail, hero, sign-in panel, headings, primary buttons |
| `brand.sky` | `#E5F6FD` | The wash behind an accent icon |

The cyan is never used for body text on white: it fails contrast. Use
`cyanText` for anything a person reads.

## Semantic

Every colour a component needs is read from `ModeTokens` (`modes.ts`), never
typed as a hex. The same token set drives the MUI palette, the `@backstage/ui`
variables and the `Pill` primitive, so status colours cannot drift.

| Token | Light | Dark |
| --- | --- | --- |
| `heading` | navy | near-white |
| `accentText` / `accentWash` | `cyanText` / `sky` | `cyanLight` / 16% cyan |
| `tint.ok` `warning` `error` `info` | pale wash + AA text | translucent wash + light text |

## The mark

The mark is currently a generic placeholder (`src/brand/markPath.ts`), to be
replaced with the customer's registered mark. It is drawn in the brand cyan
only, never recoloured, and appears in three sizes: 28px in the rail, 32px on
sign-in, and cropped at 500–620px as a watermark on the navy at 8–10% opacity.
