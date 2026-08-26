import type { BackstageTypography } from '@backstage/theme';
import { fontFamily } from '../tokens';

export const typography: BackstageTypography = {
  htmlFontSize: 16,
  fontFamily,
  h1: { fontSize: 32, fontWeight: 700, marginBottom: 8 },
  h2: { fontSize: 26, fontWeight: 700, marginBottom: 8 },
  h3: { fontSize: 22, fontWeight: 600, marginBottom: 6 },
  h4: { fontSize: 18, fontWeight: 600, marginBottom: 6 },
  h5: { fontSize: 16, fontWeight: 600, marginBottom: 4 },
  h6: { fontSize: 14, fontWeight: 600, marginBottom: 2 },
};
