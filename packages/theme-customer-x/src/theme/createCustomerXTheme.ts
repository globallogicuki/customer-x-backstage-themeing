import {
  createUnifiedTheme,
  defaultComponentThemes,
  type UnifiedTheme,
} from '@backstage/theme';
import { fontFamily, radius } from '../tokens';
import { createBackstageComponents } from './components/backstage';
import { createMuiComponents } from './components/mui';
import { dark, light, type ModeTokens } from './modes';
import { createPageThemes } from './pageTheme';
import { createPalette } from './palette';
import { typography } from './typography';

/** Build the unified (MUI v4 + v5) theme for one mode. */
export function createCustomerXTheme(t: ModeTokens): UnifiedTheme {
  const theme = createUnifiedTheme({
    palette: createPalette(t),
    defaultPageTheme: 'home',
    pageTheme: createPageThemes(t),
    fontFamily,
    htmlFontSize: 16,
    typography,
    components: {
      // Keep Backstage's sensible defaults for anything not touched below.
      ...defaultComponentThemes,
      ...createMuiComponents(t, defaultComponentThemes),
      ...createBackstageComponents(t),
    },
  });

  // createUnifiedTheme doesn't expose `shape`; round corners globally so
  // components that read theme.shape.borderRadius (menus, inputs, alerts,
  // third-party plugins) pick up the same radius as our overrides.
  for (const version of ['v4', 'v5'] as const) {
    const mui = theme.getTheme(version) as
      | { shape?: { borderRadius: number } }
      | undefined;
    if (mui?.shape) {
      mui.shape.borderRadius = radius.md;
    }
  }

  return theme;
}

export const customerXLightTheme = createCustomerXTheme(light);
export const customerXDarkTheme = createCustomerXTheme(dark);
