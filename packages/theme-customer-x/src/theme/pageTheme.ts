import { genPageTheme, type PageTheme } from '@backstage/theme';
import { brand } from '../tokens';
import type { ModeTokens } from './modes';

/**
 * Page headers are flat and quiet — no gradient waves. Every entity kind
 * shares the same surface so the portal reads as one product; the brand shows
 * up in the type label, the accent line, and the card header gradient.
 */
export function createPageThemes(t: ModeTokens): Record<string, PageTheme> {
  const flat = genPageTheme({
    colors: [t.header.background, t.header.background],
    shape: 'none',
    options: { fontColor: t.header.fontColor },
  });
  const card = genPageTheme({
    colors: [brand.navy, '#0B5C8C'],
    shape: 'none',
    options: { fontColor: brand.white },
  });
  return {
    home: flat,
    documentation: flat,
    tool: flat,
    service: flat,
    website: flat,
    library: flat,
    other: flat,
    app: flat,
    apis: flat,
    card,
  };
}
