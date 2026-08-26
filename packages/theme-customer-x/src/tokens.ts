/**
 * CustomerX brand tokens.
 *
 * Core brand colours follow the customer's visual identity: a process cyan as
 * the signature accent and a deep navy as the anchor colour. Supporting tints
 * and neutrals are derived to give the portal a flat, modern SaaS feel while
 * keeping WCAG AA contrast for text and controls.
 */
export const brand = {
  /** Signature process cyan. */
  cyan: '#00AEEF',
  cyanLight: '#5CCBF5',
  cyanDark: '#0092C9',
  /** Accessible cyan for text/links on white (AA). */
  cyanText: '#0076B6',
  /** Navy anchor. */
  navy: '#00395D',
  navyLight: '#1F5B85',
  navyDark: '#002B47',
  navyDeep: '#001F33',
  /** Tints. */
  sky: '#E5F6FD',
  skyDark: 'rgba(0, 174, 239, 0.12)',
  white: '#FFFFFF',
} as const;

export const neutralsLight = {
  bg: '#F4F7FA',
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

export const shadow = {
  light: {
    xs: '0 1px 2px rgba(11, 31, 51, 0.05)',
    sm: '0 1px 3px rgba(11, 31, 51, 0.08), 0 1px 2px rgba(11, 31, 51, 0.04)',
    md: '0 4px 12px rgba(11, 31, 51, 0.08), 0 1px 3px rgba(11, 31, 51, 0.05)',
    lg: '0 12px 32px rgba(11, 31, 51, 0.14), 0 2px 6px rgba(11, 31, 51, 0.06)',
    ring: '0 0 0 3px rgba(0, 174, 239, 0.28)',
  },
  dark: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.3)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 12px rgba(0, 0, 0, 0.45), 0 1px 3px rgba(0, 0, 0, 0.3)',
    lg: '0 12px 32px rgba(0, 0, 0, 0.55), 0 2px 6px rgba(0, 0, 0, 0.35)',
    ring: '0 0 0 3px rgba(0, 174, 239, 0.4)',
  },
} as const;

/** Shared hover behaviour for clickable cards (SurfaceCard and themed MuiCard). */
export const interactive = {
  transition:
    'transform 120ms ease, box-shadow 120ms ease, border-color 120ms ease',
  transform: 'translateY(-2px)',
} as const;
