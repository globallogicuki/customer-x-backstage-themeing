import type { BackstageTypography } from '@backstage/theme';
import { font, fontFamily } from '../tokens';

/**
 * Headings sit on the shared type scale and top out at 600. Hierarchy comes
 * from size and colour rather than weight — nothing in the portal is bold
 * enough to shout, which is what keeps dense pages readable.
 *
 * h6 stays at body size: plugins use `variant="h6"` for card titles, and
 * shrinking it would quietly restyle surfaces this package doesn't own.
 */
export const typography: BackstageTypography = {
  htmlFontSize: 16,
  fontFamily,
  h1: { fontSize: font.display, fontWeight: 600, marginBottom: 8 },
  h2: { fontSize: font.xxl, fontWeight: 600, marginBottom: 8 },
  h3: { fontSize: font.xl, fontWeight: 600, marginBottom: 8 },
  h4: { fontSize: font.lg, fontWeight: 600, marginBottom: 4 },
  h5: { fontSize: font.md, fontWeight: 600, marginBottom: 4 },
  h6: { fontSize: font.md, fontWeight: 600, marginBottom: 4 },
};
