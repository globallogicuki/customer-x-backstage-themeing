# Accelerate design guide

Accelerate is the CustomerX engineering portal. This guide is the single
description of how it looks and speaks, versioned with the code that
implements it (`packages/theme-customer-x`).

## Principles

1. **The brand is the two blues.** The cyan for accent and action, the navy
   for structure and headings. No third colour is introduced for variety.
2. **Flat, not decorated.** One fill per surface, hairline borders, no
   gradients, no glow, no hover lift. Depth comes from the mark, cropped large.
3. **Sentence case everywhere.** Labels, buttons, table headers and pills read
   as words, not signage.
4. **One moment of motion.** The landing page's hero and tiles settle in on
   load; nothing else animates beyond hover and focus feedback.
5. **Plugins get the look for free.** Everything is delivered through the MUI
   theme and `@backstage/ui` variables; a plugin never imports the theme.

## Where things live

| Concern | File |
| --- | --- |
| Raw brand values | `src/tokens.ts` |
| Per-mode semantic tokens | `src/theme/modes.ts` |
| MUI overrides | `src/theme/components/mui/*` |
| Backstage class overrides | `src/theme/components/backstage.ts` |
| `@backstage/ui` variables and globals | `src/theme/globalCss.ts` |
| Page primitives | `src/components/*` |
| The rail | `src/nav/*` |
| The ⌘K palette | `src/search/*` |
