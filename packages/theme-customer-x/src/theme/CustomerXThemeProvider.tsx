import { UnifiedThemeProvider } from '@backstage/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ReactNode } from 'react';
import { customerXDarkTheme, customerXLightTheme } from './createCustomerXTheme';
import { CUSTOMER_X_THEME_NAME, type Mode } from './modes';

export interface CustomerXThemeProviderProps {
  mode: Mode;
  children?: ReactNode;
}

/**
 * Provides the CustomerX theme to everything below it.
 *
 * Besides the MUI v4/v5 theme contexts, this mounts MUI's `CssBaseline`. The
 * new frontend system does not render one itself, and it is the only thing
 * that emits `MuiCssBaseline` overrides — which is where our body defaults,
 * scrollbars and the generated `@backstage/ui` CSS variables live.
 */
export const CustomerXThemeProvider = ({
  mode,
  children,
}: CustomerXThemeProviderProps) => (
  <UnifiedThemeProvider
    theme={mode === 'dark' ? customerXDarkTheme : customerXLightTheme}
    themeName={CUSTOMER_X_THEME_NAME}
  >
    <CssBaseline />
    {children}
  </UnifiedThemeProvider>
);
