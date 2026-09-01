import type { ModeTokens } from '../modes';

/** The hairline every surface in the theme is drawn with. */
export const hairline = (t: ModeTokens) => `1px solid ${t.n.border}`;

/**
 * Search-term highlighting. Applied to plain `<mark>` (MUI baseline) and to
 * Backstage's own search result highlighter, so both look the same.
 */
export const searchHighlight = (t: ModeTokens) => ({
  backgroundColor: t.searchHighlight,
  color: 'inherit',
  borderRadius: 2,
  padding: '0 1px',
});
