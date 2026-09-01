/**
 * CustomerX brand tokens.
 *
 * Core brand colours follow the customer's visual identity: a process cyan as
 * the signature accent and a deep navy as the anchor colour. Supporting tints
 * and neutrals are derived to give the portal a flat, modern SaaS feel while
 * keeping WCAG AA contrast for text and controls.
 */
/**
 * `rgba()` from one of the hex tokens below. Keeps alpha tints (overlays, the
 * nav rail's white "glass" layers) free of hand-typed colour triples.
 */
export const rgba = (hex: string, a: number) =>
  `rgba(${parseInt(hex.slice(1, 3), 16)}, ${parseInt(
    hex.slice(3, 5),
    16,
  )}, ${parseInt(hex.slice(5, 7), 16)}, ${a})`;

export const brand = {
  /** Signature process cyan. */
  cyan: '#00AEEF',
  cyanLight: '#5CCBF5',
  cyanDark: '#0092C9',
  /** Palest cyan — accent text and hover states on dark surfaces. */
  cyanPale: '#8FDDF9',
  /** Accessible cyan for text/links on white (AA). */
  cyanText: '#0076B6',
  /** Navy anchor. */
  navy: '#00395D',
  navyLight: '#1F5B85',
  navyDark: '#002B47',
  navyDeep: '#001F33',
  /** Tints. */
  sky: '#E5F6FD',
  white: '#FFFFFF',
} as const;

export const neutralsLight = {
  /** Canvas — a breath of the brand cyan in the grey so white cards lift off it. */
  bg: '#EEF5FA',
  paper: '#FFFFFF',
  paperMuted: '#F8FAFC',
  border: '#E3E8EE',
  borderStrong: '#CBD4DE',
  textPrimary: '#0B1F33',
  textSecondary: '#5B6B7B',
  textDisabled: '#98A2B3',
  textVerySubtle: '#C9D2DB',
} as const;

export const neutralsDark = {
  bg: '#0A141E',
  paper: '#122130',
  paperMuted: '#182B3C',
  border: '#24384A',
  borderStrong: '#34495E',
  textPrimary: '#EEF3F7',
  textSecondary: '#A5B4C2',
  textDisabled: '#6B7C8C',
  textVerySubtle: '#3A4F63',
} as const;

export const statusLight = {
  ok: '#12B76A',
  warning: '#F79009',
  error: '#D92D20',
  running: '#0076B6',
  pending: '#EAB308',
  aborted: '#667085',
} as const;

export const statusDark = {
  ok: '#32D583',
  warning: '#FDB022',
  error: '#F97066',
  running: '#5CCBF5',
  pending: '#FAC515',
  aborted: '#98A2B3',
} as const;

/**
 * Typeface stack. CustomerX's corporate typeface (Expert Sans) is licensed and
 * not redistributable, so it is listed first and picked up automatically when
 * installed/self-hosted; Inter (loaded in index.html) is the open fallback
 * that shares its clean geometric character.
 */
export const fontFamily =
  '"Expert Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

export const monoFontFamily =
  '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace';

export const radius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  pill: 999,
} as const;

/**
 * The type scale. Every size in the portal is one of these — no half-pixel
 * one-offs — so headings, labels and body text stay on a shared rhythm.
 *
 * `xs`/`sm` are label sizes, `base` is dense body (table meta, card blurbs),
 * `md` is body, and `lg` upwards are headings.
 */
export const font = {
  xs: 11,
  sm: 12,
  base: 13,
  md: 14,
  lg: 16,
  xl: 20,
  xxl: 24,
  display: 32,
} as const;

/**
 * Spacing step. All padding, margin and gap values are multiples of this, so
 * surfaces line up across components that were written months apart.
 */
export const space = (steps: number) => steps * 4;

export const shadow = {
  light: {
    sm: '0 1px 3px rgba(11, 31, 51, 0.08), 0 1px 2px rgba(11, 31, 51, 0.04)',
    md: '0 4px 12px rgba(11, 31, 51, 0.08), 0 1px 3px rgba(11, 31, 51, 0.05)',
    lg: '0 12px 32px rgba(11, 31, 51, 0.14), 0 2px 6px rgba(11, 31, 51, 0.06)',
    ring: '0 0 0 3px rgba(0, 174, 239, 0.28)',
  },
  dark: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 12px rgba(0, 0, 0, 0.45), 0 1px 3px rgba(0, 0, 0, 0.3)',
    lg: '0 12px 32px rgba(0, 0, 0, 0.55), 0 2px 6px rgba(0, 0, 0, 0.35)',
    ring: '0 0 0 3px rgba(0, 174, 239, 0.4)',
  },
} as const;

/**
 * Shared hover behaviour for clickable cards (SurfaceCard and themed MuiCard).
 *
 * Hover shifts the border and the fill — it does not lift the card. A card
 * that jumps towards the cursor reads as Material-era; holding position and
 * changing weight is what a dense, information-first product wants.
 */
export const interactive = {
  transition:
    'background-color 120ms ease, border-color 120ms ease, color 120ms ease',
} as const;
